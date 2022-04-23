<template>
  <div>
    <Image :preview="{ visible: false }" :src="mediaData.imageUrl" @click="visible = true" />
    <div style="display: none">
      <Image.PreviewGroup
        :preview="{ visible, current: getCurrent, onVisibleChange: (vis) => (visible = vis) }"
      >
        <Image
          v-for="(item, index) in previewList"
          :key="item.imageUrl + index"
          :src="item.imageUrl"
        />
      </Image.PreviewGroup>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { Image } from 'ant-design-vue';
  import { MediaProps } from '../../types';

  const props = defineProps({
    mediaData: { type: Object as PropType<MediaProps>, default: () => ({}) },
    previewList: { type: Array },
  });
  const visible = ref(false);

  const getCurrent = computed(() => {
    return props.previewList?.findIndex((v) => props.mediaData.id == v.id) || 0;
  });
</script>
