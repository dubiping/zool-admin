<template>
  <div class="videoBox-container">
    <videoPlay v-bind="options" />
  </div>
</template>
<script lang="ts" setup>
  import { reactive, watch } from 'vue';
  import 'vue3-video-play/dist/style.css';
  import { videoPlay } from 'vue3-video-play';
  import { VideoProps } from './typing';
  import { isEmptyObj, getWinClient } from '../../utils';

  const props = defineProps({
    videoData: { type: Object as PropType<VideoProps>, default: () => ({}) },
  });

  const options = reactive({
    width: '300px',
    height: '100px',
    muted: false, //静音
    control: false, //是否显示控制器
    src: '',
    poster: '',
  });

  watch(
    () => props.videoData,
    (obj) => {
      if (isEmptyObj(obj)) return;
      setPlayerOptions(obj);
    },
    {
      immediate: true,
    },
  );

  async function setPlayerOptions(data) {
    data.width = data.width || 0;
    data.height = data.height || 0; // 33
    let info = { ...data };
    const maxWidth = info.maxWidth || 300;
    const maxHeight = info.maxHeight || 300;
    // const bigWidth = 500;
    // const bigHeight = 500;
    if (!data.width || !data.height) {
      try {
        info = await getVideoSize(data.videoUrl || data.recordUrl || data.url);
      } catch (error) {
        info = {
          width: maxWidth,
          height: maxHeight,
        };
      }
    }

    const newSize = data.fixedWidth
      ? { width: data.fixedWidth, height: data.fixedHeight }
      : computedVideoSize(maxWidth, maxHeight, info.width, info.height, false);
    // const bigSize = computedVideoSize(bigWidth, bigHeight, info.width, info.height, true);

    options.src = data.baseUrl;
    options.poster = data.imageUrl;
    options.width = newSize.width + 'px';
    options.height = newSize.height + 'px';
  }

  function computedVideoSize(maxWidth, maxHeight, width, height, auto) {
    const scale = width / height;

    if (auto) {
      const winClient = getWinClient();
      const cHeight = 0.85 * winClient.height - 90;
      maxWidth = winClient.width;
      maxHeight = maxHeight < cHeight ? cHeight : maxHeight;
    }

    let newWidth = maxWidth;
    let newHeight = newWidth / scale;
    if (newHeight > maxHeight) {
      newHeight = maxHeight;
      newWidth = maxHeight * scale;
    }
    return {
      width: newWidth,
      height: newHeight,
    };
  }

  function getVideoSize(url: string) {
    const video = document.createElement('video');
    video.setAttribute('width', '10');
    video.setAttribute('height', '10');
    video.setAttribute('style', 'position: absolute;opacity: 0;z-index: -5;top: 0;');
    video.setAttribute('src', url);
    document.body.appendChild(video);
    return new Promise(function (resolve, reject) {
      video.addEventListener('canplay', function (e: any) {
        resolve({
          width: e.target.videoWidth,
          height: e.target.videoHeight,
        });
      });
      video.addEventListener('error', function (e) {
        console.log('video error', e);
        reject(e);
      });
    });
  }
</script>
<style lang="less" scoped>
  ::v-deep(.d-player-wrap) {
    .d-player-video {
      font-size: 0;
    }

    .d-player-state {
      bottom: 0;

      .d-play-btn {
        width: 40px;
        height: 40px;
        margin-top: 5px;

        .d-icon {
          font-size: 16px !important;
        }
      }
    }
  }
</style>
