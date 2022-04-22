<template>
  <Layout class="container">
    <LayoutHeader class="!px-4 border-b header">122</LayoutHeader>
    <LayoutContent class="relative main">
      <ScrollContainer class="!absolute left-0 top-0" ref="scrollRef">
        <div v-for="item in chatList" :key="item.id" class="chat-item">
          <div v-if="item.time" class="time">
            <span class="time-txt">{{ item.time }}</span>
          </div>
          <div
            class="flex item-body"
            :class="[item.position === '1' ? 'item-body_right' : 'item-body_left']"
          >
            <Avatar shape="square" :size="30" class="avatar" :src="item.avatar" />
            <div class="chat-content">
              <div class="nick-name">{{ item.nickName }}</div>
              <div class="item-content" :class="['item-content_' + item.mediaName]">
                <template v-if="item.mediaName === 'text'">
                  <EmojiWord :content="item.content" />
                </template>
              </div>
            </div>
          </div>
        </div>
      </ScrollContainer>
    </LayoutContent>
    <LayoutFooter class="border-t footer !px-4">33</LayoutFooter>
  </Layout>
</template>

<script lang="ts" setup>
  import { onMounted, ref, unref } from 'vue';
  import { LayoutHeader, LayoutContent, LayoutFooter, Layout, Avatar } from 'ant-design-vue';
  import { ScrollContainer, ScrollActionType } from '/@/components/Container/index';
  import { getChatListApi } from '/@/api/wechat/index';
  import EmojiWord from '../components/EmojiWord/index.vue';

  const chatList = ref([]);

  const scrollRef = ref<Nullable<ScrollActionType>>(null);
  const getScroll = () => {
    const scroll = unref(scrollRef);
    if (!scroll) {
      throw new Error('scroll is Null');
    }
    return scroll;
  };

  function scrollBottom() {
    getScroll().scrollBottom();
  }

  const getPageInfo = async () => {
    const res = await getChatListApi();
    chatList.value = res;
  };
  onMounted(() => {
    scrollBottom();
    getPageInfo();
  });
</script>

<style lang="less" scoped>
  @green: #3bc66f;

  .container {
    width: 100%;
    height: 100%;
  }

  .header {
    background: transparent;
  }

  .chat-item {
    .time {
      text-align: center;
      margin: 10px;

      .time-txt {
        padding: 3px;
        display: inline-block;
        background: rgb(207, 207, 207);
        color: rgba(255, 255, 255, 0.6);
        border-radius: 2px;
      }
    }

    .item-body {
      position: relative;

      &.item-body_left {
        padding-left: 50px;

        .avatar {
          left: 10px;
        }

        .item-content {
          &::after {
            top: 11px;
            left: -4px;
            border-right-color: #fff;
            border-left-width: 0;
          }
        }

        .item-content_text,
        .item-content_voice {
          box-sizing: border-box;

          &::after {
            border-right-color: @green;
          }
        }
      }

      &.item-body_right {
        justify-content: flex-end;
        padding-right: 50px;

        .avatar {
          right: 10px;
        }

        .nick-name {
          text-align: right;
        }

        .item-content {
          &::after {
            top: 11px;
            right: -4px;
            border-left-color: #fff;
            border-right-width: 0;
          }
        }

        .item-content_text,
        .item-content_voice {
          box-sizing: border-box;

          &::after {
            border-left-color: @green;
          }
        }
      }
    }

    .avatar {
      position: absolute;
      top: 6px;
    }

    .chat-content {
      .nick-name {
        color: #a6aab8;
        font-size: 12px;
        padding-bottom: 5px;
      }

      .item-content {
        position: relative;
        max-width: 170px;

        &::after {
          content: ' ';
          border-width: 4px;
          position: absolute;
          // top: 15px;
          // left: -4px;
          display: block;
          width: 0;
          height: 0;
          border-color: transparent;
          border-style: solid;
          // border-right-color: #fff;
          // border-left-width: 0;
        }
      }

      .item-content_text {
        border-radius: 4px;
        padding: 10px;
        background: @green;
        color: #fff;
        min-height: 36px;
      }

      .item-content_text,
      .item-content_voice {
        box-sizing: border-box;
        // &::after {
        //   border-right-color: $base-color-green;
        // }
      }

      .item-content_voice {
        &::after {
          top: 10px;
        }
      }

      .item-content_pic {
        max-width: 160px;
      }

      .item-content_link,
      .item-content_file {
        height: 62px;
        overflow: hidden;

        .linkBox-container,
        .fileBox-container {
          transform: scale(0.75);
          transform-origin: 0 0;
        }
      }

      .item-content_file {
        height: 49px;
      }

      .item-content_miniApp {
        height: 196px;
        overflow: hidden;

        ::v-deep {
          .mini-container {
            background: #fff;
            transform: scale(0.75);
            transform-origin: 0 0;
          }
        }
      }

      .item-content_wxGzh {
        height: 78px;
        overflow: hidden;

        ::v-deep {
          .wxGzh-container {
            transform: scale(0.75);
            transform-origin: 0 0;
          }
        }
      }
    }
  }
</style>
