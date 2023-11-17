<template>
  <div class="phone pr">
    <el-carousel height="500px">
      <el-carousel-item v-for="(item, index) in imgList" :key="index">
        <el-image style="width: auto; height: 100%" :src="item"></el-image>
      </el-carousel-item>
    </el-carousel>
    <div class="box">
      <nut-price :price="8888" :decimal-digits="0" need-symbol thousands size="large" />
      <div class="title">方舟金币 测试 方舟金币 测试方舟金币 测试方舟金币 测试方舟金币 测试</div>
      <div class="salesVolume">已售40000+</div>
      <div class="shippingAddress">
        <div class="address f ac">
          <div class="c">
            <i-transporter theme="outline" size="24" fill="#333" />
          </div>
          <div class="spanTile fc">
            <div>
              <span>安徽淮北</span>
              　
              <span>快递:免运费</span>
            </div>
            <span>现在付款,48小时内发货</span>
          </div>
        </div>
        <div class="address f ac jb">
          <div class="f ac">
            <div class="c">
              <i-like theme="outline" size="24" fill="#333" />
            </div>
            <div class="spanTile ac">7天无理由退货</div>
          </div>
          <i-right theme="outline" size="24" fill="#333" />
        </div>
        <div class="address f ac jb">
          <div class="f ac">
            <div class="c">
              <i-all-application theme="outline" size="24" fill="#333" />
            </div>
            <div class="f" style="margin-left: 5px">
              <el-image
                v-for="(item, index) in 5"
                :key="index"
                style="width: 40px; height: 40px; border-radius: 8px; margin-right: 5px"
                src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
            </div>
          </div>
          <i-right theme="outline" size="24" fill="#333" />
        </div>
      </div>
      <div class="comment">
        <div class="title ac jb">
          <span>评论(1000+)</span>
          <i-right theme="outline" size="24" fill="#333" />
        </div>
        <div class="tips ac">
          <span>服务到位(99+)</span>
          <span>发货速度快(99+)</span>
        </div>
        <div style="margin-top: 10px; padding-bottom: 10px">
          <nut-comment :images="cmt.images" :videos="cmt.videos" :info="cmt.info" :operation="['replay']">
            <template #comment-labels>
              <img
                class="nut-comment-header__labels--item"
                src="https://img11.360buyimg.com/imagetools/jfs/t1/211858/17/4258/12101/618e6f78Ed0edcadc/e83a673555edf59f.jpg" />
            </template>
          </nut-comment>
        </div>
      </div>
    </div>
    <div>
      <div class="c" style="height: 40px; background-color: #f9f9f9">--宝贝详情--</div>
      <el-image :src="shop"></el-image>
    </div>
  </div>
</template>

<script setup>
import j1 from "@/assets/j1.png";
import j2 from "@/assets/j2.png";
import j3 from "@/assets/j3.png";
import j4 from "@/assets/j4.png";
import shop from "@/assets/shop.png";

const imgList = ref([j1, j2, j3, j4]);

let cmt = ref({});
onMounted(() => {
  fetch("//storage.360buyimg.com/nutui/3x/comment_data.json")
    .then((response) => response.json())
    .then((res) => {
      cmt.value = res.Comment;
    })
    .catch((err) => console.log("Oh, error", err));
});
</script>

<style lang="scss" scoped>
.phone {
  padding-bottom: 80px;
  width: 100%;
  .box {
    padding: 20px;
    .title {
      margin-top: 10px;
      font-weight: 600;
      font-size: 24px;
    }
    .salesVolume {
      margin-top: 5px;
      font-size: 16px;
      color: #99a9bf;
    }
  }
  .shippingAddress {
    border-radius: 10px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    width: 100%;
    background-color: #f9f9f9;
    .address {
      height: 80px;
      border-bottom: 2px solid #f5f5f5;
      .spanTile {
        margin-left: 10px;
        height: 50px;
      }
    }
  }
  .comment {
    border-radius: 10px;
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 5px;
    width: 100%;
    background-color: #f9f9f9;
    .title {
      height: 50px;
      font-size: 16px;
      border-bottom: 1px solid #f6f6f6;
    }
    .tips {
      height: 50px;
      border-bottom: 1px solid #f6f6f6;
      & > span {
        background-color: #ffe6e2;
        padding: 8px;
        margin-right: 10px;
        border-radius: 15px;
        color: #de5e25;
      }
    }
  }
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
