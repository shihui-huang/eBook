export const FONT_SIZE_LIST = [
  { fontSize: 12 },
  { fontSize: 14 },
  { fontSize: 16 },
  { fontSize: 18 },
  { fontSize: 20 },
  { fontSize: 22 },
  { fontSize: 24 }
]

export const FONT_FAMILY_LIST = [
  { fontFamily: 'Default' },
  { fontFamily: 'Cabin' },
  { fontFamily: 'Days one' },
  { fontFamily: 'Montserrat' },
  { fontFamily: 'Tangerine' }
]

export function themeList(vue) {
  return [
    {
      theme: vue.$t('book.themeDefault'),
      name: 'Default',
      style: {
        body: {
          color: '#4c5059',
          background: '#ffffff'
        }
      }
    },
    {
      theme: vue.$t('book.themeGold'),
      name: 'Gold',
      style: {
        body: {
          color: '##5c5b56',
          background: '#c6c2b6'
        }
      }
    },
    {
      theme: vue.$t('book.themeProtectEye'),
      name: 'Eye',
      style: {
        body: {
          color: '#404c42',
          background: '#a9c1a9'
        }
      }
    },
    {
      theme: vue.$t('book.themeNight'),
      name: 'Night',
      style: {
        body: {
          color: '#cecece',
          background: '#3f3f3f'
        }
      }
    }
  ]
}
