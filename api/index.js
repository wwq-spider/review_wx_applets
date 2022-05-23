import http from '@/config/requestConfig'
import config from "@/config/index.config.js";

//分析视频路径
export const analysisVideoUrl = `${config.baseUrl}/reviewFront/user/videoAnalysis.do`
//上传视频路径
export const uploadVideoUrl = `${config.baseUrl}/reviewFront/user/uploadVideo.do`
// 获取openid
export const postGetOpenid = (data) => http.post(`${config.baseUrl}/reviewFront/getOpenid.do`, data);
//题目查询
export const postQuestions = (data) => http.post(`${config.baseUrl}/reviewFront/getQuestionsByClassID.do`, data)
//完成测试
export const postCompleteReview = (data) => http.post(`${config.baseUrl}/reviewFront/completeReview.do`, data)
//提交用户信息
export const postRegisterUserInfo = (data) => http.post(`${config.baseUrl}/reviewFront/register.do`, data)
//修改用户信息
export const postUpdateUserInfo = (data) => http.post(`${config.baseUrl}/reviewFront/user/update.do`, data)
//用户是否注册
export const postUserIsRegister = (data) => http.post(`${config.baseUrl}/reviewFront/getUserInfoByOpenid.do`, data)
//查询测评分类
export const postReviewClass = (data) => http.post(`${config.baseUrl}/reviewFront/getReviewClass.do`, data)
//查询测评分类详情
export const postReviewClassDetail = (data) => http.post(`${config.baseUrl}/reviewFront/getReviewClassDetail.do`, data)
//查询报告详情
export const postReportDetail = (data) => http.post(`${config.baseUrl}/reviewFront/getReviewReportDetail.do`, data)
//查询测评记录列表
export const postReviewRecords = (data) => http.post(`${config.baseUrl}/reviewFront/getReviewRecords.do`, data)
//查询测评报告列表
export const postReviewReports = (data) => http.post(`${config.baseUrl}/reviewFront/getReviewReports.do`, data)
//自动加入用户组
export const postJoinUserGroup = (data) => http.post(`${config.baseUrl}/reviewFront/joinUserGroup.do`, data)
//获取项目详情
export const postReviewProjectDetail = (data) => http.post(`${config.baseUrl}/reviewFront/getReviewProjectDetail.do`, data)

//查询测评专题
export const postReviewSubjectClass = (data) => http.post(`${config.baseUrl}/reviewFront/getReviewSubjectClass.do`, data)
//创建预支付订单
export const postCreatePrePayOrder = (data) => http.post(`${config.baseUrl}/reviewFront/order/createPrePayOrder.do`, data)
//更新订单状态
export const postUpdOrderStatus = (data) => http.post(`${config.baseUrl}/reviewFront/order/updateOrderStatus.do`, data)
//查询我的订购
export const postMyOrder = (data) => http.post(`${config.baseUrl}/reviewFront/order/myOrder.do`, data)

//发送短信验证码
export const postSendMsgCode = (data) => http.post(`${config.baseUrl}/reviewFront/sendMsg.do`, data)
//查询通知公告
export const postNoticeList = (data) => http.post(`${config.baseUrl}/reviewFront/notice/list.do`, data)
//查询通知详情
export const postNoticeDetail = (data) => http.post(`${config.baseUrl}/reviewFront/notice/detail.do`, data)
//查询banner列表
export const postBannerList = (data) => http.post(`${config.baseUrl}/reviewFront/banner/list.do`, data)

//查询量表对应的报告模板
export const postReportTemplateList = (data) => http.post(`${config.baseUrl}/reviewFront/report/list.do`, data)