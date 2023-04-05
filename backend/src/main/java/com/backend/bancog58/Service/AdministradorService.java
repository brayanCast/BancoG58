package com.backend.bancog58.Service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.bancog58.Dao.AdministradorDao;
import com.backend.bancog58.Models.Administrador;

@Service
public class AdministradorService {
    
    @Autowired
    private AdministradorDao dao;

    @Transactional(readOnly=false)
    public Administrador save(Administrador dato) {
        return dao.save(dato);
    }

    @Transactional(readOnly=false)
    public void delete(String id) {
        dao.deleteById(id);
    }

    @Transactional(readOnly=true)
    public Administrador findById(String id) {
        return dao.findById(id).orElse(null);
    }

    @Transactional(readOnly=true)
    public List<Administrador> findAll() {
        return (List<Administrador>) dao.findAll();
    }

    @Transactional(readOnly=true)
    public Administrador login(String usuario, String clave) {
        return dao.login(usuario, clave);
    }

}
