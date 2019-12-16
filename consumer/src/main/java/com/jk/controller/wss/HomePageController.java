package com.jk.controller.wss;

import com.alibaba.dubbo.config.annotation.Reference;
import com.github.pagehelper.PageInfo;
import com.jk.model.wss.OutpatientModel;
import com.jk.model.wss.ReceptionModel;
import com.jk.model.wss.RegistrationModel;
import com.jk.model.wss.IncomeModel;
import com.jk.service.HomePageService;
import com.jk.util.LayuiUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @ClassName HomePageController
 * @Deacription TODO
 * @Author wss
 * @Date 2019/12/13 9:43
 * @Version 1.0
 **/
@Controller
@RequestMapping("home")
public class HomePageController {

    @Reference
    private HomePageService homePageService;

    @RequestMapping("tohomepage")
    public String tohomepage(){


        return  "wss/homepage";
    }
    @RequestMapping("toshow")
    public String toshow(){
        return  "wss/show";
    }

    @RequestMapping("EcharsShow")
    @ResponseBody
    public List<IncomeModel> EcharsShow() {
        List<IncomeModel>  list = homePageService.EcharsShow();
        return list;
    }

    @RequestMapping("query")
    @ResponseBody
    public Integer RegistrationShow() {

        RegistrationModel model = homePageService.RegistrationShow();

        return model.getCount();
    }

    @RequestMapping("Reception")
    @ResponseBody
    public Integer Reception() {

        ReceptionModel model = homePageService.ReceptionShow();

        return model.getCount();
    }

    @RequestMapping("income")
    @ResponseBody
    public Integer income() {

        IncomeModel model = homePageService.incomeShow();

        return model.getCount();
    }


    @RequestMapping("outpatient")
    @ResponseBody
    public LayuiUtil outpatient(Integer page, Integer limit){

        LayuiUtil layuiUtil = new LayuiUtil();


        PageInfo<OutpatientModel> info = homePageService.outpatient(page,limit);

        layuiUtil.setData(info.getList());

        layuiUtil.setCount(info.getTotal());

        return layuiUtil;
    }
}
