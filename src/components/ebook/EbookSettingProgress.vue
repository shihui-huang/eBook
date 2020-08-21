<template>
  <transition name="slide-up">
    <div
      class="setting-wrapper"
      v-show="menuVisible && settingVisible === 'progress'"
    >
      <div class="setting-progress">
        <!-- <div class="read-time-wrapper">
          <span class="read-time-text">{{ getReadTime() }}</span>
          <span class="icon-forward"></span>
        </div> -->
        <div class="progress-wrapper">
          <div class="progress-icon-wrapper">
            <span class="icon-back" @click="prevChapter()"></span>
          </div>
          <input
            class="progress"
            type="range"
            max="100"
            min="0"
            step="1"
            @input="onProgressInput($event.target.value)"
            @change="onProgressChange($event.target.value)"
            :value="progress"
            :disabled="!bookAvailable"
            ref="progress"
          />
          <div class="progress-icon-wrapper" @click="nextChapter()">
            <span class="icon-forward"></span>
          </div>
        </div>
        <div class="text-wrapper">
          <span class="progress-chapter-text">{{ getChapterName }}</span>
          <span class="progress-text"
            >({{ bookAvailable ? progress + '%' : $t('book.loading') }})</span
          >
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'

export default {
  mixins: [ebookMixin],
  computed: {
    getChapterName() {
      if (this.chapter) {
        const chapterInfo = this.currentBook.section(this.chapter)
        // console.log(this.currentBook.navigation)
        if (chapterInfo && chapterInfo.href) {
          return this.currentBook.navigation.get(chapterInfo.href).label
        } else {
          return ''
        }
      } else {
        return ''
      }
    }
  },
  methods: {
    onProgressChange(progress) {
      this.setProgress(progress).then(() => {
        this.displayProgress()
        this.updateProgressBg()
      })
    },
    onProgressInput(progress) {
      this.setProgress(progress)
      this.updateProgressBg()
    },

    updateProgressBg() {
      this.$refs.progress.style.backgroundSize = `${this.progress}%100%`
    },
    prevChapter() {
      if (this.chapter > 0 && this.bookAvailable) {
        this.setChapter(this.chapter - 1).then(() => {
          this.displayChapter()
        })
      }
    },
    nextChapter() {
      if (
        this.chapter < this.currentBook.spine.length - 1 &&
        this.bookAvailable
      ) {
        this.setChapter(this.chapter + 1).then(() => {
          this.displayChapter()
        })
      }
    }
  },

  update() {
    this.updateProgressBg()
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/styles/global';
.setting-wrapper {
  position: absolute;
  bottom: px2rem(48);
  left: 0;
  z-index: 190;
  width: 100%;
  height: px2rem(90);
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  .setting-progress {
    position: relative;
    width: 100%;
    height: 100%;
    .read-time-wrapper {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: px2rem(40);
      @include center;
      font-size: px2rem(12);
    }
    .progress-wrapper {
      width: 100%;
      height: 100%;
      @include center;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .progress {
        flex: 1;
        width: 100%;
        -webkit-appearance: none;
        height: px2rem(2);

        margin: 0 px2rem(10);
        &:focus {
          outline: none;
        }
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: px2rem(20);
          width: px2rem(20);
          border-radius: 50%;
          background: #ceced0;
          box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, 0.15);
          border: none;
        }
      }
      .progress-icon-wrapper {
        flex: 0 0 px2rem(22);
        font-size: px2rem(22);
        @include center;
      }
    }
    .text-wrapper {
      position: absolute;
      left: 0;
      bottom: px2rem(5);
      width: 100%;
      font-size: px2rem(12);
      text-align: center;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      @include center;
      .progress-chapter-text {
        text-overflow: ellipsis; // 文字超出变成省略号 Text that exceeds the length becomes an ellipsis
        overflow: hidden;
        white-space: nowrap; // 不换行
        line-height: px2rem(15);
        padding: 0 px2rem(15);
        box-sizing: border-box;
      }
      .progress-text {
        font-size: px2rem(12);
      }
    }
  }
}
</style>
