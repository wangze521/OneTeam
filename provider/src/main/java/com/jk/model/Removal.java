package com.jk.model;

import java.io.Serializable;

public class Removal implements Serializable {

    private static final long serialVersionUID = 8209169612526148562L;
    private Integer removald;

    private String removalNum;

    private Integer removalType;

    private String makingPersonnel;

    private Double purchaseAmount;

    private Double retailAmount;

    private String outboundPersonnel;

    private String createTime;

    private Integer status;

    public Integer getRemovald() {
        return removald;
    }

    public void setRemovald(Integer removald) {
        this.removald = removald;
    }

    public String getRemovalNum() {
        return removalNum;
    }

    public void setRemovalNum(String removalNum) {
        this.removalNum = removalNum;
    }

    public Integer getRemovalType() {
        return removalType;
    }

    public void setRemovalType(Integer removalType) {
        this.removalType = removalType;
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

    public String getOutboundPersonnel() {
        return outboundPersonnel;
    }

    public void setOutboundPersonnel(String outboundPersonnel) {
        this.outboundPersonnel = outboundPersonnel;
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