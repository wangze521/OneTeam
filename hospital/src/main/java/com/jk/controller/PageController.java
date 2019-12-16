package com.jk.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("page")
public class PageController {


    @RequestMapping("tologin")
    public String tologin(){

        return "login";
    }
    @RequestMapping("todoctor")
    public String todoctor(){

        return "doctor";
    }

    @RequestMapping("toIndex")
    public String toIndex(){

        return "Index";
    }
    @RequestMapping("toregister")
    public String toregister(){

        return "register";
    }

}
