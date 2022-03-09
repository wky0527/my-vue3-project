import $http from '@/utils/http.js';
export const index = (data)=> {
    return $http({
        url: 'order',
        data
    })
}

// // 保存订单
// orders.store = (params) => {
//     return request.post('/api/orders', params);
// };
//
// // 订单详情
// orders.show = (id) => {
//     return request.get(`/api/orders/${id}`);
// };
// //商品名称
// orders.goods = (shopId = {},params = {}) => {
//     return request.get(`/api/goods?shop_id=${shopId}`, params);
// };
// //订单还款计划
// orders.bill = (id) => {
//     return request.get(`/api/orders/${id}/repay-plan`);
// };
// // 订单金额试算
// orders.trial = (params) => {
//     return request.post('/api/orders/trial', params);
// };
//
// // 身份认证
// orders.identity = (id, params) => {
//     return request.post(`/api/orders/${id}/auth/identity`, params);
// };
//
// // 基础信息认证
// orders.base = (id, params) => {
//     return request.post(`/api/orders/${id}/auth/base`, params);
// };
//
// // 单位信息
// orders.company = (id, params) => {
//     return request.post(`/api/orders/${id}/auth/company`, params);
// };
//
// // 补充信息
// orders.supplement = (id, params) => {
//     return request.post(`/api/orders/${id}/auth/supplement`, params);
// };
//
// // 合同信息 需要 webview渲染
// orders.contract = (id) => {
//     return request.get(`/api/orders/${id}/auth/contract`);
// };
//
// // 绑卡 发送验证码
// orders.bankCardSendCode = (id,params) => {
//     return request.post(`/api/orders/${id}/auth/bank-cards/code`,params);
// };
//
// // 绑卡 绑定验证
// orders.bankCardBind = (id, params) => {
//     return request.post(`/api/orders/${id}/auth/bank-cards/bind`, params);
// };
// //获取借款签约持卡人姓名
// orders.accountName = (member_token) => {
//     return request.post(`/api/member`,member_token);
// };
// //确认收货
// orders.receipt = (id,params) => {
//     return request.post(`/api/orders/${id}/receipt`,params);
// };
// //发送验证码
// // orders.smsSend = (params) => {
// //   return request.post(`/api/sms/send`,params);
// // };


