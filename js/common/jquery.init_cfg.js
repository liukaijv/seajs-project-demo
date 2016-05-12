$.extend({
	init_cfg:{
		current_url:"/"
		,kfsp_url:"/"
		,kasp_url:"/kasp/"
		,file_server:"/fileserver/"
		//支持的渠道 AL(同时支持三方存管和三方支付),TP(只支持三方支付),CG(只支持三方存管)
		,supportchannel:"AL"
		,checkCode: false// 是否验证验证码，true：要验证，false：不需验证
		,themeid:"ronghuitong"
	}
});