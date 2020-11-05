<template>
  <div class="UseQA">
    <div class="UseQA_header">
      <div @click="returnClick()">
        <img src="@/assets/img/returnLeft.png" alt="" />
        使用Q&A
      </div>
      <div>
        會員卡
      </div>
    </div>
    <div class="UseQA_select">
      <select class="UseQASelect" v-model="tag_id" @change="_getAnswerSearch()">
        <option value="" disabled selected style='display:none;'>QA分類</option>
        <option v-for="(item, index) in tagList" :key="index" :value="item.id">{{item.name}}</option>
      </select>
    </div>
    <div class="UseQA_input">
      <input type="text" v-model="title" />
      <button @click="_getAnswerSearch()">
        <img src="@/assets/img/searchFor.png" alt="" />
        搜尋
      </button>
    </div>
    <!-- 有數據 -->
    <div class="UseQA_content" v-for="(item, index) in dataList" :key="index">
      <p @click="openList(index)">
        <em>Q：{{item.title}}</em>
        <img :class="selectList[index] ? 'imgRotate' : ''" src="@/assets/img/iconTop.png" alt="" />
      </p>
      <span v-if="selectList[index]">
        {{item.content}}
      </span>
    </div>
    <!-- 無數據 -->
    <div class="UseQA_null" v-if="dataList && dataList.length == 0">
      <img src="@/assets/img/UseQANull.png" alt="" />
      <p>查無此關鍵字</p>
      <button @click="returnQAList()">返回使用Q&A列表</button>
    </div>
  </div>
</template>

<script>
import { GET_GetAnswerTag, GET_GetAnswerSearch} from "@/api/api"
export default {
  name: "UseQA",
  data() {
    return {
      title: "",
      tag_id: "",
      tagList: [],
      selectList:[],
      dataList: []
    }
  },
  created() {
    this._getAnswerTag()
    this._getAnswerSearch()
  },
  methods: {
    // 獲取QA分類
    _getAnswerTag() {
      GET_GetAnswerTag().then(res => {
        if (res.code == 200) {
          this.tagList = res.data.list
        }
      })
    },
    // QA分類搜索
    _getAnswerSearch() {
      let form = {
        title: this.title,
        tag_id: this.tag_id
      }
      GET_GetAnswerSearch(form).then(res => {
        if (res.code == 200) {
          this.dataList = res.data.list
          res.data.list.forEach((item, index) => {
            this.selectList.splice(index, 0, false)
          }) 
        }
      })
    },
    // 返回上一页
    returnClick() {
      this.$router.push('/MemberCentre')
    },
    // 返回QA列表
    returnQAList() {
      this.title = ""
      this.tag_id = ""
      this._getAnswerSearch()
    },
    // 展開内容
    openList(index) {
      this.selectList.splice(index, 1, !this.selectList[index])
    }
  }
}
</script>

<style lang="scss" scoped>
.UseQA {
  padding: 52px 15px 0;
  .UseQA_header {
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
    justify-content: space-between;
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
  .UseQASelect {
    outline:none;
    padding: 0 15px;
    width: 100%;
    height: 32px;
    border-radius: 16px;
    border: 1px solid #C0CAD3;
    font-size: 14px;
    font-weight: 400;
    color: #585858;
    line-height: 20px;
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    /*在选择框的最右侧中间显示小箭头图片*/
    // background: url("../../assets/img/iconTop.png") no-repeat scroll right center transparent;
    // background-position: 98% 50%;
  }
  .UseQA_select {
    padding: 20px 0;
    border-bottom: 2px solid #EEF1F6;
  }
  .UseQA_input {
    position: relative;
    margin-top: 15px;
    input {
      padding: 0 70px 0 15px;
      width: 100%;
      height: 32px;
      border-radius: 16px;
      border: 1px solid #C0CAD3;
      font-size: 14px;
      font-weight: 400;
      color: #585858;
      line-height: 20px;
    }
    button {
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 67px;
      height: 32px;
      background: #1DB3CE;
      border-radius: 0px 16px 16px 0px;
      font-size: 14px;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 20px;
      img {
        width: 14px;
        height: 14px;
        margin-right: 5px;
      }
    }
  }
  .UseQA_content {
    padding: 20px 0;
    border-bottom: 2px solid #EEF1F6;
    p {
      display: flex;
      align-items: center;
      justify-content: space-between;
      em {
        width: 90%;
        font-size: 14px;
        font-weight: bold;
        color: #2B2B2B;
        line-height: 24px;
      }
      img {
        width: 7px;
        height: 4px;
      }
      .imgRotate {
        transform: rotate(180deg);
      }
    }
    span {
      margin-top: 2px;
      font-size: 14px;
      font-weight: 400;
      color: #9BA1A9;
      line-height: 24px;
    }
  }
  .UseQA_null {
    height: 100%;
    width: 100%;
    text-align: center;
    img {
      margin: 30% auto 18px;
      width: 117px;
      height: 101px;
    }
    p {
      margin-bottom: 35px;
      font-size: 14px;
      font-weight: 400;
      color: #2B2B2B;
      line-height: 20px;
    }
    button {
      width: 158px;
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
</style>