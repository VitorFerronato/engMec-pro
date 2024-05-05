<template>
  <v-card  min-width="400px" class="pa-4">
    <h3>Informações do usuário</h3>
    <label>UserName</label>
    <v-text-field
      outlined
      dense
      hide-details
      append-outer-icon="mdi-pencil-box"
    ></v-text-field>
    <label>Email</label>
    <v-text-field
      outlined
      dense
      hide-details
      append-outer-icon="mdi-pencil-box"
    ></v-text-field>
  </v-card>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>