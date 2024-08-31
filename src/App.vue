<template>
  <div id="app">
    <Home />

    <notifications />
  </div>
</template>

<script>
import Home from "@/views/Home";

export default {
  name: 'App',
  components: {
    Home,
  },
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  outline: none;
}
body {
  margin: 0px;
  padding: 10px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
button {
  cursor: pointer;
}
</style>