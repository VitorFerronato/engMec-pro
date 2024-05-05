<template>
  <v-card flat>
    <v-row v-if="isLoading" no-gutters justify="center" class="mt-6">
      <v-progress-circular indeterminate color="#f3663b"></v-progress-circular>
    </v-row>

    <v-data-table v-else :headers="headers" :items="users">
      <template v-slot:[`item.isAdmin`]="{ item }">
        <v-icon color="green" v-if="item.isAdmin">mdi-checkbox-marked</v-icon>
        <v-icon color="red" v-else>mdi-close-box</v-icon>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="setEditUser(item)" color="#12192c" left
          >mdi-pencil</v-icon
        >
        <v-icon @click="setDeleteUser(item)" color="red">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <!-- EDIT USER DIALOG -->
    <v-dialog max-width="500px" v-model="dialogEditUser" persistent>
      <v-card :disabled="modalLoading" class="pa-4">
        <h3 class="mb-4">EDITAR USUÁRIO</h3>
        <label class="font-weight-bold">Nome do usuário</label>
        <v-text-field
          v-model="userData.userName"
          outlined
          dense
          hide-details
          color="#f3663b"
          class="mb-4"
        ></v-text-field>

        <label class="font-weight-bold">Email</label>
        <v-text-field
          v-model="userData.email"
          outlined
          dense
          hide-details
          color="#f3663b"
          class="mb-4"
        ></v-text-field>

        <label class="font-weight-bold">Admin</label>
        <v-radio-group v-model="userData.isAdmin" hide-details row>
          <v-radio color="#f3663b" label="Sim" :value="true"></v-radio>
          <v-radio color="#f3663b" label="Não" :value="false"></v-radio>
        </v-radio-group>

        <v-card-actions class="pa-0 mt-6">
          <v-spacer></v-spacer>
          <v-btn
            @click="dialogEditUser = false"
            :disabled="modalLoading"
            outlined
            color="#f3663b"
          >
            Cancelar
          </v-btn>
          <v-btn
            @click="saveEditUser(userData)"
            :loading="modalLoading"
            color="#f3663b"
            class="white--text"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- DELETE USER DIALOG -->
    <v-dialog max-width="500px" v-model="dialogDeleteUser" persistent>
      <v-card :disabled="modalLoading" class="pa-4">
        <h3 class="mb-4">EXCLUIR USUÁRIO</h3>

        <span
          >Tem certeza que deseja excluir o usuário "{{
            userData.userName
          }}"?</span
        >

        <v-card-actions class="pa-0 mt-6">
          <v-spacer></v-spacer>
          <v-btn
            @click="dialogDeleteUser = false"
            :disabled="modalLoading"
            outlined
            color="#f3663b"
          >
            Cancelar
          </v-btn>
          <v-btn
            @click="deleteUser(userData)"
            :loading="modalLoading"
            color="#f3663b"
            class="white--text"
          >
            Excluir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      outlined
      :color="snackbarColor"
      :timeout="2000"
    >
      {{ snackBarText }}
    </v-snackbar>
  </v-card>
</template>

<script>
import UserService from "@/services/user-service.js";
import axios from "axios";
export default {
  name: "list-users",
  data() {
    return {
      UserService: new UserService(),
      isLoading: false,
      modalLoading: false,

      dialogEditUser: false,
      dialogDeleteUser: false,

      snackbar: false,
      snackbarColor: "",
      snackBarText: "",

      userData: {
        userName: "",
        email: "",
        isAdmin: "",
        id: null,
      },

      headers: [
        {
          text: "userId",
          value: "id",
          align: "center",
          sortable: false,
        },
        {
          text: "UserName",
          value: "userName",
          align: "center",
        },
        {
          text: "Email",
          value: "email",
          align: "center",
        },
        {
          text: "isAdmin",
          value: "isAdmin",
          align: "center",
        },
        {
          text: "Actions",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],

      users: [],
    };
  },

  methods: {
    getUsers() {
      this.isLoading = true;
      this.UserService.listUsers()
        .then((res) => {
          let response = res.data;
          console.log("lista de usuarios", response);
          this.users = response.data.map((el) => {
            return { ...el, isAdmin: el.isAdmin === 1 };
          });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally((this.isLoading = false));
    },

    setEditUser(user) {
      this.userData = {
        userName: user.userName,
        email: user.email,
        isAdmin: user.isAdmin,
        id: user.id,
      };
      this.dialogEditUser = true;
    },

    saveEditUser(user) {
      this.modalLoading = true;

      this.UserService.updateUser(user)
        .then((res) => {
          if (res.data.statusCode === 200) {
            this.snackbar = true;
            this.snackBarText = `Usuário "${user.userName}" editado com sucesso`;
            this.snackbarColor = "success";
            this.dialogEditUser = false;
            this.getUsers();
          } else {
            this.snackbar = true;
            this.snackBarText = `Erro ao editar usuário "${user.userName}" `;
            this.snackbarColor = "error";
          }
        })
        .catch((error) => {
          console.log(error);
          this.snackbar = true;
          this.snackBarText = `Erro ao editar usuário "${user.userName}"`;
          this.snackbarColor = "error";
        })
        .finally((this.modalLoading = false));
    },

    setDeleteUser(user) {
      this.userData = {
        userName: user.userName,
        email: user.email,
        isAdmin: user.isAdmin,
        id: user.id,
      };
      this.dialogDeleteUser = true;
    },

    async deleteUser(user) {
      this.modalLoading = true;

      // this.UserService.deleteUser({id:user.id}).then((res) => {
      //   console.log(res);
      //   if (res.data.statusCode === 200) {
      //     this.snackbar = true;
      //     this.snackBarText = `Usuário "${user.userName}" excluído com sucesso`;
      //     this.snackbarColor = "success";
      //     this.dialogDeleteUser = false;
      //     this.getUsers();
      //   } else {
      //     this.snackbar = true;
      //     this.snackBarText = `Erro ao excluir usuário "${user.userName}" `;
      //     this.snackbarColor = "error";
      //   }
      // }).catch((error) => {
      //   console.log(error);
      //     this.snackbar = true;
      //     this.snackBarText = `Erro ao excluir usuário "${user.userName}" `;
      //     this.snackbarColor = "error";
      // }).finally(this.modalLoading = false)

      try {
        const res = await axios.delete("http://localhost:3001/deleteUser", {
          data: { id: user.id },
        });

        console.log(res);

        if (res.status === 200) {
          this.snackbar = true;
          this.snackBarText = `Usuário "${user.userName}" excluído com sucesso`;
          this.snackbarColor = "success";
          this.dialogDeleteUser = false;
          await this.getUsers();
        } else {
          this.snackbar = true;
          this.snackBarText = `Erro ao excluir usuário "${user.userName}" `;
          this.snackbarColor = "error";
        }
      } catch (error) {
        console.error(error);
        this.snackbar = true;
        this.snackBarText = `Erro ao excluir usuário "${user.userName}"`;
        this.snackbarColor = "error";
      } finally {
        this.modalLoading = false;
      }
    },
  },

  filters: {},

  mounted() {
    this.$emit("listUserBreadcrumbs");
    this.getUsers();
  },
};
</script>