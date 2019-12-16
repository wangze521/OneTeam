package com.jk.model;

import java.io.Serializable;

public class Storage implements Serializable {
    private static final long serialVersionUID = -707840094331314703L;
    private Integer storageId;

    private String storageNum;

    private Integer storageType;

    private String supplierName;

    private String makingPersonnel;

    private Double purchaseAmount;

    private Double retailAmount;

    private String warehousePersonnel;

    private String createTime;

    private Integer status;

    public Integer getStorageId() {
        return storageId;
    }

    public void setStorageId(Integer storageId) {
        this.storageId = storageId;
    }

    public String getStorageNum() {
        return storageNum;
    }

    public void setStorageNum(String storageNum) {
        this.storageNum = storageNum;
    }

    public Integer getStorageType() {
        return storageType;
    }

    public void setStorageType(Integer storageType) {
        this.storageType = storageType;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public String getMakingPersonnel() {
        return makingPersonnel;
    }

    public void setMakingPersonnel(String makingPersonnel) {
        this.makingPersonnel = makingPersonnel;
    }

    public Double getPurchaseAmount() {
        return purchaseAmount;
    }

    public void setPurchaseAmount(Double purchaseAmount) {
        this.purchaseAmount = purchaseAmount;
    }

    public Double getRetailAmount() {
        return retailAmount;
    }

    public void setRetailAmount(Double retailAmount) {
        this.retailAmount = retailAmount;
    }

    public String getWarehousePersonnel() {
        return warehousePersonnel;
    }

    public void setWarehousePersonnel(String warehousePersonnel) {
        this.warehousePersonnel = warehousePersonnel;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}