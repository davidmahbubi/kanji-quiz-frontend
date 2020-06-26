<template>
  <div id="app" :class="{'margin-left-navbar': isAuthenticated}">
    <topbar>
      <topbar-sidebar-toggler @clicked="toggleSidebar" />
      <template slot="right-side">
        <topbar-profile-info/>
      </template>
    </topbar>
      <div class="sidebar-overlay position-fixed" :class="{'active': !sidebarCollapse}" @click="toggleSidebar"></div>
      <sidebar @logout-clicked="logout" v-if="isAuthenticated" :sidebarCollapse="sidebarCollapse"/>
      <transition name="fade" mode="out-in">
        <router-view class="main-router-view px-md-5 px-3" :class="{'general-margin-y': isAuthenticated}" />
      </transition>
  </div>
</template>

<script>

  import { USER_LOGOUT } from '@/store/actions.type';

  import Topbar from '@/components/Topbar.vue'
  import Sidebar from '@/components/Sidebar.vue';
  import TopbarProfileInfo from '@/components/TopbarProfileInfo.vue';
  import TopbarSidebarToggler from '@/components/TopbarSidebarToggler.vue';

  export default {

    data() {
      return {
        sidebarCollapse: false,
      }
    },

    mounted() {
      this.switchToggledSidebar();
      window.addEventListener('resize', () => {
        this.switchToggledSidebar();
      });
    },

    methods: {
      
      logout() {
        if (this.$store.dispatch(`auth/${USER_LOGOUT}`)) {
          this.$router.push({ name: 'AuthLogin' });
        }
      },

      switchToggledSidebar() {
        if (window.innerWidth <= 965) {
          this.sidebarCollapse = true;
        }
      },

      toggleSidebar() {
        this.sidebarCollapse = !this.sidebarCollapse;
      },

    },

    computed: {

      isAuthenticated() {
        return !!this.$store.getters['auth/getToken'];
      },

    },

    components: { Topbar, Sidebar, TopbarProfileInfo, TopbarSidebarToggler}

  }
</script>

<style src="@/assets/css/global.css"></style>

<style scoped>

  .general-margin-y {
    margin-top: 90px;
  }

  .sidebar-overlay {
    display: none;
    z-index: 99;
    top: 0; right: 0; bottom: 0; left: 0;
    background-color: rgba(0,0,0,.3);
  }

  .main-router-view {
    height: 100vh;
    overflow: auto;
    margin-top: 130px;
  }

  .margin-left-navbar {
    margin-left: 320px;
  }

  @media(max-width: 926px) {

    .margin-left-navbar {
      margin-left: 0px;
    }

    .sidebar-overlay.active {
      display: block;
    }

  }
  
</style>