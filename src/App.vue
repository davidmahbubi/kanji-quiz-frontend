<template>
  <div id="app">
    <Animated enter="bounceIn" leave="bounceOut" duration="750" :mode="'out-in'">
      <router-view/>
    </Animated>
  </div>
</template>

<style src="@/assets/css/global.css"></style>
