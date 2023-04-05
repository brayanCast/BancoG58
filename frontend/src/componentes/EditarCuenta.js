import axios from "axios";
import { useState,useEffect }  from "react";
import { useNavigate, useParams} from "react-router-dom";
const URI = "http://localhost:8080/cuenta/"
const URI1 = "http://localhost:8080/cliente/"

let headers = {
    "usuario" : sessionStorage.getItem("usuario"),
    "clave"   : sessionStorage.getItem("clave")
  };
const EditarCliente = () => {
    const [id_cuenta, setId_cuenta] = useState("");
    const [fecha_apertura, setFecha_apertura] = useState("");
    const [saldo_cuenta, setSaldo_cuenta] = useState("");
    const [cliente, setCliente] = useState("");
    const [clientes, setClientes] = useState([])
    const navigate = useNavigate();

    const {id} = useParams()

    const editar = async (e) => {
        e.preventDefault();
    
        const UpdateCuenta = await axios({
            method: "PUT",
            url: URI,
            data: {
                id_cuenta: id_cuenta, fecha_apertura: fecha_apertura, saldo_cuenta: saldo_cuenta, cliente: {id_cliente: cliente, nombre_cliente: null, clave_cliente: null}
            },
            headers: headers 
          });
         
        navigate("/cuenta");
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
        setId_cuenta(res.data.id_cuenta)
        setFecha_apertura(res.data.fecha_apertura)
        setSaldo_cuenta(res.data.saldo_cuenta)
        setCliente(res.data.cliente.id_cliente)  
    }

    const llenarLista = async () =>{
        try {
            
            const res1 = await axios({
                method : "GET",
                url : URI1 + "list",
                headers: headers 
               
            });
            
            setClientes(res1.data)
            
        }
        catch (error) {
            //swal("No tiene Acceso a esta Opción1!", "Presiona el butón!", "error");
            //navigate("/");
        }
    }

    llenarLista();

    return(
        <div>
        <br></br>
        <h3>Editar Cuenta</h3>
        <div className="container col-6" id="contenedor2">
        <form onSubmit={editar}>
            <div className="mb-3">
            <label className="form-label">ID</label>
            <input 
                value={id_cuenta}
                onChange={(e) => setId_cuenta(e.target.value)}
                type="numeric" 
                disabled="false"
                className="form-control"
            />
            </div>
            <div className="mb-3">
            <label className="form-label">Fecha Apertura</label>
            <input 
                value={fecha_apertura.substring(0,10)}
                onChange={(e) => setFecha_apertura(e.target.value)}
                type="date"
                className="form-control"
                required
                onInvalid={e => e.target.setCustomValidity('El campo Fecha de Apertura  es obligatorio')}
                onInput={e => e.target.setCustomValidity('')}
            />
            </div>
            <div className="mb-3">
            <label className="form-label">Saldo</label>
            <input 
                value={saldo_cuenta}
                onChange={(e) => setSaldo_cuenta(e.target.value)}
                type="number"
                className="form-control"
                required
                disabled="false"
                onInvalid={e => e.target.setCustomValidity('El campo Saldo  es obligatorio')}
                onInput={e => e.target.setCustomValidity('')}
            />
            </div>
            <div className="mb-3">
            <label className="form-label">Cliente</label>
            <select
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                className="form-control"
                required>
                {clientes.map ( (x) => (

                    <option value={x.id_cliente}>{x.nombre_cliente}</option>
                    
                )) }
            </select>
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