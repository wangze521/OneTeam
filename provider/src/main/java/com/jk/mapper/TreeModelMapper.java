package com.jk.mapper;

import com.jk.model.TreeModel;
import com.jk.util.LayuiTree;

import java.util.List;
public interface TreeModelMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TreeModel record);

    int insertSelective(TreeModel record);

    TreeModel selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TreeModel record);

    int updateByPrimaryKey(TreeModel record);


    List<LayuiTree> async();
}