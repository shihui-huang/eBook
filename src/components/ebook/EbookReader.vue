<template>
  <div class="ebook-reader">
    <div id="read"></div>
    <!-- Click to switch pages -->
    <!-- <div class="mask">
      <div class="left" @touchstart="prevPage"></div>
      <div class="center" @click="showTitleAndMenu"></div>
      <div class="right" @click="nextPage"></div>
    </div> -->
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import { themeList } from '../../utils/book'
import Epub from 'epubjs'
import {
  getFontFamily,
  saveFontFamily,
  getFontSize,
  saveFontSize,
  getTheme,
  saveTheme
} from '../../utils/localStorage'
global.ePub = Epub
export default {
  mixins: [ebookMixin],
  methods: {
    onProgressChange(progress) {
      const precentage = progress / 100
      const location =
        precentage > 0 ? this.locations.cfiFromProventage(precentage) : 0
      this.rendition.display(location)
    },
    initEpub() {
      const url =
        `${process.env.VUE_APP_RES_URL}/epub/` + this.fileName + '.epub'
      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      console.log(this.book)
      this.initRendition()
      this.initGesture()
      this.book.ready
        .then(() => {
          return this.book.locations.generate(
            750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16)
          )
        })
        .then(() => {
          this.setBookAvailable(true)
        })
    },
    initFontSize() {
      const fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        saveFontSize(this.fileName, fontSize)
      } else {
        this.rendition.themes.fontSize(fontSize)
        this.setDefaultFontSize(fontSize)
      }
    },
    initFontFamily() {
      const font = getFontFamily(this.fileName)

      if (!font) {
        saveFontFamily(this.fileName, font)
      } else {
        this.rendition.themes.font(font)
        this.setDefaultFontFamily(font)
      }
    },
    initTheme() {
      themeList(this).forEach((theme) => {
        this.rendition.themes.register(theme.name, theme.style)
      })
      const theme = getTheme()
      if (!theme) {
        saveTheme(this.defaultTheme)
      } else {
        this.setDefaultTheme(theme)
      }
      this.rendition.themes.select(this.defaultTheme)
    },
    initRendition() {
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        methods: 'default',
        flow: 'paginated',
        manager: 'continuous',
        snap: true
      })
      this.rendition.display().then(() => {
        this.initTheme()
        this.initFontSize()
        this.initFontFamily()
        this.initGlobalStyle()
      })
      this.rendition.hooks.content.register((content) => {
        content.addStylesheet(
          `${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`
        )
        content.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`)
        content.addStylesheet(
          `${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`
        )
        content.addStylesheet(
          `${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`
        )
      })
    },
    initGesture() {
      // Slide to switch pages
      this.rendition.on('touchstart', (event) => {
        console.log(event)
        // 获取一只手指点击屏幕的x轴位置
        // Get the x-axis position of one finger on the screen
        this.touchStartX = event.changedTouches[0].clientX
        // 获取手指点击时间来判断是否是手指长按屏幕事件
        // Get the finger tap time to determine whether it is a long finger press event
        this.touchStartTime = event.timeStamp
      })
      this.rendition.on('touchend', (event) => {
        // 离开屏幕时获得x轴的偏移量
        // Get the x-axis offset when leaving the screen
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        // 手指滑动的时间
        // Finger sliding time
        const time = event.timeStamp - this.touchStartTime
        // 判断滑动方向和方式
        // Determine the direction and method of sliding
        // 如果滑动时间小于500毫秒，偏移量大于40时我们进入上一页
        // if sliding time is less than 500 milliseconds, and the offet is greater than 40, we return to previous page
        if (time < 500 && offsetX > 40) {
          this.prevPage()
        } else if (time < 500 && offsetX < -40) {
          // 切换到下一页
          // switch to next page
          this.nextPage()
        } else {
          // 显示标题和菜单栏
          // Show title and menu bar
          this.showTitleAndMenu()
        }
        // 禁止默认事件和方法调用
        // Disallow default events and method calls
        event.preventDefault()
        event.stopPropagation()
      })
    },
    prevPage(event) {
      if (this.rendition) {
        this.rendition.prev()
        // this.$store.dispatch('setMenuVisible', false)
        this.setMenuVisible(false)
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next()
        // this.$store.dispatch('setMenuVisible', false)
        this.setMenuVisible(false)
      }
    },
    showTitleAndMenu() {
      // this.$store.dispatch('setMenuVisible', !this.menuVisible)
      this.setMenuVisible(!this.menuVisible)
      this.setSettingVisible('')
      this.setFontFamilyVisible(false)
    }
  },
  mounted() {
    const baseUrl = `${process.env.VUE_APP_RES_URL}/epub/`
    const fileName = this.$route.params.fileName.split('|').join('/')
    // this.$store.dispatch('setFileName', fileName).then(() => {
    // this.initEpub()
    // })
    this.setFileName(fileName).then(() => {
      this.initEpub()
    })
    console.log(`${baseUrl}${fileName}.epub`)
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/styles/global.scss';
.ebook-reader {
  position: relative;
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    width: 100%;
    height: 100%;
    .left {
      flex: 0 0 px2rem(100);
    }
    .center {
      flex: 1;
    }
    .right {
      flex: 0 0 px2rem(100);
    }
  }
}
</style>
