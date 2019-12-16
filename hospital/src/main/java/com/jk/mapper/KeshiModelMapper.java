package com.jk.mapper;



import com.jk.model.KeshiModel;

import java.util.List;

public interface KeshiModelMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(KeshiModel record);

    int insertSelective(KeshiModel record);

    KeshiModel selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(KeshiModel record);

    int updateByPrimaryKey(KeshiModel record);

    List<KeshiModel> query();
}