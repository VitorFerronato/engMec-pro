<template>
  <div class="mt-4">
    <h2 class="mb-4">Inputs</h2>
    <p>
      Para colocar um input na tela utilize a tag v-text-field e utilize
      "v-model" para atribui uma variavel a ele.
    </p>
    <p>
      <span class="font-weight-bold">Documentação: </span
      ><a
        target="_blank"
        href="https://v2.vuetifyjs.com/en/components/text-fields/"
        >https://v2.vuetifyjs.com/en/components/text-fields/</a
      >
    </p>
    <v-row class="mt-4">
      <v-col cols="12" md="2">
        <label>Input 1</label>
        <v-text-field v-model="input1" outlined dense> </v-text-field>
      </v-col>

      <v-col cols="12" md="2">
        <label>Input 2</label>
        <v-text-field v-model="input2" outlined dense> </v-text-field>
      </v-col>

      <v-col cols="12" md="2">
        <label>Input 3</label>
        <v-text-field v-model="input3" outlined dense> </v-text-field>
      </v-col>

      <v-col cols="12" md="2">
        <label>Input 4</label>
        <v-text-field v-model="input4" outlined dense> </v-text-field>
      </v-col>
    </v-row>

    <v-tooltip right>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="calculateData"
          color="primary"
          v-bind="attrs"
          v-on="on"
          class="mr-4"
          >Calcular</v-btn
        >
      </template>
      <span>Esse botão ativa a função de calculateData</span>
    </v-tooltip>

    <span>O valor do calculo dos inputs é: {{ total }}</span>
  </div>
</template>

<script>
export default {
  name: "input-view",
  data() {
    return {
      // Defina todas as váriaveis que você for usar nos inputs aqui
      input1: null,
      input2: null,
      input3: null,
      input4: null,
      total: null,
    };
  },

  methods: {
    calculateData() {
      // Sempre quando você for se referir a uma variavel que voce declarou precisa colocar o "this."" na frente

      //Transformando os valores em numero com a função parseFloat(), porque inicialmente eles são string, então se eu somasse "5" + "5" ele apareceria 55 e não 10
      this.total =
        parseFloat(this.input1) +
        parseFloat(this.input2) -
        parseFloat(this.input3) -
        parseFloat(this.input4);
    },
  },
};
</script>

<style>
</style>