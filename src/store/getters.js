const book = {
  fileName: (state) => state.book.fileName,
  menuVisible: (state) => state.book.menuVisible,
  settingVisible: (state) => state.book.settingVisible,
  defaultFontSize: (state) => state.book.defaultFontSize,
  defaultFontFamily: (state) => state.book.defaultFontFamily,
  fontFamilyVisible: (state) => state.book.fontFamilyVisible,
  defaultTheme: (state) => state.book.defaultTheme,
}
export default book
