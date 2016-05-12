seajs.config({
	//设置路径主要是跨文件夹调用模块   当目录比较深，或需要跨目录调用模块时，可以使用 paths 来简化书写
	paths:{
		"base":"js/base",
		"common":"js/common",
		"jquery":"js/jquery",
		"src":"js/src",
		"kfat":"js/src/kfat"
	},
	//设置别名，方便调用 当模块标识很长时，可以使用 alias 来简化。可以让文件的真实路径与调用标识分开，有利于统一维护
	alias:{
		"jquery":"base/jquery-1.7.2.min",
		"init_cfg":"jquery/jquery.init_cfg",
		"handlebars":"base/handlebars"
	},
	preload:['jquery','handlebars']
});