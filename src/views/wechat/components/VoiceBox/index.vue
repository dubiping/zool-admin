<template>
  <div class="voiceBox-container cursor-p">
    <audio
      ref="audioRef"
      :src="mediaData.voiceUrl || mediaData.recordUrl"
      style="display: none"
      @canplay="getDuration"
    ></audio>
    <div class="flex-row audio-content flex-row-center">
      <div v-if="isSelf" class="audio__duration color-gray right">
        {{ mediaData.durationTime || mediaData.voiceTime || duration }}''</div
      >
      <div
        :class="isSelf ? 'trigger-mine' : 'audio__trigger'"
        :style="`width: ${baseWidth + (mediaData.durationTime || duration)}px;`"
        @click="handlerPlayAudio"
      >
        <div
          :class="{
            'wifi-symbol': true,
            'wifi-symbol--avtive': isPlaying,
          }"
        >
          <div class="wifi-circle first"></div>
          <div class="wifi-circle second"></div>
          <div class="wifi-circle third"></div>
        </div>
      </div>
      <div v-if="!isSelf" class="audio__duration color-gray left">
        {{ mediaData.durationTime || duration }}''</div
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { MediaProps } from '../../types';
  const props = defineProps({
    mediaData: { type: Object as PropType<MediaProps>, default: () => ({}) },
    isSelf: {
      // true为右侧， false为左侧
      type: Boolean,
      default: false,
    },
    baseWidth: {
      type: Number,
      default: 80,
    },
  });
  const isPlaying = ref(false);
  const duration = ref(0);
  const audioRef = ref<Nullable<HTMLAudioElement>>(null);

  function handlerPlayAudio() {
    isPlaying.value = !isPlaying.value;
    const player = unref(audioRef);

    if (isPlaying.value) {
      player?.load();
      const playPromise = player?.play();
      if (playPromise) {
        playPromise
          .then(() => {
            player?.play();
          })
          .catch(() => {});
      }
      setTimeout(() => {
        player?.pause();
        isPlaying.value = false;
      }, (props.mediaData?.durationTime || duration.value) * 1000);
    } else {
      player?.pause();
    }
  }
  function getDuration() {
    // 此时可以获取到duration
    duration.value = Math.ceil(unref(audioRef)?.duration || 0);
  }
</script>
<style lang="less" scoped>
  .voiceBox-container {
    .audio-content {
      @keyframes bounce {
        0% {
          opacity: 0; /*初始状态 透明度为0*/
        }

        100% {
          opacity: 1; /*结尾状态 透明度为1*/
        }
      }

      .audio__duration {
        display: inline-block;

        &.left {
          padding-left: 6px;
        }

        &.right {
          padding-right: 6px;
        }
      }

      .trigger-mine {
        vertical-align: top;
        display: inline-block;
        line-height: 30px;
        height: 30px;
        width: 100px;
        background-color: #3bc66f;
        border-radius: 4px;
        position: relative;

        .wifi-symbol {
          position: absolute;
          right: 4px;
          top: -10px;
          width: 50px;
          height: 50px;
          box-sizing: border-box;
          overflow: hidden;
          transform: rotate(-404deg) scale(0.5);

          .wifi-circle {
            border: 5px solid #fff;
            border-radius: 50%;
            position: absolute;
          }

          .first {
            width: 5px;
            height: 5px;
            background: #fff;
            top: 45px;
            left: 45px;
          }

          .second {
            width: 25px;
            height: 25px;
            top: 35px;
            left: 35px;
          }

          .third {
            width: 40px;
            height: 40px;
            top: 25px;
            left: 25px;
          }
        }

        .wifi-symbol--avtive {
          .second {
            animation: bounce 1s infinite 0.2s;
          }

          .third {
            animation: bounce 1s infinite 0.4s;
          }
        }
      }

      .audio__trigger {
        vertical-align: top;
        display: inline-block;
        line-height: 30px;
        height: 30px;
        width: 100px;
        background-color: #3bc66f;
        border-radius: 4px;
        position: relative;

        .wifi-symbol {
          position: absolute;
          left: 4px;
          top: -10px;
          width: 50px;
          height: 50px;
          box-sizing: border-box;
          overflow: hidden;
          transform: rotate(-225deg) scale(0.5);

          .wifi-circle {
            border: 5px solid #fff;
            border-radius: 50%;
            position: absolute;
          }

          .first {
            width: 5px;
            height: 5px;
            background: #fff;
            top: 45px;
            left: 45px;
          }

          .second {
            width: 25px;
            height: 25px;
            top: 35px;
            left: 35px;
          }

          .third {
            width: 40px;
            height: 40px;
            top: 25px;
            left: 25px;
          }
        }

        .wifi-symbol--avtive {
          .second {
            animation: bounce 1s infinite 0.2s;
          }

          .third {
            animation: bounce 1s infinite 0.4s;
          }
        }
      }
    }
  }
</style>
