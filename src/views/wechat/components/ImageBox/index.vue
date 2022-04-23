<template>
  <div>
    <Image :preview="{ visible: false }" :src="imageUrl" @click="visible = true" />
    <div style="display: none">
      <Image.PreviewGroup :preview="{ visible, onVisibleChange: (vis) => (visible = vis) }">
        <Image v-for="(item, index) in previewList" :key="item + index" :src="item" />
      </Image.PreviewGroup>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Image } from 'ant-design-vue';

  defineProps({
    imageUrl: { type: String, default: '' },
    previewList: { type: Array },
  });
  const visible = ref(false);
</script>
