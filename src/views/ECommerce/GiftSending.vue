<template>
  <div class="GiftSending">
    <div class="GiftSending_header">
      <div @click="returnClick()">
        <img src="@/assets/img/returnLeft.png" alt="" />
        禮物發送
      </div>
    </div>
    <div class="GiftSending_search">
      <input type="text" />
      <button>
        <img src="@/assets/img/searchFor.png" alt="" />
        搜尋
      </button>
    </div>
    <div class="GiftSending_content" v-for="(item, index) in dataList" :key="index" @click="examine(item)">
      <div>
        <h2>{{item.title}}</h2>
        <h3>{{item.content}}</h3>
      </div>
      <div>
        <h4 v-if="!item.type">未發送</h4>
        <p v-if="item.type">已發送</p>
        <span>發送{{item.num}}人</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GiftSending",
  data() {
    return {
      dataList: [
        {
          title: "PP mini 小小企鵝",
          content: "小飛機",
          num: "98234",
          type: true
        },
        {
          title: "PP mini 小小企鵝",
          content: "小飛機",
          num: "98234",
          type: true
        },
        {
          title: "PP mini 小小企鵝",
          content: "小飛機",
          num: "98234",
          type: false
        }
      ]
    }
  },
  methods: {
    // 返回上一页
    returnClick() {
      this.$router.push('/MemberCentre')
    },
    // 查看
    examine(item) {
      this.$router.push('/GiftSendingExamine')
    }
  }
}
</script>

<style lang="scss" scoped>
.GiftSending {
  padding: 52px 15px 0;
  .GiftSending_header {
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
  .GiftSending_search {
    margin: 15px 0;
    width: 100%;
    height: 32px;
    position: relative;
    input {
      padding: 0 85px 0 15px;
      width: 100%;
      height: 100%;
      background: #FFFFFF;
      border-radius: 16px;
      border: 1px solid #C0CAD3;
    }
    button {
      position: absolute;
      right: 0;
      top: 0;
      width: 81px;
      height: 32px;
      background: #1DB3CE;
      border-radius: 0px 16px 16px 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 20px;
      img {
        width: 16px;
        height: 16px;
        margin-right: 3px;
      }
    }
  }
  .GiftSending_content {
    padding: 13px 0;
    border-bottom: 2px solid #EEF1F6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      h2 {
        font-size: 14px;
        font-weight: 400;
        color: #585858;
        line-height: 20px;
      }
      h3 {
        margin-top: 2px;
        font-size: 14px;
        font-weight: 400;
        color: #9BA1A9;
        line-height: 20px;
      }
      h4 {
        text-align: right;
        font-size: 14px;
        font-weight: bold;
        color: #C64040;
        line-height: 20px;
      }
      p {
        text-align: right;
        font-size: 14px;
        font-weight: bold;
        color: #1DB3CE;
        line-height: 20px;
      }
      span {
        text-align: right;
        margin-top: 2px;
        font-size: 14px;
        font-weight: 400;
        color: #9BA1A9;
        line-height: 20px;
      }
    }
  }
  .GiftSending_content:last-child{
    border-bottom: none;
  }
}
</style>