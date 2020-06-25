<template>
  <div class="home">
    <section id="home-empty-space">
      <img src="../assets/empty.svg" alt="Empty" class="empty-image">
      <h2 class="text-custom-primary">Ouch, look so spacious here </h2>
      <button class="btn px-3 mt-3 btn-custom-primary">Start First Quiz</button>
    </section>
  </div>
</template>

<script>

export default {
  name: 'Home',
}

</script>

<style scoped>

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
