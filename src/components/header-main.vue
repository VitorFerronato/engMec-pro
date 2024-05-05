<template>
  <v-app-bar height="60px" flat app color="#12192c">
    <v-row no-gutters align="center">
      <router-link to="/main/home">
        <span class="header-brand">
          ENGMEC <span class="header-destaq">PRO</span>
        </span>
      </router-link>
    </v-row>

    <v-spacer></v-spacer>

    <router-link v-if="userIsAdmin" to="/admin">
      <div class="mr-5">
        <v-icon color="#f3663b">mdi-account-circle-outline</v-icon>
      </div>
    </router-link>

    <router-link v-else to="/user">
      <div class="mr-5">
        <v-icon color="#f3663b">mdi-account-circle-outline</v-icon>
      </div>
    </router-link>

    <v-icon @click="logout" color="#fff">mdi-logout-variant</v-icon>
  </v-app-bar>
</template>

<script>
export default {
  props: ["hasOppen"],
  data() {
    return {
      userIsAdmin: null,
    };
  },

  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },

  created() {
    let userLogged = JSON.parse(localStorage.getItem("user"));

    if (userLogged.isAdmin == 0) {
      this.userIsAdmin = false;
    } else {
      this.userIsAdmin = true;
    }
  },
};
</script>

<style scoped>
.header-brand {
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
}

.header-destaq {
  color: #f3663b;
}

.arrow {
  cursor: pointer;
  margin-left: 6.5rem;
  transform: rotate(180deg);
  font-size: 30px;
  color: #f3663b;
}
</style>