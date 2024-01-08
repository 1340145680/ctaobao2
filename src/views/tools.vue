<template>
  <div class="main">
    <el-row :gutter="20" class="row">
      <el-col :span="12">
        <el-card class="card">
          <Vue3JsonEditor v-model="json" @json-change="onJsonChange" />
          <el-button type="primary" @click="addState">添加一条状态</el-button>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col :span="24" style="margin-bottom: 20px">
            <el-card class="gptInputBox">
              <el-input v-model="gptInput" :autosize="{ minRows: 5, maxRows: 5 }" type="textarea" placeholder="请输入消息" />
              <el-button round type="primary" @click="run">运行</el-button>
              <!-- <el-button round type="warning">允许向量库1插入</el-button> -->
              <el-button round type="danger">插入向量库2</el-button>
            </el-card>
          </el-col>
          <el-col :span="24">
            <el-card class="card">
              <el-alert title="向量库1" type="success" :closable="false" style="margin-bottom: 20px">
                <template #default>
                  <div class="m">{{ m1 }}</div>
                </template>
              </el-alert>
              <el-alert title="向量库2" type="warning" :closable="false">
                <template #default>
                  <div class="m">{{ m2 }}</div>
                </template>
              </el-alert>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import io from "socket.io-client";
import { Vue3JsonEditor } from "vue3-json-editor";
import main from "@pinia";
const { socketData } = storeToRefs(main());
function onJsonChange(value) {
  json.value = value;
}
function addState() {
  ElMessageBox.prompt("输入状态名称", "提示", {
    confirmButtonText: "添加",
    cancelButtonText: "取消",
  }).then(({ value }) => {
    json.value = { ...json.value, [value]: false };
    ElMessage({
      type: "success",
      message: `添加成功`,
    });
  });
}

const json = ref({
  是否告知服务器: false,
  是否告知金额: false,
  是否下单: false,
  是否改价: false,
  是否付款: false,
  是否告知发货信息: false,
});
//==
const socket = ref(null);
onMounted(() => {
  socket.value = io("http://localhost:810", { query: socketData.value.data });
  socket.value.on("connect", function () {
    ElNotification({
      title: "成功",
      message: "连接测试服务器成功",
      type: "success",
    });
  });
});
const gptInput = ref("");

const m1 = ref("");
const m2 = ref("");


function run() {
  if (!gptInput.value) {
    ElMessage({
      type: "error",
      message: `请输入消息`,
    });
    return;
  }
  socket.value.emit(
    "gpt",
    {
      input: gptInput.value,
      state: json.value,
    },
    (data) => {
      console.log("%c Line:98 🍎 data", "background:#42b983", data);
      m1.value = data.m1
      m2.value = data.m2
    }
  );
}
</script>

<style lang="scss" scoped>
.main {
  padding: 20px;
  height: 100%;
  width: 100%;
  .row {
    height: 100%;
  }
  .card {
    height: 100%;
    
  }
  .gptInputBox {
  }
}
.m{
  white-space: pre-wrap;
    }
</style>
