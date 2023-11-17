<template>
  <div class="shop c">
    <div class="pr phone">
      <phone />
      <div class="menu pa ac f ja">
        <div class="f ja" style="width: 40%">
          <div class="btn fc c">
            <i-application theme="outline" size="20" fill="#e39164" />
            <span class="btntitle">店铺</span>
          </div>
          <div class="btn fc c" @click="jump" style="cursor: pointer">
            <i-topic theme="outline" size="20" fill="#4a4a4a" style="transform: rotate(180deg) rotateY(180deg)" />
            <span class="btntitle">客服</span>
          </div>
          <div class="btn fc c" @click="set">
            <i-star theme="outline" size="20" fill="#4a4a4a" />
            <span class="btntitle">收藏</span>
          </div>
        </div>

        <div class="buy f ac" @click="base = true">
          <div class="buy1 c">加入购物车</div>
          <div class="buy2 c">立即购买</div>
        </div>
      </div>
      <nut-sku v-model:visible="base" :sku="data.sku" :goods="data.goods" @selectSku="selectSku" @clickBtnOperate="clickBtnOperate"></nut-sku>
    </div>
  </div>
</template>

<script setup>
import phone from "@/components/phone.vue";
import router from "@/router/index.js";
import { showLoadingToast, showSuccessToast } from "vant";
import main from "@pinia";
function jump() {
  router.push("/chat");
}

const base = ref(false);
const data = ref({
  sku: [],
  goods: {},
});
onMounted(() => {
  fetch("https://storage.360buyimg.com/nutui/3x/data.js")
    .then((response) => response.json())
    .then((res) => {
      const { Sku, Goods, imagePathMap } = res;
      data.value.sku = Sku;
      data.value.goods = Goods;
    }); //执行结果是 resolve就调用then方法
});
// 切换规格类目
function selectSku(ss) {
  const { sku, skuIndex, parentSku, parentIndex } = ss;
  if (sku.disable) return false;
  data.value.sku[parentIndex].list.forEach((s) => {
    s.active = s.id == sku.id;
  });
  data.value.goods = {
    skuId: sku.id,
    price: "4599.00",
    imagePath: "//img14.360buyimg.com/n4/jfs/t1/215845/12/3788/221990/618a5c4dEc71cb4c7/7bd6eb8d17830991.jpg",
  };
}
async function clickBtnOperate(op) {
  ElMessageBox.confirm("请选择用户行为", "测试方式", {
    confirmButtonText: "下单支付",
    cancelButtonText: "只下单",
    type: "warning",
    showClose: false,
    closeOnClickModal: false,
  })
    .then(async () => {
      showLoadingToast({
        message: "支付中...",
        forbidClick: true,
      });
      await delay(500);
      main().order(true);
      showSuccessToast("支付成功");
      await delay(500);
      base.value = false;
    })
    .catch(async () => {
      showLoadingToast({
        message: "正在下单...",
        forbidClick: true,
      });
      await delay(500);
      main().order(false);
      showSuccessToast("下单成功");
      await delay(500);
      base.value = false;
    });
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function set() {
  ElMessageBox.prompt("输入后端地址", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  }).then(({ value }) => {
    localStorage.setItem("url", value);
    main().io();
    showSuccessToast("修改成功");
  });
}
</script>

<style lang="scss" scoped>
.shop {
  width: 100%;
  height: 100%;
  background: #f0efe9;
  .phone {
    overflow-x: hidden;
    overflow-y: auto;
    width: 450px;
    height: 900px;
    background: #fff;
  }
  .menu {
    background-color: #ffffff;
    left: 0;
    bottom: 0;
    border-top: 1px solid #f7f7f7;
    height: 70px;
    width: 100%;
    .btn {
      .btntitle {
        font-size: 10px;
        color: #4a4a4b;
      }
    }
    .buy {
      width: 250px;
      overflow: hidden;
      height: 50px;
      background-color: #fec100;
      border-radius: 25px;
      font-weight: 600;
      color: #fff;
      .buy1 {
        width: 50%;
        height: 100%;
        background: linear-gradient(to right, #fec904, #fe9102);
      }
      .buy2 {
        width: 50%;
        height: 100%;
        background: linear-gradient(to right, #ff7a03, #fe5609);
      }
    }
  }
}
:deep(.nut-popup) {
  position: absolute;
}
:deep(.nut-overlay) {
  position: absolute;
}
</style>
