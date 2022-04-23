<template>
  <div class="flex flex-col chat-container">
    <div
      ref="editorRef"
      class="editor"
      :placeholder="placeholder"
      contenteditable="true"
      @paste.prevent="handlePaste"
      @input.stop="handleInput"
      @compositionend="handleCompositionend"
    >
    </div>
    <div class="flex items-center justify-between flex-shrink-0 pt-2 chat-footer">
      <EmojiPicker @insertemoji="insertEmoji" />
      <slot></slot>
      <span class="color-light-gray fs-12 limit-word">{{ currentNum }}/{{ maxNum }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import EmojiPicker from '../EmojiPicker/index.vue';

  defineProps({
    placeholder: { type: String, default: '请输入' },
    maxNum: {
      type: Number,
      default: 1000,
    },
  });
  const editorRef = ref<Nullable<HTMLDivElement>>(null);
  const currentNum = ref(0);

  function insertEmoji(e) {
    console.log(e);
  }
  function handleInput() {}
  function handlePaste() {}
  function handleCompositionend() {}
</script>
<style lang="less" scoped>
  .chat-container {
    width: 100%;
    height: 100%;
    // padding: 19px 19px 15px;
    box-sizing: border-box;
    /* stylelint-disable */
    .editor {
      outline: none;
      white-space: pre-wrap;
      word-wrap: break-word;
      word-break: break-word;
      -webkit-user-modify: read-write-plaintext-only;

      user-modify: read-write-plaintext-only;
      line-height: 22px;
      overflow: auto;

      &:empty:before {
        content: attr(placeholder);
        display: block; /* For Firefox */
        filter: contrast(15%);
        outline: none;
        cursor: text;
      }
    }
    /* stylelint-enable */

    .chat-footer {
      .fh-icon-biaoqing {
        color: #bfbfbf;
      }
    }
  }
</style>
