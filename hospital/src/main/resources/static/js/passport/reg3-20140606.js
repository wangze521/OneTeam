
var verifyConfig_Base = [
    { ID: "pwd", AlertString: "密码填写错误！", Initialize: "请输入6-16位大小写字母、数字或下划线，不能为纯数字", Container: "info_pwd", Required: "最小长度为6个字符", MinLength: 6, MaxLength: 16, Safe3: true },
    { ID: "conpwd", AlertString: "重复输入密码错误！", Initialize: "请再次输入登录密码", Container: "info_conpwd", Required: "最小长度为6个字符", EqualTo: "pwd", EqualToInfo: "两次输入的密码不一致!", MinLength: 6, MaxLength: 16 },
    { ID: "email", AlertString: "EMAIL填写错误", Initialize: "请填写您的邮箱，便于验证和找回密码", Container: "info_email", Required: "请输入有效的邮箱!", Email: "请输入有效的邮箱!", Example: "例如：example@163.com" },
    { ID: "txtSafeCode", AlertString: "验证码填写错误！", Initialize: "请输入图片上的验证码", Container: "info_safecode", Required: "请输入验证码！" }
];
var verifyConfig_email = [
    { ID: "email", AlertString: "EMAIL填写错误", Initialize: "请填写您的邮箱，便于验证和找回密码", Container: "info_email", Required: "请输入有效的邮箱!", Email: "请输入有效的邮箱!", Example: "例如：example@163.com" },
    { ID: "txtSafeCode", AlertString: "验证码填写错误！", Initialize: "请输入图片上的验证码", Container: "info_safecode", Required: "请输入验证码！" }
];
var verifyConfig_phone = [
    { ID: "mobile", AlertString: "请输入有效的手机号！", Initialize: "请输入您的手机号，便于验证和找回密码", Container: "info_mobile", Required: "请输入手机号码！", IsMobile: true, Example: "例如：13570000000" },
    { ID: "pwd2", AlertString: "密码填写错误！", Initialize: "请输入6-16位大小写字母、数字或下划线，不能为纯数字", Container: "info_pwd2", Required: "最小长度为6个字符", MinLength: 6, MaxLength: 16, Safe3: true },
    { ID: "conpwd2", AlertString: "重复输入密码错误！", Initialize: "请再次输入登录密码", Container: "info_conpwd2", Required: "最小长度为6个字符", EqualTo: "pwd2", EqualToInfo: "两次输入的密码不一致!", MinLength: 6, MaxLength: 16 },
    { ID: "token", AlertString: "验证码输入错误！", Initialize: "请输入验证码", Container: "info_token", Required: "请输入验证码!" }
];
var verifyConfig_AuditEmail = [
    { ID: "pwd", AlertString: "密码填写错误！", Initialize: "请输入6-16位大小写字母、数字或下划线，不能为纯数字", Container: "info_pwd", Required: "最小长度为6个字符", MinLength: 6, MaxLength: 16, Safe3: true },
    { ID: "conpwd", AlertString: "重复输入密码错误！", Initialize: "请再次输入登录密码", Container: "info_conpwd", Required: "最小长度为6个字符", EqualTo: "pwd", EqualToInfo: "两次输入的密码不一致!", MinLength: 6, MaxLength: 16 }
];

var verifyConfig_Doctor = [
    { ID: "NameVal", Initialize: "请输入真实姓名", Container: "info_name", Required: "请输入真实姓名", MinLength: 4, MaxLength: 10 },
    { ID: "CityVal", Initialize: "请选择所在城市", Container: "info_region_doctor", Required: "请选择所在城市" },
    { ID: "region_doctor", Initialize: "请选择所在城市", Container: "info_region_doctor", Required: "请选择所在城市" },
    { ID: "HospitalVal", Initialize: "请填写医院全称", Container: "info_hospital", Required: "请输入医院全称", MaxLength: 40 },
    //{ ID: "HospitalLevel", Initialize: "请填写医院级别", Container: "info_hospital_level", Required: "请选择医院级别"},
    //{ ID: "IsPublicHos", Initialize: "请选择", Container: "info_public_hospital", Required: "请选择是否为公立医院" },
    { ID: "Fourm", Initialize: "请选择专业科室", Container: "info_fourm", Required: "请选择专业科室", MaxLength: 20 },
    { ID: "Clinical", Initialize: "请选择临床职称", Container: "info_clinical", Required: "请选择临床职称" },
    { ID: "goodAt_doctor", Initialize: "请概述您擅长治疗的疾病，65字以内", Container: "info_Expertise", Required: "请概述您擅长治疗的疾病，65字以内", MaxLength: 130 }
];

var warnCount = 32;
var hitConfig_find = [];
//表单验证json
var verifyConfig = [];
var unqualified = null;


$(document).ready(function () {

    var regPart = $('#regPart').val();
    if (regPart && regPart != '') {
        verifyConfig = [];
        switch (regPart) {
            case "Base":
                $.each(verifyConfig_Base, function (i, obj) { verifyConfig.push(obj) });
                break;
            case "Email":
                $.each(verifyConfig_email, function (i, obj) { verifyConfig.push(obj) });
                break;
            case "AuditEmail":
                $.each(verifyConfig_AuditEmail, function (i, obj) { verifyConfig.push(obj) });
                break;
            case "Doctor":
                warnCount = 5;
                $.each(verifyConfig_Doctor, function (i, obj) { verifyConfig.push(obj) });
                //hideWin();
                break;
            default:
                break;
        }
        bindEvent();
    }
    $("body").keypress(function () {
        //if (window.event.keyCode == 13) { $('btlogin').click();}
    });

});


function verifyInint(tag) {
    verifyConfig = [];
    if (parseInt(tag) == 1) {
        var regPart = $('#regPart').val();
        if (regPart == "Email") {
            $.each(verifyConfig_email, function (i, obj) { verifyConfig.push(obj) });
        }
        else {
            $.each(verifyConfig_Base, function (i, obj) { verifyConfig.push(obj) });
        }
        $("#regType").val(1);
    }
    else {
        $.each(verifyConfig_phone, function (i, obj) { verifyConfig.push(obj) });
        $("#regType").val(2);
    }
}

//绑定控件事件
function bindEvent() {

    $(':input').each(function (i, obj) {
        $(this).blur(function () {
            singleVerify(obj.id);
        });
    });

    $(':input').each(function (i, obj) {
        $(this).focus(function () {
            showOprationHint(obj.id);
        });
    });

    if ($("#emailAgree")) {
        $("#emailAgree").click(function () {
            if (this.checked) {
                $("#SubEmail").removeClass("disabled");
                $("#submit1").removeAttr("disabled");
            }
            else {
                $("#SubEmail").addClass("disabled");
                $("#submit1").attr("disabled", "disabled");
            }
        });
    }
    if ($("#phoneAgree")) {
        $("#phoneAgree").click(function () {
            if (this.checked) {
                //$("#SubPhone").removeClass("disabled");
                $("#submit2").removeAttr("disabled");
                $("#submit2").val("立即注册");
            }
            else {
                //$("#SubPhone").addClass("disabled");
                $("#submit2").attr("disabled", "disabled");
                $("#submit2").val("请同意服务协议");
            }
        });
    }
    if ($("#GetToken")) {
        $("#GetToken").click(function () {
            //发送验证码
            var mobileInfo = $("#info_mobile");
            var phone = $("#mobile").val();
            var pass = false;
            if (!(/^1\d{10}$/.test(phone)) || isEmpty(phone)) {
                mobileInfo.show()
                mobileInfo.html("请输入有效的手机号！");
                mobileInfo.removeClass();
                mobileInfo.addClass("pass-verify");
                mobileInfo.addClass("pass-verify-error");
                mobileInfo.parent().removeClass("verifyInfo-more");
                return false;
            }

            pass = Phone(null, phone, mobileInfo);
            if (pass) {

                //更新验证码
                updateSC();
                $("#txtSafeCode2").val("");
                var info = $("#info_safecode2");
                info.show();
                info.removeClass();
                info.addClass("pass-verify");
                info.addClass("pass-verify-warn");
                info.html("请输入图片上的验证码");

                $("#phoneNum").html($("#mobile").val());
                PhoneVerBox.Show();
            }
        });
    }
    if ($("#submit1")) {
        $("#submit1").click(function () {
            if (!verify()) {
                return false;
            }
            //if (!CheckRegTimes()) {
            //    alert('注册太频繁，请稍后再试！');
            //    return false;
            //}
            $('#frm').submit();

        });
    }
    if ($("#submit2")) {
        $("#submit2").click(function () {
            var pass = false;
            if (!verify()) {
                return false;
            }
            //if (!CheckRegTimes()) {
            //    alert('注册太频繁，请稍后再试！');
            //    return false;
            //}
            //判断手机验证码是否正确
            pass = verifyToken();

            if (pass) {
                $('#frm').submit();
            }
            return false;
        });
    }
    //if ($("#submit3")) {
    //    $("#submit3").click(function () {

    //        if (!verify()) {
    //            return false;
    //        }
    //        if ($("#goodAt_doctor").val() == "请概述您擅长治疗的疾病，65字以内") { $("#goodAt_doctor").val(""); }
    //        if ($("#goodAt_doctor").val() != "请概述您擅长治疗的疾病，65字以内" && $("#goodAt_doctor").val() != "") {
    //            $.ajax({
    //                url: "/Passport/RegDoctor.aspx/CheckExpertiseLength",
    //                data: '{"value":"' + ($("#goodAt_doctor").val()) + '"}',
    //                type: "post",
    //                dataType: "json",
    //                async: false,
    //                contentType: "application/json;charset=utf-8",
    //                success: function (data) {
    //                    if (data.d != "true") {
    //                        $("#info_Expertise").show().html("字数上限为65个").attr("class", "pass-verify pass-verify-error");
    //                        return false;
    //                    }
    //                    else {
    //                        $('#frm').submit();
    //                    }
    //                }
    //            });
    //        }
    //        else {
    //            $("#goodAt_doctor").val("");
    //            $('#frm').submit();
    //        }


    //    });
    //}
}
function submitFrm() {
    var pass = false;

    pass = verifySafeCode(2);
    if (pass) {
        sendToken(2);//发送短信并清除图像验证码
        PhoneVerBox.Close();
    }
    return false;
}


//表单验证
function verify() {
    var ret = true;
    var isPassVerify = true;
    unqualified = null;

    $.each(verifyConfig, function (i, obj) {
        isPassVerify = singleVerify(obj.ID);
        if (!isPassVerify) {
            ret = isPassVerify;
        };
    });

    return ret;
}

