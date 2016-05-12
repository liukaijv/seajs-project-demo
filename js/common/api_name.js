define(function(require, exports, module) {
	/*
		本文件用于管理api   
	*/
	require("base/base64.js");
	require("base/json2.js");
	require("base/md5.js");
	var kfsp_kingt = kfsp_kingt || {};
	
////// 不鉴权的接口================================================================================
	
	/** 获取广告 */
	kfsp_kingt.get_ad = "kingdom.kifp.v3_1_get_adv";//v1.0";
	/** 获取新闻 */
	kfsp_kingt.get_news = "kingdom.kifp.v3_get_news_info";//v1.0";
	/** 获取上一条和下一条新闻 */
	kfsp_kingt.get_news_next = "kingt.kifp.v3_get_news_next";//v1.0";
	/** 获取新闻分类 */
	kfsp_kingt.get_news_cat = "kingdom.kifp.get_news_cat";//v1.0";
	/** 增加新闻点击 */
	kfsp_kingt.add_news_viewcont = "kingdom.kifp.api_modify_cms_article_view_count";//v1.0";
	/** 获取评论 */
	kfsp_kingt.get_comment ="kingdom.kifp.get_comment";//v1.0";
	/** 给评论点赞 */
	kfsp_kingt.add_comment_praise  = "kingdom.kifp.add_comment_praise";//v1.0";
	
	/** 注册人数、债权融资总额+融资基数、转让总额、兑换总额 */ //注册人数（单位：人）、融资总额（单位：元）、转让总额（单位：元）、兑换总额（单位：元），可投资的债权产品总数（单位：个），可投资的债权转让产品总数（单位：个）
	kfsp_kingt.get_licai_statistics = "kingdom.kifp.get_all_kind_total";//v1.0";
	/** 获取理财产品 */
	kfsp_kingt.get_licai = "kingdom.kifp.get_kifp_allbondlist_custom";//v1.0";
	/** 获取理财投资信息 */
	kfsp_kingt.get_licai_invest_info = "kingt.kifp.get_invest_product_info";//v1.1";
	/** 获取理财产品 */
	kfsp_kingt.get_licai_by_id = "kingdom.kifp.kifp_get_proudct_by_id";//v1.1";
	/** 获取理财产品的扩展信息 */
	kfsp_kingt.get_licai_extend="kingdom.kifp.get_detail_borrow_other";//v1.0";
	/** 获取热门的理财产品 */
	kfsp_kingt.get_licai_hot = "kingt.kifp.get_hot_product";//v1.1";
	/** 获取理财产品列表，可通过最大最小融资期限等条件搜索 */
	kfsp_kingt.get_licai_for_search = "kingdom.kifp.get_product_detail";//v1.1";
	/** 获取理财风云榜 */
	kfsp_kingt.get_licai_rank = "kingt.kifp.api_get_invest_top";//v1.0";
	/** 获取理财投资记录 */
	kfsp_kingt.get_licai_record = "kingt.kifp.kifp_rds_bal_borrow_investtop";//v1.0"
	/** 获取产品渠道 */
	kfsp_kingt.get_channel = "kingdom.kifp.kifp_pif_channelno_select";//v1.0"
	/** 获取产品预期收益 */
	kfsp_kingt.get_licai_rewards = "kingdom.kifp.get_query_borrow_interest_info";//v1.0"
	/** 根据产品id和投资金额，获取预期收益 */
	kfsp_kingt.get_reward = "kingdom.kifp.select_kifp_shx_contract_info";//v1.0"
	
	/** 获取转让产品列表 */
	kfsp_kingt.get_transfer = "kingdom.kifp.get_kifp_newtransferlist";//v1.0"
	/** 获取转让产品信息--转让成交页面 */
	kfsp_kingt.get_transfer_info = "kingdom.kifp.api_transferconfirmwidget";//v1.0"
	/** 用于检查转让专区产品的状态（进入转让成交页面前） */
	kfsp_kingt.get_transfer_status = "kingdom.kifp.get_transfer_status";//v1.0"
	
	/** 获取股权列表 */
	kfsp_kingt.get_stock_list = "kingt.kifp.get_list_stock";//v1.0";
	/** 获取股权融资总额 */
	kfsp_kingt.get_stock_statistics = "kingdom.kifp.get_stock_total";//v1.0";
	/** 获取股权投资风云榜 */
	kfsp_kingt.get_stock_invest_rank = "kingdom.kifp.api_get_stock_invest_top";//v1.0"
	
	/** 获取运营时间天数 */
	kfsp_kingt.get_running_period = "kingdom.kifp.get_bondsys_online_days";//v1.0";
	/** 获取发行机构 */
	kfsp_kingt.get_issue_org = "kingt.kifp.get_org_pif_borrow_product_total";//v1.0";
	/** 获取年化收益率、会员人数、融资总额等统计数据 */
	kfsp_kingt.get_statistics = "kingt.kifp.api_get_invest_total";//v1.0";
	/** 获取上传文件 */
	kfsp_kingt.get_files ="kingdom.kifp.get_detail_borrow_filelist";//v1.0";
	/** 获取关注的项目 */
	kfsp_kingt.get_focus = "kingdom.kifp.get_focus";//v1.0";
	/** 获取字典 */
	kfsp_kingt.get_dic = "kingdom.kifp.get_dict";//v1.0";
	/** 获取股权字典，如行业、省份 */
	kfsp_kingt.get_stock_dic = "kingdom.kifp.f_kifp_get_all_project_dict";//v1.0";
	/** 计算器 */
	kfsp_kingt.calculator = "kingdom.kifp.get_interesttools";//v1.0";
	/** 通过登录名获取用户信息 */
	kfsp_kingt.get_cust_by_name = "kingdom.kifp.get_cust_info_by_name";//v1.0";
	/** 获取系统参数，如订单持续时间 */
	kfsp_kingt.get_sys_param = "kingdom.kifp.get_sys_param_setting";//v1.0
	/** 获取协议 */
	kfsp_kingt.get_agreement = "kingdom.kifp.get_agreement_content";//v1.0	
	/** 获取合同 */
	kfsp_kingt.get_agreement = "kingdom.kifp.show_contract";//v1.0	
////// 鉴权的接口==================================================================================
	/** 获取融资记录 */
	kfsp_kingt.get_finance_record = "kingdom.kifp.get_sale_flow"// ,v1.1 
	
	/** 获取站内信数量 */
	kfsp_kingt.get_mail_count = "kingdom.kifp.count_newnotice_by_custid";//v1.1";

	/** 新增评论 */
	kfsp_kingt.add_comment  = "kingdom.kifp.insert_comment";//v1.0";

	/** 查询客户签约资金账户信息 */
	kfsp_kingt.get_capinfo = "kingdom.kifp.get_cust_capinfo";//v1.0";
	/** 查询客户账户信息 */
	kfsp_kingt.get_account_info = "kingdom.kifp.get_accountinfo_new";//v1.1
	
	/** 获取理财订单信息 */
	kfsp_kingt.get_order_info_new = "kingdom.kifp.get_kifp_order_content_new"//v2.0
	kfsp_kingt.get_order_info = "kingdom.kifp.get_kifp_order_content";//v1.0
	
	/** 债权转让成交 计算认购实际价格和剩余利息 */
	kfsp_kingt.get_transfer_price = "kingdom.kifp.api_bondTransfer_confirmprice"//v1.0
	/** 债权转让发布页面显示 */
	kfsp_kingt.transfer_order = "kingdom.kifp.api_transferorderwidget";//v1.0
	/** 获取债权转让参考数据 */
	kfsp_kingt.get_transfer_refer = "kingdom.kifp.api_transferorderprice";//v1.0
	/** 获取债权转让手续费 */
	kfsp_kingt.get_transfer_charge = "kingdom.kifp.get_charge";//v1.1
	/** 发布转让 */
	kfsp_kingt.transfer_release = "kingdom.kifp.api_bondTransferService";//v1.0
	/** 提交转让订单 */
	kfsp_kingt.create_transfer_order = "kingdom.kifp.api_transfer_creatorder";//v1.0
	
	/** 支付 */
	kfsp_kingt.pay = "kingdom.kifp.set_confirm_pay_order";//v1.0
	/** 获取网银支付银行 */
	kfsp_kingt.get_bank = "kingdom.kifp.get_bank_config";//v1.0
	
	module.exports = kfsp_kingt;
})