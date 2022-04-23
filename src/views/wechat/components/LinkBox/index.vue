<template>
  <div class="flex items-center p-2 linkBox-container">
    <div class="flex-shrink-0 img">
      <Image :src="mediaData.imageUrl" />
    </div>

    <div class="ml-2 cur" @click="open">
      <p class="title ellipse-1 fs-20">
        {{ mediaData.title }}
      </p>
      <p class="desc ellipse-1 fs-16">
        {{ mediaData.content || '暂无描述' }}
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { Image } from 'ant-design-vue';
  import { MediaProps } from '../../types';

  const props = defineProps({
    mediaData: { type: Object as PropType<MediaProps>, default: () => ({}) },
  });
  function open() {
    window.open(props.mediaData.baseUrl, '_blank');
  }
</script>
<style lang="less" scoped>
  .linkBox-container {
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #e9ecf0;
    width: 260px;
    min-height: 64px;
    box-sizing: content-box;
    overflow: hidden;

    .img {
      width: 80px;
      height: 80px;
      border-radius: 2px;
      font-size: 0;
      display: block;
    }

    .title,
    .desc {
      margin-bottom: 0px;
    }

    .desc {
      color: #999;
    }

    .cur {
      cursor: pointer;
    }
  }
</style>
