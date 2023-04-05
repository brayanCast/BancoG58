package com.backend.bancog58.Models;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="cuenta")
public class Cuenta implements Serializable{
   @Id
   @NotEmpty(message = "El campo identificador de la cuenta no debe ser vacío")
   @Column(name="id_cuenta")
   private String id_cuenta;
   @NotEmpty(message = "La fecha de apertuta es obligatoria")
   @Column(name="fecha_apertura")
   private Date fecha_apertura;
   @Column(name="saldo_cuenta")
   private double saldo_cuenta;
   @ManyToOne
   @JoinColumn(name="id_cliente")//Solo para las llaves foráneas
   private Cliente cliente; //De esta forma se representa la llave foránea, es decir, creando un objeto de la clase


   @Override
    public String toString() {
        return "Cuenta [cliente=" + cliente + ", fecha_apertura=" + fecha_apertura + ", id_cuenta=" + id_cuenta
            + ", saldo_cuenta=" + saldo_cuenta + "]";
    }

}
