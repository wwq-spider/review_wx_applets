import http from '@/config/requestConfig'
import config from "@/config/index.config.js";

// 获取openid
export const postGetOpenid = (data) => http.post(`${config.baseUrl}/reviewFront/getOpenid.do`, data);
//题目查询
export const postQuestions = (data) => http.post(`${config.baseUrl}/reviewFront/getQuestionsByClassID.do`, data)
//完成测试
export const postCompleteReview = (data) => http.post(`${config.baseUrl}/reviewFront/completeReview.do`, data)
//提交用户信息
export const postRegisterUserInfo = (data) => http.post(`${config.baseUrl}/reviewFront/register.do`, data)
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