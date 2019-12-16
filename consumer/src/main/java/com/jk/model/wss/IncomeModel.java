package com.jk.model.wss;

import java.io.Serializable;

/**
 * @ClassName Echars
 * @Deacription TODO
 * @Author wss
 * @Date 2019/12/13 10:33
 * @Version 1.0
 **/

public class IncomeModel implements Serializable {
    private static final long serialVersionUID = -6550616353133825101L;
    private Integer id;
    private Integer count;
    private String date;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
