import http from '@/config/requestConfig';
import config from "@/config/index.config.js";

//分析视频路径
export const analysisVideoUrl = `${config.baseUrl}/reviewFront/videoAnalysis/videoAnalysis`
//上传视频路径
export const uploadVideoUrl = `${config.baseUrl}/reviewFront/videoAnalysis/uploadVideo`
// 获取openid
export const postGetOpenid = (data) => http.post(`${config.baseUrl}/reviewFront/user/getOpenid`, data);
//题目查询
export const postQuestions = (data) => http.post(`${config.baseUrl}/reviewFront/reviewClass/getQuestionsByClassID`, data)
//完成测试
export const postCompleteReview = (data) => http.post(`${config.baseUrl}/reviewFront/reviewClass/completeReview`, data)
//提交用户信息
export const postRegisterUserInfo = (data) => http.post(`${config.baseUrl}/reviewFront/user/register`, data)
//修改用户信息
export const postUpdateUserInfo = (data) => http.post(`${config.baseUrl}/reviewFront/user/update`, data)
//用户是否注册
export const postUserIsRegister = (data) => http.post(`${config.baseUrl}/reviewFront/user/getUserInfoByOpenid`, data)
//查询测评分类
export const postReviewClass = (data) => http.post(`${config.baseUrl}/reviewFront/reviewClass/getReviewClass`, data)
//查询测评分类详情
export const postReviewClassDetail = (data) => http.post(`${config.baseUrl}/reviewFront/reviewClass/getReviewClassDetail`, data)
//查询报告详情
export const postReportDetail = (data) => http.post(`${config.baseUrl}/reviewFront/reviewReport/getReviewReportDetail`, data)
//查询测评记录列表
export const postReviewRecords = (data) => http.post(`${config.baseUrl}/reviewFront/reviewClass/getReviewRecords`, data)
//查询测评报告列表
export const postReviewReports = (data) => http.post(`${config.baseUrl}/reviewFront/reviewReport/getReviewReports`, data)
//自动加入用户组
export const postJoinUserGroup = (data) => http.post(`${config.baseUrl}/reviewFront/user/joinUserGroup`, data)
//获取项目详情
export const postReviewProjectDetail = (data) => http.post(`${config.baseUrl}/reviewFront/project/getReviewProjectDetail`, data)

//查询测评专题
export const postReviewSubjectClass = (data) => http.post(`${config.baseUrl}/reviewFront/subject/getReviewSubjectClass`, data)
//创建预支付订单
export const postCreatePrePayOrder = (data) => http.post(`${config.baseUrl}/reviewFront/order/createPrePayOrder`, data)
//更新订单状态
export const postUpdOrderStatus = (data) => http.post(`${config.baseUrl}/reviewFront/order/updateOrderStatus`, data)
//查询我的订购
export const postMyOrder = (data) => http.post(`${config.baseUrl}/reviewFront/order/myOrder`, data)

