package com.jk.model.wss;

import java.io.Serializable;

/**
 * @ClassName Echars
 * @Deacription TODO
 * @Author wss
 * @Date 2019/12/13 20:35
 * @Version 1.0
 **/

public class OutpatientModel implements Serializable {
    private static final long serialVersionUID = -1076526822839322881L;

    private Integer id;
    private Integer status;
    private Integer number;
    private String name;
    private String sex;
    private Integer age;
    private String phone;
    private String type;
    private String office;
    private String doctor;
    private String date;
    private String jobname;
    private String kename;

    public String getKename() {
        return kename;
    }

    public void setKename(String kename) {
        this.kename = kename;
    }
    public String getJobname() {
        return jobname;
    }

    public void setJobname(String jobname) {
        this.jobname = jobname;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getOffice() {
        return office;
    }

    public void setOffice(String office) {
        this.office = office;
    }

    public String getDoctor() {
        return doctor;
    }

    public void setDoctor(String doctor) {
        this.doctor = doctor;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
