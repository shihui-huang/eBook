<template>
  <div class="ebook">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
  </div>
</template>

<script>
import ebookReader from '../../components/ebook/EbookReader'
import ebookTitle from '../../components/ebook/EbookTitle'
export default {
  components: {
    ebookReader,
    ebookTitle
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/styles/global.scss';
</style>
