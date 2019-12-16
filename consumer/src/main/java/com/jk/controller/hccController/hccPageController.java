package com.jk.controller.hccController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * author:hcc
 * createTime:2019/12/13
 * info:
 * project_name:workspace4
 **/
@Controller
@RequestMapping("hccPage")
public class hccPageController {

        @RequestMapping("tomain")
        public   String   tomain(){
            return   "hcc/main";
        }

}
