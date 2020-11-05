<template>
  <div class="SystemNotification">
    <div class="SystemNotification_header">
      <div @click="returnClick()">
        <img src="@/assets/img/returnLeft.png" alt="" />
        平台公告
      </div>
    </div>
    <!-- 無數據 -->
    <div class="SystemNotification_null" v-if="dataList && dataList.length == 0">
      <img src="@/assets/img/SystemNotificationNull.png" alt="" />
      <p>尚無任何系統公告</p>
    </div>
    <van-list
      v-if="dataList && dataList.length > 0"
      v-model="loading"
      :finished="finished"
      finished-text="沒有更多了"
      @load="onLoad"
    >
      <div class="SystemNotification_center">
        <div v-for="(item, index) in dataList" :key="index" :class="statusList[index] ? 'divActive' : ''" @click="imgClick(index)">
          <p v-if="!statusList[index]">{{ item.desc }}</p>
          <h5 v-if="statusList[index]" v-html="item.content"></h5>
          <span>
            <em>{{item.release_at}}</em>
            <img src="@/assets/img/iconTop.png" alt="" />
          </span>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { GET_Getannouncemen } from "@/api/api";
export default {
  name: "SystemNotification",
  data() {
    return { 
      loading: false,
      finished: false,
      offset: 1,
      limit: 10,
      total: 0,
      statusList: [],
      dataList: []
    }
  },
  created() {
    this._getannouncemen();
  },
  methods: {
    // 下滑加載
    onLoad() {
      // 异步更新数据
      this.limit += 10
      this._getannouncemen();
    },
    // 返回上一页
    returnClick() {
      this.$router.push('/MemberCentre')
    },
    // 获取公告列表
    _getannouncemen() {
      let form = {
        page: this.offset,
        per_page: this.limit
      };
      GET_Getannouncemen(form).then(res => {
        if (res.code == 200) {
          this.loading = false;
          if (this.limit - 10 >= res.data.pagination.total) {
            this.finished = true;
          }
          this.dataList = res.data.list;
          this.total = res.data.pagination.total;
          this.statusList = []
          res.data.list.forEach((item, index) => {
            this.statusList.splice(index, 0, false);
          });
        }
      });
    },
    // 点击展开公告
    imgClick(index) {
      this.statusList.splice(index, 1, !this.statusList[index]);
    }
  }
}
</script>

<style lang="scss" scoped>
.SystemNotification {
  padding: 52px 15px 0;
  .SystemNotification_header {
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
    div {
      img {
        width: 7px;
        height: 14px;
        margin-right: 10px;
      }
    }
  }
  .SystemNotification_center {
    div {
      padding: 19px 0;
      border-bottom: solid 2px #C0CAD3;
      p, h5 {
        font-size: 14px;
        font-weight: 400;
        color: #2B2B2B;
        line-height: 24px;
      }
      span {
        margin-top: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        em {
          font-size: 12px;
          font-weight: 400;
          color: #9BA1A9;
          line-height: 17px;
        }
        img {
          width: 7px;
          height: 4px;
        }
      }
    }
    .divActive {
      span {
        img {
          transform: rotate(180deg);
        }
      }
    }
    div:last-child {
      border: none;
    }
  }
  .SystemNotification_null {
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