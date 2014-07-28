define([], function () {
    var baseUrl = 'http://192.168.0.111:8080/tjpowermgm/';
    return {
        loginUrl: baseUrl + 'user/login?callback=JSON_CALLBACK',
        homeUrl: baseUrl + 'productins/getFrontPageMessage',
        orderQuery: baseUrl + 'EOrder/getOrderByAdmin?callback=JSON_CALLBACK',
        orderDeal: baseUrl + 'EOrder/updataOrderStatus?callback=JSON_CALLBACK'
    }
});