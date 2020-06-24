<template>
  <div id="app">
    <button v-if="isAuthenticated" class="btn btn-custom-primary px-4 float-right my-2 mx-4" @click="logout">Logout</button>
    <Animated enter="bounceIn" leave="bounceOut" duration="750" :mode="'out-in'">
      <router-view/>
    </Animated>
  </div>
</template>

<script>

import { USER_LOGOUT } from '@/store/actions.type';

export default {

  methods: {
    logout() {
      if (this.$store.dispatch(`auth/${USER_LOGOUT}`)) {
        this.$router.push({name: 'AuthLogin'});
      }
    }
  },

  computed: {
    isAuthenticated() {
      return !!this.$store.getters['auth/getToken'];
    }
  },

}

</script>

<style src="@/assets/css/global.css"></style>
