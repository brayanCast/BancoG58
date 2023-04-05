import swal from "sweetalert"
import axios from "axios";
import { useState,useEffect }  from "react";
import { useNavigate} from "react-router-dom";
const URI = "http://localhost:8080/cuenta/"
const URI1 = "http://localhost:8080/cliente/"


let headers = {
    "usuario" : sessionStorage.getItem("usuario"),
    "clave"   : sessionStorage.getItem("clave")
  };
const CrearCuenta = () => {
    const [id_cuenta, setId_cuenta] = useState("");
    const [fecha_apertura, setFecha_apertura] = useState("");
    const [saldo_cuenta, setSaldo_cuenta] = useState("");
    const [cliente, setCliente] = useState([])
    const [clientes, setClientes] = useState([])
    const navigate = useNavigate();

    
    const guardar = async (e) => {
        e.preventDefault();

        const insertCuenta = await axios({
            method: "POST",
            url: URI,
            data: {
                id_cuenta: id_cuenta, fecha_apertura: fecha_apertura, saldo_cuenta: saldo_cuenta, cliente: {id_cliente: cliente, nombre_cliente: null, clave_cliente: null}
            },
            headers: headers 
          });
          
         
        navigate("/cuenta");
      };

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
        <h3>Crear Cuenta</h3>
        <div className="container col-6" id="contenedor2">
        <form onSubmit={guardar}>
            <div className="mb-3">
            <label className="form-label">ID Cuenta</label>
            <input 
                value={id_cuenta}
                onChange={(e) => setId_cuenta(e.target.value)}
                type="text"
                placeholder="Digite el Identificador" 
                className="form-control"
                required
                onInvalid={e => e.target.setCustomValidity('El campo Identificador  es obligatorio')}
                onInput={e => e.target.setCustomValidity('')}

            />
            </div>
            <div className="mb-3">
            <label className="form-label">Fecha Apertura</label>
            <input 
                value={fecha_apertura}
                onChange={(e) => setFecha_apertura(e.target.value)}
                type="date"
                className="form-control"
                placeholder="Digite Fecha Apertura"
                required
                onInvalid={e => e.target.setCustomValidity('El campo Fecha Apertura  es obligatorio')}
                onInput={e => e.target.setCustomValidity('')}
            />
            </div>
            <div className="mb-3">
            <label className="form-label">Saldo Cuenta</label>
            <input 
                value={saldo_cuenta}
                onChange={(e) => setSaldo_cuenta(e.target.value)}
                type="number"
                className="form-control"
                placeholder="Digite el saldo de la cuenta"
                required
                onInvalid={e => e.target.setCustomValidity('El campo saldo de cuenta es obligatrio')}
                onInput={e => e.target.setCustomValidity('')}
            />
            </div>
            <div className="mb-3">
            <label className="form-label">Cliente</label>
            <select
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                className="form-control">
            { clientes.map ( (cliente) => (
                    <option value={cliente.id_cliente}>{cliente.nombre_cliente}</option>
                )) }
            </select>
            </div>
      
            <button type="submit" className="btn btn-warning">
            Guardar
            </button>
           

        </form>
    </div>
    </div>
    );
};

export default CrearCuenta;