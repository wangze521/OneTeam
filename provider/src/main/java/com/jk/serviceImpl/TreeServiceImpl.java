package com.jk.serviceImpl;

import com.alibaba.dubbo.config.annotation.Service;
import com.jk.mapper.TreeModelMapper;
import com.jk.service.TreeService;
import com.jk.util.LayuiTree;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Service(interfaceClass = TreeService.class)
public class TreeServiceImpl implements TreeService {
    @Autowired
    private TreeModelMapper mapper;
    @Override
    public List<LayuiTree> async() {
        return mapper.async();
    }
}
