package com.jk.serviceImpl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import com.jk.mapper.LpbMapper;
import com.jk.model.lpb.lpbshoufei;
import com.jk.service.LpbService;
import com.jk.service.TreeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
@Service(interfaceClass = LpbService.class)
public class LpbServiceImpl implements LpbService {
    @Autowired
    private LpbMapper lpbmapper;

    //收费管理查询
    @Override
    public PageInfo<lpbshoufei> query(Integer page, Integer limit) {
        PageHelper.startPage(page,limit);
        List<lpbshoufei> list=lpbmapper.query();
        PageInfo<lpbshoufei> info=new PageInfo<lpbshoufei>(list);


        return info;
    }
    //收费查询的删除
    @Override
    public void lpbdel(Integer id) {
        lpbmapper.lpbdel(id);
    }
    //已收费查询
    @Override
    public PageInfo<lpbshoufei> lpbyishoufei(Integer page, Integer limit) {
        PageHelper.startPage(page,limit);
        List<lpbshoufei> list=lpbmapper.lpbyishoufei();
        PageInfo<lpbshoufei> info=new PageInfo<lpbshoufei>(list);
        return info;
    }

    @Override
    public PageInfo<lpbshoufei> lpbyituifeiquery(Integer page, Integer limit) {
        PageHelper.startPage(page,limit);
        List<lpbshoufei> list=lpbmapper.lpbyituifeiquery();
        PageInfo<lpbshoufei> info=new PageInfo<lpbshoufei>(list);
        return info;
    }




  /*  *//*待收费回显*//*
    @Override
    public lpbshoufei upda(Integer id) {
        return lpbmapper.lpbupda(id);
    }*/

    @Override
    public void lpbupdate(lpbshoufei model) {
        lpbmapper.lpbupdate(model);
    }
     /*待收费状态修改成已收费*/
    @Override
    public void lpbyishoufeiid(Integer id) {
        lpbmapper.lpbyishoufeiid(id);
    }
    /*待收费修改成已退费*/
    @Override
    public void lpbyituifeiid(Integer id) {
        lpbmapper.lpbyituifeiid(id);
    }
   /*待收费*/
    @Override
    public void lpbdaishoufeiid(Integer id) {
        lpbmapper.lpbdaishoufeiid(id);
    }

    /*待收费回显*/
    @Override
    public lpbshoufei lpbupda(Integer id) {
        return lpbmapper.lpbupda(id);
    }

}
