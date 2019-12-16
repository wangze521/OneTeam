package com.jk.serviceImpl;

import com.jk.mapper.StatusModelMapper;
import com.jk.model.StatusModel;
import com.jk.model.UserModel;
import com.jk.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {


    @Autowired
    private StatusModelMapper mapper;

    public StatusModel queryGua() {

      return  mapper.queryGua();
    }

    @Override
    public UserModel queryUserName(String name) {

        return mapper.queryUserName(name);
    }

    @Override
    public void Addregister(UserModel user) {
        mapper.Addregister(user);
    }

    @Override
    public UserModel queryId(Integer id) {
        return   mapper.queryId(id);
    }

    @Override
    public void updateUser() {
        mapper.updateUser();
    }

    @Override
    public void updatelogout() {
        mapper.updatelogout();
    }
}