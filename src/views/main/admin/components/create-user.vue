<template>
  <v-card flat class="pa-4">
    <v-row no-gutters align="center" class="mt-6">
      <v-col class="mr-5">
        <label>Nome de usuário</label>
        <v-text-field
          v-model="userName"
          outlined
          dense
          color="#f3663b"
        >
        </v-text-field>
      </v-col>
      <v-col class="mr-5">
        <label>Email</label>

        <v-text-field
          v-model="email"
          outlined
          dense
          color="#f3663b"
        >
        </v-text-field>
      </v-col>
      <v-col>
        <label>Permissão</label>
        <v-select
          v-model="role"
          dense
          outlined
          :items="roles"
          color="#f3663b"
        ></v-select>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-spacer></v-spacer>
      <v-btn @click="dialogAdminPassword = true" outlined dense color="#f3663b">
        Criar usuário
      </v-btn>
    </v-row>

    <v-dialog max-width="500px" v-model="dialogAdminPassword" persistent>
      <v-card :disabled="modalLoading" class="pa-4">
        <h3 class="mb-4">SENHA DE ADMIN</h3>

        <v-divider></v-divider>

        <div class="mt-6">
          <label>Sua senha de administrador</label>

          <v-col class="ma-0 pa-0" cols="12" md="5">
            <v-text-field
              v-model="password"
              :disabled="modalLoading"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              hide-details
              outlined
              dense
              color="#f3663b"
            ></v-text-field>
          </v-col>
        </div>

        <v-card-actions class="pa-0 mt-6">
          <v-spacer></v-spacer>
          <v-btn
            @click="dialogAdminPassword = false"
            :disabled="modalLoading"
            outlined
            color="#f3663b"
          >
            Cancelar
          </v-btn>
          <v-btn
            @click="createUser"
            :loading="modalLoading"
            color="#f3663b"
            class="white--text"
          >
            Criar
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

export default {
  name: "create-user",
  props: ["userLogged"],
  data() {
    return {
      UserService: new UserService(),
      modalLoading: false,

      userName: null,
      email: null,
      role: null,
      password: null,

      dialogAdminPassword: false,
      show1: false,

      snackbar: false,
      snackbarColor: "",
      snackBarText: "",

      roles: [
        {
          text: "Admin",
          value: true,
        },
        {
          text: "Usuário",
          value: false,
        },
      ],

      rules: {
        required: (value) => !!value || "Obrigatório.",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Email inválido";
        },
      },
    };
  },

  methods: {
    createUser() {
      this.modalLoading = true;
      if (this.password == this.userLogged.password) {
        let data = {
          userName: this.userName,
          email: this.email,
          isAdmin: this.role,
        };
        data.password = this.generateString();

        this.UserService.createUser(data)
          .then((res) => {
            console.log(res);
            if (res.data.statusCode == 200) {
              this.snackbar = true;
              this.snackBarText = `Usuário "${this.userName}" criado com sucesso`;
              this.snackbarColor = "success";
              this.dialogAdminPassword = false;

              (this.userName = null),
                (this.email = null),
                (this.role = null),
                (this.password = null);
            } else {
              this.snackbar = true;
              this.snackBarText = `${res.data.msg} `;
              this.snackbarColor = "error";
            }
          })
          .catch((error) => {
            console.log(error);
            this.snackbar = true;
            this.snackBarText = `Erro ao criar usuário "${this.userName}" `;
            this.snackbarColor = "error";
          })
          .finally((this.modalLoading = false));
      } else {
        this.snackbar = true;
        this.snackBarText = `Senha inválida `;
        this.snackbarColor = "error";

        this.modalLoading = false;
      }
    },

    generateString() {
      const characters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let result = "";
      for (let i = 0; i < 10; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    },
  },

  mounted(){
    this.$emit('createUserBreadcrumbs')
  }
};
</script>