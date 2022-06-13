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
    const count = 30;
    for (let i = 0; i < count; i++) {
      list.push([cityList[i], 20]); // randomRange(20, 40)]
    }
    let $el = document.querySelector('.word-cloud-wrapper');
    if (!$el) return;
    $el.addEventListener('wordcloudstop', function () {
      setTimeout(() => {
        let els = document.querySelectorAll('.word-color');
        Array.from(els).forEach((el: any, index) => {
          el.classList.add('word-animate');
          el.style.animationDuration = `${count}s`;
          el.style.animationDelay = `${index}s`;
          // el.style.cssText = `animation-duration: ${count}s; animation-delay: ${index}s;`;
        });
      }, 2000);
    });

    WordCloud($el, {
      list,
      drawOutOfBound: true,
      classes: 'word-color',
      color: null,
      gridSize: 30,
      rotateRatio: 0,
    });
  });
</script>
<style lang="less">
  .word-cloud-wrapper {
    width: 100%;
    height: 100%;
    background: #ccc !important;
  }

  .word-animate {
    animation-name: word;
    animation-duration: 20s;
    animation-iteration-count: infinite;
    will-change: transform;
    // opacity: 0.5;
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

  @keyframes word {
    0% {
      // opacity: 0.5;
      transform: scale(1);
      background-color: transparent;
    }
    2% {
      transform: scale(2);
      color: #fff;
      background-color: #000;
    }
    4% {
      transform: scale(2);
      color: #fff;
      background-color: #000;
    }
    6% {
      transform: scale(1);
      background-color: transparent;
    }
    100% {
      transform: scale(1);
      background-color: transparent;
    }
  }
</style>
