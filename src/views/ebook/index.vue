<template>
  <div class="ebook">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
  </div>
</template>

<script>
import ebookReader from '../../components/ebook/EbookReader'
import ebookTitle from '../../components/ebook/EbookTitle'
import ebookMenu from '../../components/ebook/EbookMenu'
export default {
  components: {
    ebookReader,
    ebookTitle,
    ebookMenu
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/styles/global.scss';
</style>
