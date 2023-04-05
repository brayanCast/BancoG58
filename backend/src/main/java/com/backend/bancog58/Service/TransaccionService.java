package com.backend.bancog58.Service;

import com.backend.bancog58.Models.Transaccion;
import com.backend.bancog58.Dao.TransaccionDao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service; 
import org.springframework.transaction.annotation.Transactional;


@Service
public class TransaccionService {
    @Autowired
    private TransaccionDao dao;

    @Transactional(readOnly=false)
    public Transaccion save(Transaccion transaccion) {
        return dao.save(transaccion);
    }

    @Transactional(readOnly=false)
    public void delete(Integer id) {
        dao.deleteById(id);;
    }

    @Transactional(readOnly=true)
    public Transaccion findById(Integer id) {
        return dao.findById(id).orElse(null);
    }

    @Transactional(readOnly=true)
    public List<Transaccion> findByAll() {
        return (List<Transaccion>) dao.findAll();
    }

    @Transactional(readOnly=true)
    public List<Transaccion> consulta_transaccion(String idcta) {
        return (List<Transaccion>) dao.consulta_transaccion(idcta);
    }

    @Transactional(readOnly=false)
    public void cear_transaccion(String idcta, Double valor_transaccion, String tipo) {
        dao.crear_transaccion(idcta, valor_transaccion, tipo);
    }

}
