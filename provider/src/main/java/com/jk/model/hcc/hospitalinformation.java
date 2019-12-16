package com.jk.model.hcc;

import java.io.Serializable;

/**
 * author:hcc
 * createTime:2019/12/13
 * info:
 * project_name:workspace4
 **/
public class hospitalinformation implements Serializable {
    private static final long serialVersionUID = -7867649023573574642L;

    private    Integer     hospitalid;

    private    Integer     hospitalnumber;

    private    String      hospitalpeople;

    private    String      hospitalphone;

    private    String      hospitalemail;

    private    String      hospitaladdress;

    private    String      hospitalinfo;

    private    String      hospitalname;

    public Integer getHospitalid() {
        return hospitalid;
    }

    public void setHospitalid(Integer hospitalid) {
        this.hospitalid = hospitalid;
    }

    public Integer getHospitalnumber() {
        return hospitalnumber;
    }

    public void setHospitalnumber(Integer hospitalnumber) {
        this.hospitalnumber = hospitalnumber;
    }

    public String getHospitalpeople() {
        return hospitalpeople;
    }

    public void setHospitalpeople(String hospitalpeople) {
        this.hospitalpeople = hospitalpeople;
    }

    public String getHospitalphone() {
        return hospitalphone;
    }

    public void setHospitalphone(String hospitalphone) {
        this.hospitalphone = hospitalphone;
    }

    public String getHospitalemail() {
        return hospitalemail;
    }

    public void setHospitalemail(String hospitalemail) {
        this.hospitalemail = hospitalemail;
    }

    public String getHospitaladdress() {
        return hospitaladdress;
    }

    public void setHospitaladdress(String hospitaladdress) {
        this.hospitaladdress = hospitaladdress;
    }

    public String getHospitalinfo() {
        return hospitalinfo;
    }

    public void setHospitalinfo(String hospitalinfo) {
        this.hospitalinfo = hospitalinfo;
    }

    public String getHospitalname() {
        return hospitalname;
    }

    public void setHospitalname(String hospitalname) {
        this.hospitalname = hospitalname;
    }
}
