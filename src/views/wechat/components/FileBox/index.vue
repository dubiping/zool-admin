<template>
  <div
    class="flex items-center justify-between pl-2 pr-2 fileBox-container"
    :class="openDownLoad ? 'cursor' : ''"
    @click="downLoadFile"
  >
    <div class="flex flex-col justify-center mr-2 file-content">
      <h3 class="fs-20 file-name ellipse-2">
        {{ mediaData.fileName || mediaData.recordTitle || mediaData.title }}
      </h3>
      <span class="fs-16 file-size">{{ getFileSize }}</span>
    </div>
    <span
      class="flex-shrink-0 fa-file-icon xlsx"
      :class="getType(mediaData.fileName || mediaData.recordTitle || mediaData.title)"
    ></span>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { MediaProps } from '../../types';
  import { toFixed, fileTypeIcon, getFileType } from '../../utils';

  const props = defineProps({
    mediaData: { type: Object as PropType<MediaProps>, default: () => ({}) },
    openDownLoad: {
      type: Boolean,
      default: false,
    },
  });

  const getFileSize = computed(() => {
    const size = props.mediaData.fileSize || 0;
    const left = size / 1024 / 1024;
    return left > 1
      ? ''.concat(toFixed(left, 2, true), 'M')
      : ''.concat(toFixed(size / 1024, 2, true), 'K');
  });

  function getType(fileName) {
    const type = getFileType(fileName);
    return fileTypeIcon(type);
  }
  // 下载文件
  function downLoadFile() {
    if (!props.openDownLoad) return;
    const url = props.mediaData.recordUrl || props.mediaData.url;
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.setAttribute('download', props.mediaData.title || '');
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
  }
</script>
<style lang="less" scoped>
  .cursor {
    cursor: pointer;
  }

  .fileBox-container {
    background: #fff;
    width: 260px;
    height: 96px;

    .file-content {
      height: 100%;
    }

    .file-name {
      font-weight: normal;
      line-height: 24px;
      margin-bottom: 2px;
    }

    .file-size {
      color: #999;
    }
  }
</style>
