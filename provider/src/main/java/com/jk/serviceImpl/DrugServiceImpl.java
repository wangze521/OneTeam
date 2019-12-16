package com.jk.serviceImpl;

import com.alibaba.dubbo.config.annotation.Service;
import com.jk.mapper.DrugMapper;
import com.jk.model.*;
import com.jk.service.DrugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

@Component
@Service(interfaceClass = DrugService.class)
public class DrugServiceImpl implements DrugService {
@Autowired
private DrugMapper drugMapper;
    //药品信息
    @Override
    public HashMap<String, Object> DrugInfo(Integer page, Integer limit, DrugInfo druginfo) {
        HashMap<String, Object> map=new HashMap<String, Object>();
        long count=drugMapper.queryDrugLimit(druginfo);
        int start=(page-1)*limit;
        List<DrugInfo> list=drugMapper.queryDrugInfo(start,limit,druginfo);
        map.put("code",0);
        map.put("msg","");
        map.put("count",count);
        map.put("data",list);
        return map;
    }
    //入库管理
    @Override
    public HashMap<String, Object> Storage(Integer page, Integer limit, Storage storage) {
        HashMap<String, Object> map=new HashMap<String, Object>();
        long count=drugMapper.queryStorageLimit(storage);
        int start=(page-1)*limit;
        List<Storage> list=drugMapper.queryStorage(start,limit,storage);
        map.put("code",0);
        map.put("msg","");
        map.put("count",count);
        map.put("data",list);
        return map;
    }
    //出库管理
    @Override
    public HashMap<String, Object> Removal(Integer page, Integer limit, Removal removal) {
        HashMap<String, Object> map=new HashMap<String, Object>();
        long count=drugMapper.queryRemovalLimit(removal);
        int start=(page-1)*limit;
        List<Removal> list=drugMapper.queryRemoval(start,limit,removal);
        map.put("code",0);
        map.put("msg","");
        map.put("count",count);
        map.put("data",list);
        return map;
    }
    //库存
    @Override
    public HashMap<String, Object> Repertory(Integer page, Integer limit, Repertory repertory) {
        HashMap<String, Object> map=new HashMap<String, Object>();
        long count=drugMapper.queryRepertoryLimit(repertory);
        int start=(page-1)*limit;
        List<Repertory> list=drugMapper.queryRepertory(start,limit,repertory);
        map.put("code",0);
        map.put("msg","");
        map.put("count",count);
        map.put("data",list);
        return map;
    }

    //入库
    @Override
    public HashMap<String, Object> Warehousing(Integer page, Integer limit, Warehousing warehousing) {
        HashMap<String, Object> map=new HashMap<String, Object>();
        long count=drugMapper.queryWarehousingLimit(warehousing);
        int start=(page-1)*limit;
        List<Warehousing> list=drugMapper.queryWarehousing(start,limit,warehousing);
        map.put("code",0);
        map.put("msg","");
        map.put("count",count);
        map.put("data",list);
        return map;
    }
    //出库
    @Override
    public HashMap<String, Object> ExWarehouse(Integer page, Integer limit, ExWarehouse exWarehouse) {
        HashMap<String, Object> map=new HashMap<String, Object>();
        long count=drugMapper.queryExWarehouseLimit(exWarehouse);
        int start=(page-1)*limit;
        List<ExWarehouse> list=drugMapper.queryExWarehouse(start,limit,exWarehouse);
        map.put("code",0);
        map.put("msg","");
        map.put("count",count);
        map.put("data",list);
        return map;
    }

    @Override
    public void disableDrug(Integer drugId) {
      drugMapper.disableDrug(drugId);
    }

    @Override
    public void enabledDrug(Integer drugId) {
        drugMapper.enabledDrug(drugId);
    }

    @Override
    public Storage findStorageById(Integer storageId) {
        return drugMapper.findStorageById(storageId);
    }

}
