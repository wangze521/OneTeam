package com.jk.mapper;

import com.jk.model.*;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface DrugMapper {

    long queryDrugLimit(@Param("druginfo") DrugInfo druginfo);

    List<DrugInfo> queryDrugInfo(@Param("start") int start,@Param("limit") Integer limit,@Param("druginfo") DrugInfo druginfo);

    long queryStorageLimit(@Param("storage") Storage storage);

    List<Storage> queryStorage(@Param("start") int start,@Param("limit")Integer limit,@Param("storage") Storage storage);

    long queryRemovalLimit(@Param("removal") Removal removal);

    List<Removal> queryRemoval(@Param("start") int start,@Param("limit")Integer limit,@Param("removal") Removal removal);

    long queryRepertoryLimit(@Param("repertory") Repertory repertory);

    List<Repertory> queryRepertory(@Param("start") int start,@Param("limit")Integer limit,@Param("repertory") Repertory repertory);

    long queryWarehousingLimit(@Param("warehousing") Warehousing warehousing);

    List<Warehousing> queryWarehousing(@Param("start") int start,@Param("limit") Integer limit, @Param("warehousing")Warehousing warehousing);

    long queryExWarehouseLimit(@Param("exWarehouse") ExWarehouse exWarehouse);

    List<ExWarehouse> queryExWarehouse(@Param("start") int start,@Param("limit") Integer limit,@Param("exWarehouse")  ExWarehouse exWarehouse);

    void disableDrug(@Param("drugId") Integer drugId);

    void enabledDrug(Integer drugId);

    Storage findStorageById(@Param("storageId") Integer storageId);
}
