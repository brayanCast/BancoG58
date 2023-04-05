package com.backend.bancog58.Service;

import com.backend.bancog58.Models.Cliente;
import com.backend.bancog58.Dao.ClienteDao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service; 
import org.springframework.transaction.annotation.Transactional;


@Service
public class ClienteService {

    @Autowired
    private ClienteDao dao;
    
    //Creamos el método para Guardar datos en la Tabla de la BD
    public Cliente save(Cliente objeto) {
        return dao.save(objeto);
    }


    //Creamos el método para Eliminar datos en la Tabla de la BD
    @Transactional(readOnly=false)
    public void delete(String id) {
        dao.deleteById(id);
    }


    //Creamos el método para buscar un solo registro en la Tabla de la BD
    @Transactional(readOnly=true)
    public Cliente findById(String id) {
        return dao.findById(id).orElse(null);
    }


    //Creamos el método para buscar todos los registros en la Tabla de la BD
    @Transactional(readOnly=true)
    public List<Cliente> findAll() {
        return (List<Cliente>) dao.findAll();
    }

    
    @Transactional(readOnly=true)
    public Cliente login(String usuario, String clave) {
        return dao.login(usuario, clave);
    }
    
}
