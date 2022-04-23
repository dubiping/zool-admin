<template>
  <Layout class="container">
    <LayoutHeader class="!px-4 border-b header">{{ chatTitle }}</LayoutHeader>
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
                <template v-else-if="item.mediaName === 'pic'">
                  <ImageBox :mediaData="item" :previewList="previewImageList" class="pic-item" />
                </template>
                <template v-else-if="item.mediaName === 'video'">
                  <VideoBox :mediaData="item" />
                </template>
                <template v-else-if="item.mediaName === 'voice'">
                  <VoiceBox :mediaData="item" :isSelf="item.position == 1" />
                </template>
                <template v-else-if="item.mediaName === 'link'">
                  <LinkBox :mediaData="item" />
                </template>
                <template v-else-if="item.mediaName === 'file'">
                  <FileBox :mediaData="item" />
                </template>
                <template v-else-if="item.mediaName === 'miniApp'">
                  <MiniApp :mediaData="item" />
                </template>
                <template v-else-if="item.mediaName === 'wxGzh'">
                  <WxGzhBox :mediaData="item" />
                </template>
                <template v-else-if="item.mediaName === 'businessCard'">
                  <BusinessCard :mediaData="item" />
                </template>
              </div>
            </div>
          </div>
        </div>
      </ScrollContainer>
    </LayoutContent>
    <LayoutFooter class="border-t footer !px-4">
      <ChatEditor />
    </LayoutFooter>
  </Layout>
</template>

<script lang="ts" setup>
  import { onMounted, ref, unref } from 'vue';
  import { LayoutHeader, LayoutContent, LayoutFooter, Layout, Avatar } from 'ant-design-vue';
  import { ScrollContainer, ScrollActionType } from '/@/components/Container/index';
  import { getChatListApi } from '/@/api/wechat/index';
  import EmojiWord from '../components/EmojiWord/index.vue';
  import ImageBox from '../components/ImageBox/index.vue';
  import VideoBox from '../components/VideoBox/index.vue';
  import VoiceBox from '../components/VoiceBox/index.vue';
  import LinkBox from '../components/LinkBox/index.vue';
  import FileBox from '../components/FileBox/index.vue';
  import MiniApp from '../components/MiniApp/index.vue';
  import WxGzhBox from '../components/WxGzhBox/index.vue';
  import BusinessCard from '../components/BusinessCard/index.vue';
  import ChatEditor from '../components/ChatEditor/index.vue';

  import { PreviewItem } from './types';

  const chatList = ref([]);
  const previewImageList = ref<PreviewItem[]>([]);
  const chatTitle = ref('');

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
    let prevTime = 0;
    const maxDiffTime = 5 * 3600 * 1000;
    const imgList: PreviewItem[] = [];
    let nickName = '';
    res.forEach((v) => {
      let curTime = new Date(v.time).getTime();
      if (curTime - prevTime > maxDiffTime) {
        prevTime = curTime;
      } else {
        v.time = 0;
      }
      if (v.mediaName == 'pic') {
        imgList.unshift({
          id: v.id,
          imageUrl: v.imageUrl,
        });
      }
      if (v.position != '1') {
        nickName = v.nickName;
      }
    });
    chatList.value = res;
    previewImageList.value = imgList;
    chatTitle.value = nickName;
    setTimeout(() => {
      scrollBottom();
    }, 2000);
  };
  onMounted(() => {
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
    height: 40px;
    line-height: 40px;
  }

  .footer {
    height: 300px;
  }

  .chat-item {
    padding-bottom: 20px;

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
        max-width: 400px;

        &::after {
          content: ' ';
          border-width: 4px;
          position: absolute;
          display: block;
          width: 0;
          height: 0;
          border-color: transparent;
          border-style: solid;
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
      }

      .item-content_voice {
        &::after {
          top: 10px;
        }
      }

      .item-content_pic {
        ::v-deep(.ant-image-img) {
          max-width: 240px;
          max-height: 240px;
        }
      }

      .item-content_pic,
      .item-content_video {
        &::after {
          display: none;
          border-width: 0;
        }
      }
    }
  }
</style>
