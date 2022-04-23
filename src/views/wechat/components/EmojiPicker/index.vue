<template>
  <Popover trigger="click" v-model="visible">
    <template #content>
      <div class="custom-popover" :style="{ width: width + 'px', height: height + 'px' }">
        <div v-show="showHistory || history.length">
          <div class="weui-emotion_head">最近使用</div>
          <div
            v-for="(item, index) in history"
            :key="item"
            class="weui-emotion_item"
            :style="{
              marginRight: ((index + 1) % perLine ? extraPadding : 0) + 'px',
            }"
            @click="insertEmoji(item)"
          >
            <div
              class="cursor-pointer weui-icon_emotion"
              :class="emotions[item].style"
              :style="{
                backgroundImage: `url(${backgroundUrl})`,
              }"
            ></div>
          </div>
        </div>
        <div class="weui-emotion_head" style="margin-top: 8px">所有表情</div>
        <div
          v-for="(item, index) in emotions"
          :key="item.id"
          class="weui-emotion_item"
          :style="{
            paddingRight: ((index + 1) % perLine ? extraPadding : 0) + 'px',
          }"
          @click="insertEmoji(index)"
        >
          <div
            class="cursor-pointer weui-icon_emotion"
            :class="item.style"
            :style="{
              backgroundImage: `url(${backgroundUrl})`,
            }"
          >
          </div>
        </div>
      </div>
    </template>
    <SvgIcon name="emoji" size="22" class="cursor-pointer emoji-icon color-light-gray" />
  </Popover>
</template>
<script lang="ts" setup>
  import { ref, unref, computed } from 'vue';
  import { Popover } from 'ant-design-vue';
  import { SvgIcon } from '/@/components/Icon/index';

  import emojiData from '../../data/emoji';
  import emojiPanelData from '../../data/panel';
  import { EmojiItem } from '../../types';

  import defaultSource from '/@/assets/images/wechat/emoji-sprite.png';

  const props = defineProps({
    padding: {
      type: Number,
      default: 0,
    },
    backgroundColor: {
      type: String,
      default: '#EDEDED',
    },
    showSend: {
      type: Boolean,
      default: true,
    },
    showDel: {
      type: Boolean,
      default: true,
    },
    showHistory: {
      type: Boolean,
      default: true,
    },
    height: {
      type: Number,
      default: 300,
    },
    width: {
      type: Number,
      default: 400,
    },
    source: {
      type: String,
      default: '',
    },
  });

  const emit = defineEmits(['insertemoji']);

  const EMOTION_SIZE = 40;
  const emotionMap = {};
  emojiData.forEach((item) => {
    emotionMap[item.id] = item;
  });

  const emotions = ref<EmojiItem[]>([]);
  const extraPadding = ref(0);
  const perLine = ref(0);
  const history = ref<number[]>([]);
  const visible = ref(false);

  emotions.value = emojiPanelData.map((id) => {
    return emotionMap[id];
  });

  const line = Math.floor((props.width - props.padding * 2) / 45);
  extraPadding.value = Math.floor(
    (props.width - props.padding * 2 - line * EMOTION_SIZE - 8) / (line - 1),
  );
  perLine.value = line;

  const backgroundUrl = computed(() => {
    return props.source || defaultSource;
  });

  function insertEmoji(id) {
    LRUCache(perLine.value, id);
    visible.value = false;
    emit('insertemoji', unref(emotions)[id]);
  }
  function LRUCache(limit, id) {
    const list = unref(history);
    const index = list.indexOf(id);
    if (index >= 0) {
      history.value.splice(index, 1);
      history.value.push(id);
    } else if (list.length < limit) {
      history.value.push(id);
    } else if (list.length === limit) {
      history.value[limit - 1] = id;
    }
  }
</script>
<style lang="less" scoped>
  .custom-popover {
    height: 200px;
    width: 378px;
    overflow-y: auto;
  }
</style>
