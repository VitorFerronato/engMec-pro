<template>
  <v-container fluid class="pa-8">
    <div class="user-main">
      <user-info />
      <user-password />
    </div>
  </v-container>
</template>

<script>
import UserInfo from "./components/user-info.vue";
import UserPassword from "./components/user-password.vue";
export default {
  components: { UserInfo, UserPassword },
  name: "user-main",
};
</script>

<style scoped>
.user-main {
  display: flex;
  justify-content: space-around;
}
</style>