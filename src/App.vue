<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
    mounted() {
        let token = localStorage.getItem('jwtToken')
        if (!token) {
            this.$router.push({name: "Login"})
        }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

label{
  font-weight: 600;
  color: #797979;
}

.error-feedback{
  color: #dc3545;
}

</style>
