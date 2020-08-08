<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import Epub from 'epubjs'
import { mapGetters } from 'vuex'
global.ePub = Epub
export default {
  computed: {
    ...mapGetters(['fileName'])
  },
  methods: {
    initEpub() {
      const url = 'http://localhost:8081/epub/' + this.fileName + '.epub'
      this.book = new Epub(url)
      console.log(this.book)
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        methods: 'default',
        flow: 'paginated',
        manager: 'continuous',
        snap: true
      })
      this.rendition.display()
    },
  mounted() {
    const baseUrl = 'http://localhost:8081/epub/'
    const fileName = this.$route.params.fileName.split('|').join('/')
    this.$store.dispatch('setFileName', fileName).then(() => {
      this.initEpub()
    })
    console.log(`${baseUrl}${fileName}.epub`)
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/styles/global.scss';
</style>
