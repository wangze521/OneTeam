package com.jk.model.lpb;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

public class lpbshoufei implements Serializable {
    private static final long serialVersionUID = -4787975354146892524L;
    private Integer id;

    private String dingdan;

    private String dingdantype;

    private String name;

    private Integer nainling;

    private Integer shouji;

    private String keshi;

    private String yisheng;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date shijian;

    private Double yingshoujinger;

    private String shoufeiinfo;

    private String caozuo;

    private Integer xingbie;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDingdan() {
        return dingdan;
    }

    public void setDingdan(String dingdan) {
        this.dingdan = dingdan == null ? null : dingdan.trim();
    }

    public String getDingdantype() {
        return dingdantype;
    }

    public void setDingdantype(String dingdantype) {
        this.dingdantype = dingdantype == null ? null : dingdantype.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public Integer getNainling() {
        return nainling;
    }

    public void setNainling(Integer nainling) {
        this.nainling = nainling;
    }

    public Integer getShouji() {
        return shouji;
    }

    public void setShouji(Integer shouji) {
        this.shouji = shouji;
    }

    public String getKeshi() {
        return keshi;
    }

    public void setKeshi(String keshi) {
        this.keshi = keshi == null ? null : keshi.trim();
    }

    public String getYisheng() {
        return yisheng;
    }

    public void setYisheng(String yisheng) {
        this.yisheng = yisheng == null ? null : yisheng.trim();
    }

    public Date getShijian() {
        return shijian;
    }

    public void setShijian(Date shijian) {
        this.shijian = shijian;
    }

    public Double getYingshoujinger() {
        return yingshoujinger;
    }

    public void setYingshoujinger(Double yingshoujinger) {
        this.yingshoujinger = yingshoujinger;
    }

    public String getShoufeiinfo() {
        return shoufeiinfo;
    }

    public void setShoufeiinfo(String shoufeiinfo) {
        this.shoufeiinfo = shoufeiinfo == null ? null : shoufeiinfo.trim();
    }

    public String getCaozuo() {
        return caozuo;
    }

    public void setCaozuo(String caozuo) {
        this.caozuo = caozuo == null ? null : caozuo.trim();
    }

    public Integer getXingbie() {
        return xingbie;
    }

    public void setXingbie(Integer xingbie) {
        this.xingbie = xingbie;
    }
}