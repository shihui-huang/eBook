<template>
  <div class="ebook">
    <ebook-reader></ebook-reader>
  </div>
</template>

<script>
import ebookReader from '../../components/ebook/EbookReader'
export default {
  components: {
    ebookReader,
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/styles/global.scss';
</style>
