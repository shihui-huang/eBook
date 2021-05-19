import { mapGetters, mapActions } from 'vuex'
import { addCss, removeAllCss, getReadTimeByMinute } from './book.js'
import { saveLocation } from './localStorage'
export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'chapter',
      'isPaginating',
      'currentBook',
      'contentList',
      'cover',
      'metadata',
      'paginate',
      'pagelist',
      'offsetY',
      'isBookmark'
    ])
  },
  methods: {
    ...mapActions([
      'setMenuVisible',
      'setFileName',
      'setSettingVisible',
      'setDefaultFontSize',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
      'setBookAvailable',
      'setProgress',
      'setChapter',
      'setIsPaginating',
      'setCurrentBook',
      'setContentList',
      'setCover',
      'setMetadata',
      'setPaginate',
      'setPagelist',
      'setOffsetY',
      'setIsBookmark'
    ]),
    initGlobalStyle(defaultTheme) {
      removeAllCss()
      switch (defaultTheme) {
        case 'Default':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
          break
        case 'Eye':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
          break
        case 'Gold':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
          break
        case 'Night':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
          break
        default:
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
      }
    },
    refreshLocation() {
      const currentLocation = this.currentBook.rendition.currentLocation()
      if (currentLocation.start && currentLocation.start.index) {
        const startCfi = currentLocation.start.cfi
        const progress = this.currentBook.locations.percentageFromCfi(startCfi)
        this.setProgress(Math.floor(progress * 100))
        this.setChapter(currentLocation.start.index)
        saveLocation(this.fileName, startCfi)
      }
    },
    displayProgress() {
      const cfi = this.currentBook.locations.cfiFromPercentage(
        this.progress / 100
      )
      // console.log(cfi)
      this.display(cfi)
    },
    displayChapter() {
      const chapterInfo = this.currentBook.section(this.chapter)
      console.log(chapterInfo)
      if (chapterInfo && chapterInfo.href) {
        // console.log(chapterInfo.href)
        this.display(chapterInfo.href)
      }
    },
    display(location, callBackFunction) {
      if (location) {
        return this.currentBook.rendition.display(location).then(() => {
          this.refreshLocation()
          if (callBackFunction) {
            callBackFunction()
          }
        })
      } else {
        // console.log(this.currentBook)
        return this.currentBook.rendition.display().then(() => {
          this.refreshLocation()
          if (callBackFunction) {
            callBackFunction()
          }
        })
      }
    },
    getReadTimeText() {
      return this.$t('book.readTime').replace(
        '$minute',
        getReadTimeByMinute(this.fileName)
      )
    },
    hideMenu() {
      this.setMenuVisible(false)
    }
  }
}
