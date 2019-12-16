package com.jk.serviceImpl;

import com.jk.mapper.KeshiModelMapper;
import com.jk.model.KeshiModel;
import com.jk.service.KeshiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KeshiServiceImpl implements KeshiService {

    @Autowired
    private KeshiModelMapper mapper;
    @Override
    public List<KeshiModel> query() {
        return mapper.query();
    }
}
