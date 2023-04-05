import swal from "sweetalert";
import axios from "axios";
import { useState,useEffect }  from "react";
import { Link,useNavigate} from "react-router-dom";
const URI = "http://localhost:8080/cliente/"


let headers = {
    "usuario" : sessionStorage.getItem("usuario"),
    "clave"   : sessionStorage.getItem("clave")
  };

const MostrarCliente = () => {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([])
    useEffect(() =>{
        getClientes()
    })

    const getClientes = async () =>{
        try {
            
            const res = await axios({
                method : "GET",
                url : URI + "list",
                headers: headers 
               
            });
            
            setClientes(res.data)
            
            //console.log(clientes)
        }
        catch (error) {
            swal("No tiene Acceso a esta Opción!", "Presiona el butón!", "error");
            navigate("/");
        }
    }

const deleteCliente = async (id) => {
    swal(
        {
            title: "Eliminar Registro",
            text: "Está seguro de eliminar registro?",
            icons: "Warning",
            buttons: true,
            dangerMode: true,
        })
        .then(async (willDelete) =>{
            if (willDelete){
                const res = await axios({
                    method: "DELETE",
                    url: URI + id,
                    headers: headers 
                });
                swal("El resgistro se eliminó satisfactoriamente",{ 
                    icon: "success",
                });
                getClientes()
            } else{
                swal("El registro no se borró")
            }
        });
    
}
 
const salir = () => {
    navigate("/menu")
}
return(
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <br></br>
                    <br></br>
                    <h2>Información de Clientes </h2>
                    <Link to="/crear" className='btn btn-primary mt-2 mb-2'><i className="fas fa-plus"></i></Link>
                    <table className='table table-striped table-hover'>
                        <thead className='table-dark'>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Clave</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            { clientes.map ( (cliente) => (
                                <tr key={ cliente.id_cliente}>
                                    <td> { cliente.id_cliente } </td>
                                    <td> { cliente.nombre_cliente } </td>
                                    <td> { cliente.clave_cliente } </td>
                                    <td>
                                        <Link to={`/editar/${cliente.id_cliente}`} ><i className="fa-solid fa-pen-to-square" data-toggle="tooltip" title="Editar" id="editar"></i></Link>
                                        <button id="boton1" onClick={() => deleteCliente(cliente.id_cliente)} className='btn btn-danger'><i className="fa-solid fa-trash" data-toggle="tooltip" title="Eliminar" id="eliminar"></i></button>
                                    </td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>    
            </div>
            <form className="d-flex">
                <button className="btn btn-primary" type="button" onClick={salir}>
                    Regresar
                </button>
            </form>
        </div>
    );
};

export default MostrarCliente;