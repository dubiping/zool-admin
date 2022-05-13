<template>
  <div class="ani-container">
    <div ref="gameRef" class="game-wrap">
      <!-- 回城光壁 -->
      <div ref="nodeRef" class="glass-wrap"> </div>
      <!-- 旋转光圈 -->
      <div class="light-wrap one"></div>
      <div class="light-wrap two"></div>
      <div class="light-wrap three"></div>
      <div class="light-wrap four"></div>
      <img class="user" src="/@/assets/images/css/backCity/lubu.png" alt="" />
      <!-- 回城底部圆形波 -->
      <div class="bottom-wrap">
        <div class="bottom-item one">
          <!-- <div class="bottom-content one"></div> -->
        </div>
        <div class="bottom-item two">
          <!-- <div class="bottom-content two"></div> -->
        </div>
        <div class="bottom-item three">
          <!-- <div class="bottom-content three"></div> -->
        </div>
        <div class="bottom-item four">
          <!-- <div class="bottom-content-four"></div> -->
        </div>
      </div>
      <div class="demo"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, unref } from 'vue';

  const nodeRef = ref<HTMLElement | null>(null);
  const gameRef = ref<HTMLElement | null>(null);
  const glassNum = 6;
  let glassRadius = 300;

  function generateGlass() {
    glassRadius = unref(gameRef).offsetWidth * 0.43;
    for (let i = 0; i < glassNum; i++) {
      let glass: any = document.createElement('div');
      glass.className = 'glass-item';
      glass.style.transform = `rotateY(${i * (360 / glassNum)}deg) translateZ(${glassRadius}px)`;
      unref(nodeRef).appendChild(glass);
      setTimeout(() => {
        glass.style.top = 0;
        glass.style.opacity = 1;
      }, i * 300);
    }
  }
  onMounted(() => {
    generateGlass();
  });
</script>
<style lang="less" scoped>
  .ani-container {
    overflow: hidden;
    background: url(/@/assets/images/css/backCity/diaochan_bg.jpeg) center;
    background-size: cover;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    .game-wrap {
      position: absolute;
      width: 50%;
      height: 100%;
      max-width: 600px;
      top: 50%;
      left: 50%;
      transform-style: preserve-3d;
      transform: rotateX(-20deg) translate(-50%, -50%);
    }
    .glass-wrap {
      width: 17%;
      height: 20%;
      position: absolute;
      left: 50%;
      bottom: 50%;
      transform: translate(-50%, 50%) rotateX(-10deg);
      transform-style: preserve-3d;
      animation: rotate 10s linear infinite;
      ::v-deep .glass-item {
        transform-style: preserve-3d;
        position: absolute;
        left: 0;
        opacity: 0;
        top: -500px;
        width: 100%;
        height: 100%;
        transition: all 0.3s ease-in;
        box-shadow: 0 0 10px 5px rgb(247 255 13);
        background: rgb(255 160 0 / 53%);
      }
    }

    .light-wrap {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      right: 0;
      margin: 0 auto;
      bottom: 0px;
      border-radius: 50%;
      box-sizing: border-box;
      border: 5px solid #ffc79b;
      box-shadow: 0 0 3px 1px rgb(255 246 82) inset;
      mask-image: linear-gradient(to top, transparent 25%, #000 75%);
      -webkit-mask-image: linear-gradient(to top, transparent 25%, #000 75%);
      clip-path: polygon(0% 25%, 50% 50%, 0% 75%);
      -webkit-clip-path: polygon(0% 25%, 50% 50%, 0% 75%);
      &.one {
        margin-bottom: 20%;
        animation: rotate-light 2s linear infinite;
      }
      &.two {
        margin-bottom: 15%;
        animation: rotate-light 3s linear infinite;
      }
      &.three {
        margin-bottom: 0%;
        animation: rotate-light 4s linear infinite;
      }
      &.four {
        margin-bottom: -20%;
        animation: rotate-light 5s linear infinite;
      }
    }
    .user {
      width: 100%;
      position: absolute;
      bottom: 20%;
      left: 50%;
      transform: translate(-60%);
    }
    .bottom-wrap {
      width: 86%;
      height: 86%;
      border-radius: 50%;
      transform-style: preserve-3d;
      box-sizing: border-box;
      transform: rotateX(90deg) translateX(-50%);
      border: 5px solid rgb(255 102 102);
      background: rgb(67 17 17 / 34%);
      position: absolute;
      bottom: -20%;
      left: 50%;

      .bottom-item {
        position: absolute;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        box-sizing: border-box;
        border: 4px solid rgb(255 217 109 / 78%);
        box-shadow: 0 0 10px 3px rgb(255 14 14);
        &.one {
          width: 100%;
          height: 100%;
        }
        &.two {
          width: 75%;
          height: 75%;
        }
        &.three {
          width: 50%;
          height: 50%;
        }
        &.four {
          width: 25%;
          height: 25%;
        }
        .bottom-content {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          mask-image: linear-gradient(to right, transparent, #000 50%);
          box-sizing: border-box;
          border: 75px solid rgb(250 255 100 / 83%);
          clip-path: polygon(0% 0%, 25% 0%, 50% 50%, 0% 25%);
          -webkit-clip-path: polygon(0% 0%, 15% 0%, 50% 50%, 0% 15%);
          &.one {
            // animation: rotate-bottom 1s linear infinite;
          }
          &.two {
            // animation: rotate-bottom 2.5s linear infinite;
          }
          &.three {
            // animation: rotate-bottom 4s linear infinite;
          }
        }
        .bottom-content-four {
          width: 50%;
          height: 50%;
          background: linear-gradient(45deg, rgba(0, 0, 0, 0) 50%, rgb(255 0 0) 100%);
          border-radius: 100% 0 0 0;
          transform-origin: 100% 100%;
          // animation: rotate-bottom 5.5s linear infinite;
        }
      }
    }
  }
  /* 旋转动画 */
  @keyframes rotate {
    from {
      transform: translate(-50%, 50%) rotateY(360deg);
    }
    to {
      transform: translate(-50%, 50%) rotateY(0deg);
    }
  }
  @keyframes rotate-light {
    from {
      transform: rotateY(360deg) rotateX(90deg);
    }
    to {
      transform: rotateY(0deg) rotateX(90deg);
    }
  }
  @keyframes rotate-bottom {
    from {
      transform: rotateZ(0deg);
    }
    to {
      transform: rotateZ(360deg);
    }
  }
  @keyframes star {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
