<template>
  <div id="app" :class="{'margin-left-navbar': isAuthenticated}">
    <topbar v-if="isAuthenticated">
      <topbar-sidebar-toggler @clicked="toggleSidebar" />
      <template slot="right-side">
        <topbar-profile-info/>
      </template>
    </topbar>
      <div class="sidebar-overlay position-fixed" :class="{'active': !sidebarCollapse}" @click="toggleSidebar" v-if="isAuthenticated"></div>
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
      /** Sidebar should collapse when its <= 965 */
      if (window.innerWidth <= 965) {
          this.sidebarCollapse = true;
      }
    },

    methods: {
      logout() {
        if (this.$store.dispatch(`auth/${USER_LOGOUT}`)) {
          this.$router.push({ name: 'AuthLogin' });
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

    components: { 
      Topbar, 
      Sidebar, 
      TopbarProfileInfo, 
      TopbarSidebarToggler
    },

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