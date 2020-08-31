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
          @keyup.enter="search()"
          v-model="searchText"
        />
      </div>
      <div class="cancel" v-if="searchVisible" @click="hideSearchPage()">
        {{ $t('book.cancel') }}
      </div>
    </div>
    <div class="book-wrapper" v-show="!searchVisible">
      <div class="cover">
        <img :src="cover" class="cover-img" />
      </div>
      <div class="book-info-wrapper">
        <div class="book-title">{{ this.title }}</div>
        <div class="book-author">{{ this.creator }}</div>
      </div>
      <div class="book-progress-wrapper">
        <div class="book-progress">
          <span class="progress">{{ progress + '%' }}</span>
          <span class="progress-text">{{ $t('book.alreadyReadTime') }}</span>
        </div>
        <div class="book-read-time">{{ getReadTimeText() }}</div>
      </div>
    </div>
    <scroll
      class="contents-list"
      :top="156"
      :bottom="48"
      ref="scroll"
      v-show="!searchVisible"
    >
      <div
        class="contents-item"
        v-for="(item, index) in contentList"
        :key="index"
      >
        <span
          class="item-label"
          :class="{ selected: chapter === index }"
          :style="contentItemStyle(item)"
          @click="display(item.href, hideMenu())"
          >{{ item.label }}</span
        >
        <span class="item-page"></span>
      </div>
    </scroll>
    <scroll class="search-list" :top="60" :bottom="48" v-show="searchVisible">
      <div
        class="search-item"
        v-for="(item, index) in this.searchList"
        :key="index"
        v-html="item.excerpt"
        @click="display(item.cfi, this.highlight(item.excerpt))"
      >
        >
        {{ item.excerpt }}
      </div>
    </scroll>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import Scroll from '../common/Scroll'
import { px2rem } from '../../utils/utils'
export default {
  mixins: [ebookMixin],
  components: {
    Scroll
  },
  data() {
    return {
      searchVisible: false,
      searchList: {},
      searchText: ''
    }
  },
  computed: {
    title() {
      if (this.metadata) {
        return this.metadata.title
      } else {
        return ''
      }
    },
    creator() {
      if (this.metadata) {
        return this.metadata.creator
      } else {
        return ''
      }
    }
  },
  methods: {
    // https://github.com/futurepress/epub.js/wiki/Tips-and-Tricks-%28v0.3%29
    doSearch(q) {
      return Promise.all(
        this.currentBook.spine.spineItems.map((item) =>
          item
            .load(this.currentBook.load.bind(this.currentBook))
            .then(item.find.bind(item, q))
            .finally(item.unload.bind(item))
        )
      ).then((results) => Promise.resolve([].concat.apply([], results)))
    },
    highlight(target) {
      this.setMenuVisible(false)
      this.currentBook.rendition.annotations.highlight(target)
    },
    search() {
      if (this.searchText && this.searchText.length > 0) {
        console.log(this.searchText)
        this.currentBook.ready.then(() => {
          this.doSearch(this.searchText).then((list) => {
            this.searchList = list
            this.searchList.map((item) => {
              item.excerpt = item.excerpt.replace(
                this.searchText,
                `<span class="content-search-text">${this.searchText}</span>`
              )
              return item
            })
          })
        })
      }
    },
    contentItemStyle(item) {
      // 不同级别的目录缩进
      // indent for different level

      return {
        marginLeft: `${px2rem(item.level * 15)}rem`
      }
    },
    showSearchPage() {
      this.searchVisible = true
    },
    hideSearchPage() {
      this.searchVisible = false
      this.searchText = ''
      this.searchList = null
    }
  },
  mounted() {
    // if (this.currentBook) {
    //   this.currentBook.ready.then(() => {
    //     this.doSearch('tests').then((list) => (this.searchList = list))
    //   })
    // }
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
        @include ellipsis;
        font-size: px2rem(14);
        overflow: hidden;
        white-space: normal;
        width: px2rem(153.75);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;

        word-break: keep-all;
        line-height: px2rem(16);
      }
      .book-author {
        margin-top: px2rem(5);
        width: px2rem(153.75);
        @include ellipsis;
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
  .contents-list {
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .contents-item {
      padding: px2rem(20) 0;
      box-sizing: border-box;
      display: flex;
      border-bottom: px2rem(1) solid #b8b9bb;

      .item-label {
        &.selected {
          color: #346cb9;
          font-weight: bold;
        }
        font-size: px2rem(14);
        @include ellipsis;
        flex: 1;
      }
      .item-page {
      }
    }
  }
  .search-list {
    width: 100%;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .search-item {
      font-size: px2rem(14);
      line-height: px2rem(16);
      padding: px2rem(20) 0;
      box-sizing: boeder-box;
    }
  }
}
</style>
