var topicId;
$(function () {
	
	var url = location.protocol + '//' + location.host + location.pathname.replace(/index(_pre)?\.html?/ig, '');
	var title = document.title;
	var underlineIndex = title.indexOf('_');

	if (underlineIndex != -1) {
		title = title.substr(0, underlineIndex);
	}
	
	$.getJSON('http://pinglun.39.net/topic.aspx?jsoncallback=?&url=' + encodeURIComponent(encodeURIComponent(url)) + '&title=' + encodeURI(encodeURI(title)), function (result) {
		if (result.success) {
			topicId=result.id;
			var topicUrl = 'http://pinglun.39.net/topic.aspx?topicId=' + result.id;
			var form = $('#formComment').attr('action', topicUrl).removeAttr('enctype').submit(function () {
				var elements = form.find('[required]');

				for (var i = 0; i < elements.length; ++i) {
					var e = $(elements[i]);

					if (e.val() == '') {
						alert(e.attr('placeholder'));
						e.focus();
						return false;
					}
				}

				return true;
			});
			var screen = $('#u_ShowComment');
			var template = screen.length > 0 ? screen.html() : '';

			screen.html('');
			$('#sp_CommentRecords1,#sp_CommentRecords2,#sp_CommentRecords3').text(result.postCount);
			$('#a_Comment1,#a_Comment2,#a_Comment3').attr('href', topicUrl);
			form.find('input[type="hidden"]').remove();
			form.find('input[onclick*="SubmitComments"]').replaceWith('<input type="submit" value="发表评论" class="comsub" />');
			form.find('textarea[name="content"]').attr('required', 'required').attr('placeholder', '注：所有评论均需要审核才可以正常显示');
			//form.append('<div class="comment_loginbox"><input type="submit" class="comment_btn_submit formbtns2" value=""/></div>');

			$(result.posts).each(function () {
				screen.append(template.replace('{#评论昵称#}', this.nickname).replace('{#评论时间#}', this.creationDate).replace('{#评论内容#}', this.content));
			});
		}
		else {
			$('#formComment').hide();
		}
	});
	
	$("#c_summit").click(function () {
		var content = $("#formComment #content");
		checkTopicParms(content)
	});
	
	function checkTopicParms(content) {
		var success = false;
		var customWin = $(".comment_tip").length > 0;
		if ($.trim(content.val()) == '') {
			if (customWin) {
				$("#comment_tip1").show();
			}
			else {
				alert(content.attr('placeholder'));
			}
			content.focus();
			return false;
		}
		var isLogin = false;
		var isAuditUser = false;
		//验证用户
		$.ajax({
			url: "http://pinglun.39.net/CheckUser.aspx?jsoncallback=?&",
			type: "get",
			dataType: "jsonp",
			success: function (d) {
				if (!d.success && !customWin){
					alert(d.message);
				}
				isAuditUser = d.IsAuditUser;
				isLogin = d.IsLogin;
				success = d.success;
				if ((!isLogin || !isAuditUser) && customWin) {
					$("#comment_tip2").show();
				}
				if (success) {
					summit_success(); 
				}
			}
		});
	}
	
	function summit_success() {
        if(!topicId) return;				
		var url="http://pinglun.39.net/TopicCors.aspx";
		var content=$("#formComment #content").val();
		$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			xhrFields: {  withCredentials: true  },
			data:{ topicId:topicId,content:content },
			success: function (data) {
					$("#formComment #content").val('');
					$("#comment_tip3").show();
			}
		});		
	}
	
	$(".tipsclose").click(function () { $(".comment_tip").hide(); });
	
	var isLogin2 = false;
	$.ajax({
        url: "http://pinglun.39.net/CheckUser.aspx?jsoncallback=?&",
        type: "get",
        dataType: "jsonp",
        success: function (data2) {
            isLogin2 = data2.IsLogin;
			if (isLogin2) {
				$(".art_comment .c_login").hide();
			};
        }
    });
	
});