package com.jk.util;

import sun.plugin2.message.Conversation;
import sun.plugin2.message.Serializer;

import java.io.IOException;
import java.io.Serializable;
import java.nio.ByteBuffer;
import java.util.List;

public class LayuiUtil implements Serializable {

    private static final long serialVersionUID = -4148442190645855825L;

    private long code=0;
    private String msg="";
    private long count;
    private List data;

    public long getCode() {
        return code;
    }

    public void setCode(long code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }


    public List getData() {
        return data;
    }

    public void setData(List data) {
        this.data = data;
    }
}
