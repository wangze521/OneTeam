package com.jk.model;

import java.io.Serializable;

/**
 * @ClassName UserModel
 * @Deacription TODO
 * @Author wss
 * @Date 2019/12/15 14:17
 * @Version 1.0
 **/
public class UserModel implements Serializable {
    private static final long serialVersionUID = -1381159670322914824L;
    private Integer id;
   private String name;
   private String number;
   private String password;
   private String phone;
   private String sex;
   private Integer age;
   private Integer did;
   private Integer kid;
   private String code;
    private String qrpassword;

    public String getQrpassword() {
        return qrpassword;
    }

    public void setQrpassword(String qrpassword) {
        this.qrpassword = qrpassword;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
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

    public Integer getDid() {
        return did;
    }

    public void setDid(Integer did) {
        this.did = did;
    }

    public Integer getKid() {
        return kid;
    }

    public void setKid(Integer kid) {
        this.kid = kid;
    }
}