//单项验证
function singleVerify(objID) {
    var isPassVerify = true;
    $.each(verifyConfig, function (i, obj) {
        if (obj.ID == objID) {

            var input = $('#' + obj.ID);
            var err = $('#' + obj.Container);

            //是否有必需项的验证
            if (obj.Required) {
                if (isEmpty(input.val()) || (obj.Example != null && input.val() == obj.Example)) {
                    isPassVerify = false;
                    err.html(obj.Required);
                    err.show();
                    err.removeClass();
                    err.addClass("pass-verify");
                    err.addClass("pass-verify-error");
                    if (getLength(obj.Required) > warnCount) {
                        err.parent().addClass("verifyInfo-more");
                    }
                    else {
                        err.parent().removeClass("verifyInfo-more");
                    }

                    //pass-verify |  pass-verify-succ 成功  pass-verify-warn 提示 pass-verify-error 错误
                    return false;
                }
            }
            else {
                if (isEmpty(input.val())) {
                    err.show();
                    err.html(obj.Initialize);
                    err.removeClass();
                    err.addClass("pass-verify");
                    err.addClass("pass-verify-warn");
                    if (getLength(obj.Initialize) > warnCount) {
                        err.parent().addClass("verifyInfo-more");
                    }
                    else {
                        err.parent().removeClass("verifyInfo-more");
                    }
                    return false;
                }
            }


            //是否有最小长度的验证
            if (obj.MinLength) {

                if (getLength(input.val()) < obj.MinLength) {
                    isPassVerify = false;
                    err.show();
                    var errInfo = "最小长度为" + obj.MinLength + "个字符(" + obj.MaxLength / 2 + "个全角)";
                    err.html(errInfo);
                    err.removeClass();
                    err.addClass("pass-verify");
                    err.addClass("pass-verify-error");
                    if (getLength(errInfo) > warnCount) {
                        err.parent().addClass("verifyInfo-more");
                    }
                    else {
                        err.parent().removeClass("verifyInfo-more");
                    }
                    return false;
                }

            }

            //是否有最大长度的验证
            if (obj.MaxLength) {
                if (getLength(input.val()) > obj.MaxLength) {
                    isPassVerify = false;
                    err.show();
                    var errInfo = "最大长度为" + obj.MaxLength + "个字符(" + obj.MaxLength / 2 + "个全角)";
                    err.html(errInfo);
                    err.removeClass();
                    err.addClass("pass-verify");
                    err.addClass("pass-verify-error");
                    if (getLength(errInfo) > warnCount) {
                        err.parent().addClass("verifyInfo-more");
                    }
                    else {
                        err.parent().removeClass("verifyInfo-more");
                    }
                    return false;
                }

            }

            //是否有安全字符串的验证
            if (obj.Safe) {
                if (!isSafeStr(input.val())) {
                    isPassVerify = false;
                    var errInfo = "只允许包含英文,数字及横线，且以字母数字开头";
                    err.show();
                    err.html(errInfo);
                    err.removeClass();
                    err.addClass("pass-verify");
                    err.addClass("pass-verify-error");

                    if (getLength(errInfo) > warnCount) {
                        err.parent().addClass("verifyInfo-more");
                    }
                    else {
                        err.parent().removeClass("verifyInfo-more");
                    }

                    return false;
                }

            }

            //是否有安全字符串的验证
            if (obj.Safe2) {
                if (!isSafeStr2(input.val())) {
                    isPassVerify = false;
                    err.show();
                    var errInfo = "只允许包含大小写英文、数字及下划线";
                    err.html(errInfo);
                    err.removeClass();
                    err.addClass("pass-verify");
                    err.addClass("pass-verify-error");
                    if (getLength(errInfo) > warnCount) {
                        err.parent().addClass("verifyInfo-more");
                    }
                    else {
                        err.parent().removeClass("verifyInfo-more");
                    }
                    return false;
                }
            }
            //是否有安全字符串的验证
            if (obj.Safe3) {
                if (!isSafeStr3(input.val())) {
                    isPassVerify = false;
                    err.show();
                    var errInfo = "只允许大小写字母、数字或下划线，不能为纯数字";
                    err.html(errInfo);
                    err.removeClass();
                    err.addClass("pass-verify");
                    err.addClass("pass-verify-error");
                    if (getLength(errInfo) > warnCount) {
                        err.parent().addClass("verifyInfo-more");
                    }
                    else {
                        err.parent().removeClass("verifyInfo-more");
                    }
                    return false;
                }
            }
            //是否有比较两个值的验证
            if (obj.EqualTo) {
                if ($('#' + obj.EqualTo).val() != input.val()) {
                    isPassVerify = false;
                    err.show();
                    err.html(obj.EqualToInfo);
                    err.removeClass();
                    err.addClass("pass-verify");
                    err.addClass("pass-verify-error");
                    if (getLength(obj.EqualToInfo) > warnCount) {
                        err.parent().addClass("verifyInfo-more");
                    }
                    else {
                        err.parent().removeClass("verifyInfo-more");
                    }
                    return false;
                }

            }

            //是否有Email格式的验证
            if (obj.Email) {
                if (!(/^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,3}|[0-9]{1,3})(\]?)$/.test(input.val()))) {
                    isPassVerify = false;
                    err.show();
                    err.html(obj.Email);
                    err.removeClass();
                    err.addClass("pass-verify");
                    err.addClass("pass-verify-error");
                    if (getLength(obj.Email) > warnCount) {
                        err.parent().addClass("verifyInfo-more");
                    }
                    else {
                        err.parent().removeClass("verifyInfo-more");
                    }
                    return false;
                }

            }


            //数字验证
            if (obj.isNumber) {
                if ((input.val() * 1).toString() == "NaN") {
                    isPassVerify = false;
                    err.show();
                    err.html("输入必须是数字。");
                    err.removeClass();
                    err.addClass("pass-verify");
                    err.addClass("pass-verify-error");
                    return false;
                }

            }


            //手机号码验证
            if (obj.IsMobile) {

                if (!(/^1\d{10}$/.test(input.val()))) {
                    isPassVerify = false;
                    err.show();
                    err.html(obj.AlertString);
                    err.removeClass();
                    err.addClass("pass-verify");
                    err.addClass("pass-verify-error");

                    if (getLength(obj.AlertString) > warnCount) {
                        err.parent().addClass("verifyInfo-more");
                    }
                    else {
                        err.parent().removeClass("verifyInfo-more");
                    }
                    return false;
                }
            }

            if (isPassVerify) {
                err.show();
                err.removeClass();
                err.addClass("pass-verify");
                err.addClass("pass-verify-succ");
                err.html("");
            }

            if (obj.ID == 'email')
                isPassVerify = Email(obj, $("#" + obj.ID).val(), $("#info_" + obj.ID));
            if (obj.ID == 'mobile')
                isPassVerify = Phone(obj, $("#" + obj.ID).val(), $("#info_" + obj.ID));

            if (obj.ID == 'txtSafeCode') {
                isPassVerify = verifySafeCode();
            }
            if (obj.ID == 'txtSafeCode2') {
                isPassVerify = verifySafeCode(2);
            }

            if (obj.ID == 'token') {
                if ($("#" + obj.ID).attr("disabled")) {
                    err.hide();
                }
                else {
                    isPassVerify = verifyToken();
                }
            }

            //身份证格式的验证
            if (obj.IDCard)
                isPassVerify = IDCard(obj, $("#" + obj.ID).val(), $("#info_" + obj.ID));

            //return false;
        }
    });

    return isPassVerify;
}

//点击展示提示信息
function showOprationHint(objID) {
    $.each(verifyConfig, function (i, obj) {
        if (obj.ID == objID) {

            var input = $('#' + obj.ID);
            var hint = $('#' + obj.Container);
            if (obj.Initialize) {
                hint.html(obj.Initialize);
                hint.show();
                hint.removeClass();
                hint.addClass("pass-verify");
                hint.addClass("pass-verify-warn");
                if (getLength(obj.Initialize) > warnCount) {
                    hint.parent().addClass("verifyInfo-more");
                }
                else {
                    hint.parent().removeClass("verifyInfo-more");
                }
            }
        }
    });
}
/*reg页面方法*/

// Email
function Email(cfg, email, info) {
    if (!(/^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,3}|[0-9]{1,3})(\]?)$/.test(email))) {
        info.show();
        info.removeClass();
        info.addClass("pass-verify");
        info.addClass("pass-verify-error");
        info.html("请输入有效的邮箱");
        if (getLength('请输入有效的邮箱') > 32) {
            info.parent().addClass("verifyInfo-more");
        }
        else {
            info.parent().removeClass("verifyInfo-more");
        }
        return false;
    }
    else {
        var ispass = false;
        info.show();
        info.removeClass();
        info.addClass("pass-verify");
        info.addClass("pass-verify-warn");
        info.html('正在检测邮箱合法性，请稍候...');

        if (getLength('正在检测邮箱合法性，请稍候...') > 32) {
            info.parent().addClass("verifyInfo-more");
        }
        else {
            info.parent().removeClass("verifyInfo-more");
        }

        //var email = input.val();
        var data = { pid: 0, email: email };
        $.ajax({
            type: "POST",
            url: "/UserService.asmx/CheckEmailReg",
            data: data,
            dataType: "text",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            async: false,
            success: function (p) {
                var regExp = />([{][^<]{0,}[}])</;
                regExp.exec(p);
                json = eval("(" + RegExp.$1 + ")");

                if (json.Success) {
                    info.show();
                    info.removeClass();
                    info.addClass("pass-verify");
                    info.addClass("pass-verify-succ");
                    info.html("");
                    info.parent().removeClass("verifyInfo-more");
                    ispass = true;
                } else {
                    info.show();
                    info.removeClass();
                    info.addClass("pass-verify");
                    info.addClass("pass-verify-error");
                    info.html(json.Info);
                    if (getLength(json.Info) > 32) {
                        info.parent().addClass("verifyInfo-more");
                    }
                    else {
                        info.parent().removeClass("verifyInfo-more");
                    }
                }
            }
        });
        return ispass;
    }
}

