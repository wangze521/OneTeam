package com.jk.mapper;

import com.jk.model.lpb.lpbshoufei;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface LpbMapper {
    //收费管理查询
    List<lpbshoufei> query();
    //收费查询的删除
    void lpbdel(@Param("id") Integer id);
   //已收费查询
    List<lpbshoufei> lpbyishoufei();
    //已退费查询
    List<lpbshoufei> lpbyituifeiquery();
    //待收费查询
    @Select("select * FROM lpbshoufei s where s.id=#{id} ")
    lpbshoufei lpbupda(@Param("id") Integer id);
    //待收费修改
    void lpbupdate(lpbshoufei model);
    /*待收费状态修改成已收费*/
    void lpbyishoufeiid(@Param("id") Integer id);
    /*待收费修改成已退费*/
    void lpbyituifeiid(Integer id);
    /*待收费*/
    void lpbdaishoufeiid(Integer id);
}
