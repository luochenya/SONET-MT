import { post, get, update } from "./request";

// 登录and注册
// 登录and注册
// 会员邮箱登录
export const POST_Login = p => post("/api/auth/login", p);
// 会员邮箱注册
export const POST_Create = p => post("/api/auth/create", p);
// 发送邮箱验证码
export const POST_SendEmailConfirmation = p =>
  post("/api/auth/sendEmailConfirmation", p);
// 驗證邮箱验证码
export const POST_VerificationCode = p => post("/api/auth/verificationCode", p);
// 忘记密码
export const POST_ForgotPassword = p => post("/api/auth/forgotPassword", p);
// 重置密码
export const POST_ForgotChangePassword = p =>
  post("/api/auth/forgotChangePassword", p);
// 登录and注册

// 第一次登录后
// 第一次登录后
// 新人教学轮播图
export const GET_GetNewUserTeaching = p =>
  get("/api/auth/getNewUserTeaching", p);
// 获取偏好列表
export const GET_GetCategoryLists = p => get("/api/auth/getCategoryLists", p);
// 设置偏好
export const POST_SetUserCategory = p => post("/api/auth/setUserCategory", p);
// 第一次登录后

// 首页
// 首页
// 获取个人信息
export const GET_GetUserInfo = p => get("/api/user/me", p);
// 修改個人信息
export const POST_UpdateInfo = p => post("/api/user/updateInfo", p);
// 变更密码
export const POST_ChangePassword = p => post("/api/user/changePassword", p);
// 获取QA分類
export const GET_GetAnswerTag = p => get("/api/question/answer/tag", p);
// QA分類搜索
export const GET_GetAnswerSearch = p => get("/api/question/answer/search", p);
// 首页

// 第三方登录
// 第三方登录
export const POST_ThirdPartyLogin = p => post("/api/login", p);
// 第三方登录

// 公用API
// 公用API
// 獲取市區
export const GET_GetRegion = p => get("/api/region", p);
// 图片上传
export const UPLOAD_Upload = p => update("/api/upload", p);
// 公用API

// 订阅收藏模块
// 订阅收藏模块
// 获取fc管理列表
export const POST_ManageList = p => post("/api/fc/manage/list", p);
// 获取礼物发送记录列表
export const GET_GiftsList = p => get("/api/fc/gifts/list", p);
// 新建礼物发送
export const POST_GiftsCreate = p => post("/api/fc/gifts/create", p);
// 修改礼物发送
export const POST_GiftsUpdate = p => post("/api/fc/gifts/update", p);
// 查看礼物发送
export const GET_Gifts = p => get("/api/fc/gifts/list", p);
// 礼物清单下载
export const GET_DownloadGift = p => get("/api/download/gift", p);
// 订阅收藏模块

// 订阅收藏模块
// 订阅收藏模块
// 订阅管理
export const GET_GetSubscribeList = p => get("/api/fc/my/subscribe/list", p);
// 获取订阅方案
export const GET_GetGrade = p => get("/api/fc/grade", p);
// 订阅免费方案
export const POST_Subscribe = p => post("/api/fc/subscribe", p);
// 取消订阅方案
export const POST_Unsubscribe = p => post("/api/fc/unsubscribe", p);
// 订阅收藏模块

// 訊息中心模块
// 訊息中心模块
// 获取通知设定
export const GET_GetNotice = p => get("/api/notice", p);
// 修改通知设定
export const POST_NoticeUpdate = p => post("/api/notice/update", p);
// 修改FC通知设定
export const POST_NoticeUpdateFc = p => post("/api/notice/update/fc", p);
// 获取系统公告列表
export const GET_Getannouncemen = p => get("/api/platform/announcemen", p);
// 訊息中心模块
