package com.jk.service;

import com.jk.model.hcc.hospitalinformation;

/**
 * author:hcc
 * createTime:2019/12/13
 * info:
 * project_name:workspace4
 **/
public interface HccService {
    hospitalinformation queryhospital(Integer   id);

    void updatehospital(hospitalinformation hospitalinformation);

}
