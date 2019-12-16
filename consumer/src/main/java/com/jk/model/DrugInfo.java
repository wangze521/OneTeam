package com.jk.model;

import java.io.Serializable;

public class DrugInfo implements Serializable {
    private static final long serialVersionUID = 5864596378031824313L;
    private Integer drugId;//序号

    private Integer encoding;//编码

    private String drugName;//药品名称

    private String specification;//规格

    private String categories;//收费类别

    private Double procurement;//采购价

    private Double sellingPrice;//售药价

    private String manufacturer;//生产厂家

    private Integer status;//状态

    private String createTime;//创建时间

    public Integer getDrugId() {
        return drugId;
    }

    public void setDrugId(Integer drugId) {
        this.drugId = drugId;
    }

    public Integer getEncoding() {
        return encoding;
    }

    public void setEncoding(Integer encoding) {
        this.encoding = encoding;
    }

    public String getDrugName() {
        return drugName;
    }

    public void setDrugName(String drugName) {
        this.drugName = drugName;
    }

    public String getSpecification() {
        return specification;
    }

    public void setSpecification(String specification) {
        this.specification = specification;
    }

    public String getCategories() {
        return categories;
    }

    public void setCategories(String categories) {
        this.categories = categories;
    }

    public Double getProcurement() {
        return procurement;
    }

    public void setProcurement(Double procurement) {
        this.procurement = procurement;
    }

    public Double getSellingPrice() {
        return sellingPrice;
    }

    public void setSellingPrice(Double sellingPrice) {
        this.sellingPrice = sellingPrice;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }
}