<template>
  <div>
    <div class="wxGzh-container">
      <div class="flex items-center wxGzh-main">
        <div class="flex-shrink-0 mr-2 logo">
          <Image :src="mediaData.imageUrl" />
        </div>
        <span class="fs-14 ellipse-2">{{ mediaData.title }}</span>
      </div>
      <div class="border-t wxGzh-footer fs-12 color-light-gray">公众号名片</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { Image } from 'ant-design-vue';
  import { MediaProps } from '../../types';

  defineProps({
    mediaData: { type: Object as PropType<MediaProps>, default: () => ({}) },
  });
</script>
<style lang="less" scoped>
  .wxGzh-container {
    border-radius: 4px;
    width: 214px;
    box-sizing: border-box;
    background: #fff;

    .wxGzh-main {
      padding: 13px;
    }

    .logo {
      width: 50px;
      height: 50px;
      border-radius: 100%;
      overflow: hidden;
    }

    .wxGzh-footer {
      padding-left: 13px;
      line-height: 22px;
    }
  }
</style>
