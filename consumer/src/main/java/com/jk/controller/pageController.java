package com.jk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class pageController {
    @RequestMapping("toDrugInfo")
    public String toDrugInfo(){
        return "druginfo";
    }
    @RequestMapping("toStorage")
    public String toStorage(){
        return "storage";
    }
    @RequestMapping("toRemoval")
    public String toRemoval(){
        return "removal";
    }
    @RequestMapping("toRepertory")
    public String toRepertory(){
        return "repertory";
    }
    @RequestMapping("toStatistical")
    public String toWae(){
        return "statistical";
    }
    @RequestMapping("toExwarehouse")
    public String toExW(){
        return "exwarehouse";
    }

}