// Phone
function Phone(cfg, phone, info) {
    if (!(/^1\d{10}$/.test(phone))) {
        info.show();
        info.removeClass();
        info.addClass("pass-verify");
        info.addClass("pass-verify-error");
        info.html("请输入有效的手机号");
        return false;
    }
    else {
        var ispass = false;
        info.show();
        info.removeClass();
        info.addClass("pass-verify");
        info.addClass("pass-verify-warn");
        info.html('正在检测手机号合法性，请稍候...');
        if (getLength('正在检测手机号合法性，请稍候...') > 32) {
            info.parent().addClass("verifyInfo-more");
        }
        else {
            info.parent().removeClass("verifyInfo-more");
        }
        //var phone = input.val();
        var data = { pid: 0, phone: phone };
        $.ajax({
            type: "POST",
            url: "/UserService.asmx/CheckPhoneReg",
            data: data,
            dataType: "text",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            async: false,
            success: function (p) {
                var regExp = />([{][^<]{0,}[}])</;
                regExp.exec(p);
                json = eval("(" + RegExp.$1 + ")");

                if (json.Success) {
                    info.show();
                    info.removeClass();
                    info.addClass("pass-verify");
                    info.addClass("pass-verify-succ");
                    info.html("");
                    info.parent().removeClass("verifyInfo-more");
                    ispass = true;
                } else {
                    info.show();
                    info.removeClass();
                    info.addClass("pass-verify");
                    info.addClass("pass-verify-error");
                    info.html(json.Info);
                    if (getLength(json.Info) > 32) {
                        info.parent().addClass("verifyInfo-more");
                    }
                    else {
                        info.parent().removeClass("verifyInfo-more");
                    }
                }
            }
        });
        return ispass;
    }
}

// IDCard
function IDCard(cfg, val, info) {
    if (!(/^(\d{17}[\d|X])$|^\d{15}$/.test(val))) {
        isPassVerify = false;
        info.show();
        info.removeClass();
        info.addClass("pass-verify");
        info.addClass("pass-verify-error");
        info.html("请输入正确的身份证号码");
        return false;
    }
    else {
        var ispass = false;
        info.show();
        info.removeClass();
        info.addClass("pass-verify");
        info.addClass("pass-verify-warn");
        info.html('正在检测身份证号码合法性，请稍候... ...');
        if (getLength('正在检测身份证号码合法性，请稍候... ...') > 32) {
            info.parent().addClass("verifyInfo-more");
        }
        else {
            info.parent().removeClass("verifyInfo-more");
        }
        //var val = input.val();
        var data = { pid: 0, IDCard: val };
        $.ajax({
            type: "POST",
            url: "/UserService.asmx/CheckIDCard",
            data: data,
            dataType: "text",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            async: false,
            success: function (p) {
                var regExp = />([{][^<]{0,}[}])</;
                regExp.exec(p);
                json = eval("(" + RegExp.$1 + ")");

                if (json.Success) {
                    info.show();
                    info.removeClass();
                    info.addClass("pass-verify");
                    info.addClass("pass-verify-succ");
                    info.html("");
                    info.parent().removeClass("verifyInfo-more");
                    ispass = true;
                } else {
                    info.show();
                    info.removeClass();
                    info.addClass("pass-verify");
                    info.addClass("pass-verify-error");
                    info.html(json.Info);
                    if (getLength(json.Info) > 32) {
                        info.parent().addClass("verifyInfo-more");
                    }
                    else {
                        info.parent().removeClass("verifyInfo-more");
                    }
                }
            }
        });
        return ispass;
    }
}

//验证码
function updateSC() {
    var src = "/other/SafeCodeImg.aspx?1&ts=" + (new Date()).valueOf();
    $("#safeCodeImg").attr("src", src);
    $("#safeCodeImg2").attr("src", src);
    if ($("#info_safecode")) {
        $("#info_safecode").hide();
        if ($("#txtSafeCode")) {
            if ($("#txtSafeCode").val() != "验证码")
                $("#txtSafeCode").val("");
        }
    }
    if ($("#info_safecode2")) {
        $("#info_safecode2").hide();
        if ($("#txtSafeCode2")) {
            if ($("#txtSafeCode2").val() != "验证码")
                $("#txtSafeCode2").val("");
        }
    }
}


function verifySafeCode(num) {
    var ispass = false;
    var str = "";
    var info;
    if (isEmpty(num)) {
        str = $('#txtSafeCode').val();
        info = $('#info_safecode');
    }
    else {
        str = $('#txtSafeCode' + num).val();
        info = $('#info_safecode' + num);
    }

    info.show();
    info.removeClass();
    info.addClass("pass-verify");
    info.addClass("pass-verify-warn");
    info.html('正在检测验证码，请稍候... ...');
    if (getLength('正在检测验证码，请稍候... ...') > 32) {
        info.parent().addClass("verifyInfo-more");
    }
    else {
        info.parent().removeClass("verifyInfo-more");
    }
    ispass = CheckSafeCode(str);
    if (ispass) {
        info.show();
        info.removeClass();
        info.addClass("pass-verify");
        info.addClass("pass-verify-succ");
        info.html("");
        info.parent().removeClass("verifyInfo-more");
    }
    else {
        info.show();
        info.removeClass();
        info.addClass("pass-verify");
        info.addClass("pass-verify-error");
        info.html("验证码错误");
        if (getLength("验证码错误") > 32) {
            info.parent().addClass("verifyInfo-more");
        }
        else {
            info.parent().removeClass("verifyInfo-more");
        }
    }
    return ispass;
}

function CheckSafeCode(str) {
    var ispass = false;
    $.ajax({
        type: "GET",
        url: "/MemberAction.aspx",
        data: "FunctionName=CheckSafeCode&T=1&SafeCode=" + str + "&ts=" + (new Date()).valueOf(),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "html",
        async: false,
        success: function (json) {
            json = eval("(" + json + ")");
            if (json.Success) {
                ispass = true;
            } else {
                ispass = false;
            }
        }
    });
    return ispass;
}


