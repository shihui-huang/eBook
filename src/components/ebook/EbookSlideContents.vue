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
    <div class="book-wrapper">
      <div class="cover">
        <img :src="cover" class="cover-img" />
      </div>
      <div class="book-info-wrapper">
        <div class="book-title">{{ metadata.title }}</div>
        <div class="book-author">{{ metadata.creator }}</div>
      </div>
      <div class="book-progress-wrapper">
        <div class="book-progress">
          <span class="progress">{{ progress + '%' }}</span>
          <span class="progress-text">{{ $t('book.alreadyReadTime') }}</span>
        </div>
        <div class="book-read-time">{{ getReadTimeText() }}</div>
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
  .book-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(90);
    font-size: px2rem(12);
    padding: px2rem(15) px2rem(20) px2rem(15) px2rem(20);
    box-sizing: border-box;
    border-bottom: px2rem(1) solid #b8b9bb;
    .cover {
      flex: 0 0 px2rem(45);
      .cover-img {
        width: px2rem(45);
        height: px2rem(60);
      }
    }
    .book-info-wrapper {
      box-sizing: border-box;
      flex: 1;
      padding: 0 px2rem(10);
      .book-title {
        font-size: px2rem(14);
        overflow: hidden;
        white-space: normal;
        width: px2rem(153.75);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        white-space: normal;
        text-overflow: ellipsis;
        word-break: keep-all;
        line-height: px2rem(16);
      }
      .book-author {
        margin-top: px2rem(5);
        width: px2rem(153.75);
      }
    }
    .book-progress-wrapper {
      flex: 0 0 px2rem(70);
      .book-progress {
        .progress {
        }
        .progress-text {
        }
      }
      .book-read-time {
      }
    }
  }
}
</style>
