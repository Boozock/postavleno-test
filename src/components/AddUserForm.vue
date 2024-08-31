<template>
    <form class="add-form" @submit.prevent="add">
        <div class="form-group">
            <input type="text" placeholder="Name" class="input-text" v-model="newUser.name">
        </div>
        <div class="form-group">
            <select class="select" v-model="newUser.gender">
                <option value="" hidden>Gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
            </select>
        </div>
        <div class="form-group">
            <input type="email" placeholder="Email" class="input-text" v-model="newUser.email">
        </div>
        <div class="form-group">
            <input
                type="number" placeholder="Age" class="input-text" 
                :value="newUser.age"
                @input="e => newUser.age = +e.target.value"
            >
        </div>
        <div class="form-group">
            <button type="submit" class="action-button add">Добавить</button>
        </div>
    </form>
</template>

<script>
export default {
    name: "AddUserForm",
    props: ["addUser", "initUserData"],
    data(){
        return {
            newUser: {
                ...this.initUserData,
            }
        }
    },
    methods: {
        add(){
            for (let key in this.newUser) {
                if(!this.newUser[key]){
                    this.$notify({
                        type: 'error',
                        title: `Поле "${key.toUpperCase()}" обязательно для заполнения`
                    });
                    return false;
                }
            }

            this.addUser(this.newUser);

            this.newUser = { ...this.initUserData };
        }
    }
}
</script>

<style lang="scss">
.add-form {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 -10px 20px;
  .form-group:last-child {
    max-width: 120px;
  }
}
.form-group {
  margin: 0 10px;
  min-height: 40px;
  width: 100%;
}
.input-text,
.select {
  display: block;
  width: 100%;
  font-size: 14px;
  color: #000;
  padding: 3px 15px;
  min-height: 40px;
  background: #fff;
  border: 1px solid #efefef;
  border-radius: 8px;
}
@media (max-width: 768px) {
    .add-form {
        flex-direction: column;
        margin: 0 0px 20px;
        .form-group:last-child {
            max-width: 100%;
        }
    }
    .form-group {
        margin: 0;
        +.form-group {
            margin-top: 10px;
        }
    }
}
</style>