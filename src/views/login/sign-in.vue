<template>
  <div id="login">
    <div>
      <h2 class="brand">ENGMEC <span class="brand-destaq">PRO</span></h2>
    </div>
    <div class="form">
      <v-row class="mb-4" no-gutters>
        <v-col>
          <v-text-field
            v-model="email"
            :disabled="isLoading"
            hide-details
            color="#f3663b"
            placeholder="Seu email"
            outlined
            dense
            single-line
            class="form-input"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-text-field
            v-model="password"
            :disabled="isLoading"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            placeholder="Sua senha"
            hide-details
            outlined
            dense
            class="form-input"
            color="#f3663b"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-6">
        <v-col>
          <v-btn :loading="isLoading" @click="login">Entrar</v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default {
  name: "sign-in",
  data() {
    return {
      email: "",
      password: "",
      show1: false,
      isLoading: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  methods: {
    login() {
      createUserWithEmailAndPassword(getAuth(), this.email, this.password)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log('errro',error);
        });
    },
  },
};
</script>

<style scoped>
#login {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #12192c;
}

.form {
  border-left: 1px solid #f3663b;
  padding-left: 5rem;
}

.brand {
  margin-right: 5rem;
  font-size: 42px;
  color: #fff;
}

.brand-destaq {
  color: #f3663b;
}

.form-input {
  background-color: #f5f5f5 !important;
}
</style>