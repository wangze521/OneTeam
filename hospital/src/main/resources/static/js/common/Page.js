Namespace.register('jyzs.common');

jyzs.common.Page = function() {
};

jyzs.common.Page.prototype.tidai = function(selector, oddClass, evenClass,
		mouseoverClass) {
	$(selector).each(function(index, element) {
		if (index > 0 && index % 2 > 0) {
			$(element).removeClass().addClass(oddClass);
		} else {
			$(element).removeClass().addClass(evenClass);
		}
		$(element).unbind('mouseover').mouseover(function() {
			$(this).attr('tmpClass', $(this).attr('class'));
			$(this).removeClass().addClass(mouseoverClass);
		});
		$(element).unbind('mouseout').mouseout(function() {
			$(this).removeClass().addClass($(this).attr('tmpClass'));
		});
	});
};

jyzs.common.Page.prototype.showTab = function(selector) {
	$(selector).each(function(index, element) {
		$(element).mouseover(function() {
			var args = $(this).attr('_onMouseOver').split(',');
			var emObjs = $('#tab' + args[0] + ' em');
			var divObjs = $('#tab' + args[0] + ' div');
			var equalIdx = args[1] - 1;
			$(emObjs).each(function(index, emObj) {
				if (equalIdx == index) {
					$(emObj).addClass('over');
					$(divObjs[index]).addClass('show');
				} else {
					$(emObj).removeClass();
					$(divObjs[index]).removeClass();
				}
			});
		});
	});
};