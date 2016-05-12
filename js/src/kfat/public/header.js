define(function(require, exports, module) {
	var header = require('/public/header.html');
    if($('#J_header')){
    	$('#J_header').append(header);
    }
})