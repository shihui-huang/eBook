<template>
  <transition name="fade">
    <div
      class="slide-content-wrapper"
      v-show="menuVisible && settingVisible === 'menu'"
    >
      <transition name="menu-slide-right">
        <div class="content">
          <div class="content-page-wrapper">
            <div class="content-page">
              <component
                :is="currentTab === 'content' ? content : bookmark"
              ></component>
              <div class="content-page-tab">
                <div
                  class="content-page-tab-item"
                  :class="{ selected: currentTab === 'content' }"
                  @click="selectTab('content')"
                >
                  {{ $t('book.content') }}
                </div>
                <div
                  class="content-page-tab-item"
                  :class="{ selected: currentTab === 'bookmark' }"
                  @click="selectTab('bookmark')"
                >
                  {{ $t('book.bookmark') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div class="background" @click="hideMenu()"></div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import ebookSlideContents from './EbookSlideContents'
import ebookSlideBookmark from './EbookSlideBookmark'
export default {
  mixins: [ebookMixin],
  data() {
    return {
      currentTab: 'content',
      content: ebookSlideContents,
      bookmark: ebookSlideBookmark
    }
  },
  methods: {
    selectTab(e) {
      this.currentTab = e
    }
  },
  component: {
    ebookSlideContents,
    ebookSlideBookmark
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/styles/global.scss';
.slide-content-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  z-index: 300;
  width: 100%;
  height: 100%;
  .content {
    flex: 0 0 85%;
    width: 85%;
    height: 100%;
    .content-page-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      height: 100%;
      .content-page {
        flex: 1;
        width: 100%;
        overflow: hidden;
        .content-page-tab {
          display: flex;
          flex: 0 0 px2rem(48);
          width: 85%;
          height: px2rem(48);
          bottom: 0;
          position: absolute;
          .content-page-tab-item {
            flex: 1;
            font-size: px2rem(12);
            @include center;
          }
        }
      }
    }
  }
  .background {
    flex: 0 0 15%;
    width: 15%;
    height: 100%;
  }
}
</style>
