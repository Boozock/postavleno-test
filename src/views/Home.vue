<template>
  <div class="container">
    <span class="my-name">Шопин А.И.</span>
    <h1>Добавить пользователя:</h1>

    <AddUserForm
      @addUser="addUser"
      :initUserData="clearUser"
    />

    <div class="loader" v-if="!table"></div>
    <div
      id="myGrid" class="ag-theme-quartz"
      style="height: 350px;width:100%;"
      v-show="users"
    ></div>
    
    <LogsList
      :logs="logs"  
    />
  </div>
</template>

<script>
import { API } from "@/api";
import AddUserForm from "@/components/AddUserForm.vue";
import LogsList from "@/components/LogsList.vue";

export default {
  name: 'App',
  components: {
    AddUserForm,
    LogsList,
  },
  data(){
    return {
      table: null,
      users: [],
      logs: [],
      clearUser: {
        name: "",
        gender: "",
        email: "",
        age: "",
      },
    }
  },
  computed:{
    clonedItems: function(){
      return JSON.parse(JSON.stringify(this.users));
    }
  },
  watch: {
    clonedItems: {
      immediate: false,
      handler: function (val, oldVal) {        
        if(!oldVal?.length && (val?.length !== 1 && oldVal?.length === 0)) return;

        const namesMap = {
          new: val.map(item => item.name),
          old: oldVal.map(item => item.name)
        }

        let findedUser = null;
        const userDeleteDetect = val?.length < oldVal?.length;

        namesMap[userDeleteDetect ? 'old' : 'new'].forEach(name => {
          if(!namesMap[userDeleteDetect ? 'new' : 'old'].includes(name)){
            findedUser = name;
          }
        });

        this.logs.push(`${userDeleteDetect ? 'Удалён' : 'Добавлен'} пользователь ${findedUser}`);
      },
      deep: true
    }
  },
  methods: {
    actionDeleteCellRenderer(params) {
      let $self = this;
      let btnWrpr = document.createElement("div");

      btnWrpr.innerHTML = `<button class="action-button delete" data-action="delete">Удалить</button>`;
      const deleteBtn = btnWrpr.querySelector('.action-button');

      deleteBtn.onclick = () => {
        $self.users.splice(params.api.getRowNode(params.node.id).rowIndex, 1);
        
        params.api.applyTransaction({ remove: [ params.api.getRowNode(params.node.id).data ] });
      }

      return btnWrpr;
    },
    addUser(newUser){
      this.users.push(newUser);
      this.table.applyTransaction({ add: [ newUser ] });
    },
    createTable(){
      const gridOptions = {
        rowData: this.users,

        columnDefs: [
          { field: "name" },
          { field: "gender" },
          { field: "email" },
          { field: "age" },
          { 
            headerName: 'Action',
            cellRenderer: this.actionDeleteCellRenderer
          },
        ]
      };

      const myGridElement = document.querySelector('#myGrid');
      this.table = agGrid.createGrid(myGridElement, gridOptions);
    },
    async getUsers(){
      let res = await API.getUsers();

      if(res?.success){
        this.users = res?.data?.results.map(user => ({
          name: `${user.name.first} ${user.name.last}`,
          gender: user.gender,
          email: user.email,
          age: user.dob.age,
        }));

        this.createTable();
      } else {
        this.$notify({
          type: 'error',
          title: res.message
        });
      }
    },
  },
  mounted(){
    this.getUsers();
  },
}
</script>

<style lang="scss">
.container {
  max-width: 1020px;
  width:100%;
  margin:0 auto;
}
.action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  transition: 0.7s;
  padding: 10px 15px;
  border-radius: 30px;
  border: 0;
  font-size: 14px;
  &:hover {
    opacity: 0.7;
  }
  &.add {
    background: #42b983;
    color: #fff;
    min-height: 40px;
  }
  &.delete {
    background: transparent;
    color: red;
    text-decoration: underline;
    margin: auto;
  }
}
.my-name {
  position: fixed;
  left: 10px;
  top: 10px;
  font-size: 12px;
  color: #5a5a5a;
}
.loader {
  width: 40px;
  aspect-ratio: 4;
  background: radial-gradient(circle closest-side,#42b983 90%,#0000) 0/calc(100%/3) 100% space;
  clip-path: inset(0 100% 0 0);
  animation: l1 1s steps(4) infinite;
  margin: 50px auto 0;
}
@keyframes l1 {to{clip-path: inset(0 -34% 0 0)}}
</style>
