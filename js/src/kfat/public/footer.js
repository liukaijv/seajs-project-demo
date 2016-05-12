define(function(require, exports, module) {
	var footer = require('/public/footer.html');
    if($('#J_footer')){
    	$('#J_footer').append(footer);
    }
})