<template>
  <div>
    <transition name="slide-up">
      <div
        class="menu-wrapper"
        :class="{ 'hide-box-shadow': !menuVisible || settingVisible != '' }"
        v-show="menuVisible"
      >
        <div class="icon-wrapper">
          <span class="icon-menu" @click="showSetting('menu')"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress" @click="showSetting('progress')"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright" @click="showSetting('bright')"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-a" @click="showSetting('font')">A</span>
        </div>
      </div>
    </transition>
    <ebook-setting-font></ebook-setting-font>
    <ebook-setting-font-family-popup></ebook-setting-font-family-popup>
    <ebook-setting-theme></ebook-setting-theme>
    <ebook-setting-progress></ebook-setting-progress>
    <ebook-slide></ebook-slide>
  </div>
</template>

<script>
import ebookSettingFontFamilyPopup from './EbookSettingFontFamilyPopup'
import ebookSettingFont from './EbookSettingFont'
import ebookSettingTheme from './EbookSettingTheme'
import ebookSettingProgress from './EbookSettingProgress'
import ebookSlide from './EbookSlide'

import { ebookMixin } from '../../utils/mixin'
export default {
  mixins: [ebookMixin],
  components: {
    ebookSettingFont,
    ebookSettingFontFamilyPopup,
    ebookSettingTheme,
    ebookSettingProgress,
    ebookSlide
  },
  methods: {
    showSetting(key) {
      this.setSettingVisible(key)
    }
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
  &.hide-box-shadow {
    box-shadow: none;
  }
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
