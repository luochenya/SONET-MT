<template>
  <div class="SubscriptionManagement">
    <div class="SubscriptionManagement_header">
      <div @click="returnClick()">
        <img src="@/assets/img/returnLeft.png" alt="" />
        訂閱管理
      </div>
    </div>
    <van-list
      v-if="dataList && dataList.length > 0"
      v-model="loading"
      :finished="finished"
      finished-text="沒有更多了"
      @load="onLoad"
    >
      <div class="SubscriptionManagement_box" v-for="(item, index) in dataList" :key="index">
        <img :src="item.avatar" alt="" />
        <div>
          <p>{{item.name}}</p>
          <span>{{item.span}}</span>
          <span>自動續訂日：{{item.auto_renewal_at.split(" ")[0]}}</span>
        </div>
        <button @click="orderChange(item.fan_club_id)">變更</button>
      </div>
    </van-list>
    <!-- 無數據 -->
    <div class="SubscriptionManagement_null" v-if="dataList && dataList.length == 0">
      <img src="@/assets/img/SubscriptionManagementNull.png" alt="" />
      <p>尚無任何訂閱</p>
    </div>

    <!-- 訂購彈窗 -->
    <van-popup v-model="orderPopup" class="SubscriptionManagement_orderPopup">
      <img class="SubscriptionManagement_orderPopup_close" src="@/assets/img/close.png" @click="orderPopup = false" alt="" />
      <h1>訂閱方案</h1>
      <h2>請選擇下列您想要訂閱的方案進行訂閱，訂閱後就可以查看更詳細的內容喔！</h2>
      <div class="SubscriptionManagement_orderPopup_div">
        <div class="SubscriptionManagement_orderPopup_content" v-for="(item, index) in SubscriptionPlanList" :key="index">
          <div>
            <p>{{item.name}} ({{item.days}}日)</p>
            <span v-if="item.type == 'charge'">＄{{item.price}} 元</span>
            <span v-if="item.type == 'free'">免費</span>
          </div>
          <button class="unsubscribe" v-if="item.is_subscribe" @click="unsubscribe()">取消訂閱</button>
          <button class="subscription" v-if="!item.is_subscribe" @click="subscribeClick(item.fan_club_grade_item_id, item.type)">訂閱</button>
        </div>
      </div>
    </van-popup>

    <!-- 取消訂購彈窗 -->
    <van-popup v-model="unsubscribePopup" class="SubscriptionManagement_unsubscribePopup">
      <h1>確定取消</h1>
      <h2>取消訂閱後，下月起將不再享有該方案的粉絲福利</h2>
      <div>
        <button @click="unsubscribePopup = false">取消</button>
        <button class="button" @click="SubscriptionPlanCancelClick()">確定</button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { GET_GetSubscribeList, GET_GetGrade, POST_Unsubscribe, POST_Subscribe } from "@/api/api";
export default {
  name: "SubscriptionManagement",
  data() {
    return {
      fan_club_id: "",
      loading: false,
      finished: false,
      offset: 1,
      limit: 10,
      total: 0,
      orderPopup: false,
      unsubscribePopup: false,
      SubscriptionPlanList: [],
      dataList: []
    }
  },
  created() {
    this._getSubscribeList();
  },
  methods: {
    // 下滑加載
    onLoad() {
      // 异步更新数据
      this.limit += 10
      this._getSubscribeList();
    },
    // 获取订阅管理
    _getSubscribeList() {
      let form = {
        page: this.offset,
        per_page: this.limit
      };
      GET_GetSubscribeList(form).then(res => {
        if (res.code == 200) {
          this.loading = false;
          if (this.limit - 10 >= res.data.pagination.total) {
            this.finished = true;
          }
          this.dataList = res.data.list;
          this.total = res.data.pagination.total;
        }
      });
    },
    // 變更
    // 获取订阅方案
    orderChange(id) {
      this.fan_club_id = id
      this._getGrade()
    },
    _getGrade() {
      GET_GetGrade({ fan_club_id: this.fan_club_id }).then(res => {
        if (res.code == 200) {
          this.orderPopup = true;
          this.SubscriptionPlanList = res.data.list;
        }
      });
    },
    // 订阅订阅方案
    subscribeClick(id, type) {
      // 免费订阅
      if (type == "free") {
        POST_Subscribe({ fan_club_grade_item_id: id }).then(res => {
          if (res.code == 200) {
            this.$toast({
              message: res.msg,
              position: "top"
            });
            this._getGrade();
          }
        });
      } else {
        console.log("收费");
      }
    },
    // 取消訂閲
    unsubscribe() {
      this.unsubscribePopup = true
    },
    // 取消订阅方案 // 残忍取消
    SubscriptionPlanCancelClick() {
      POST_Unsubscribe({ fan_club_id: this.fan_club_id }).then(res => {
        if (res.code == 200) {
          this.$toast({
            message: res.msg,
            position: "top"
          });
          this._getGrade();
          this.unsubscribePopup = false;
        }
      });
    },
    // 返回上一页
    returnClick() {
      this.$router.push('/MemberCentre')
    }
  }
}
</script>

