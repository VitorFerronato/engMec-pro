<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "login-area",

  created() {
    if (this.$route.path == "/login") this.$router.push("/login/sign-in");
  },
};
</script>