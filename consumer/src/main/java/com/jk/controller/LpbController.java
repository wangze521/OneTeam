package com.jk.controller;


import com.github.pagehelper.PageInfo;
import com.alibaba.dubbo.config.annotation.Reference;
import com.jk.model.lpb.lpbshoufei;
import com.jk.service.LpbService;
import com.jk.service.TreeService;
import com.jk.util.LayuiUtil;


import org.springframework.beans.factory.annotation.Autowired;



import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;


@Controller
public class LpbController {
    @Reference
    private LpbService service;


   //收费管理查询
    @RequestMapping("query")
    @ResponseBody
    public LayuiUtil query(Integer page, Integer limit, HttpSession session){
        PageInfo<lpbshoufei> info =service.query(page,limit);

        LayuiUtil layuiUtil = new LayuiUtil();

        layuiUtil.setCount(info.getTotal());

        layuiUtil.setData(info.getList());




        return layuiUtil;
    }
    //收费查询的删除
    @RequestMapping("lpbdel")
    @ResponseBody
    public String lpbdel(Integer id){

        service.lpbdel(id);

        return "删除成功";
    }
//已收费查询
    @RequestMapping("lpbyishoufeiquery")
    @ResponseBody
    public LayuiUtil lpbyishoufeiquery(Integer page, Integer limit){
        PageInfo<lpbshoufei> info =service.lpbyishoufei(page,limit);

        LayuiUtil layuiUtil1 = new LayuiUtil();

        layuiUtil1.setCount(info.getTotal());

        layuiUtil1.setData(info.getList());


        return layuiUtil1;
    }
    //已退费查询
    @RequestMapping("lpbyituifeiquery")
    @ResponseBody
    public LayuiUtil lpbyituifeiquery(Integer page, Integer limit){
        PageInfo<lpbshoufei> info =service.lpbyituifeiquery(page,limit);

        LayuiUtil layuiUtil2 = new LayuiUtil();

        layuiUtil2.setCount(info.getTotal());

        layuiUtil2.setData(info.getList());


        return layuiUtil2;
    }
    /*待收费回显*/
    @RequestMapping("upda")
    @ResponseBody
    public lpbshoufei  upda(Integer id, HttpSession session){

        lpbshoufei  model = service.lpbupda(id);

        session.setAttribute("model",model);

        System.out.println(model.getId());

        return model;
    }
    /*待收费修改*/
    @RequestMapping("update")
    @ResponseBody
    public String update(lpbshoufei model){


        service.lpbupdate(model);

        return "新增成功";
    }
    /*待收费状态修改成已收费*/

    @RequestMapping("yishoufeiid")
    @ResponseBody
    public void yishoufeiid(Integer id){

        service.lpbyishoufeiid(id);

    }

    /*待收费状态修改成已退费*/

    @RequestMapping("yituifeiid")
    @ResponseBody
    public void yituifeiid(Integer id){

        service.lpbyituifeiid(id);

    }

    /*待收费*/

    @RequestMapping("daishoufeiid")
    @ResponseBody
    public void daishoufeiid(Integer id){

        service.lpbdaishoufeiid(id);

    }






}
