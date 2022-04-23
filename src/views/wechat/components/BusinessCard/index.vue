<template>
  <div class="box">
    <div class="flex items-center p-2 box2">
      <Avatar size="50" shape="square" :src="mediaData.imageUrl" />
      <p>{{ mediaData.title }}</p>
    </div>
    <div class="p-2 border-t title">个人名片</div>
  </div>
</template>
<script lang="ts" setup>
  import { Avatar } from 'ant-design-vue';
  import { MediaProps } from '../../types';

  defineProps({
    mediaData: { type: Object as PropType<MediaProps>, default: () => ({}) },
  });
</script>
<style lang="less" scoped>
  .box {
    background-color: #fff;
    border-radius: 4px;
    width: 230px;
    min-height: 64px;

    .box2 {
      height: 64px;

      p {
        margin-left: 10px;
        margin-bottom: 0;
      }
    }

    .title {
      text-align: left;
      color: #ddd;
    }
  }
</style>
