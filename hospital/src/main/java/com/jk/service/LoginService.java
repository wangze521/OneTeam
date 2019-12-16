package com.jk.service;

import com.jk.model.StatusModel;
import com.jk.model.UserModel;

public interface LoginService {

    StatusModel queryGua();

    UserModel queryUserName(String name);

    void Addregister(UserModel user);

    UserModel queryId(Integer id);

    void updateUser();

    void updatelogout();
}
