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
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
})
</script>
<style scoped>
@import './assets/styles/global.scss';
.text {
  font-family: 'Days one';
  font-size: px2rem(20);
}
</style>
