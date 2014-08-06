(function(w, undefined) {
//	var baseUrl = 'http://221.213.101.79:8080/tjpowermgm/';
	var baseUrl = 'http://192.168.0.101:8080/tjpowermgm/';
	w.Settings = {
		loginUrl : baseUrl + 'user/login?callback=JSON_CALLBACK',
		homeUrl : baseUrl + 'productins/getFrontPageMessage',
		orderQuery : baseUrl + 'EOrder/getOrderByAdmin?callback=JSON_CALLBACK',
		orderDeal : baseUrl + 'EOrder/updataOrderStatus?callback=JSON_CALLBACK'
	}
})(window, undefined);
