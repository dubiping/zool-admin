<template>
  <Layout class="container">
    <LayoutHeader class="!px-4 border-b header">1</LayoutHeader>
    <LayoutContent class="relative main">
      <ScrollContainer class="!absolute left-0 top-0" ref="scrollRef">
        <ul class="p-3">
          <template v-for="index in 100" :key="index">
            <li class="p-2" :style="{ border: '1px solid #eee' }">
              {{ index }}
            </li>
          </template>
        </ul>
      </ScrollContainer>
    </LayoutContent>
    <LayoutFooter class="border-t footer !px-4">33</LayoutFooter>
  </Layout>
</template>

<script lang="ts" setup>
  import { onMounted, ref, unref } from 'vue';
  import { LayoutHeader, LayoutContent, LayoutFooter, Layout } from 'ant-design-vue';
  import { ScrollContainer, ScrollActionType } from '/@/components/Container/index';

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
  onMounted(() => {
    scrollBottom();
  });
</script>

<style lang="less" scoped>
  .container {
    width: 100%;
    height: 100%;
  }

  .header {
    background: transparent;
  }
</style>
