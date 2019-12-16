package com.jk.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.jk.model.*;
import com.jk.service.DrugService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
public class DrugController {
    @Reference
    private DrugService drugService;

    /**
     * @MethodName: DrugInfo
     * @Description: TODO
     * @Param: 药品信息维护
     * @Return: java.util.HashMap<java.lang.String,java.lang.Object>
     * @Author: 祎赟
     * @Date: 2019/12/13
     **/
    @GetMapping(value="/DrugInfo")
    public HashMap<String,Object> DrugInfo(Integer page, Integer limit, DrugInfo druginfo){
        return drugService.DrugInfo(page,limit,druginfo);
    }
    /**
    * @MethodName: Storage
    * @Description: TODO
    * @Param: 入库管理
    * @Return: java.util.HashMap<java.lang.String,java.lang.Object>
    * @Author: 祎赟
    * @Date: 2019/12/13
    **/
    @GetMapping(value="/Storage")
    public HashMap<String,Object> Storage(Integer page, Integer limit, Storage storage){
        return drugService.Storage(page,limit,storage);
    }
    /**
    * @MethodName: Removal
    * @Description: TODO
    * @Param: 出库管理
    * @Return: java.util.HashMap<java.lang.String,java.lang.Object>
    * @Author: 祎赟
    * @Date: 2019/12/13
    **/
    @GetMapping(value="/Removal")
    public HashMap<String,Object> Removal(Integer page, Integer limit, Removal removal){
        return drugService. Removal(page,limit,removal);
    }
    /**
    * @MethodName: Repertory
    * @Description: TODO
    * @Param: 库存管理
    * @Return: java.util.HashMap<java.lang.String,java.lang.Object>
    * @Author: 祎赟
    * @Date: 2019/12/13
    **/
    @GetMapping(value="/Repertory")
    public HashMap<String,Object> Repertory(Integer page, Integer limit, Repertory repertory){
        return drugService.Repertory(page,limit,repertory);
    }
    //-----------------------------业务------------------------------------
    @RequestMapping("disableDrug")
    public void disableDrug(Integer drugId){
        drugService.disableDrug(drugId);
    }
    @RequestMapping("enabledDrug")
    public void enabledDrug(Integer drugId){
        drugService.enabledDrug(drugId);
    }
    @GetMapping(value="/findStorageById")
    public Storage findStorageById(Integer storageId){
        return drugService.findStorageById(storageId);
    }








    /**
    * @MethodName: Warehousing
    * @Description: TODO
    * @Param: 药品统计
    * @Return: java.util.HashMap<java.lang.String,java.lang.Object>
    * @Author: 祎赟
    * @Date: 2019/12/13
    **/
    @GetMapping(value="/Warehousing")
    public HashMap<String,Object> Warehousing(Integer page, Integer limit, Warehousing warehousing){
        return drugService.Warehousing(page,limit,warehousing);

    }

    /**
    * @MethodName: ExWarehouse
    * @Description: TODO
    * @Param: 出库管理g
    * @Return: java.util.HashMap<java.lang.String,java.lang.Object>
    * @Author: 祎赟
    * @Date: 2019/12/13
    **/
    @GetMapping(value="/ExWarehouse")
    public HashMap<String,Object> ExWarehouse(Integer page, Integer limit, ExWarehouse exWarehouse){
        return drugService.ExWarehouse(page,limit,exWarehouse);

    }


}
