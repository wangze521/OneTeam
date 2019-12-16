package com.jk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LpbPageController {
    //收费管理查询
    @RequestMapping("lpbhuanzhe")
    public String lpbhuanzhe(){

        return "lpb/lpbhuanzhe";
    }





}
