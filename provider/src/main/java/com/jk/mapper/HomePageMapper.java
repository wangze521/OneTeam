package com.jk.mapper;

import com.github.pagehelper.PageInfo;
import com.jk.model.wss.IncomeModel;
import com.jk.model.wss.OutpatientModel;
import com.jk.model.wss.ReceptionModel;
import com.jk.model.wss.RegistrationModel;

import java.util.List;

/**
 * @ClassName HomePageMapper
 * @Deacription TODO
 * @Author wss
 * @Date 2019/12/13 16:01
 * @Version 1.0
 **/
public interface HomePageMapper {


   List<IncomeModel> EcharsShow();

    RegistrationModel RegistrationShow();

    ReceptionModel ReceptionShow();

    IncomeModel incomeShow();

    List<OutpatientModel> outpatient();
}
