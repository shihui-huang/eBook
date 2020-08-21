<template>
  <transition name="fade">
    <div
      class="slide-content-wrapper"
      v-show="menuVisible && settingVisible === 'menu'"
    >
      <transition name="menu-slide-right">
        <div class="content">
          <div class="content-page-wrapper">
            <div class="content-page">
              <div class="content-page-tab"></div>
            </div>
          </div>
        </div>
      </transition>
      <div class="background" @click="hide()"></div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
export default {
  mixins: [ebookMixin],
  methods: {
    hide() {
      this.setMenuVisible(false)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/styles/global.scss';
.slide-content-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  z-index: 300;
  width: 100%;
  height: 100%;
  .content {
    flex: 0 0 85%;
    width: 85%;
    height: 100%;
    .content-page-wrapper {
      .content-page {
      }
    }
  }
  .background {
    flex: 0 0 15%;
    width: 15%;
    height: 100%;
  }
}
</style>
