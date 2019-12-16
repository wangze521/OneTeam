package com.jk.service;


import com.jk.model.*;

import java.util.HashMap;

public interface DrugService {
    HashMap<String, Object> DrugInfo(Integer page, Integer limit, DrugInfo druginfo);

    HashMap<String, Object> Storage(Integer page, Integer limit, Storage storage);

    HashMap<String, Object> Removal(Integer page, Integer limit, Removal removal);

    HashMap<String, Object> Repertory(Integer page, Integer limit, Repertory repertory);

    HashMap<String, Object> Warehousing(Integer page, Integer limit, Warehousing warehousing);

    HashMap<String, Object> ExWarehouse(Integer page, Integer limit, ExWarehouse exWarehouse);

    void disableDrug(Integer drugId);

    void enabledDrug(Integer drugId);

    Storage findStorageById(Integer storageId);


}
