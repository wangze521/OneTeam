package com.jk.controller.hccController;

import com.alibaba.dubbo.config.annotation.Reference;
import com.jk.model.hcc.hospitalinformation;
import com.jk.service.HccService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * author:hcc
 * createTime:2019/12/13
 * info:
 * project_name:workspace4
 **/
@Controller
@RequestMapping("hcc")
public class hccController {


    @Reference
    private HccService hccService;

    @RequestMapping("queryhospital")
    @ResponseBody
    public hospitalinformation queryhospital(Integer   id){

        hospitalinformation   hf= hccService.queryhospital(id);
        return  hf;
    }

    @RequestMapping("updatehospital")
    @ResponseBody
    public  void  updatehospital(hospitalinformation  hospitalinformation){
        hccService.updatehospital(hospitalinformation);
    }
}
