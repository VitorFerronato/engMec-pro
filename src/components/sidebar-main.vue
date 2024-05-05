<template>
  <div
    class="l-navbar"
    :class="sidebarOpen ? 'expanded' : 'closed'"
    id="l-navbar"
  >
    <!-- Toggle menu -->
    <ion-icon
      @click="openSidebar"
      name="arrow-forward-circle-outline"
      class="toggle__menu"
      id="toggle__menu"
    ></ion-icon>

    <nav class="nav" id="navbar">
      <div>
        <div class="nav__list" id="nav-list">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="nav__link-box"
          >
            <div @click="openDropDown(item)" class="nav__link">
              <ion-icon :name="item.icon" class="nav__icon"></ion-icon>
              <span class="nav__name">{{ item.title }}</span>
              <ion-icon
                name="chevron-down-outline"
                class="dropdown__icon"
                :class="item.dropDownOpen ? 'rotateIcon' : ''"
              ></ion-icon>
            </div>

            <div
              class="dropdown__box"
              :class="item.dropDownOpen ? 'dropdown-open' : ''"
            >
              <ul
                v-for="(link, index) in item.links"
                :key="index"
                class="dropdown"
              >
                <router-link :to="link.to">
                  <li @click="openSidebar" class="dropdown__link">
                    {{ link.linkName }}
                  </li>
                </router-link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      sidebarOpen: false,
      items: [
        {
          title: "Modelos",
          icon: "tablet-landscape-outline",
          dropDownOpen: false,
          links: [
            {
              linkName: "Inputs",
              to: "/main/modelos/inputs",
            },
          ],
        },
        {
          title: "Cálculos",
          icon: "calculator-outline",
          dropDownOpen: false,
          links: [
            {
              linkName: "Projetos",
              to: "/main/projects",
            },
            {
              linkName: "Normas",
              to: "/main/norms",
            },
            {
              linkName: "Definições de área",
              to: "/main/definitions",
            },
          ],
        },
        {
          title: "Sistemas",
          icon: "terminal-outline",
          dropDownOpen: false,
          links: [
            {
              linkName: "Projetos",
              to: "/main/projects",
            },
            {
              linkName: "Normas",
              to: "/main/norms",
            },
            {
              linkName: "Definições de área",
              to: "/main/definitions",
            },
          ],
        },
        {
          title: "Procedimentos",
          icon: "file-tray-stacked-outline",
          dropDownOpen: false,
          links: [
            {
              linkName: "Projetos",
              to: "/main/projects",
            },
            {
              linkName: "Normas",
              to: "/main/norms",
            },
            {
              linkName: "Definições de área",
              to: "/main/definitions",
            },
          ],
        },
        {
          title: "Tabelas",
          icon: "documents-outline",
          dropDownOpen: false,
          links: [
            {
              linkName: "Projetos",
              to: "/main/projects",
            },
            {
              linkName: "Normas",
              to: "/main/norms",
            },
            {
              linkName: "Definições de área",
              to: "/main/definitions",
            },
          ],
        },
        {
          title: "Normas",
          icon: "hammer-outline",
          dropDownOpen: false,
          links: [
            {
              linkName: "Projetos",
              to: "/main/projects",
            },
            {
              linkName: "Normas",
              to: "/main/norms",
            },
            {
              linkName: "Definições de área",
              to: "/main/definitions",
            },
          ],
        },
        {
          title: "Catálogos",
          icon: "newspaper-outline",
          dropDownOpen: false,
          links: [
            {
              linkName: "Projetos",
              to: "/main/projects",
            },
            {
              linkName: "Normas",
              to: "/main/norms",
            },
            {
              linkName: "Definições de área",
              to: "/main/definitions",
            },
          ],
        },
        {
          title: "Definições Laércio",
          icon: "person-circle-outline",
          dropDownOpen: false,
          links: [
            {
              linkName: "Projetos",
              to: "/main/projects",
            },
            {
              linkName: "Normas",
              to: "/main/norms",
            },
            {
              linkName: "Definições de área",
              to: "/main/definitions",
            },
          ],
        },
        {
          title: "Técnicas de modelagem",
          icon: "brush-outline",
          dropDownOpen: false,
          links: [
            {
              linkName: "Projetos",
              to: "/main/projects",
            },
            {
              linkName: "Normas",
              to: "/main/norms",
            },
            {
              linkName: "Definições de área",
              to: "/main/definitions",
            },
          ],
        },
        {
          title: "Sistema",
          icon: "settings-outline",
          dropDownOpen: false,
          links: [
            {
              linkName: "Projetos",
              to: "/main/projects",
            },
            {
              linkName: "Normas",
              to: "/main/norms",
            },
            {
              linkName: "Definições de área",
              to: "/main/definitions",
            },
          ],
        },
      ],
    };
  },

  methods: {
    openSidebar() {
      if (this.sidebarOpen == false) {
        this.sidebarOpen = true;
        this.$emit("openSidebar");
      } else {
        this.sidebarOpen = false;
        this.items.forEach((el) => {
          el.dropDownOpen = false;
        });
        this.$emit("closeSidebar");
      }
    },

    openDropDown(item) {
      if (item.dropDownOpen == false && this.sidebarOpen == true) {
        item.dropDownOpen = true;
      } else if (item.dropDownOpen == false) {
        this.sidebarOpen = true;
        this.$emit("openSidebar");

        setTimeout(() => {
          item.dropDownOpen = true;
        }, 250);
      } else {
        item.dropDownOpen = false;
      }
    },
  },
};
</script>



