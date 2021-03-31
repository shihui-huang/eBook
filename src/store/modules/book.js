const book = {
  state: {
    fileName: '',
    menuVisible: false,
    settingVisible: '',
    defaultFontSize: 16,
    defaultFontFamily: 'Default',
    fontFamilyVisible: false,
    defaultTheme: 'Default',
    bookAvailable: false,
    progress: 0,
    chapter: 0,
    currentBook: null,
    contentList: null,
    cover: null,
    metadata: null,
  },
  mutations: {
    SET_FILENAME: (state, fileName) => {
      state.fileName = fileName
    },
    SET_MENU_VISIBLE: (state, menuVisible) => {
      state.menuVisible = menuVisible
    },
    SET_SETTING_VISIBLE: (state, settingVisible) => {
      state.settingVisible = settingVisible
    },
    SET_DEFAULT_FONT_SIZE: (state, defaultFontSize) => {
      state.defaultFontSize = defaultFontSize
    },
    SET_DEFAULT_FONT_FAMILY: (state, font) => {
      state.defaultFontFamily = font
    },
    SET_FONT_FAMILY_VISIBLE: (state, visible) => {
      state.fontFamilyVisible = visible
    },
    SET_DEFAULT_THEME: (state, theme) => {
      state.defaultTheme = theme
    },
    SET_BOOK_AVAILABLE: (state, bookAvailable) => {
      state.bookAvailable = bookAvailable
    },
    SET_PROGRESS: (state, progress) => {
      state.progress = progress
    },
    SET_CHAPTER: (state, chapter) => {
      state.chapter = chapter
    },
    SET_CURRENT_BOOK: (state, currentBook) => {
      state.currentBook = currentBook
    },
    SET_CONTENT_LIST: (state, contentList) => {
      state.contentList = contentList
    },
    SET_COVER: (state, cover) => {
      state.cover = cover
    },
    SET_METADATA: (state, metadata) => {
      state.metadata = metadata
    },
  }
}

export default book
