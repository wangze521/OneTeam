package com.jk.mapper;

import com.jk.model.hcc.hospitalinformation;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

/**
 * author:hcc
 * createTime:2019/12/13
 * info:
 * project_name:workspace4
 **/
@Mapper
public interface HccMapper {

    @Select("select * from  hospital_information where hospitalid=#{id}")
    hospitalinformation queryhospital(@Param("id") Integer id);

    void updatehospital(hospitalinformation h);
}
