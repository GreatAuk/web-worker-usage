<script setup lang="ts">
const createWorker = (func: () => void) => {
  const blob = new Blob(["(" + func.toString() + ")()"], {
    type: "application/javascript",
  });
  const blobURL = window.URL.createObjectURL(blob);
  const worker = new Worker(blobURL);
  URL.revokeObjectURL(blobURL);
  return worker;
};

function workFun() {
  const worker = self as unknown as Worker;
  function add(a: number, b: number) {
    return a + b;
  }
  worker.onmessage = (e: MessageEvent<[number, number]>) => {
    console.log("Message received from main script");
    const workerResult = "1+2=" + add(e.data[0], e.data[1]);
    worker.postMessage(workerResult);
  };
}

let myWork: Worker | undefined;

const start = () => {
  myWork = createWorker(workFun);
  myWork.onmessage = (e) => {
    console.log("[28]-index.vue", e.data);
    alert(`Message received from worker: ${e.data}`);
  };
  myWork.postMessage([1, 2]);
};
const stop = () => {
  console.log("[34]-index.vue", myWork);
  // 关闭worker线程
  myWork?.terminate();
};
</script>

<template>
  <div>
    <button @click="start">start worker</button>
    <button @click="stop" style="margin-left: 24px">Stop Worker</button>
  </div>
</template>

<style scoped></style>
