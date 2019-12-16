package com.jk.serviceImpl;

import com.alibaba.dubbo.config.annotation.Service;
import com.jk.mapper.HccMapper;
import com.jk.model.hcc.hospitalinformation;
import com.jk.service.HccService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * author:hcc
 * createTime:2019/12/13
 * info:
 * project_name:workspace4
 **/
@Component
@Service
public class HccServiceImpl implements HccService {

    @Autowired
    private HccMapper hccMapper;

    @Override
    public hospitalinformation queryhospital(Integer   id) {

        return hccMapper.queryhospital(id);
    }

    @Override
    public void updatehospital(hospitalinformation hospitalinformation) {
        hccMapper.updatehospital(hospitalinformation);
    }
}
