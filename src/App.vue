<template>
  <div id="app" :class="{'margin-left-navbar': isAuthenticated}">
    <Animated enter="bounceIn" leave="bounceOut" duration="750" :mode="'out-in'">
      <div class="topbar-account-info" v-if="isAuthenticated">
          <div class="row">
            <div class="col-8 pr-3 text-right p-0">
              <h5 class="text-custom-primary topbar-user-name m-0">Miyawaki Sakura</h5>
              <span>120xp</span>
            </div>
            <div class="col-4 p-0 text-left">
              <img src="./assets/miyawaki-sakura.jpg" alt="" class="profile-picture rounded-circle">
            </div>
          </div>
      </div>
    </Animated>
    <Animated enter="bounceIn" leave="bounceOut" duration="750" :mode="'out-in'">
      <sidebar class="sidebar" @logout-clicked="logout" v-if="isAuthenticated"></sidebar>
    </Animated>
    <Animated enter="bounceIn" leave="bounceOut" duration="750" :mode="'out-in'">
      <router-view class="main-router-view" />
    </Animated>
  </div>
</template>

<script>
  import {
    USER_LOGOUT
  } from '@/store/actions.type';
  import Sidebar from '@/components/Sidebar.vue';

  export default {

    methods: {
      logout() {
        if (this.$store.dispatch(`auth/${USER_LOGOUT}`)) {
          this.$router.push({ name: 'AuthLogin' });
        }
      }
    },

    computed: {

      isAuthenticated() {
        return !!this.$store.getters['auth/getToken'];
      },

    },

    components: {
      Sidebar,
    }

  }
</script>

<style src="@/assets/css/global.css"></style>

<style scoped>

  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    width: 320px;
    bottom: 0;
  }

  .topbar-user-name {
    font-size: 17px;
  }

  .profile-picture {
    width: 60px;
    box-shadow: 0 0 10px rgba(146, 13, 255, 0.3);
  }

  .topbar-account-info {
    position: fixed;
    right: 0;
    top: 0;
    text-align: right;
    padding: 15px 25px;
  }

  .topbar-account-info>.row {
    width: 254px;
  }

  .main-router-view {
    height: 100vh;
    overflow: auto;
  }

  .margin-left-navbar {
    margin-left: 320px;
  }

  @media(max-width: 926px) {
    .margin-left-navbar {
      margin-left: 0px;
    } 
  }
  
</style>