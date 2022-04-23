<template>
  <PageWrapper title="图片预览示例">
    <ImagePreview :imageList="imgList" />
    <a-button @click="openImg" type="primary">无预览图</a-button>

    <div>
      <Image
        :preview="{ visible: false }"
        :width="200"
        src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
        @click="visible = true"
      />
      <div style="display: none">
        <PreviewGroup :preview="{ visible, onVisibleChange: (vis) => (visible = vis) }">
          <Image
            src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
          />
          <Image
            src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp"
          />
          <Image
            src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp"
          />
        </PreviewGroup>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { createImgPreview, ImagePreview } from '/@/components/Preview/index';
  import { PageWrapper } from '/@/components/Page';
  import { Image } from 'ant-design-vue';
  // import { PreviewActions } from '/@/components/Preview/src/typing';

  const imgList: string[] = [
    'https://picsum.photos/id/66/346/216',
    'https://picsum.photos/id/67/346/216',
    'https://picsum.photos/id/68/346/216',
  ];
  export default defineComponent({
    components: { PageWrapper, ImagePreview, Image, PreviewGroup: Image.PreviewGroup },
    setup() {
      function openImg() {
        const onImgLoad = ({ index, url, dom }) => {
          console.log(`第${index + 1}张图片已加载，URL为：${url}`, dom);
        };
        // 可以使用createImgPreview返回的 PreviewActions 来控制预览逻辑，实现类似幻灯片、自动旋转之类的骚操作
        createImgPreview({ imageList: imgList, defaultWidth: 700, rememberState: true, onImgLoad });
      }
      const visible = ref(false);
      return { imgList, openImg, visible };
    },
  });
</script>
