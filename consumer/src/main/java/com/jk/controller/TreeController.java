package com.jk.controller;


import com.alibaba.dubbo.config.annotation.Reference;
import com.jk.service.TreeService;
import com.jk.util.LayuiTree;
import com.jk.util.LayuiTreeUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("wz")
public class TreeController {

       @Reference
       private TreeService service;

    @RequestMapping("async")
    @ResponseBody
    public  List<LayuiTree> async(){

        System.out.println("sss");

        List<LayuiTree> list  = service.async();

        list = LayuiTreeUtil.getFatherNode(list);


        return list ;
    }



}
