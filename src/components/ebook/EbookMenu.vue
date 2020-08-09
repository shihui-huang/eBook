<template>
  <transition name="slide-up">
    <div
      class="menu-wrapper"
      :class="{ 'hide-box-shadow': !menuVisible }"
      v-show="menuVisible"
    >
      <div class="icon-wrapper">
        <span class="icon-menu" @click="showSetting(3)"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-progress" @click="showSetting(3)"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-bright" @click="showSetting(3)"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-a" @click="showSetting(3)">A</span>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
export default {
  mixins: [ebookMixin],
  method: {
    showSetting() {}
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/styles/global.scss';

.menu-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 101;
  display: flex;
  width: 100%;
  height: px2rem(48);
  background: white;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  .icon-wrapper {
    flex: 1;
    @include center;
    .icon-progress {
      font-size: px2rem(24);
    }
    .icon-menu {
      font-size: px2rem(24);
    }
    .icon-bright {
      font-size: px2rem(23);
    }
    .icon-a {
      font-size: px2rem(24);
    }
  }
}
</style>
