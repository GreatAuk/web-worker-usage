<script setup lang="ts">
import FileSaver from "file-saver";
import { ref } from "vue";
import ExcelWorker from "./excel.worker?worker";

import { List } from "@/components";

const loading = ref(false);

const dataSource: any[] = [];
for (let i = 1; i < 200000; i++) {
  dataSource.push({
    key: i,
    name: `name-${i}`,
    age: 18,
    tag: "小羽同学",
    value1: `value1-${i}`,
    value2: `value2-${i}`,
    value3: `value3-${i}`,
  });
}
const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "标签",
    dataIndex: "tag",
    key: "tag",
  },
  {
    title: "value1",
    dataIndex: "value1",
    key: "value1",
  },
  {
    title: "value2",
    dataIndex: "value2",
    key: "value2",
  },
  {
    title: "value3",
    dataIndex: "value3",
    key: "value3",
  },
];

// 子线程导出Excel
const workerExportExcel = async () => {
  const _file: Blob = await new Promise((resolve) => {
    loading.value = true;
    const myWorker = new ExcelWorker();
    myWorker.postMessage({
      columns,
      dataSource,
    });
    myWorker.onmessage = (e) => {
      resolve(e.data.data);
      myWorker.terminate(); // 关闭worker线程
      loading.value = false;
    };
  });
  FileSaver.saveAs(_file, "ExcelJS.xlsx");
};
</script>

<template>
  <main>
    <h3>导出一个有 200000 条数据的 excel, 不阻阻塞 UI 线程</h3>
    <button @click="workerExportExcel" class="btn">
      {{ loading ? "导出中..." : "导出Excel" }}
    </button>
    <list />
  </main>
</template>

<style scoped>
main {
  height: 1000vh;
}
.btn {
  position: fixed;
  top: 40px;
  left: 50%;
}
</style>
