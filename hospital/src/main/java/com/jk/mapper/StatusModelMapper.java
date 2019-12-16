package com.jk.mapper;

import com.jk.model.StatusModel;
import com.jk.model.UserModel;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

public interface StatusModelMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(StatusModel record);

    int insertSelective(StatusModel record);

    StatusModel selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(StatusModel record);

    int updateByPrimaryKey(StatusModel record);

    StatusModel  queryGua();

    @Select("select * from user u where u.name = #{name}")
    UserModel queryUserName(@Param("name") String name);
    @Insert("insert into user (name, sex, age, password) value(#{user.name},#{user.sex},#{user.age},#{user.password})")
    void Addregister(@Param("user")UserModel user);
    @Select("select * from user u where u.id = #{id}")
    UserModel queryId(@Param("id") Integer id);
    @Update("update html_status set status=2")
    void updateUser();
    @Update("update html_status set status=1")
    void updatelogout();
}