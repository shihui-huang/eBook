import Vue from 'vue'
import VueI18N from 'vue-i18n'
import en from './en'
import cn from './cn'
import { getLocaleLanguage, saveLocaleLanguage } from '../utils/localStorage'

Vue.use(VueI18N)

const messages = {
  en,
  cn
}
let localeLanguage = getLocaleLanguage()
if (!localeLanguage) {
  localeLanguage = 'en'
  saveLocaleLanguage(localeLanguage)
}
const i18n = new VueI18N({
  localeLanguage,
  messages
})

export default i18n