<style lang="scss" scoped>
.SubscriptionManagement {
  padding: 52px 15px 0;
  .SubscriptionManagement_header {
    width: 100%;
    height: 52px;
    padding: 0 15px;
    position: fixed;
    left: 0;
    top: 0;
    border-bottom: 2px solid #EEF1F6;
    background: #ffffff;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    color: #1DB3CE;
    line-height: 22px;
    img {
      width: 7px;
      height: 14px;
      margin-right: 10px;
    }
  }
  .SubscriptionManagement_box {
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #EEF1F6;
    img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
    }
    div {
      width: calc(100% - 155px);
      p {
        font-size: 16px;
        font-weight: bold;
        color: #585858;
        line-height: 22px;
      }
      span {
        display: block;
        margin-top: 5px;
        font-size: 14px;
        font-weight: 400;
        color: #585858;
        line-height: 20px;
      }
    }
    button {
      width: 63px;
      height: 32px;
      background: #1DB3CE;
      border-radius: 16px;
      font-size: 14px;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 20px;
    }
  }
  .SubscriptionManagement_box:last-child {
    border-bottom: none;
  }
  .SubscriptionManagement_orderPopup {
    width: 90vw;
    height: 70vh;
    background: #FFFFFF;
    border-radius: 5px;
    .SubscriptionManagement_orderPopup_close {
      position: absolute;
      right: 15px;
      top: 15px;
      width: 14px;
      height: 15px;
    }
    h1 {
      text-align: center;
      padding: 15px 20px 12px;
      font-size: 14px;
      font-weight: bold;
      color: #676767;
      line-height: 20px;
    }
    h2 {
      padding: 0 20px 20px;
      font-size: 14px;
      font-weight: 400;
      color: #585858;
      line-height: 20px;
    }
    .SubscriptionManagement_orderPopup_div {
      padding: 0 20px 20px;
      height: calc(70vh - 87px);
      overflow-y: scroll;
      .SubscriptionManagement_orderPopup_content {
        padding: 20px 0;
        border-top: 2px solid #EEF1F6;
        display: flex;
        justify-content: space-between;
        div {
          p {
            font-size: 14px;
            font-weight: bold;
            color: #585858;
            line-height: 20px;
          }
          span {
            margin-top: 5px;
            font-size: 12px;
            font-weight: 400;
            color: #585858;
            line-height: 17px;
          }
        }
        .unsubscribe {
          font-size: 14px;
          font-weight: bold;
          color: #1DB3CE;
          line-height: 20px;
        }
        .subscription {
          width: 76px;
          height: 32px;
          background: #1DB3CE;
          border-radius: 16px;
          font-size: 14px;
          font-weight: bold;
          color: #FFFFFF;
          line-height: 20px;
        }
      }
    }
  }
  .SubscriptionManagement_unsubscribePopup {
    width: 300px;
    padding: 30px 40px 24px;
    background: #FFFFFF;
    box-shadow: 0px 0px 84px 0px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    border: 1px solid;
    border-image: linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)) 1 1;
    h1 {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      color: #585858;
      line-height: 28px;
    }
    h2 {
      margin: 12px 0 28px;
      text-align: center;
      font-size: 15px;
      font-weight: 400;
      color: #585858;
      line-height: 24px;
    }
    div {
      display: flex;
      justify-content: space-between;
      button {
        font-size: 14px;
        font-weight: bold;
        color: #1DB3CE;
        line-height: 20px;
        width: 98px;
        height: 32px;
        background: rgba(29,179,206,0.2);
        border-radius: 16px;
      }
      .button {
        color: #FFFFFF;
        background: rgba(29,179,206,1);
      }
    }
  }
  .SubscriptionManagement_null {
    height: 100%;
    width: 100%;
    text-align: center;
    img {
      margin: 40% auto 28px;
      width: 117px;
      height: 101px;
    }
    p {
      font-size: 14px;
      font-weight: 400;
      color: #2B2B2B;
      line-height: 20px;
    }
  }
}
</style>