function sendToken(id) {
    var phone = $('#mobile').val();
    var ispass = false;
    var info = $('#info_token');
    var mobileInfo = $('#info_mobile');
    var safeCode = encodeURIComponent($("#txtSafeCode2").val());

    if (!(/^1\d{10}$/.test(phone)) || isEmpty(phone)) {
        mobileInfo.show()
        mobileInfo.html("请输入有效的手机号！");
        mobileInfo.removeClass();
        mobileInfo.addClass("pass-verify");
        mobileInfo.addClass("pass-verify-error");
        mobileInfo.parent().removeClass("verifyInfo-more");
        return false;
    }

    info.show();
    info.removeClass();
    info.addClass("pass-verify");
    info.addClass("pass-verify-warn");
    info.html('正在发送验证码，请稍候... ...');

    if (getLength("正在发送验证码，请稍候... ...") > 32) {
        info.parent().addClass("verifyInfo-more");
    }
    else {
        info.parent().removeClass("verifyInfo-more");
    }

    var data = { action: "SendMessageToken", phone: phone, safeCode: safeCode };
    $.ajax({
        type: "POST",
        url: "/mywebservice/myPost.ashx",
        data: data,
        dataType: "json",
        async: false,
        cache: false,
        success: function (json) {
            //var regExp = />([{][^<]{0,}[}])</;
            //regExp.exec(json);
            //json = RegExp.$1;
            //json = eval("(" + json + ")");
            if (json.Success) {
                //发送成功
                info.show();
                info.removeClass();
                info.addClass("pass-verify");
                info.addClass("pass-verify-warn");
                info.html("验证码已发送至您的手机，10分钟内有效");
                if (getLength("验证码已发送至您的手机，10分钟内有效") > 32) {
                    info.parent().addClass("verifyInfo-more");
                }
                else {
                    info.parent().removeClass("verifyInfo-more");
                }
                ispass = true;
                second60();
                $("#token").focus();
            }
            else {
                var errInfo = mobileInfo;
                if (id == 2) {
                    errInfo = info;
                }
                //if (json.Info.indexOf("频繁") > 0) {
                //    errInfo = info;
                //}
                //else {
                //    errInfo = mobileInfo;
                //    info.hide();
                //}
                errInfo.show();
                errInfo.html(json.Info);
                errInfo.removeClass();
                errInfo.addClass("pass-verify");
                errInfo.addClass("pass-verify-error");
                if (getLength(json.Info) > 32) {
                    errInfo.parent().addClass("verifyInfo-more");
                }
                else {
                    errInfo.parent().removeClass("verifyInfo-more");
                }
                ispass = false;

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
            ispass = false;
        }
    });
    return ispass;
}

function verifyToken() {
    var token = $('#token').val();
    var phone = $('#mobile').val();

    var ispass = false;
    var info = $('#info_token');

    if (!isEmpty(token)) {

        info.show();
        info.removeClass();
        info.addClass("pass-verify");
        info.addClass("pass-verify-warn");
        info.html('正在检测验证码，请稍候... ...');
        if (getLength('正在检测验证码，请稍候... ...') > 32) {
            info.parent().addClass("verifyInfo-more");
        }
        else {
            info.parent().removeClass("verifyInfo-more");
        }

        var data = { action: "CheckMessageToken", phone: phone, token: token };
        $.ajax({
            type: "POST",
            url: "/mywebservice/myPost.ashx",
            data: data,
            dataType: "json",
            async: false,
            cache: false,
            success: function (json) {
                //var regExp = />([{][^<]{0,}[}])</;
                //regExp.exec(json);
                //json = RegExp.$1;
                //json = eval("(" + json + ")");
                if (json.Success) {
                    //发送成功
                    ispass = true;
                    info.show();
                    info.removeClass();
                    info.addClass("pass-verify");
                    info.addClass("pass-verify-succ");
                    info.html('');
                    info.parent().removeClass("verifyInfo-more");
                }
                else {
                    ispass = false;
                    info.show();
                    info.removeClass();
                    info.addClass("pass-verify");
                    info.addClass("pass-verify-error");
                    info.html(json.Info);
                    if (getLength(json.Info) > 32) {
                        info.parent().addClass("verifyInfo-more");
                    }
                    else {
                        info.parent().removeClass("verifyInfo-more");
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
        });
    } else {
        info.show();
        info.removeClass();
        info.addClass("pass-verify");
        info.addClass("pass-verify-warn");
        info.html("验证码不能为空");
    }
    return ispass;
}

function verifyToken2() {
    var token = $('#token').val();
    var phone = $('#mobile').val();

    var ispass = false;
    var info = $('#info_token');

    if (!isEmpty(token)) {

        info.show();
        info.removeClass();
        info.addClass("pass-verify");
        info.addClass("pass-verify-warn");
        info.html('正在检测验证码，请稍候... ...');
        if (getLength('正在检测验证码，请稍候... ...') > 32) {
            info.parent().addClass("verifyInfo-more");
        }
        else {
            info.parent().removeClass("verifyInfo-more");
        }

        var data = { action: "CheckMessageToken2", phone: phone, token: token };
        $.ajax({
            type: "POST",
            url: "/mywebservice/myPost.ashx",
            data: data,
            dataType: "json",
            async: false,
            cache: false,
            success: function (json) {
                //var regExp = />([{][^<]{0,}[}])</;
                //regExp.exec(json);
                //json = RegExp.$1;
                //json = eval("(" + json + ")");
                if (json.Success) {
                    //发送成功
                    ispass = true;
                    info.show();
                    info.removeClass();
                    info.addClass("pass-verify");
                    info.addClass("pass-verify-succ");
                    info.html('');
                    info.parent().removeClass("verifyInfo-more");
                }
                else {
                    ispass = false;
                    info.show();
                    info.removeClass();
                    info.addClass("pass-verify");
                    info.addClass("pass-verify-error");
                    info.html(json.Info);
                    if (getLength(json.Info) > 32) {
                        info.parent().addClass("verifyInfo-more");
                    }
                    else {
                        info.parent().removeClass("verifyInfo-more");
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
        });
    } else {
        info.show();
        info.removeClass();
        info.addClass("pass-verify");
        info.addClass("pass-verify-warn");
        info.html("验证码不能为空");
    }
    return ispass;
}

function CheckRegTimes() {
    var pass = true;
    var data = {};
    $.ajax({
        type: "POST",
        url: "/mywebservice/passport.asmx/CheckRegTimes",
        data: data,
        dataType: "html",
        async: false,
        cache: false,
        success: function (json) {
            var regExp = />([{][^<]{0,}[}])</;
            regExp.exec(json);
            json = RegExp.$1;
            json = eval("(" + json + ")");
            if (json.Success) {
                pass = true;
            }
            else {
                pass = false;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(XMLHttpRequest.status);
            //alert(XMLHttpRequest.readyState);
            //alert(textStatus);
            alert('检查注册次数出错');
        }
    });
    return pass;
}

function OpenEmail() {
    var email = $.trim($("#reEmail").html());
    var hrefPrefix = "mail.";
    var hrefSuffix = email.substring(email.indexOf("@") + 1);
    var emailType = email.substring(email.indexOf("@") + 1, email.indexOf("."))
    switch (emailType) {
        case "hotmail": hrefPrefix = "www."; hrefSuffix = "hotmail.com";
            break;
        case "gmail": hrefPrefix = "gmail."; hrefSuffix = "google.com";
            break;
        case "mail": hrefPrefix = "";
            break;
        default: break;
    }
    window.open("http://" + hrefPrefix + hrefSuffix, "_blank", "");
    //window.location.href = "http://" + hrefPrefix + hrefSuffix;
}
//检测昵称
function CheckNickName() {
    var ispass = false;
    var nick = $("#NickName").val();
    var info = $("#info_nick");
    var data = { nickName: nick };
    if (nick != "请输入你的昵称" && !isEmpty(nick)) {
        $.ajax({
            type: "POST",
            url: "/UserService.asmx/CheckNickName",
            data: data,
            dataType: "text",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            async: false,
            success: function (p) {
                var regExp = />([{][^<]{0,}[}])</;
                regExp.exec(p);
                json = eval("(" + RegExp.$1 + ")");

                if (json.Success) {
                    info.show();
                    info.removeClass();
                    info.addClass("pass-verify");
                    info.addClass("pass-verify-succ");
                    info.html("");
                    info.parent().removeClass("verifyInfo-more");
                    ispass = true;
                } else {
                    info.show();
                    info.removeClass();
                    info.addClass("pass-verify");
                    info.addClass("pass-verify-error");
                    info.html("昵称格式不正确，请重新输入");
                    if (getLength("昵称格式不正确，请重新输入") > 32) {
                        info.parent().addClass("verifyInfo-more");
                    }
                    else {
                        info.parent().removeClass("verifyInfo-more");
                    }
                }
            }
        });
        return ispass;
    }
    else {
        ispass = false;
        info.show();
        info.removeClass();
        info.addClass("pass-verify");
        info.addClass("pass-verify-error");
        info.html("昵称不能为空");
        info.parent().removeClass("verifyInfo-more");
        return ispass;
    }
}
//保存昵称
function SaveNickName() {
    var ispass = CheckNickName();
    if (ispass) {
        var nick = $("#NickName").val();
        var info = $("#info_nick");
        var data = { nickName: nick };
        $.ajax({
            type: "POST",
            url: "/UserService.asmx/SetUserNick",
            data: data,
            dataType: "text",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            async: false,
            success: function (p) {
                var regExp = />([{][^<]{0,}[}])</;
                regExp.exec(p);
                json = eval("(" + RegExp.$1 + ")");

                if (json.Success) {
                    ispass = true;
                    var NickNameArea = $("#NickNameArea");
                    var CompleteInfo = $("#CompleteInfo");
                    NickNameArea.hide();
                    CompleteInfo.show();

                    //修改cookie中的昵称
                    var nickname = GetCookie("nickname");
                    if (nickname != nick) {
                        SetCookie("nickname", nick, 10);
                    }

                } else {
                    info.show();
                    info.removeClass();
                    info.addClass("pass-verify");
                    info.addClass("pass-verify-error");
                    info.html("昵称格式不正确，请重新输入");
                    if (getLength("昵称格式不正确，请重新输入") > 32) {
                        info.parent().addClass("verifyInfo-more");
                    }
                    else {
                        info.parent().removeClass("verifyInfo-more");
                    }
                    ispass = false;
                }
            }
        });
    }
    return ispass;
}

var isEdiEmail = false;
function EditEmail() {
    isEdiEmail = true;
}

function CheckEmail(email, infoid) {
    //var email = $("#" + id).val();
    var info = $("#" + infoid);
    var pass = false;
    pass = Email(null, email, info);
    if (!pass) {
        info.show();
        info.removeClass();
        info.addClass("pass-verify");
        info.addClass("pass-verify-error");
        if (isEmpty(email) || email == "请输入修改后的邮箱") {
            info.html("邮箱不能为空！");
        }
        else {
            if (!(/^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,3}|[0-9]{1,3})(\]?)$/.test(email))) {
                info.show();
                info.removeClass();
                info.addClass("pass-verify");
                info.addClass("pass-verify-error");
                info.html("请输入有效的邮箱");
            }
            else {
                info.html("该邮箱已存在，请换个邮箱吧！");
            }
        }
        info.parent().removeClass("verifyInfo-more");
    }
    else {
        info.show();
        info.removeClass();
        info.addClass("pass-verify");
        info.addClass("pass-verify-succ");
        info.html("");
        info.parent().removeClass("verifyInfo-more");
    }
    return pass;
}

/******激活邮件*******/
//发送激活邮件
function SendAuditEmail() {
    var ispass = false;
    var email = "";
    if (isEdiEmail) {
        email = $("#Email2").val();
    }
    else {
        email = $("#Email").val();
    }
    if (email != $("#Email").val()) {//对于修改的邮箱要做验证
        ispass = CheckEmail(email, 'info_email');
    }
    else
        ispass = true;
    if (ispass) {
        ispass = SendEmail(email);
        if (ispass) {
            //显示已发送
            $("#sendInfo").html("验证邮件已发送到您的邮箱");
            //$("#Send").hide();
            //$("#emailVal").html(email)
            //$("#reEmail").html(email);
            //$("#ReSend").show();
        }
    }
}
function closeInput() {
    $(".curMail").show();
    $(".alterMail").hide();
    isEdiEmail = false;
}
//底部提醒处发送激活邮件
function SendAuditEmail2() {
    var ispass = false;
    var email = $("#Email3").val();
    ispass = CheckEmail(email, 'info_email3');
    if (ispass) {
        ispass = SendEmail(email);
        if (ispass) {
            //显示已发送
            $("#sendInfo").html("验证邮件已发送到您的邮箱");
            $("#Send").hide();
            $("#emailVal").html(email)
            $("#reEmail").html(email);
            $("#ReSend").show();
            $(".modMail").hide();
        }
    }
}
//重发 激活邮件
function ReSendAuditEmail(obj) {
    var ispass = false;
    var email = $.trim($("#emailVal").html());
    if (email != $("#Email").val())
        ispass = CheckEmail(email, 'info_email');
    else
        ispass = true;

    if (ispass)
        ispass = SendEmail(email);
    if (ispass) {
        obj.onclick = "";
        obj.innerHTML = "已发送成功";

        $("#sendInfo").html("验证邮件已重新发送到您的邮箱");
    }
}
//激活邮件
function SendEmail(email) {
    var ispass = false;
    var data = { email: email, uType: $("#uType").val(), returnurl: $("#returnurl").val() };
    $.ajax({
        type: "POST",
        url: "/mywebservice/passport.asmx/SendEmailAudit",
        data: data,
        dataType: "text",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async: false,
        success: function (p) {
            var regExp = />([{][^<]{0,}[}])</;
            regExp.exec(p);
            json = eval("(" + RegExp.$1 + ")");

            if (json.Success) {
                ispass = true;

                $("#Send").hide();
                $("#emailVal").html(email)
                $("#reEmail").html(email);
                $("#ReSend").show();
                //$(".modMail").hide();

            } else {
                ispass = false;
                alert("请登录后重试");
            }
        }
    });
    return ispass;
}
/******激活邮件操作结束*******/


/******注册邮件*******/
//注册邮箱 底部提醒处发送邮件
//function SendRegEmail() {
//    var ispass = false;
//    var email=$('#Email3').val();
//    ispass = CheckEmail(email, 'info_email3');
//    if (ispass) {
//        ispass = SendEmail2(email);
//        if (ispass) {
//            //显示已发送
//            $("#reEmail").html(email);
//            $(".modMail").hide(); 
//        }
//    }
//}
//重发注册邮件
function ReSendRegEmail2(obj) {
    var ispass = false;
    var email = $.trim($("#reEmail").html());
    ispass = SendEmail2(email);
    if (ispass) {
        obj.onclick = "";
        obj.innerHTML = "已发送成功";
        $("#info_send").html("验证邮件已重新发送到您的邮箱");
    }
}
//注册邮件
function SendEmail2(email) {
    var ispass = false;
    var data = { email: email, uType: $("#uType").val(), returnurl: $("#returnurl").val() };
    $.ajax({
        type: "POST",
        url: "/mywebservice/passport.asmx/SendEmailReg",
        data: data,
        dataType: "text",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async: false,
        success: function (p) {
            var regExp = />([{][^<]{0,}[}])</;
            regExp.exec(p);
            json = eval("(" + RegExp.$1 + ")");

            if (json.Success) {

                ispass = true;
            } else {
                ispass = false;
            }
        }
    });
    return ispass;
}


/******注册邮件操作结束*******/

/**********登陆、QQ操作************/
function QQBind() {
    var pass = true;
    var loginName = $("#loginName").val().replace("用户名/邮箱/手机号", "");
    var pwd = $("#pwd").val();
    var opid = $("#opid").val();
    var appid = $("#appid").val();
    var info = $("#info_pwd");
    var userType = $("#UserType").val();
    var BindType = $("#BindType").val();
    var picurl = $("#picurl").val();
    var isDoc = false;
    if (isEmpty(loginName)) {
        $("#info_loginName").show();
        $("#info_loginName").removeClass();
        $("#info_loginName").addClass("pass-verify");
        $("#info_loginName").addClass("pass-verify-error");
        $("#info_loginName").html("用户名不能为空！");
        $('#info_loginName').css('display', 'block');
        pass = false;
    }
    else {
        $("#info_loginName").hide();
    }
    if (isEmpty(pwd)) {
        info.show();
        info.removeClass();
        info.addClass("pass-verify");
        info.addClass("pass-verify-error");
        info.html("密码不能为空！");
        info.css('display', 'block');
        pass = false;
    }
    else {
        info.hide();
    }
    if (pass) {
        var data = { loginName: loginName, pwd: pwd, opid: opid, appid: appid, BindType: BindType, picurl: picurl };
        $.ajax({
            type: "POST",
            url: "/mywebservice/passport.asmx/QQBind",
            data: data,
            dataType: "text",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            async: false,
            success: function (p) {
                var regExp = />([{][^<]{0,}[}])</;
                regExp.exec(p);
                json = eval("(" + RegExp.$1 + ")");

                if (json.Success) {
                    info.hide();
                    //isDoc = IsDoc(json.TypeID);
                } else {
                    pass = false;
                    info.show();
                    info.removeClass();
                    info.addClass("pass-verify");
                    info.addClass("pass-verify-error");
                    info.html(json.Info);
                    info.css('display', 'block');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                pass = false;
                alert('服务器忙，请稍后重试!');
            }
        });
        if (pass) {
            //var userType = $("#UserType").val();
            //if (userType == 3 && !isDoc) {
            //    //完善资料
            //    location.href = '/Passport/RegDoctor.aspx?ref=' + refUrl;
            //}
            //else {
            if (isEmpty($("#returnurl").val())) {
                location.href = '/UserCenter/default.aspx';
            }
            else {
                location.href = $("#returnurl").val();
            }
            //}
        }
    }
    return pass;
}

function RegOneKey() {
    var opid = $("#opid").val();
    var appid = $("#appid").val();
    var nick = $("#QQNick").val();
    var userType = $("#UserType").val();
    var refurl = $("#returnurl").val();
    var picurl = $("#picurl").val();
    var pass = true;
    var data = { opid: opid, nick: nick, refurl: refurl, appid: appid, picurl: picurl };
    $.ajax({
        type: "POST",
        url: "/mywebservice/passport.asmx/RegOneKey",
        data: data,
        dataType: "text",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async: false,
        success: function (p) {
            var regExp = />([{][^<]{0,}[}])</;
            regExp.exec(p);
            json = eval("(" + RegExp.$1 + ")");

            if (json.Success) {
                isDoc = IsDoc(json.TypeID);
            } else {
                pass = false;
                alert(json.Info);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            pass = false;
            alert('服务器忙，请稍后重试!');
        }
    });
    if (pass) {
        if (userType == 3 && !isDoc) {
            //完善资料
            location.href = '/Passport/RegDoctor.aspx?ref=' + encodeURIComponent(refurl);
        }
        else {
            if (isEmpty(refurl)) {
                location.href = '/UserCenter/default.aspx';
            }
            else {
                location.href = refurl;
            }
        }
    }

}

function openQQ() {
    var A = window.open("/account/qq_login.aspx", "TencentLogin", "width=450,height=320,menubar=0,scrollbars=0, status=1,titlebar=0,toolbar=0,location=1");
}
function checkLogin() {
    if ($("#returnurl")) {
        var returnURL = $("#returnurl").val();
        if (returnURL == '') {
            location.href = '/UserCenter/default.aspx';
        }
        else {
            location.href = returnURL;
        }
    }
    else
        window.location.reload(true);
}


function LoginCallback(cbtype, data) {
    var info_Name = $("#info_loginName");
    var info_pwd = $("#info_loginPwd");
    var returnURL = $("#returnurl").val();

    if (cbtype == "check") {
        // 用户名密码的检查结果
        if (data.Success) {

        }
        else {
            info_pwd.show();
            info_pwd.removeClass();
            info_pwd.addClass("pass-verify");
            info_pwd.addClass("pass-verify-error");
            //info_pwd.html("用户名或密码错误");
            info_pwd.html(data.Info);
        }
    } else if (cbtype == "login") {
        if (data.Success) {
            // 登录成功
            //判断是否为医生，不是医生且uesertype=3的跳去完善资料
            var userType = 1;
            var isDoc = false;
            if ($('#uType')) {
                var userType = $('#uType').val();
                if (userType == 3) {
                    //异步请求是否为医生
                    var pid = Passport.GetLoginUser().pid;
                    isDoc = IsDoc(pid)
                }
            }
            if (userType == 3 && !isDoc) {
                //完善资料
                location.href = '/Passport/RegDoctor.aspx?ref=' + encodeURIComponent(returnURL);
            }
            else {
                if (returnURL == '') {
                    location.href = '/UserCenter/default.aspx';
                }
                else {
                    location.href = returnURL;
                }
            }
            //alert("登录成功:" + data.username);
        } else {
            // 登录失败
            info_pwd.show();
            info_pwd.removeClass();
            info_pwd.addClass("pass-verify");
            info_pwd.addClass("pass-verify-error");
            info_pwd.html("用户名或密码错误");
            //info_pwd.html(data.Info);
        }
    } else if (cbtype == "logout") {
        // 登出
        if (data.Success) {
            alert('登出成功');
        } else {
            alert('登出不成功');
        }
    } else if (cbtype == "error") {
        // 服务器错误
        info_pwd.show();
        info_pwd.removeClass();
        info_pwd.addClass("pass-verify");
        info_pwd.addClass("pass-verify-error");
        info_pwd.html("服务器错误:" + data.Info);
        //alert("服务器错误:" + data.Info);
    } 
    //else if (cbtype == "qq" || cbtype == 'weixin' || cbtype == "weibo" || cbtype == "baidu") {
    //    //判断是否为医生，不是医生且uesertype=3的跳去完善资料
    //    var userType = 1;
    //    var isDoc = false;
    //    if ($('#uType')) {
    //        var userType = $('#uType').val();
    //        if (userType == 3) {
    //            //异步请求是否为医生
    //            var pid = Passport.GetLoginUser().pid;
    //            isDoc = IsDoc(pid)
    //        }
    //    }
    //    if (userType == 3 && !isDoc) {
    //        //完善资料
    //        location.href = '/Passport/RegDoctor.aspx?ref=' + encodeURIComponent(returnURL);
    //    }
    //    else {
    //        if (returnURL == '') {
    //            location.href = '/UserCenter/default.aspx';
    //        }
    //        else {
    //            location.href = returnURL;
    //        }
    //    }
    //}
        //alert("qq登录:" + Passport.GetLoginUser().nickname);
    //} else if (cbtype == "weibo") {
    //    var userType = 1;
    //    var isDoc = false;
    //    if ($('#uType')) {
    //        var userType = $('#uType').val();
    //        if (userType == 3) {
    //            //异步请求是否为医生
    //            var pid = Passport.GetLoginUser().pid;
    //            isDoc = IsDoc(pid)
    //        }
    //    }
    //    if (userType == 3 && !isDoc) {
    //        //完善资料
    //        location.href = '/Passport/RegDoctor.aspx?ref=' + encodeURIComponent(returnURL);
    //    }
    //    else {
    //        if (returnURL == '') {
    //            location.href = '/UserCenter/default.aspx';
    //        }
    //        else {
    //            location.href = returnURL;
    //        }
    //    }
    //    //alert("微博登录:" + Passport.GetLoginUser().nickname);
    //}
}

function IsDoc(pid) {
    var isDoc = false;
    var data = { pid: pid };
    $.ajax({
        type: "POST",
        url: "/UserService.asmx/IsDoctor",
        data: data,
        dataType: "text",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async: false,
        success: function (p) {
            var regExp = />([{][^<]{0,}[}])</;
            regExp.exec(p);
            json = eval("(" + RegExp.$1 + ")");

            if (json.Success) {
                isDoc = true;
            } else {
                isDoc = false;
            }
        }
    });
    return isDoc;


}
function Login() {
    var username = $("#loginName").val();
    var pwd = $("#loginPwd").val();
    var safeCode = $("#txtSafeCode").val()
    if (safeCode == "验证码") safeCode = "";
    var appid = $("#appid").val();
    var returnURL = $("#returnurl").val();

    var info_Name = $("#info_loginName");
    var info_pwd = $("#info_loginPwd");

    var login_info = info_pwd;
    if (isEmpty(username) || username == refLoginName) {
        info_Name.show();
        info_Name.removeClass();
        info_Name.addClass("pass-verify");
        info_Name.addClass("pass-verify-error");
        info_Name.html('用户名/邮箱/手机不能为空');
        return false;
    }
    else {
        info_Name.hide();
    }
    if (isEmpty(pwd)) {
        info_pwd.show();
        info_pwd.removeClass();
        info_pwd.addClass("pass-verify");
        info_pwd.addClass("pass-verify-error");
        info_pwd.html('密码不能为空');
        return false;
    }
    else {
        info_pwd.hide();
    }

    var info_safeCode = $("#info_safecode");
    if ($("#SafeCodeArea").css("display") == "block") {
        if (isEmpty(safeCode) || safeCode == "验证码") {
            info_safeCode.show();
            info_safeCode.css("display", "block");
            info_safeCode.removeClass();
            info_safeCode.addClass("pass-verify");
            info_safeCode.addClass("pass-verify-error");
            info_safeCode.html('请输入验证码');
            return false;
        } else {
            info_safeCode.hide();
        }
        login_info = info_safeCode;
    }

    login_info.hide();
    login_info.html('正在进行登录验证... ...');
    login_info.removeClass();
    login_info.addClass("login-loading");
    login_info.show();
    login_info.css("display", "block");
    var data = { UserName: Passport.f0(username), Pwd: Passport.f0(pwd), safeCode: safeCode, AppID: appid, returnurl: returnURL };
    $.ajax({
        type: "POST",
        url: "/mywebservice/passport.asmx/LoginWithRef",
        data: data,
        dataType: "xml",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async: true,
        success: function (xml) {
            json = $.xml2json(xml);
            if (json.Success == 'true') {
                if (returnURL == '') {
                    location.href = '/UserCenter/default.aspx';
                }
                else {
                    location.href = json.Data;
                }
            }
            else {
                if (json.Data == "None") {
                    $("#loginName").remove();
                    $("#loginPwd").remove();
                    $("#btnLogin").remove();
                }
                info_safeCode.hide();
                info_pwd.hide();
                if (json.Data) {
                    if (json.Data == "needSafeCode") {
                        ShowSafeCodeArea();
                    }
                }
                if ($("#SafeCodeArea").css("display") == "block") {
                    updateSC();
                }
                login_info = (json.Info.indexOf("验证码") > -1 ? info_safeCode : info_pwd);
                login_info.show();
                login_info.css("display", "block");
                login_info.removeClass();
                login_info.addClass("pass-verify");
                login_info.addClass("pass-verify-error");
                login_info.html(json.Info);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            login_info.show();
            login_info.css("display", "block");
            login_info.removeClass();
            login_info.addClass("pass-verify");
            login_info.addClass("pass-verify-error");
            login_info.html('服务器忙，请稍后重试!');
        }
    });
}
function LoginCheckLoginName() {
    var loginname = $('#loginName').val();
    var info_loginName = $("#info_loginName");
    if (loginname == refLoginName || isEmpty(loginname)) {
        //info_loginName.show();
        info_loginName.css('display', "block")
        info_loginName.removeClass();
        info_loginName.addClass('pass-verify');
        info_loginName.addClass('pass-verify-error');
        info_loginName.html('用户名/邮箱/手机不能为空');
    }
    else {
        info_loginName.hide();

        var data = { UserName: loginname };
        $.ajax({
            type: "POST",
            url: "/mywebservice/passport.asmx/CheckLoginRate",
            data: data,
            dataType: "xml",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            async: true,
            success: function (xml) {
                json = $.xml2json(xml);
                if (json.Success == 'false') {
                    if (json.Info.indexOf("访问太频繁") > -1) {
                        $("#loginName").remove();
                        $("#loginPwd").remove();
                        $("#btnLogin").remove();
                    }
                    else {
                        ShowSafeCodeArea();
                    }
                }
                else {
                    HideSafeArea()
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //info_pwd.html('服务器忙，请稍后重试!');
            }
        });
    }
}
function ShowSafeCodeArea() {
    $("#SafeCodeArea").show();
    $(".pass-otherBox").addClass("pass-otherBox-SafeCode")
}
function HideSafeArea() {
    $("#SafeCodeArea").hide();
    $(".pass-otherBox").removeClass("pass-otherBox-SafeCode")
}

function LoginCheckPwd() {
    var loginPwd = $('#loginPwd').val();
    var info_loginPwd = $("#info_loginPwd");
    if (isEmpty(loginPwd)) {
        info_loginPwd.show();
        info_loginPwd.removeClass();
        info_loginPwd.addClass('pass-verify');
        info_loginPwd.addClass('pass-verify-error');
        info_loginPwd.html('密码不能为空');
    }
    else
        info_loginPwd.hide();
}

/**********QQ操作结束************/


/******找回密码操作*******/

function verifyFindName() {
    var pass = false;
    var info = $("#info_findname");
    var findName = $("#FindName").val();
    if (isEmpty(findName) || findName == "用户名/邮箱/手机") {
        info.show();
        info.removeClass();
        info.addClass("pass-verify");
        info.addClass("pass-verify-error");
        info.html("用户名不能为空");
        return false;
    }
    var data = { findName: findName };
    info.show();
    info.removeClass();
    info.addClass("pass-verify");
    info.addClass("pass-verify-warn");
    info.html("正在检测验证码... ...");
    $.ajax({
        type: "POST",
        url: "/mywebservice/passport.asmx/VerifyFindName",
        data: data,
        dataType: "text",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async: false,
        success: function (p) {
            var regExp = />([{][^<]{0,}[}])</;
            regExp.exec(p);
            json = eval("(" + RegExp.$1 + ")");

            if (json.Success) {
                pass = true;
                info.hide();
            } else {
                info.show();
                info.removeClass();
                info.addClass("pass-verify");
                info.addClass("pass-verify-error");
                info.html(json.Info);
                pass = false;
            }
        }
    });
    return pass;
}
function findcodeVerify() {
    var pass = false;
    if (isEmpty($("#txtSafeCode").val()) || $("#txtSafeCode").val() == "验证码") {
        pass = false;
        var info = $('#info_safecode');
        info.show();
        info.removeClass();
        info.addClass("pass-verify");
        info.addClass("pass-verify-error");
        info.html('验证码不能为空');
        if (getLength('验证码不能为空') > 32) {
            info.parent().addClass("verifyInfo-more");
        }
        else {
            info.parent().removeClass("verifyInfo-more");
        }
    }
    else {
        pass = verifySafeCode();
    }
    return pass;
}
function findpwdVerify() {
    var passName = false;
    var passVerify = false;
    passName = verifyFindName();
    passVerify = findcodeVerify();
    if (passName && passVerify) {
        return true;
    }
    else
        return false;
}
//找回密码 发送短息
function sendTokenFindPwd() {
    var phone = $('#mobile').val();
    var ispass = false;
    var info = $('#info_token');

    if (isEmpty(phone)) {
        info.show()
        info.html("请输入有效的手机号！");
        info.removeClass();
        info.addClass("pass-verify");
        info.addClass("pass-verify-error");
        return false;
    }

    info.show();
    info.removeClass();
    info.addClass("pass-verify");
    info.addClass("pass-verify-warn");
    info.html('正在发送验证码，请稍候... ...');

    var data = { phone: phone };
    $.ajax({
        type: "POST",
        url: "/mywebservice/passport.asmx/SendMessageTokenFindPwd",
        data: data,
        dataType: "html",
        async: false,
        cache: false,
        success: function (json) {
            var regExp = />([{][^<]{0,}[}])</;
            regExp.exec(json);
            json = RegExp.$1;
            json = eval("(" + json + ")");
            if (json.Success) {
                //发送成功
                info.show();
                info.removeClass();
                info.addClass("pass-verify");
                info.addClass("pass-verify-warn");
                info.html("验证码已发送至您的手机，30分钟内有效");
                second60();
                $("#token").focus();
            }
            else {
                info.show()
                info.html(json.Info);
                info.removeClass();
                info.addClass("pass-verify");
                info.addClass("pass-verify-error");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
    if (getLength(info.html()) > 32) {
        info.parent().addClass("verifyInfo-more");
    }
    else {
        info.parent().removeClass("verifyInfo-more");
    }
    return ispass;
}

//找回密码发送邮件
function ReSendFindPwd(obj) {
    var email = $("#Email").val();
    var pass = FindPwdSendEmail(email)
    if (pass) {
        obj.onclick = "";
        obj.innerHTML = "已发送成功";
        $("#sendInfo").html("重置密码的链接已重新发送到您的邮箱");
        alert("邮件已发送成功")

    } else {
        alert("邮件发送失败！")
    }
}

function FindpwdToEmail(em, code, email) {
    var pass = FindPwdSendEmail(email);
    if (pass) {
        window.location.href = "FindPwdE.aspx?em=" + em + "&code=" + code + "&ref=" + encodeURIComponent($("#returnurl").val());
    }
}
function FindpwdToEmail1(actiontype, em, code, email) {
    var pass = FindPwdSendEmail(email);
    if (pass) {
        window.location.href = "FindPwdE.aspx?em=" + em + "&code=" + code + "&actionType=" + actiontype + "&ref=" + encodeURIComponent($("#returnurl").val());
    }
}

//找回密码发邮件
function FindPwdSendEmail(email) {
    var pass = false;
    var data = { email: email, findName: $("#FindName").val(), returnurl: $("#returnurl").val() };
    $.ajax({
        type: "POST",
        url: "/mywebservice/passport.asmx/ReSendFindPwd",
        data: data,
        dataType: "text",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async: false,
        success: function (p) {
            var regExp = />([{][^<]{0,}[}])</;
            regExp.exec(p);
            json = eval("(" + RegExp.$1 + ")");

            if (json.Success) {
                pass = true;
            } else {
                pass = false;
            }
        }
    });
    return pass;
}

//验证手机验证码并下一步
function resetPwd() {
    var pass = false;
    pass = verifyToken2();
    if (pass) {
        window.location.href = "FindPwdReset.aspx?findname=" + $("#FindName").val() + "&ph=" + $("#phVal").val() + "&t=" + $('#token').val() + "&ref=" + encodeURIComponent($("#returnurl").val());
    }
}
//验证手机验证码并下一步
function resetPwd1(actiontype) {
    var pass = false;
    pass = verifyToken2();
    if (pass) {
        window.location.href = "FindPwdReset.aspx?findname=" + $("#FindName").val() + "&actionType=" + actiontype + "&ph=" + $("#phVal").val() + "&t=" + $('#token').val() + "&ref=" + encodeURIComponent($("#returnurl").val());
    }
}

//验证密码格式
function CheckPwd() {
    var pwd = $("#pwd").val();
    var err = $("#info_pwd");
    var pass = true;
    if (!isSafeStr3(pwd)) {
        err.show();
        err.html("只允许大小写字母、数字或下划线，不能为纯数字");
        err.removeClass();
        err.addClass("pass-verify");
        err.addClass("pass-verify-error");
        pass = false;
    }
    else if (getLength(pwd) < 6 || getLength(pwd) > 16) {
        err.show();
        err.html("密码长度为6－16位");
        err.removeClass();
        err.addClass("pass-verify");
        err.addClass("pass-verify-error");
        pass = false;
    }
    else {
        err.show();
        err.html("");
        err.removeClass();
        err.addClass("pass-verify");
        err.addClass("pass-verify-succ");
        pass = true;
    }
    if (getLength(err.html()) > 20) {
        err.parent().addClass("verifyInfo-more");
    }
    else {
        err.parent().removeClass("verifyInfo-more");
    }
    return pass;
}
function CheckPwd2() {
    var pwd = $("#pwd").val();
    var pwdcon = $("#pwdcon").val();
    var err = $("#info_pwdcon");
    var pass = false;
    if (isEmpty(pwdcon) && isEmpty(pwd)) {
        err.hide();
        pass = false;
    }
    else if (pwd != pwdcon) {
        err.show();
        err.html("两次输入密码不一致，请重新输入");
        err.removeClass();
        err.addClass("pass-verify");
        err.addClass("pass-verify-error");
        pass = false;
    }
    else {
        err.show();
        err.html("");
        err.removeClass();
        err.addClass("pass-verify");
        err.addClass("pass-verify-succ");
        pass = true;
    }
    if (getLength(err.html()) > 20) {
        err.parent().addClass("verifyInfo-more");
    }
    else {
        err.parent().removeClass("verifyInfo-more");
    }
    return pass;
}
//重置密码
function ResetPwd() {
    var pass = false;
    var info = "";
    pass = CheckPwd();
    if (pass) {
        pass = CheckPwd2();
        if (pass) {
            //此处重置密码
            var pwd = $("#pwd").val();
            var i = $("#i").val();
            var token = $('#t').val();
            var data = { action: "ResetPwd", i: i, pwd: pwd, token: token, FindPwdType: $("#FindPwdType").val() };

            $.ajax({
                type: "POST",
                url: "/mywebservice/myPost.ashx",
                data: data,
                dataType: "json",
                async: false,
                cache: false,
                success: function (json) {
                    pass = json.Success;
                    info = json.Info;
                },
                error: function () {

                }
            });

            if (pass) {
                //退出当前登录 
                $.ajax({
                    type: "POST",
                    url: "/mywebservice/passport.asmx/LoginOut",
                    dataType: "xml",
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    async: false,
                    success: function (xml) {
                        json = $.xml2json(xml);
                    }
                });

                pass = true;
                window.location.href = "ResertSuccess.aspx?ref=" + encodeURIComponent($("#returnurl").val());
            } else {
                pass = false;
                window.location.href = "ResertSuccess.aspx?su=0&info=" + info +"&ref=" + encodeURIComponent($("#returnurl").val());
            }

        }
    }
}

function ResetPwd1(actiontype) {
    var pass = false;
    var info = "";
    pass = CheckPwd();
    if (pass) {
        pass = CheckPwd2();
        if (pass) {
            //此处重置密码
            var pwd = $("#pwd").val();
            var i = $("#i").val();
            var token = $('#t').val();
            var data = { action: "ResetPwd", i: i, pwd: pwd, token: token, FindPwdType: $("#FindPwdType").val() };

            $.ajax({
                type: "POST",
                url: "/mywebservice/myPost.ashx",
                data: data,
                dataType: "json",
                async: false,
                cache: false,
                success: function (json) {
                    pass = json.Success;
                    info = json.Info;
                },
                error: function () {

                }
            });

            if (pass) {
                //退出当前登录 
                $.ajax({
                    type: "POST",
                    url: "/mywebservice/passport.asmx/LoginOut",
                    dataType: "xml",
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    async: false,
                    success: function (xml) {
                        json = $.xml2json(xml);
                    }
                });

                pass = true;
                window.location.href = "ResertSuccess.aspx?ref=" + encodeURIComponent($("#returnurl").val()) + "&actionType=" + actiontype;
            } else {
                pass = false;
                window.location.href = "ResertSuccess.aspx?su=0&info=" + info +"&ref=" + encodeURIComponent($("#returnurl").val()) + "&actionType=" + actiontype;
            }

        }
    }
}
//加载平台
function getApp() {
    var data = { tag: "Forum" };
    $.ajax({
        type: "POST",
        url: "/UserService.asmx/GetApp",
        data: data,
        dataType: "xml",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async: false,
        success: function (xml) {
            xml = $.xml2json(xml);
            eval(xml.text)

        }
    });
}
function SubStr(str, lens) {
    var len = 0;
    var subIndex = 0;
    for (i = 0; i < str.length; i++) {
        if (len < lens) {
            if (str.charCodeAt(i) > 256)
                len += 2;
            else
                len++;
            subIndex = i;
        }
    }
    return str.substring(0, subIndex + 1);

}

//检查字数
function CheckCount() {
    var opHistory = document.getElementById("opHistory").value;
    if (opHistory == historyVal)
        opHistory = "";
    var show = $("#num");
    show.html(opHistory.length + " / 500");
    if (opHistory.length > 500) {
        $("#info_history").show()
        $("#info_history").html("字数限制在0-500字之内");
        //$("#opHistory").val(SubStr(opHistory, 500));
        $("#opHistory").val(opHistory.substring(0, 500));
        return false;
    }
    else {
        $("#info_history").hide()
        return true;
    }
}

function CheckName() {
    var realName = $("#RealName").val();
    if (getLength(realName) > 8) {
        $("#info_name").show()
        $("#info_name").html("2~8字符文本");
        $("#RealName").val(SubStr(realName, 8));
        return false;
    }
    else {
        $("#info_name").hide()
        return true;
    }
}
function CheckName2() {
    var realName = $("#RealName").val();
    if (isEmpty(realName) || realName == "请输入姓名") {
        $("#info_name").show();
        return false;
    }
    else if (getLength(realName) < 2 || getLength(realName) > 8) {
        $("#info_name").show()
        $("#info_name").html("2~8字符文本");
        $("#RealName").val(SubStr(realName, 8));
        return false;
    }
    else {
        $("#info_name").hide()
        return true;
    }
}
function CheckID() {
    var idCard = $("#IDCard").val();
    var info = $("#info_idcard");
    if (isEmpty(idCard) || idCard == "请输入身份证号") {
        info.show();
        info.html("身份证号不能为空!");
        if (getLength('身份证号不能为空') > 18) {
            info.parent().addClass("verifyInfo-more");
        }
        else {
            info.parent().removeClass("verifyInfo-more");
        }
        return false;
    }
    else {
        if (!(/^(\d{17}[\d|X])$|^\d{15}$/.test(idCard))) {
            info.show();
            info.html("请输入正确的身份证号码");
            if (getLength('请输入正确的身份证号码') > 18) {
                info.parent().addClass("verifyInfo-more");
            }
            else {
                info.parent().removeClass("verifyInfo-more");
            }
            return false;
        }
    }
    $("#info_idcard").hide()
    return true;
}
function CheckEmails() {
    var email = $("#Emails").val();
    if (isEmpty(email) || email == "请输入常用邮箱") {
        $("#info_email").show();
        $("#info_email").html("联系邮箱不能为空!");
        return false;
    }
    else {
        if (!(/^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,3}|[0-9]{1,3})(\]?)$/.test(email))) {
            $("#info_email").show();
            $("#info_email").html("邮箱格式不正确");
            return false;
        }
    }
    $("#info_email").hide();
    return true;
}

function CheckForm() {
    var pass = true;
    var Fourm = $("#Forum").val();
    var drYear = $("#drYear").val();
    var drMonth = $("#drMonth").val();
    var drselect1 = $("#drselect1").val();
    var drselect2 = $("#drselect2").val();
    var opHistory = document.getElementById("opHistory").value;
    var RealName = $("#RealName").val();
    var IDCard = $("#IDCard").val();
    var Emails = $("#Emails").val();

    if ($('option:selected', '#Forum').index() == 0) {
        $("#info_Forum").show()
        pass = false;
    }
    else {
        $("#info_Forum").hide()
    }
    if ($('option:selected', '#drYear').index() == 0 || $('option:selected', '#drMonth').index() == 0) {
        $("#info_dr").show()
        pass = false;
    } else {
        $("#info_dr").hide()
    }

    if ($('option:selected', '#drselect1').index() == 0 && $('option:selected', '#drselect2').index() == 0) {
        $("#info_region").show()
        pass = false;
    } else {
        $("#info_region").hide()
    }

    if (!CheckCount()) {
        pass = false;
    }
    if (getLength(opHistory) <= 0 || opHistory == historyVal) {
        $("#info_history").show()
        $("#info_history").html("操作轨迹不能为空！");
        pass = false;
    } else {
        $("#info_history").hide()
    }

    if (!CheckName2()) {
        pass = false;
    }
    if (!CheckID()) {
        pass = false;
    }
    if (!CheckEmails()) {
        pass = false;
    }
    if (pass)
        $("#frm").submit();
    return pass;

}
/******找回密码操作结束*******/


/*reg页面方法End*/

/*********医生注册*******/
//读取城市
var proval = "";
var cityval = "";
function getSubRegion(subid, value) {
    $.ajax({
        type: "GET",
        url: "/Other/GetSubRegion.aspx",
        dataType: "json",
        data: "region=" + escape(value),
        async: false,
        success: function (html) {
            try {
                //eval(html);
                var json = html;
                if (subid == "Province") {
                    //填充数据到页面
                    for (var i = 0; i < json.length; i++) {
                        var showText = json[i].Tag;
                        var text = json[i].Text;
                        var value = json[i].Value;
                        //var showText = OprateArea(text, "");
                        //<a href='javascript:void(0)' tag='{1}' dbname='{2}'>{0}</a>", OprateArea(item.Text, ""), item.Value, item.Text
                        var aEle = "<a href='javascript:void(0)' tag='" + value + "' dbname='" + text + "'>" + showText + "</a>";
                        document.getElementById(subid).innerHTML += aEle;
                    }
                }
                else {
                    document.getElementById(subid).innerHTML = "";
                    for (var i = 0; i < json.length; i++) {
                        var showText = json[i].Tag;
                        var text = json[i].Text;
                        var value = json[i].Value;
                        if (text.indexOf("│") != 0 || value.indexOf("省直辖行政单位") > -1 || value.indexOf("省直辖县级行政单位") > -1 || value.indexOf("自治区直辖县级行政单位") > -1) {
                            if (text != "省直辖县级行政单位" && text != "省直辖行政单位" && text != "自治区直辖县级行政单位") {
                                if (text.indexOf("│├") > -1 || text.indexOf("│└") > -1) {
                                    text = text.replace("│├", "").replace("│└", "");
                                }
                                //var showText = OprateArea(text, "");
                                var aEle = "<a href='javascript:void(0)' tag='" + value + "' dbname='" + text + "'>" + showText + "</a>";
                                document.getElementById(subid).innerHTML += aEle;
                            }
                        }
                    }
                }

                $(".T_iframe").height($("#AllArea").outerHeight(true));

                //为省份注册点击事件
                if (subid == "Province") {
                    $.each($("#Province a"), function (i, obj) {
                        $(this).click(function (e) {
                            $(this).addClass('curr').siblings('a').removeClass('curr');
                            proval = $(this).attr("dbname");
                            $("#CityVal").val($(this).attr("dbname"));
                            getSubRegion('Citys', $(this).attr("tag"));//获取二级地区

                            var tag = $(this).attr("tag");
                            $("#region_doctor").val("");

                            if ($("#Citys a").length == 0) {
                                $("#region_doctor").val(tag);
                                //没有二级地区
                                var isCity = tag.indexOf("北京") > -1 || tag.indexOf("上海") > -1 || tag.indexOf("天津") > -1 || tag.indexOf("重庆") > -1;
                                if (isCity) {
                                    var index = tag.indexOf("_");
                                    if (index > -1) {
                                        tag = tag + tag.substring(index);
                                    }
                                }
                                $("#CityVal").css("color", "Black");
                                $('#City').hide();
                                //$("#HospitalVal").focus();
                            }
                            $("#region").val(tag);
                            singleVerify("CityVal");
                            e.stopPropagation();
                        });
                    });
                }
                if (subid == "Citys") {
                    $.each($("#Citys a"), function (i, obj) {
                        $(this).click(function () {
                            $(this).addClass('curr').siblings('a').removeClass('curr');
                            //将选择数据填充到文本框并隐藏win
                            cityval = $(this).attr("dbname");
                            $("#CityVal").val(proval + " " + cityval);
                            $("#region_doctor").val($(this).attr("tag"));
                            $("#region").val($(this).attr("tag"));
                            $("#CityVal").css("color", "Black");
                            $('#City').hide();
                            //$("#HospitalVal").focus();
                            singleVerify("CityVal");
                        });
                    });
                }

            } catch (e) { }
        }
    });
}

function getHospital() {
    var keyword = $("#HospitalVal").val();
    if (isEmpty(keyword)) { keyword = " "; }
    var areas = $("#region").val();
    var areatext = $("#CityVal").val();//此变量主要是存储显示信息
    areas = handleArea(areas);//处理部分城市名，因与yyk数据不一致
    var pagesize = 8;
    var data = { action: "GetHospitalList", keyword: keyword, areas: areas, pagesize: pagesize, areatext: areatext };
    $.ajax({
        type: "Post",
        url: "/Other/GetYYKjson.aspx",
        data: data,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async: true,
        success: function (json) {

            if (json.length > 0) {
                //$("#HospitalInfo").html(text);
                document.getElementById("HospitalInfo").innerHTML = "";
                for (var i = 0; i < json.length; i++) {
                    var name = json[i].Name;
                    var aEle = name;
                    if (!isEmpty(keyword)) {
                        aEle = aEle.replace(keyword, "<strong>" + keyword + "</strong>");
                    }
                    aEle = "<a href=\"javascript:void(0)\" tag='" + name + "'>" + aEle + "</a>";
                    document.getElementById("HospitalInfo").innerHTML += aEle;
                }

                $('#Hospital').show();

                $(".T_iframe2").height($("#HospitalInfo").outerHeight(true));
                $.each($("#HospitalInfo a"), function (i, obj) {
                    $(this).click(function () {
                        $("#HospitalVal").val($(this).attr("tag"));
                        $('#Hospital').hide();
                        getHospitalLevel($("#HospitalVal").val())
                        //$("#NameVal").focus();
                        $("#HospitalVal").css("color", "Black");
                        singleVerify("HospitalVal");
                    });
                });

            }
            else {
                $('#Hospital').hide();
            }
        },
        error: function () {
        }
    });
}

function getHospitalLevel(hospitalName) {
    var data = { action: "GetHospital", keyword: hospitalName };

    $.ajax({
        type: "Post",
        url: "/Other/GetYYKjson.aspx",
        data: data,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async: true,
        success: function (json) {
            if (json != null) {
                //HOSPITAL_GRADE
                if (json.NAME == hospitalName) {
                    if (json.HOSPITAL_GRADE != null) {
                        //var t = $("#HospitalLevel").find("option[text='" + json.HOSPITAL_GRADE + "']");
                        //t.siblings().removeAttr("selected");
                        //t.attr("selected", "selected");

                        //$("#HospitalLevel").val(json.HOSPITAL_GRADE).attr("disabled", "disabled");
                        $("#HospitalLevel").val(json.HOSPITAL_GRADE);
                        $("#hospitalLevel_doctor").val(json.HOSPITAL_GRADE);
                        $("#yykid_doctor").val(json.ID);
                        if (json.NATURE == 163) {
                            //$("#IsPublicHos").val("是").attr("disabled", "disabled").change();
                            $("#IsPublicHos").val("是").change();
                            $("#publichospital_doctor").val("是");
                        }
                        else {
                            //$("#IsPublicHos").val("否").attr("disabled", "disabled").change();
                            $("#IsPublicHos").val("否").change();
                            $("#publichospital_doctor").val("否");
                        }
                        singleVerify("HospitalLevel");
                        $("#HospitalLevel").change();
                    }
                    else {

                        //$("#HospitalLevel").removeAttr("disabled");
                        //$("#IsPublicHos").removeAttr("disabled").change();
                        $("#IsPublicHos").change();
                        if ($("#IsPublicHos").val() != "" || $("#IsPublicHos").val() != "请选择") {
                            $("#publichospital_doctor").val($("#IsPublicHos").val());
                        }
                        singleVerify("HospitalLevel");
                        if ($("#HospitalLevel").val() != "" || $("#HospitalLevel").val() != "请选择医院级别") {
                            $("#hospitallevel_doctor").val($("#HospitalLevel").val());
                        }
                    }
                }

            }
            else {

                //$("#HospitalLevel").removeAttr("disabled");
                //$("#IsPublicHos").removeAttr("disabled").change();
                $("#IsPublicHos").change();
                if ($("#IsPublicHos").val() != "" || $("#IsPublicHos").val() != "请选择") {
                    $("#publichospital_doctor").val($("#IsPublicHos").val());
                }
                singleVerify("HospitalLevel");
                if ($("#HospitalLevel").val() != "" || $("#HospitalLevel").val() != "请选择医院级别") {
                    $("#hospitalLevel_doctor").val($("#HospitalLevel").val());
                }
            }
        },
        error: function () {
        }
    });
}

function getDoctor() {
    var keyword = $("#NameVal").val();
    if (isEmpty(keyword)) { keyword = " "; }
    var areas = $("#region").val();
    var hospitalname = $("#HospitalVal").val();
    var areatext = "";//此变量此处已无用
    var pagesize = 5;
    areas = handleArea(areas);//处理部分城市名，因与yyk数据不一致
    //if (keyword)
    var data = { action: "GetDoctorList", keyword: keyword, hospitalname: hospitalname, areas: areas, pagesize: pagesize, areatext: areatext };
    $.ajax({
        type: "Post",
        url: "/Other/GetYYKjson.aspx",
        data: data,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async: true,
        success: function (json) {
            if (json.length > 0) {
                //$("#NameInfo").html(text);
                document.getElementById("NameInfo").innerHTML = "";
                for (var i = 0; i < json.length; i++) {
                    var name = json[i].Name;
                    var lab = json[i].Lab;
                    var grade = json[i].Grade;
                    var id = json[i].ID
                    var aEle = name;
                    if (!isEmpty(keyword)) {
                        aEle = aEle.replace(keyword, "<strong>" + keyword + "</strong>");
                    }
                    aEle = "<a href=\"javascript:void(0)\" tag='" + name + "' grade='" + grade + "' fourm='" + lab + "' docId='" + id + "'>" + lab + " - " + aEle + " " + grade.split(",")[0] + "</a>";
                    document.getElementById("NameInfo").innerHTML += aEle;
                }

                $('#Name').show();

                $(".T_iframe3").height($("#NameInfo").outerHeight(true));

                $.each($("#NameInfo a"), function (i, obj) {
                    $(this).click(function () {
                        $("#NameVal").val($(this).attr("tag"));
                        $("#yykDoctorName").val($(this).attr("tag"));
                        $("#yykDoctorID").val($(this).attr("docId"));
                        $('#Name').hide();
                        $("#NameVal").css("color", "Black");
                        //$("#Fourm").focus();
                        singleVerify("NameVal");

                        var fourm = $(this).attr("fourm");//所在科室
                        var fourList = [];
                        $("#Fourm option").each(function () {
                            var txt = $(this).text();
                            var obj = { obj: this, txt: txt };
                            fourList.push(obj);
                        });
                        var selected = false;
                        for (var i = 0; i < fourList.length; i++) {
                            var obj = fourList[i].obj;
                            var txt = fourList[i].txt;
                            if (txt.indexOf(fourm) > -1) {
                                selected = true;
                                $(obj).attr("selected", true);
                                //自动填充下面的科室，并将科室置为不可编辑
                                //$("#Fourm").attr("disabled", "disabled");
                                $("#keshi_doctor").val($("#Fourm").val());
                                break;
                            }
                        }
                        if (!selected) {
                            $("#Fourm")[0].selectedIndex = 0;
                            //$("#Fourm").removeAttr("disabled");
                        }

                        //临床职称操作
                        var grade = $(this).attr("grade");//临床职称
                        fourList = [];
                        $("#Clinical option").each(function () {
                            var txt = $(this).text();
                            var obj = { obj: this, txt: txt };
                            fourList.push(obj);
                        });
                        selected = false;
                        for (var i = 0; i < fourList.length; i++) {
                            var obj = fourList[i].obj;
                            var txt = fourList[i].txt;

                            //从yyk获取的grade是以（ 副主任医师,副教授）此种格式，需截取匹配
                            var gd = grade.split(',');
                            for (var j = 0; j < gd.length; j++) {
                                if (txt == gd[j]) {
                                    selected = true;
                                    $(obj).attr("selected", true);
                                    //$("#Clinical").attr("disabled", "disabled");
                                    $("#clinicalTitle_doctor").val($("#Clinical").val());
                                }
                            }
                        }
                        if (!selected) {
                            $("#Clinical")[0].selectedIndex = 0;
                            //$("#Clinical").removeAttr("disabled");
                        }

                    });
                });
            }
            else {
                $('#Name').hide();
            }
        },
        error: function () {
        }
    });

}


/************ common function begin ***************/

//字符串是否为空值
function isEmpty(msg) {
    if (msg == null || msg == "") {
        return true;
    }
    return false;
}

//返回字符串长度(中文为2个字符)
function getLength(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 256)
            len += 2;
        else
            len++;
    }
    return len;
}

function handleArea(areas) {
    var area = [
        { ori: "西藏自治", replace: "西藏" },
        { ori: "宁夏回族自治区", replace: "宁夏" },
        { ori: "新疆维吾尔自治区", replace: "新疆" },
        { ori: "广西壮族自治区", replace: "广西" },
        { ori: "_省直辖县级行政单位", replace: "" },
        { ori: "_省直辖行政单位", replace: "" },
        { ori: "_自治区直辖县级行政单位", replace: "" }
    ];

    for (var i = 0; i < area.length; i++) {
        areas = areas.replace(area[i].ori, area[i].replace)
    }
    return areas;
}

//是否为安全代码(由字母a～z、数字、横线组成，且以字母开头)
function isSafeStr(str) {
    return /^[a-zA-Z]+[a-zA-Z0-9-_]*$/.test(str);
}

//是否为安全代码(只包含汉字,字母,数字及下划线)
function isSafeStr2(str) {
    return /^[\u4E00-\u9FA5a-zA-Z0-9_]*$/.test(str);
}
//是否为安全代码(由字母a～z、数字、下划线组成)
function isSafeStr4(str) {
    return /^[a-zA-Z0-9_]*$/.test(str);
}
//是否为安全代码(只允许大小写字母、数字或下划线，不能为纯数字)
function isSafeStr3(str) {
    if (/^\d*$/.test(str))
        return false;
    return isSafeStr4(str);
}


//获取url参数
function getArgs() {
    var args = new Object();
    var query = location.search.substring(1);
    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos == -1) continue;
        var argname = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        value = decodeURIComponent(value);
        args[argname] = value;
    }
    return args;
}

/************ common function end ***************/


// cookie访问函数
// timeOut 分钟
function SetCookie(name, value, timeOut) {
    var exp = new Date();
    exp.setTime(exp.getTime() + timeOut * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/;domain=39.net";
}
function GetCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]); return null;
}
function DelCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = GetCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/;domain=39.net";
}
