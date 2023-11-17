<template>
  <div class="shop c">
    <div class="pr phone">
      <div class="titleBox ac jb">
        <div class="c" style="margin-left: 10px">
          <i-left theme="outline" size="24" fill="#333" @click="back" style="cursor: pointer" />
          <span style="margin-left: 10px; font-weight: 600">{{ inputState ? "客服正在输入..." : "方舟金币小铺" }}</span>
        </div>
        <div class="f ac je" style="width: 80px">
          <div class="dianpu">店铺</div>
          <i-more theme="outline" size="24" fill="#333" />
        </div>
      </div>
      <chat ref="chatRef" />
      <div class="menu fc pa je">
        <div class="show f je">
          <div class="tips c">
            <i-smiling-face theme="outline" size="20" fill="#de8e5d" />
            评价客服
          </div>
          <div class="tips c">
            <i-command theme="outline" size="20" fill="#de8e5d" />
            全部服务
          </div>
        </div>
        <div class="input f je">
          <div class="microphone">
            <i-voice theme="outline" size="24" fill="#333" />
          </div>
          <div class="inputBox f ac jb">
            <el-input
              class="inputMain"
              type="textarea"
              ref="inputRef"
              resize="none"
              :autosize="{ minRows: 1, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="input"
              @keydown.enter.exact="sendMessage"
              @keydown.enter.ctrl.exact="newLine"></el-input>

            <!-- <input type="text" v-model="input" @keyup.enter="handleEnter" :disabled="manually" /> -->
            <i-slightly-smiling-face
              theme="multi-color"
              size="45"
              :fill="['#fff', '#fff', '#111111', '#111111']"
              @click="handleEnter"
              style="cursor: pointer" />
          </div>
          <div class="cart">
            <i-mall-bag theme="outline" size="24" fill="#333" />
          </div>
          <div class="add">
            <i-plus theme="outline" size="24" fill="#333" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <transition name="el-fade-in">
    <div title="思考过程" v-show="drawer" class="thinkBox pr">
      <div class="log" ref="logRef">
        <span v-for="(item, index) in cmdList">
          <p :key="index">{{ item }}</p>
        </span>
      </div>
      <div class="close pa c" @click="drawer = false">
        <i-close-small theme="outline" size="30" fill="#fff" />
      </div>
    </div>
  </transition>
  <!-- <el-button class="think" type="primary" @click="drawer = true">思考过程</el-button> -->
</template>

<script setup>
import chat from "@/components/chat.vue";
import router from "@/router/index.js";
import main from "@pinia";
const { inputState, input, manually, cmdList } = storeToRefs(main());

const drawer = ref(false);
const isScrolledToBottom = ref(false);
const logRef = ref(null);
onMounted(async () => {
  await nextTick();
  logRef.value.addEventListener("scroll", () => {
    if (logRef.value.scrollTop + logRef.value.clientHeight === logRef.value.scrollHeight) {
      isScrolledToBottom.value = true;
    } else {
      isScrolledToBottom.value = false;
    }
  });
});

watch(cmdList.value, () => {
  if (isScrolledToBottom.value && logRef.value) {
    logRef.value.scrollTop = logRef.value.scrollHeight;
  }
});
function back() {
  router.push("/");
}
function handleEnter() {
  main().sendMsg(input.value);
}
const chatRef = ref(null);
function sendMessage(event) {
  if (!event.ctrlKey) {
    event.preventDefault();
    handleEnter();
    nextTick(() => {
      chatRef.value.scrollIntoView();
    });
  }
}
const inputRef = ref(null);
const newLine = (event) => {
  event.preventDefault();
  const textarea = inputRef.value.$refs.textarea;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  input.value = input.value.substring(0, start) + "\n" + input.value.substring(end);
  nextTick(() => {
    textarea.selectionStart = textarea.selectionEnd = start + 1;
  });
};
</script>

<style lang="scss" scoped>
.shop {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .phone {
    overflow: hidden;
    width: 450px;
    height: 900px;
    background: #efefef;
  }
  .titleBox {
    height: 60px;
  }
  .menu {
    background-color: #efefef;
    left: 0;
    bottom: 0;
    height: auto;
    padding-bottom: 10px;
    width: 100%;
    .show {
      width: 50%;
      .tips {
        background-color: #f6f6f6;
        margin: 5px;
        padding: 5px;
        border-radius: 20px;
      }
    }
    .input {
      align-items: flex-end;
      .microphone {
        padding: 10px;
        background-color: #fff;
        border-radius: 17px;
      }
      .inputBox {
        width: 55%;
        background-color: #fff;
        border-radius: 17px;
        overflow: hidden;
        .inputMain {
          height: 100%;
          border: none !important;
          outline: none !important;
          background-color: #fff;
          &:active {
            border: none !important;
            outline: none !important;
          }
        }
      }
      .cart {
        padding: 10px;
        background-color: #fff;
        border-radius: 17px;
      }
      .add {
        padding: 10px;
        background-color: #fff;
        border-radius: 17px;
      }
    }
  }
}
.dianpu {
  font-size: 12px;
  padding: 5px;
  border-radius: 20px;
  border: 1px solid #acacac;
}
.log {
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #23272e;
  width: 100%;
  height: 100%;
  padding: 10px;
  word-break: normal;
  span {
    color: #fff;
    word-break: normal;
    display: block;
    word-wrap: break-word;
    overflow: hidden;
  }
}
.thinkBox {
  position: fixed;
  left: 0;
  top: 0;
  width: 20vw;
  height: 100%;
  z-index: 12;
  .close {
    top: 50%;
    right: -60px;
    width: 50px;
    height: 50px;
    background: red;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background: rgb(211, 0, 0);
    }
  }
}
.think {
  position: fixed;
  bottom: 100px;
  left: 100px;
}
</style>
