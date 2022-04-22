<template>
  <div class="emoji-word-container">
    <template v-for="(item, index) in getContentList" :key="index">
      <div v-if="item.type === 2" class="weui-emoji_item">
        <img
          :data-code="item.content"
          class="weui-icon_emoji"
          :class="item.imageClass"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
        />
      </div>
      <span v-else class="text">{{ item.content }}</span>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { parseEmoji } from '../../utils/parseEmoji';
  const props = defineProps({
    content: { type: String, default: '' },
  });
  const getContentList = computed(() => {
    return parseEmoji(props.content);
  });
</script>
<style lang="less" scoped>
  .emoji-word-container {
    word-break: break-all;
    line-height: 20px;

    .weui-emoji_item {
      vertical-align: middle;
    }

    .text {
      white-space: pre-wrap;
    }
  }
</style>