<style scoped>
.toggle__menu {
  display: flex;
  justify-content: flex-end;
  font-size: 30px;
  margin-left: 15px;

  cursor: pointer;

  color: red;
  transition: 0.4s ease-in;
}

.toggle__menu:hover {
  color: #f3663b;
}

.l-navbar.expanded .toggle__menu {
  margin-left: calc(15rem + 30px);
  transform: rotate(180deg);
  color: red;
  border-radius: 50%;
}

.l-navbar.closed .toggle__menu {
  transition-delay: 0.3s;
}

/* .l-navbar.expanded .toggle__menu:hover {
  color: #12192c;
} */

/*====== l NAVBAR ======*/

.l-navbar {
  position: fixed;
  top: calc(60px);
  left: 0;

  width: 60px;
  height: 100vh;

  background-color: #12192c;
  color: #fff;
  z-index: 100;

  transition: 0.4s ease-in;
}

/*====== NAV ====== */

.nav {
  position: relative;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-x: hidden;
}

.nav .toggle__menu {
  margin-left: 1rem;
}

.nav__link-box {
  display: flex;
  flex-direction: column;
}

.nav__link {
  position: relative;
  display: grid;
  grid-template-columns: max-content max-content max-content;
  column-gap: 1.2rem;
  align-items: center;

  padding: 1rem;
  cursor: pointer;

  color: #fff;
  border-bottom: rgba(107, 106, 106, 0.192);
}

.nav__link:hover {
  background-color: #f3663b;
}

.nav__icon {
  font-size: 1.7rem;
}

.nav__link:hover .nav__icon {
  transform: scale(1.1);
}

.nav__name {
  font-size: 1rem;
  width: 100%;
}

/*=== MENU EXPANDED ===*/

.expanded {
  width: calc(60px + 15rem);
}

.l-navbar.expanded {
  height: 100vh;
  overflow: scroll;
}
.l-navbar.closed {
  transition-delay: 0.3s;
}

.l-navbar.expanded .nav__link:hover {
  border-left: 3px solid #f3663b;
  background-color: rgba(0, 0, 0, 0.24);
}

.l-navbar.expanded .dropdown__icon {
  visibility: visible;
}

/* === DROPDOWN MENU === */

.dropdown__box {
  max-height: 0;
  overflow: hidden;
  position: relative;
  transition: max-height 0.2s ease-in-out;
  background-color: rgba(78, 77, 77, 0.192);
}

.dropdown__link {
  cursor: pointer;
  padding: 0.35rem 4.2rem;
  color: #fff;
}

.dropdown__link {
  color: #fff;
  border-bottom: 1px solid rgba(107, 106, 106, 0.192);
}

.dropdown__link:hover {
  border-left: 3px solid #f3663b;
}

.dropdown__icon {
  position: absolute;
  font-size: 18px;
  right: 0.6rem;
  visibility: hidden;
  transition: 0.5s;
}

/*=== DROPDOWN OPEN ===*/
.dropdown__box.dropdown-open {
  max-height: 200px;
}

/* === ACTIVE LINKS MENU === */

.active {
  background-color: #f3663b;
}

.l-navbar.expanded .active {
  background-color: rgba(0, 0, 0, 0.24);
  border-left: 3px solid #f3663b;
  transition: 0.5s ease-in-out;
}

.nav__link.active:hover {
  background-color: #f3663b;
}

/*=== MAIN =====*/

.padding-menu {
  transition: 0.4s;
  padding-left: calc(60px + 10rem);
}

.rotateIcon {
  transform: rotate(180deg);
  transition: 0.5s;
}

::-webkit-scrollbar {
  display: none;
}
</style>