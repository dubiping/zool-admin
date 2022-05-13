<template>
  <div ref="nodeRef" class="ani-container">
    <div class="game-wrap">
      <!-- 旋转光圈 -->
      <div class="light-wrap one">
        <div class="light-item one"></div>
      </div>
      <div class="light-wrap two">
        <div class="light-item two"></div>
      </div>
      
      <div class="bottom-content">
      </div>
      <img class="user" src="/@/assets/images/css/backCity/diaochan.png" alt=""/>
      <!-- 回城底部圆形波 -->
      <div class="bottom-wrap">
        <div class="bottom-item">
        </div>
        <div class="bottom-item copy"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, unref } from 'vue';

const nodeRef = ref<HTMLElement | null>(null);

let lastflowerTime = 0, // 上次生成花瓣的时间
flowerFrequency = 2, // 生成花瓣的频率
screenWidth = 0, // 屏幕宽度
screenHeight = 0, // 屏幕高度
flowerAngle = 60, // 花瓣偏移角度
flowerSpeed = 3; // 花瓣移动速度
function flowerStart () {
  // 花瓣生成的频率
  let now = new Date().getTime()
  if (now - lastflowerTime > (1000 / flowerFrequency)) {
    // 创建花瓣
    let flowerItem: any = document.createElement('div')
    flowerItem.className = 'flower-item'
    flowerItem.style.top = -flowerItem.offsetWidth + 'px'
    // 在给花瓣随机分配横向坐标时，范围应该把花瓣的偏移量也算进去，否则屏幕右下角会出现空白
    let _left = (screenWidth + Math.tan(flowerAngle * Math.PI / 180) * screenHeight) * Math.random()
    flowerItem.style.left = _left + 'px'
    // 增加随机透明度
    // flowerItem.style.opacity = Math.random()
    
    unref(nodeRef).appendChild(flowerItem)
    // 给花瓣一个随机的放大系数，之后运动速度要和这个系数相乘
    flowerItem.flowerScale = Math.random() * 0.5 + 0.5
    flowerItem.style.width = flowerItem.offsetWidth * flowerItem.flowerScale + 'px'
    flowerItem.style.height = flowerItem.offsetHeight * flowerItem.flowerScale + 'px'

    // 花瓣移动
    let flowerMove = () => {
      // 此处的花瓣移动速度要和当前花瓣的移动系数相乘
      let moveY = flowerSpeed * flowerItem.flowerScale
      flowerItem.style.top = flowerItem.offsetTop + moveY + 'px'

      // 根据设置的花瓣偏移角度和纵向移动距离计算花瓣的横向移动距离
      let moveX = Math.tan(flowerAngle * Math.PI / 180) * moveY
      flowerItem.style.left = flowerItem.offsetLeft - moveX + 'px'

      // 如果花瓣偏移角度大于0，则判断花瓣是否超出左侧屏幕
      if (flowerAngle > 0) {
        if (flowerItem.offsetLeft < (-flowerItem.offsetWidth)) {
          unref(nodeRef).removeChild(flowerItem)
          return
        }
      }

      // 如果花瓣距离屏幕顶部距离大于等于屏幕高度，则移除此花瓣
      if (flowerItem.offsetTop > screenHeight) {
        unref(nodeRef).removeChild(flowerItem)
      } else {
        requestAnimationFrame(flowerMove)
      }
    }

    flowerMove()
    lastflowerTime = now
  }
  requestAnimationFrame(flowerStart)
}

onMounted(() => {
  screenWidth = unref(nodeRef).offsetWidth;
  screenHeight = unref(nodeRef).offsetHeight;
  flowerStart()
})

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
    max-width: 500px;
    top: 50%;
    left: 50%;
    transform-style: preserve-3d;
    transform: rotateX(-20deg) translate(-50%, -50%);
  }
  ::v-deep .flower-item {
    position: absolute;
    width: 15px;
    height: 20px;
    background-image: radial-gradient(#fdedff 40%, #ffb9ff);
    box-shadow: 0 5px 10px 2px rgba(255, 255, 255, .8);
    border-radius: 80% 80% 100% 100%;
    transform-style: preserve-3d;
    transform: rotateZ(30deg);
    animation: rotate-flower 5s linear infinite;
  }
  
  .light-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 0px;
    transform-style: preserve-3d;
    transform: rotateX(0deg) rotateZ(30deg);
  }
  .light-wrap.one {
    transform: rotateX(0deg) rotateZ(150deg);
  }
  .light-item {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-sizing: border-box;
    border: 10px solid #ffb9ff;
    mask-image: linear-gradient(to top, transparent 25%, #000 75%);
    -webkit-mask-image: linear-gradient(to top, transparent 25%, #000 75%);
    clip-path:polygon(0% 25%, 50% 50%, 0% 75%);
    -webkit-clip-path:polygon(0% 25%, 50% 50%, 0% 75%);
  }
  .light-item.one {
    animation: rotate-light 3s linear infinite;
  }
  .light-item.two {
    animation: rotate-light 3s linear infinite;
  }

  .bottom-content {
    position: absolute;
    width: 100%;
    height: 1000px;
    opacity: .7;
    background-image: linear-gradient(to right, transparent, rgb(255 151 247 / 60%) ,rgb(253 192 255), rgb(255 151 247 / 60%) 80%, transparent);
    mask-image: linear-gradient(to bottom, transparent -10%,#fff 20%, #fff 80%, transparent);
    -webkit-mask-image: linear-gradient(to bottom, transparent -10%,#fff 20%, #fff 80%, transparent);
    bottom: 0;
  }
  .user {
    width: 100%;
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translate(-50%);
  }
  .bottom-wrap {
    width: 86%;
    height: 86%;
    border-radius: 50%;
    transform-style: preserve-3d;
    box-sizing: border-box;
    transform: rotateX(90deg) translateX(-50%);
    border: 5px solid #ffb9ff;
    box-shadow: 0 0 50px 2px rgb(255 155 238 / 80%) inset;
    position: absolute;
    bottom: -20%;
    left: 50%;

    .bottom-item {
      border: 5px solid #ffb9ff;
      box-shadow: 0 0 50px 2px rgb(255 155 238 / 80%) inset;
      width: 75%;
      height: 75%;
      box-sizing: border-box;
      border-radius: 50%;
      left: 50%;
      top: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
    }
    .bottom-item.copy {
      animation: moveTop .8s linear infinite;
    }
  }
}
@keyframes rotate-flower {
  from{
    transform: rotateZ(30deg) rotateY(0deg);
  } to{
    transform: rotateZ(30deg) rotateY(360deg);
  }
}
@keyframes rotate-light {
  from{
    transform: rotateY(360deg) rotateX(90deg);
  } to{
    transform: rotateY(0deg) rotateX(90deg);
  }
}
@keyframes moveTop {
  from{
    opacity: 1;
    transform: translate(-50%, -50%) translateZ(0);
  } to{
    opacity: 0;
    transform: translate(-50%, -50%) translateZ(1200px);
  }
}
</style>