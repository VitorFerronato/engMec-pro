<template>
  <v-container fluid class="pa-8">
    <v-row no-gutters align="center">
      <v-icon left large color="#f3663b"> mdi-account-key-outline </v-icon>
      <h2>ADMIN SECTION</h2>
      <v-spacer> </v-spacer>
      <router-link to="/main">
        <v-btn outlined dense color="#f3663b"> Voltar </v-btn>
      </router-link>
    </v-row>

    <v-row no-gutters class="my-6">
      <v-breadcrumbs :items="items" divider="/"></v-breadcrumbs>
    </v-row>

    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab>
        <p>Listar usuários</p>
      </v-tab>
      <v-tab>
        <p>Criar usuário</p>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <List-users :userLogged="userLogged" />
      </v-tab-item>

      <v-tab-item>
        <Create-user :userLogged="userLogged" />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import CreateUser from "./components/create-user.vue";
import ListUsers from "./components/list-users.vue";
export default {
  components: { ListUsers, CreateUser },
  name: "admin-main",
  data() {
    return {
      userLogged: null,
      items: [
        {
          text: "Admin",
          disabled: false,
        },
        {
          text: "Listar usuários",
          disabled: false,
        },
      ],

      tab: null,
      itemsTabs: ["Appetizers", "Entrees"],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },

  methods: {
    createUserBreadcrumbs() {
      this.items.push({
        text: "Criar usuários",
        disabled: false,
      });
    },
  },

  watch: {
    tab() {
      if (this.tab == 0) {
        this.items = [
          {
            text: "Admin",
            disabled: false,
          },
          {
            text: "Listar usuários",
            disabled: false,
          },
        ];
      } else {
        this.items = [
          {
            text: "Admin",
            disabled: false,
          },
          {
            text: "Criar usuário",
            disabled: false,
          },
        ];
      }
    },
  },

  mounted() {
    this.userLogged = JSON.parse(localStorage.getItem("user"));
  },
};
</script>