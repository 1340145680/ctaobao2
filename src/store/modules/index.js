import axios from "@/utils/axios.js";
import { defineStore } from "pinia";
import socket from "socket.io-client";
import { v4 } from "uuid";
import _ from "lodash";

const main = defineStore("main", {
  state: () => {
    return {
      socketData: {
        baseUrl: localStorage.getItem("url"),
        data: {},
      },
      io: null,
      msgList: [],
      input: "",
      tempMsg: {},
      manually: false,
      manuallyName: "小二",
      inputState: false,
      cmdList: [],
      //==
      chatInfo: {},
      time: null,
    };
  },
  actions: {
    socket(data) {
      this.io.emit("message", data);
    },
    io() {
      let self = this;
      this.io = socket(this.socketData.baseUrl, { query: this.socketData.data });
      this.io.on("connect", function () {
        ElNotification({
          title: "成功",
          message: "连接测试服务器成功",
          type: "success",
        });
        self.newChat();
      });
      this.io.on("connect_error", function (error) {
        ElNotification({
          title: "错误",
          message: "连接服务器失败",
          type: "error",
        });
      });
      this.io.on("end", function (msg) {
        ElNotification({
          title: "结束",
          message: msg,
          type: "warning",
          duration: 0,
        });
        setTimeout(() => {
          self.time = false;
        }, 10000);
      });
      this.io.on("card", async function (data) {
        console.log("%c Line:50 🍫 data", "background:#f5ce50", data);
        if (data.type == "商品付款") {
          self.msgList.push({
            identity: "cs",
            name: "麻瓜",
            time: new Date().getTime(),
            unpaid: true,
            price: data.price,
            number: data.number,
          });
        }
        if (data.type == "商品链接") {
          self.msgList.push({
            identity: "cs",
            name: "麻瓜",
            time: new Date().getTime(),
            cardurl: true,
          });
        }
      }),
        this.io.on("reply", async function (data) {
          if (data.$manually) {
            ElNotification({
              title: "转人工原因",
              message: data.$msg,
              type: "warning",
              duration: 0,
            });
            self.manually = true;
            self.time = false;
            return;
          }
          if (self.chatInfo.other.id == data.$id) {
            let msg = {
              identity: "cs",
              name: "麻瓜",
              msg: data.$msg,
              time: new Date().getTime(),
            };
            self.msgList.push(msg);
            self.chatInfo.state.last_msg_identity = "客服";
            self.chatInfo.history.push({ identity: "客服", type: "消息", time: new Date().getTime(), message: data.$msg, read: "已读" });
          }
          self.inputState = false;
        });
      this.io.on("disconnect", function () {
        ElNotification({
          title: "警告",
          message: "与服务器断开连接",
          type: "warning",
        });
      });
    },
    newChat() {
      let uuid = v4();
      this.chatInfo = {
        state: {},
        history: [],
        other: {
          read: "已读",
          id: uuid,
          cs_id: "0000000",
          user_id: uuid,
        },
      };
      let msg = {
        identity: "cs",
        name: "麻瓜",
        msg: "金币输入1,其他输入2",
        time: new Date().getTime(),
      };
      this.msgList.push(msg);
      setInterval(() => {
        if (this.time) {
          this.io.emit("polling", this.chatInfo);
        }
      }, 2000);
    },
    sendMsg(msg) {
      if (!msg) {
        ElMessage.error("请输入消息");
        return;
      }
      if (this.manually) {
        ElMessage.error("测试已结束,请刷新页面重新测试");
        return;
      }
      this.time = false;
      this.inputState = true;
      this.tempMsg = {
        type: "message",
        msg: msg,
        identity: "user",
        name: "",
        read: true,
        time: new Date().getTime(),
      };
      this.msgList.push({ ...this.tempMsg });
      this.input = "";
      let value = { identity: "用户", type: "消息", time: "", message: msg };
      value.time = new Date().getTime();
      this.chatInfo.history.push(value);
      this.chatInfo.state.last_msg_identity = value.identity;
      this.time = true;
    },
    async order(type) {
      if (type) {
        _.set(this.chatInfo, "state.order.order_id", v4());
        _.set(this.chatInfo, "state.order.is_order", true);
        _.set(this.chatInfo, "state.order.is_pay", true);
      } else {
        _.set(this.chatInfo, "state.order.order_id", v4());
        _.set(this.chatInfo, "state.order.is_order", true);
        _.set(this.chatInfo, "state.order.is_pay", false);
      }
    },
  },
  persist: false,
});

export default main;