//发送短信验证码
export const postSendMsgCode = (data) => http.post(`${config.baseUrl}/reviewFront/sendMsg/SendMsgCode`, data)
//查询通知公告
export const postNoticeList = (data) => http.post(`${config.baseUrl}/reviewFront/notice/list`, data)
//查询通知详情
export const postNoticeDetail = (data) => http.post(`${config.baseUrl}/reviewFront/notice/detail`, data)
//查询banner列表
export const postBannerList = (data) => http.post(`${config.baseUrl}/reviewFront/banner/list`, data)
//查询量表对应的报告模板
export const postReportTemplateList = (data) => http.post(`${config.baseUrl}/reviewFront/reviewReport/getReportTemplate`, data)
//查询专家列表
export const postExpertList = (data) => http.post(`${config.baseUrl}/reviewFront/appointExpert/list`,data)
//查询专家详情
export const postCalendarDetail = (data) => http.post(`${config.baseUrl}/reviewFront/appointExpert/detail`,data)
//查询专家日历
export const postListCalendarInfo = (data) => http.post(`${config.baseUrl}/reviewFront/appointExpert/listCalendar`,data)
//预约专家
export const postOrderExpert = (data) => http.post(`${config.baseUrl}/reviewFront/appointExpert/orderExpert`,data)
//保存预约人信息
export const postSaveOoderInfo = (data) => http.post(`${config.baseUrl}/reviewFront/appointExpert/saveOrderInfo`,data)
//查询预约列表
export const postListConsultation = (data) => http.post(`${config.baseUrl}/reviewFront/appointExpert/queryMyConsultation`,data)
//查询预约详情
export const postListConsultationDetai = (data) => http.post(`${config.baseUrl}/reviewFront/appointExpert/queryMyConsultationDetail`,data)
//取消预约
export const postCancelReser = (data) => http.post(`${config.baseUrl}/reviewFront/appointExpert/cancelReservation`,data)
//创建问诊预支付订单
export const postCreateConsulPrePayOrder = (data) => http.post(`${config.baseUrl}/reviewFront/order/createPrePayConsultationOrder`, data)
//用户是否为专家
export const postIsExpert = (data) => http.post(`${config.baseUrl}/reviewFront/appointExpert/isExpert`, data)
//模板消息推送
export const postsendMessage = (data) => http.post(`${config.baseUrl}/reviewFront/sendMsg/sendSubscribeMessage`, data)
//给专家发送房间号
export const postSendRoomId = (data) => http.post(`${config.baseUrl}/reviewFront/sendMsg/sendRoomId`, data)
//给专家发送咨客预约成功的短信提醒
export const postSendAppointSuccessMsg = (data) => http.post(`${config.baseUrl}/reviewFront/sendMsg/sendAppointSuccessMsg`, data)
//栋梁测试-验证测评码
export const postVerifyEvalCode = (data) => http.post(`${config.baseUrl}/reviewFront/dongLiang/verifyEvalCode`, data)
//栋梁测试-提交测评
export const postCommitTest = (data) => http.post(`${config.baseUrl}/reviewFront/dongLiang/commitTest`, data)
//获取pdf文件流供前端预览
//export const getPDFStream = (data) => http.get(`${config.baseUrl}/reviewFront/dongLiang/getPDFStream`, data)
//获取测评码
export const postGetEvalCode = (data) => http.post(`${config.baseUrl}/reviewFront/dongLiang/getEvalCode`, data)
//创建预支付订单--栋梁测评码购买
export const postEvalCodePrePayOrder = (data) => http.post(`${config.baseUrl}/reviewFront/order/createEvalCodePrePayOrder`, data)
//测评码订单未支付时，恢复测评码状态
export const postUpdateEvalCodeStock = (data) => http.post(`${config.baseUrl}/reviewFront/dongLiang/updateEvalCodeStock`, data)
//获取测评码价格
export const postEvalPrice = (data) => http.post(`${config.baseUrl}/reviewFront/dongLiang/getEvalPrice`, data)
//获取项目报告
export const postProjectReviewCount = (data) => http.post(`${config.baseUrl}/reviewFront/reviewReport/getProjectReviewCount`, data)
//咨询师对应的预约列表
export const postListAppoint = (data) => http.post(`${config.baseUrl}/reviewFront/appointExpert/queryMyAppoint`,data)
//咨询师确认预约
export const postConfirmAppoint = (data) => http.post(`${config.baseUrl}/reviewFront/appointExpert/postConfirmAppoint`,data)
//咨询师提醒用户支付通知
export const postPayRemind = (data) => http.post(`${config.baseUrl}/reviewFront/sendMsg/postPayRemind`,data)
//获取专家长程培训经历
export const postLongDistanceTrainList = (data) => http.post(`${config.baseUrl}/reviewFront/appointExpert/postLongDistanceTrainList`,data)
//获取推荐量表
export const postPsychoMetrics = (data) => http.post(`${config.baseUrl}/reviewFront/reviewClass/getPsychoMetrics`,data)
//模糊查量表
export const postReviewClassByLike = (data) => http.post(`${config.baseUrl}/reviewFront/reviewClass/getReviewClassByLike`,data)
//量表测评人数
export const postReviewClassNumber = (data) => http.post(`${config.baseUrl}/reviewFront/reviewClass/getReviewClassNumber`,data)
//咨询师擅长领域
export const postExpertFieldGroup = (data) => http.post(`${config.baseUrl}/reviewFront/appointExpert/getExpertFieldGroup`,data)
//咨询师擅长方向标签
export const postBeGoodAtList = (data) => http.post(`${config.baseUrl}/reviewFront/appointExpert/getBeGoodAtList`,data)

/* //创建预约腾讯会议
export const postCreateTXMeeting = (data) => http.post(`${config.baseUrl}/reviewFront/meeting/creatMeeting`, data) */