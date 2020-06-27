<template>
  <div class="home">
    <empty-page :img-src="require('../assets/empty.svg')" img-max-width="350px" title="Looks so spacious here">
      <button class="btn px-3 mt-3 btn-custom-primary">Start First Quiz</button>
    </empty-page>
  </div>
</template>

<script>

import EmptyPage from '@/components/EmptyPage.vue';

export default {

  name: 'Home',

  components: {
    EmptyPage,
  },

}

</script>

<style scoped>

.empty-page-component {
    margin-top: 15vh;
}

.home {
  text-align: center;
  padding: 10px 20px;
}

.empty-image {
  margin-top: 50px;
  margin-bottom: 40px;
  width: 100%;
  max-width: 350px;
}

#home-empty-space {
  margin: 10vh 0;
}

</style>
