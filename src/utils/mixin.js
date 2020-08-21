import { mapGetters, mapActions } from 'vuex'
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
      'currentBook',
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
      'setCurrentBook',
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
    }
  }
}
