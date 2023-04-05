import swal from "sweetalert"
import axios from "axios";
import { useState,useEffect }  from "react";
import { useNavigate} from "react-router-dom";
const URI = "http://localhost:8080/cliente/"

let headers = {
    "usuario" : sessionStorage.getItem("usuario"),
    "clave"   : sessionStorage.getItem("clave")
  };
const CrearCliente = () => {
    const [id_cliente, setId_cliente] = useState("");
    const [nombre_cliente, setNombre_cliente] = useState("");
    const [clave_cliente, setClave_cliente] = useState("");
    const navigate = useNavigate();

    const guardar = async (e) => {
        e.preventDefault();
    
        const insertCliente = await axios({
            method: "POST",
            url: URI,
            data: {
                id_cliente: id_cliente, nombre_cliente: nombre_cliente,  clave_cliente: clave_cliente
            },
            headers: headers 
          });
         
        navigate("/clientes");
      };

    return(
        <div>
        <br></br>    <br></br>
        <h3>Crear Cliente</h3>
        <div className="container col-6" id="contenedor2">
        <form onSubmit={guardar}>
            <div className="mb-3">
            <label className="form-label">ID</label>
            <input
                value={id_cliente}
                onChange={(e) => setId_cliente(e.target.value)}
                type="numeric"
                placeholder="Digite el Identificador" 
                className="form-control"
                required
                onInvalid={e => e.target.setCustomValidity('El campo Identificador  es obligatorio')}
                onInput={e => e.target.setCustomValidity('')}

            />
            </div>
            <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
                value={nombre_cliente}
                onChange={(e) => setNombre_cliente(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Digite el Nombre"
                required
                onInvalid={e => e.target.setCustomValidity('El campo Nombre  es obligatorio')}
                onInput={e => e.target.setCustomValidity('')}
            />
            </div>
            <div className="mb-3">
            <label className="form-label">Clave</label>
            <input
                value={clave_cliente}
                onChange={(e) => setClave_cliente(e.target.value)}
                type="password"
                className="form-control"
                required
                minlength="6" 

                placeholder="Digite la Contraseña"
                onInvalid={e => e.target.setCustomValidity('El campo clave  es obligatorio, mínimo 6 carcateres')}
                onInput={e => e.target.setCustomValidity('')}
            />
            </div>
            <button type="submit" className="btn btn-warning">
            Guardar
            </button>
        </form>
    </div>
    </div>
    );
};

export default CrearCliente;