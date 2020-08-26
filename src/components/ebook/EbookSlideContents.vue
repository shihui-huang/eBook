<template>
  <div class="slide-wrapper">
    <div class="search-wrapper">
      <div class="input-wrapper">
        <div class="icon">
          <span class="icon-search"></span>
  </div>
        <input
          class="input"
          type="text"
          :placeholder="$t('book.searchHint')"
          @click="showSearchPage()"
        />
      </div>
      <div class="cancel" v-if="searchVisible" @click="hideSearchPage()">
        {{ $t('book.cancel') }}
      </div>
    </div>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
export default {
  mixins: [ebookMixin],
  data() {
    return {
      searchVisible: false
    }
  },
  methods: {
    showSearchPage() {
      this.searchVisible = true
    },
    hideSearchPage() {
      this.searchVisible = false
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/styles/global.scss';
.slide-wrapper {
  width: 100%;
  .search-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(36);
    margin: px2rem(20) 0 px2rem(10) 0;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .input-wrapper {
      flex: 1;
      @include center;
      border: solid px2rem(0.5) rgb(92, 92, 92);
      .icon {
        flex: 0 0 px2rem(28);
        font-size: px2rem(16);
        @include center;
        margin-right: px2rem(10);
      }
      .input {
        flex: 1;
        width: 100%;
        height: px2rem(32);
        font-size: px2rem(14);
        background: transparent;
        border: none;
        &:focus {
          outline: none;
        }
      }
    }
    .cancel {
      flex: 0 0 px2rem(50);
      font-size: px2rem(14);
      @include right;
    }
  }
</style>
