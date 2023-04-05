
import axios from "axios";
import { useState,useEffect }  from "react";
import { useNavigate, useParams} from "react-router-dom";
const URI = "http://localhost:8080/cliente/"

let headers = {
    "usuario" : sessionStorage.getItem("usuario"),
    "clave"   : sessionStorage.getItem("clave")
  };
const EditarCliente = () => {
    const [id_cliente, setId_cliente] = useState("");
    const [nombre_cliente, setNombre_cliente] = useState("");
    const [clave_cliente, setClave_cliente] = useState("");
    const navigate = useNavigate();

    const {id} = useParams()

    const editar = async (e) => {
        e.preventDefault();
    
        const UpdateCliente = await axios({
            method: "PUT",
            url: URI,
            data: {
                id_cliente: id_cliente, nombre_cliente: nombre_cliente, clave_cliente: clave_cliente
            },
            headers: headers 
          });
         
        navigate("/clientes");
      };

      useEffect( ()=>{
        getClienteById()
    },[])

    const getClienteById = async () => {

        const res =  await axios({
            method: "GET",
            url: URI+"list/"+id,
            headers: headers 
          });
        setId_cliente(res.data.id_cliente)
        setNombre_cliente(res.data.nombre_cliente)
        setClave_cliente(res.data.clave_cliente)
    }

    return(
        <div>
        <h3>Edit PUT</h3>
        <div className="container col-6" id="contenedor2">
        <form onSubmit={editar}>
            <div className="mb-3">
            <label className="form-label">ID</label>
            <input 
                value={id_cliente}
                onChange={(e) => setId_cliente(e.target.value)}
                type="numeric"
                disabled="false"
                className="form-control"
            />
            </div>
            <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input 
                value={nombre_cliente}
                onChange={(e) => setNombre_cliente(e.target.value)}
                type="text"
                className="form-control"
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
                onInvalid={e => e.target.setCustomValidity('El campo Clave  es obligatorio')}
                onInput={e => e.target.setCustomValidity('')}
            />
            </div>
            <button type="submit" className="btn btn-success">
            Guardar
            </button>
        </form>
    </div>
    </div>
    );
};

export default EditarCliente
;