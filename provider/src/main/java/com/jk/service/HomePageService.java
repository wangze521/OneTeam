package com.jk.service;

import com.github.pagehelper.PageInfo;
import com.jk.model.wss.IncomeModel;
import com.jk.model.wss.OutpatientModel;
import com.jk.model.wss.ReceptionModel;
import com.jk.model.wss.RegistrationModel;

import java.util.List;

public interface HomePageService {
    List<IncomeModel> EcharsShow();
    RegistrationModel RegistrationShow();
    ReceptionModel ReceptionShow();
    IncomeModel incomeShow();
    PageInfo<OutpatientModel> outpatient(Integer page, Integer limit);

}
