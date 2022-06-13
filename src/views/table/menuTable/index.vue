<template>
  <div>
    <BasicTable @register="registerTable" :dataSource="dataSource" :expandedRowKeys="expandedRowKeys">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'menuNameZh'">
          <Checkbox v-if="record.pageOpList && record.pageOpList.length" v-model:checked="record.checkAll" :indeterminate="record.indeterminate" class="!mr-2" @change="(e) => onCheckAllChangeOp(e, record.menuId)"></Checkbox>
          <span>{{ record.menuNameZh }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'pageOpList'">
          <Checkbox v-if="record.children && record.children.length" v-model:checked="record.checkAll" :indeterminate="record.indeterminate" class="!mr-2" @change="(e) => onCheckAllChangeMenu(e, record.menuId)">全选</Checkbox>
          <CheckboxGroup v-else v-model:value="record.checkedList" :options="record.plainOptions" @change="(e) => onCheckAllChangeButton(e, record.menuId)" />
        </template>
      </template>
    </BasicTable>
    <div>
      <Button class="mt-4 mr-4 float-right" type="primary" @click="handleConfirm">确定</Button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, unref, onMounted } from 'vue';
import { Checkbox, CheckboxGroup, Button } from 'ant-design-vue';
import { BasicTable, useTable, BasicColumn } from '/@/components/Table';
import { menuList } from './data';
import { translateTreeData, translateTreeMap } from '/@/utils';

const columns: BasicColumn[] = [
  {
    title: '菜单列表',
    dataIndex: 'menuNameZh',
    align: 'left',
  },
  {
    title: '功能权限',
    dataIndex: 'pageOpList',
    align: 'left',
  },
];
const dataSource = ref<any[]>([]);
const dataMap = ref({});
const childList = ref<string[]>([]);
const expandedRowKeys = ref<string[]>([]);
const [registerTable] = useTable({
  columns: columns,
  canResize: false,
  inset: true,
  showIndexColumn: false,
  pagination: false,
  clickToRowSelect: false,
  defaultExpandAllRows: true,
  rowKey: 'menuId',
});

function init() {
  dataSource.value = translateTreeData(menuList, (v) => {
    // 末级页面
    if (!v.children || (v.children && !v.children.length)) {
      // 将空数组置为null, 防止末级页面也有展开按钮
      v.children = null;
      // 有按钮级checkbox
      if (v.pageOpList && v.pageOpList.length) {
        // 选中列表
        v.checkedList = v.pageOpList.filter((t) => t.isSelected === '1').map((t) => t.menuPageId);
        v.plainOptions = v.pageOpList.map((t) => {
          return {
            label: t.alias,
            value: t.menuPageId,
          };
        });
        v.checkAll = v.checkedList.length === v.plainOptions.length;
        v.indeterminate = !v.checkAll && !!v.checkedList.length;
      } else {
        // 页面没有按钮级，需要置为全选
        v.checkAll = true;
        v.indeterminate = false;
      }
    } else {
      v.checkAll = false;
      v.indeterminate = false;
      // 获取父节点，默认全部展开
      expandedRowKeys.value.push(v.menuId);
    }
    // 获取所有末级页面的ID
    if (v.pageOpList && v.pageOpList.length) {
      childList.value.push(v.menuId);
    }
  });
  dataMap.value = translateTreeMap(unref(dataSource), 'menuId');

  // 通过末级页面，处理父级模块全选
  unref(childList).forEach((id) => {
    let item = unref(dataMap)[id];
    let parentId = item?.parentId;

    recursionParent(parentId);
  });
}
// 处理除了最后一层的全选按钮显示
function recursionParent(parentId) {
  let parent = unref(dataMap)[parentId];
  while (parent) {
    parent.checkAll = parent.children.every((v) => v.checkAll);
    parent.indeterminate =
      !parent.checkAll && parent.children.some((v) => v.indeterminate || v.checkAll);
    parent = unref(dataMap)[parent.parentId];
  }
}
// 处理最后一层按钮显示
function recursionChildren(data, checked) {
  const queue = [...data];
  while (queue.length) {
    const item = queue.shift();
    if (item.pageOpList && item.pageOpList.length) {
      item.checkedList = checked ? item.plainOptions.map((v) => v.value) : [];
    }
    item.checkAll = checked;
    item.indeterminate = false;
    item.children?.forEach((v) => {
      queue.push(v);
    });
  }
}
// 处理最后一层全选按钮， 向上遍历
function onCheckAllChangeOp(e, menuId) {
  const item = unref(dataMap)[menuId];
  item.checkAll = e.target.checked;
  item.indeterminate = false;
  item.checkedList = item.checkAll ? item.plainOptions.map((v) => v.value) : [];

  recursionParent(item.parentId);
  dataSource.value = [...unref(dataSource.value)];
}
// 处理除了最后一层的全选按钮， 向上和向下遍历
function onCheckAllChangeMenu(e, menuId) {
  const item = unref(dataMap)[menuId];
  item.checkAll = e.target.checked;
  item.indeterminate = false;

  recursionChildren(item.children, item.checkAll);
  recursionParent(item.parentId);
  dataSource.value = [...unref(dataSource.value)];
}

function onCheckAllChangeButton(checkedList, menuId) {
  const item = unref(dataMap)[menuId];
  item.checkedList = checkedList;
  item.checkAll = item.checkedList.length === item.plainOptions.length;
  item.indeterminate = !item.checkAll && !!item.checkedList.length;

  recursionParent(item.parentId);
  dataSource.value = [...unref(dataSource.value)];
}

function handleConfirm() {
  unref(childList).forEach((id) => {
    let item = unref(dataMap)[id];
    item?.pageOpList.forEach((v) => {
      v.isSelected = item.checkedList.includes(v.menuPageId) ? '1' : '0';
    });
  });
  console.log(unref(dataSource));
}

onMounted(() => {
  setTimeout(() => {
    init();
  }, 1000);
});
</script>
