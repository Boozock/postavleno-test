<template>
    <ul class="logs-list">
        <li v-for="(log, index) in logs" :key="index">
            {{ log }}
        </li>
    </ul>
</template>

<script>
export default {
    name: 'LogsList',
    props: ["logs"]
}
</script>

<style lang="scss">
.logs-list {
  list-style: disc;
  text-align: left;
  color: #5a5a5a;
  li + li{
    margin-top: 10px;
  } 
}
</style>
