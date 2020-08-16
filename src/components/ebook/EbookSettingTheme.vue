<template>
  <transition name="slide-up">
    <div
      class="setting-wrapper"
      v-show="menuVisible && settingVisible === 'bright'"
    >
      <div class="setting-theme">
        <div
          class="setting-theme-item"
          v-for="(item, index) in themeList"
          :key="index"
          @click="setTheme(index)"
        >
          <div
            class="preview"
            :class="{ selected: item.name === defaultTheme }"
            :style="{ background: item.style.body.background }"
          ></div>
          <div class="text" :class="{ selected: item.name === defaultTheme }">
            {{ item.theme }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin, initGlobalStyle } from '../../utils/mixin.js'
import { themeList } from '../../utils/book'
import { saveTheme, getTheme } from '../../utils/localStorage'
export default {
  mixins: [ebookMixin],
  computed: {
    themeList() {
      return themeList(this)
    }
  },
  methods: {
    setTheme(index) {
      const theme = this.themeList[index]
      this.setDefaultTheme(theme.name).then(() => {
        saveTheme(theme.name)
        this.currentBook.rendition.themes.select(this.defaultTheme)
        initGlobalStyle(this.defaultTheme)
      })
    }
  },
  mounted() {
    const theme = getTheme()
    console.log(theme)
    if (!theme) {
      saveTheme('Default')
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/styles/global';

.setting-wrapper {
  position: absolute;
  bottom: px2rem(48);
  left: 0;
  z-index: 150;
  width: 100%;
  height: px2rem(90);
  background: white;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  .setting-theme {
    height: 100%;
    display: flex;
    .setting-theme-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: px2rem(5);
      .preview {
        flex: 1;
        border: px2rem(1) solid #ccc;
        &.selected {
          box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, 0.1);
          border: px2rem(2) solid #5e6369;
        }
      }
      .text {
        flex: 0 0 px2rem(20);
        font-size: px2rem(14);
        @include center;
        color: gray;
        &.selected {
          color: black;
        }
      }
    }
  }
}
</style>
