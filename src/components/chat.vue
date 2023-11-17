<template>
  <div class="chat" ref="middle">
    <div class="firstTime c" v-if="msgList[0] && msgList[0].time">{{ timeFilters(msgList[0].time, "yyyy年mm月dd日 hh:MM") }}</div>
    <div :class="item.identity == 'cs' ? 'cs' : 'user'" v-for="(item, index) in msgList" :key="index" class="f list">
      <div>
        <el-avatar v-if="item.identity == 'cs'" :src="csImg"></el-avatar>
        <el-avatar v-if="item.identity == 'user'" :src="userImg"></el-avatar>
      </div>
      <div class="msg" @click="copy(item.msg)">
        <div class="topBox">
          <span class="name">
            {{ item.name }}
          </span>
          <span class="time">　{{ timeFilters(item.time, "hh时MM分ss秒") }}</span>
        </div>
        <div class="main">
          <div v-if="item.url" class="url">
            <!-- <a :href="item.link">{{ item.msg }}</a> -->
            <a @click="back">{{ item.msg }}</a>
          </div>
          <span v-else style="white-space: pre-wrap">
            {{ item.msg }}
          </span>
          <div v-if="item.cardurl" style="width: 250px; margin-right: 50px" @click="back">
            <div class="box">   
              <span style="mix-blend-mode: 10px">推荐商品</span>
              <van-card num="2" :price="8888" desc="测试" :title="`金币`" thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg" />
            </div>
          </div>
          <div v-if="item.unpaid" style="width: 250px; margin-right: 50px">
            <div class="box">
              <van-card
                num="2"
                :price="item.price"
                desc="测试"
                :title="`${item.number}金币`"
                thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg" />
            </div>
            <div class="menu f frr">
              <div class="obtn c" @click.stop="pay" v-if="showPay">去付款</div>
              <div class="obtn c" v-else>已付款</div>
            </div>
          </div>
          <div class="order" v-if="item.paid" style="width: 250px; margin-right: 50px">
            <div class="msg">
              <van-card num="2" :price="item.price" desc="测试下单" title="方舟金币" thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg" />
              <div class="info fc">
                <span>姓名:测试</span>
                <span>电话:15000000000</span>
                <span>地址:安徽淮北</span>
              </div>
              <div class="menu f frr" v-if="showConfirm">
                <div class="obtn2 c" @click="confirm">确认</div>
                <div class="obtn1 c">修改</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="state f" v-if="item.identity == 'user'">{{ item.read ? "已读" : "未读" }}</div>
    </div>
    <div class="manually c" v-if="manually">
      <span>人工客服 {{ manuallyName }} 将为您服务</span>
    </div>
  </div>
</template>

<script setup>
import { showLoadingToast, showSuccessToast, showFailToast } from "vant";
import router from "@/router/index.js";
import userImg from "@/assets/user.png";
import csImg from "@/assets/cs.png";
import timeFilters from "@/utils/timeFilters.js";
import main from "@pinia";
import _ from "lodash";
const { msgList, manually, manuallyName, state, chatInfo } = storeToRefs(main());

function back() {
  router.push("/");
}
const showConfirm = ref(true);
function confirm() {
  state.value = {
    ordered: true,
    paid: true,
    confirm: true,
  };
  main().socket({
    type: "state",
    state: state.value,
  });
  showSuccessToast("确认成功");
  showConfirm.value = false;
}
const showPay = ref(true);
function pay() {
  ElMessageBox.confirm("是否支付订单", "测试", {
    confirmButtonText: "支付",
    cancelButtonText: "取消支付",
    type: "warning",
    showClose: false,
    closeOnClickModal: false,
  })
    .then(async () => {
      showLoadingToast({
        message: "支付中...",
        forbidClick: true,
      });
      showPay.value = false;
      _.set(chatInfo.value, "state.order.is_pay", true);
      await delay(500);
      showSuccessToast("支付成功");
    })
    .catch(async (e) => {
      showFailToast("取消支付");
    });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const middle = ref(null);
function scrollIntoView() {
  middle.value.scrollTop = middle.value.scrollHeight;
}
defineExpose({
  scrollIntoView,
});
function copy(data) {
  const textarea = document.createElement("textarea");
  textarea.value = data;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  ElMessage.success({
    message: "复制成功",
    type: "success",
  });
}
</script>

<style lang="scss" scoped>
.chat {
  height: 100%;
  padding-bottom: 300px;
  overflow-x: hidden;
  overflow-y: auto;
  .firstTime {
    color: #9e9e9e;
    margin-bottom: 20px;
  }
  .manually {
    margin-top: 20px;
    span {
      background-color: #ffffff81;
      padding: 7px;
      border-radius: 8px;
      font-size: 14px;
      color: #525252;
    }
  }
  .order {
    .msg {
      margin-top: 5px;
      background-color: #fff;
      border-radius: 10px;
      .info {
        span {
          margin-bottom: 5px;
        }
      }
      .menu {
        .obtn1 {
          width: 50px;
          border: #525252 solid 1px;
          padding: 1px 3px;
          border-radius: 15px;
          font-size: 12px;
        }
        .obtn2 {
          width: 50px;
          border: #e35741 solid 1px;
          margin-left: 5px;
          padding: 2px 3px;
          border-radius: 15px;
          background-color: #e35741;
          font-size: 12px;
          color: #fff;
        }
      }
    }
  }
  .list {
    margin-bottom: 10px;
  }
  .cs {
    width: 100%;
    margin-left: 10px;
    .msg {
      margin-left: 5px;
      .topBox {
        .name {
          color: #626262;
          font-size: 14px;
        }
        .time {
          color: #626262;
          font-size: 14px;
        }
      }

      .main {
        margin-top: 5px;
        max-width: 85%;
        background-color: #fff;
        padding: 15px;
        border-radius: 8px;
        white-space: pre-wrap;
        .url {
          white-space: nowrap;
          margin-right: 20px;
          a {
            cursor: pointer;
            white-space: nowrap;
            color: #00a2ff;
          }
        }
      }
      .box {
        margin-top: 5px;
      }
      .menu {
        margin-top: 10px;
        .obtn {
          width: 80px;
          border: #e35741 solid 1px;
          margin-left: 5px;
          padding: 2px 3px;
          border-radius: 15px;
          background-color: #e35741;
          font-size: 12px;
          color: #fff;
        }
      }
    }
  }
  .user {
    width: 100%;
    flex-direction: row-reverse;
    margin-left: -15px;
    .msg {
      max-width: 75%;
      margin-right: 5px;
      position: relative;

      .main {
        border-radius: 8px;
        padding: 15px;
        background-color: #fff8eb;
        white-space: pre-wrap;
      }
    }
  }
  .state {
    align-items: flex-end;
    margin-right: 5px;
    color: #9e9e9e;
  }
}
:deep(.nut-popup) {
  position: absolute;
}
:deep(.nut-overlay) {
  position: absolute;
}
.time {
  color: #626262;
  font-size: 14px;
}
</style>
