<template>
  <v-app>
    <header-main
      v-if="
        this.$route.path.startsWith('/main') ||
        this.$route.path.startsWith('/admin') ||
         this.$route.path.startsWith('/user')
      "
    />

    <sidebar-main v-if="this.$route.path.startsWith('/main')" />

    <v-main>
      <router-view></router-view>
    </v-main> 
  </v-app>
</template>

<script>
import headerMain from "./components/header-main.vue";
import SidebarMain from "./components/sidebar-main.vue";
export default {
  components: { headerMain, SidebarMain },
  name: "App",

  data() {
    return {};
  },

  mounted() {
    console.log(process.env.NODE_ENV);
  },
};
</script>

<style>
/* .hasPadding {
  margin-left: calc(60px + 15rem);
  transition: 0.7s;
}

.notPadding {
  margin-left: 95px;
  transition: 1.5s;
} */

*,
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}

.v-application ul {
  padding: 0 !important;
}

label{
  font-weight: 500;
}

.v-input--selection-controls{
  margin-top: 0px !important;
}
</style>
