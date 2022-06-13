<template>
  <div class="flex flex-col w-full h-full">
    <h1>wordCloud插件</h1>
    <div class="flex-1 relative">
      <div class="word-cloud-wrapper"> </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted } from 'vue';
  import WordCloud from 'wordCloud';

  function randomRange(start, end) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
  }
  onMounted(() => {
    const cityList = [
      '南京',
      '镇江',
      '常州',
      '无锡',
      '苏州',
      '徐州',
      '连云港',
      '淮安',
      '盐城',
      '扬州',
      '泰州',
      '南通',
      '宿迁',
      '章丘',
      '胶南',
      '胶州',
      '平度',
      '莱西',
      '即墨',
      '滕州',
      '龙口',
      '莱阳',
      '莱州',
      '招远',
      '蓬莱',
      '栖霞',
      '海阳',
      '青州',
      '诸城',
      '安丘',
      '高密',
      '昌邑',
      '兖州',
      '曲阜',
      '邹城',
      '乳山',
      '文登',
      '荣成',
      '乐陵',
      '临清',
    ];
    const list: any = [];
    const count = 200;
    for (let i = 0; i < count; i++) {
      list.push([cityList[i % 40], randomRange(1, 20)]); //
    }
    let $el = document.querySelector('.word-cloud-wrapper');
    if (!$el) return;

    WordCloud($el, {
      list,
      drawOutOfBound: true,
      classes: 'word-color',
      color: null,
      gridSize: 10,
      rotateRatio: 1,
      shape: 'cardioid',
      ellipticity: 1,
    });
  });
</script>
<style lang="less">
  .word-cloud-wrapper {
    width: 100%;
    height: 100%;
    background: black !important;
  }
  .special {
    color: #fff;
  }
  .word-color:nth-child(7n + 1) {
    color: rgb(202, 110, 255);
  }
  .word-color:nth-child(7n + 2) {
    color: rgb(83, 110, 255);
  }
  .word-color:nth-child(7n + 3) {
    color: rgb(143, 253, 241);
  }
  .word-color:nth-child(7n + 4) {
    color: rgb(183, 255, 112);
  }
  .word-color:nth-child(7n + 5) {
    color: rgb(255, 212, 126);
  }
  .word-color:nth-child(7n + 6) {
    color: rgb(248, 140, 131);
  }
  .word-color:nth-child(7n + 7) {
    color: rgb(104, 160, 255);
  }
</style>
