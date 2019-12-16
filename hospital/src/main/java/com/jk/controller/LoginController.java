package com.jk.controller;

import com.jk.model.StatusModel;
import com.jk.model.UserModel;
import com.jk.service.LoginService;
import com.jk.utill.CheckImgUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.security.auth.Subject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("login")
public class LoginController {


    @Autowired
    private LoginService service;

    @RequestMapping("getImgCode")
    public void getImgCode(HttpServletRequest request, HttpServletResponse response) throws Exception {

        CheckImgUtil.checkImg(request, response);

        String str = (String) request.getSession().getAttribute("checkcode");

        System.out.println(str);

    }

    @RequestMapping("queryGua")
    @ResponseBody
    public Integer queryLogin(){

       StatusModel model =  service.queryGua();

        return model.getStatus();
    }


    @RequestMapping("login")
    @ResponseBody
    public String login(UserModel user,String code,HttpSession session){
        //验证验证码
        String codeName = session.getAttribute("checkcode").toString();
        if(!code.equalsIgnoreCase(codeName)){
            return "验证码错误！";
        }
        //验证用户名
        UserModel user2 = service.queryUserName(user.getName());
        if(user2==null){
            return "用户名不存在！";
        }

        //验证密码
        if(!user.getPassword().equals(user2.getPassword())){
            return "密码错误！";
        }

        session.setAttribute("id", user2.getId());

        System.out.println(session.getAttribute("id"));
        service.updateUser();

        return "登录成功！";
    }



    @RequestMapping("register")
    @ResponseBody
    public String register(UserModel user,HttpSession session){
        //验证用户名
        UserModel user2 = service.queryUserName(user.getName());

        if(user2!=null){
            return "用户名已存在！";
        }

        //验证密码
        if(!user.getPassword().equals(user.getQrpassword())){
            return "两次密码不一致,请重新输入！";
        }

        service.Addregister(user);

        return "注册成功！";
    }
    @RequestMapping("queryId")
    @ResponseBody
    public String queryId(Integer id){

        UserModel model = service.queryId(id);
          return model.getName();
    }

    @RequestMapping("logout")
    public String logout(HttpSession session){
        session.removeAttribute("id");
        service.updatelogout();
        return "login";
    }

}
