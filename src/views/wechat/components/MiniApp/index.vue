<template>
  <div class="mini-container">
    <div class="pt-3 pl-3 pr-3 title">
      <img :src="mediaData.imageUrl" alt="" class="mr-2 logo" />
      <span class="miniName ellipse-1 fs-12">{{ mediaData.title }}</span>
    </div>
    <h3 :title="mediaData.content" class="pl-3 pr-3 mb-2 miniTitle ellipse-1 fs-14">{{
      mediaData.content
    }}</h3>
    <div class="mb-3 ml-3 mr-3 miniImg">
      <Image :src="mediaData.baseUrl" />
    </div>
    <div class="pl-3 pr-3 border-t miniDesc fs-12">
      <span> <SvgIcon name="min-app" size="16" class="mini-icon" /> 小程序 </span>
      <div class="selfWx">个微</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { Image } from 'ant-design-vue';
  import { SvgIcon } from '/@/components/Icon/index';
  import { MediaProps } from '../../types';

  defineProps({
    mediaData: { type: Object as PropType<MediaProps>, default: () => ({}) },
  });
</script>
<style lang="less" scoped>
  .mini-container {
    position: relative;
    border-radius: 4px;
    width: 214px;
    box-sizing: border-box;
    background: #fff;

    .title {
      line-height: 22px;
      margin-bottom: 5px;
      display: flex;

      .logo {
        width: 20px;
        height: 20px;
        border-radius: 100%;
        vertical-align: middle;
      }
    }

    .miniName {
      color: #999;
    }

    .miniTitle {
      font-weight: 400;
      margin: 0;
    }

    .miniImg {
      width: 184px;
      height: 144px;
    }

    .miniDesc {
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .mini-icon {
        color: #6467f1;
      }
    }

    ::v-deep(.ant-image) {
      width: 100%;
      height: 100%;

      .ant-image-img {
        height: 100%;
        object-fit: cover;
      }
    }
  }
</style>
