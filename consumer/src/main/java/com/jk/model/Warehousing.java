package com.jk.model;

import java.io.Serializable;

public class Warehousing implements Serializable {

    private static final long serialVersionUID = -1891402360269706158L;
    private Integer drugId; //主键Id
    private String seat;   //序号
    private Integer oddnum;//单号
    private String drugname;//药品编码
    private String specification;//规格
    private String manufacturer; //生产厂商
    private Integer batch;      //入库类型
    private String supplier;    //批号
    private Double purchaesPrice;//采购价
    private String quantity;     //数量
    private Double purchaseCost; //采购成本
    private String wareHousepersonnel; //入库人员
    private String wareHouseentrytime;//入库日期
    private String verifier;//审核人员
    private String dateofApproval;//审核日期

    public Integer getDrugId() {
        return drugId;
    }

    public void setDrugId(Integer drugId) {
        this.drugId = drugId;
    }

    public String getSeat() {
        return seat;
    }

    public void setSeat(String seat) {
        this.seat = seat;
    }

    public Integer getOddnum() {
        return oddnum;
    }

    public void setOddnum(Integer oddnum) {
        this.oddnum = oddnum;
    }

    public String getDrugname() {
        return drugname;
    }

    public void setDrugname(String drugname) {
        this.drugname = drugname;
    }

    public String getSpecification() {
        return specification;
    }

    public void setSpecification(String specification) {
        this.specification = specification;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public Integer getBatch() {
        return batch;
    }

    public void setBatch(Integer batch) {
        this.batch = batch;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    public Double getPurchaesPrice() {
        return purchaesPrice;
    }

    public void setPurchaesPrice(Double purchaesPrice) {
        this.purchaesPrice = purchaesPrice;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public Double getPurchaseCost() {
        return purchaseCost;
    }

    public void setPurchaseCost(Double purchaseCost) {
        this.purchaseCost = purchaseCost;
    }

    public String getWareHousepersonnel() {
        return wareHousepersonnel;
    }

    public void setWareHousepersonnel(String wareHousepersonnel) {
        this.wareHousepersonnel = wareHousepersonnel;
    }

    public String getWareHouseentrytime() {
        return wareHouseentrytime;
    }

    public void setWareHouseentrytime(String wareHouseentrytime) {
        this.wareHouseentrytime = wareHouseentrytime;
    }

    public String getVerifier() {
        return verifier;
    }

    public void setVerifier(String verifier) {
        this.verifier = verifier;
    }

    public String getDateofApproval() {
        return dateofApproval;
    }

    public void setDateofApproval(String dateofApproval) {
        this.dateofApproval = dateofApproval;
    }
}
