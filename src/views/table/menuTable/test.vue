<template>
  <div>
    <BasicTable :dataSource="dataSource" :expandedRowKeys="expandedRowKeys" @register="registerTable">
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { BasicTable, useTable, BasicColumn } from '/@/components/Table';
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
</script>