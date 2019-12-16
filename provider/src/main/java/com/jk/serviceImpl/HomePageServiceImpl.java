package com.jk.serviceImpl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jk.mapper.HomePageMapper;
import com.jk.model.wss.IncomeModel;
import com.jk.model.wss.OutpatientModel;
import com.jk.model.wss.ReceptionModel;
import com.jk.model.wss.RegistrationModel;
import com.jk.service.HomePageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @ClassName HomePageServiceImpl
 * @Deacription TODO
 * @Author wss
 * @Date 2019/12/13 15:58
 * @Version 1.0
 **/
@Component
@Service(interfaceClass = HomePageService.class)
public class HomePageServiceImpl implements HomePageService {
    @Autowired
    private HomePageMapper homePageMapper;

    @Override
    public List<IncomeModel> EcharsShow() {

        return homePageMapper.EcharsShow();
    }

    @Override
    public RegistrationModel RegistrationShow() {

        return homePageMapper.RegistrationShow();
    }

    @Override
    public ReceptionModel ReceptionShow() {
        return homePageMapper.ReceptionShow();
    }

    @Override
    public IncomeModel incomeShow() {
        return homePageMapper.incomeShow();
    }


    @Override
    public PageInfo<OutpatientModel> outpatient(Integer page, Integer limit) {

        PageHelper.startPage(page,limit);

        List<OutpatientModel> list = homePageMapper.outpatient();

        PageInfo<OutpatientModel> info = new PageInfo<OutpatientModel>(list);

        return info;
    }

}
