package com.jk.service;

import com.github.pagehelper.PageInfo;
import com.jk.model.lpb.lpbshoufei;

public interface LpbService {
    //收费管理查询
    PageInfo<lpbshoufei> query(Integer page, Integer limit);
    //收费查询的删除
    void lpbdel(Integer id);
    //已收费查询
    PageInfo<lpbshoufei>  lpbyishoufei(Integer page, Integer limit);
    //已退费查询
    PageInfo<lpbshoufei> lpbyituifeiquery(Integer page, Integer limit);
    //待收费查询
    lpbshoufei lpbupda(Integer id);
    //待收费修改
    void lpbupdate(lpbshoufei model);
    /*待收状态修改成已收费*/
    void lpbyishoufeiid(Integer id);
    /*待收费修改成已退费*/
    void lpbyituifeiid(Integer id);
    /*待收费*/
    void lpbdaishoufeiid(Integer id);
}
