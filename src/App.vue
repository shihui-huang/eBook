<template>
  <div id="app">
    <div id="nav">
      <span class="text">TEST</span>
      <!-- <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view />
  </div>
</template>
<script>
}

#nav {
  padding: 30px;
}
<style scoped>
@import './assets/styles/global.scss';
.text {
  font-family: 'Days one';
  font-size: px2rem(20);
}
</style>
