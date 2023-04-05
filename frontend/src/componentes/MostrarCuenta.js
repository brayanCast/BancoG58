import swal from "sweetalert";
import axios from "axios";
import { useState,useEffect }  from "react";
import { Link,useNavigate} from "react-router-dom";
const URI = "http://localhost:8080/cuenta/"



let headers = {
    "usuario" : sessionStorage.getItem("usuario"),
    "clave"   : sessionStorage.getItem("clave")
  };

    const MostrarCuenta = () => {
    const navigate = useNavigate();
    const [cuentas, setCuentas] = useState([])
    useEffect(() =>{
        getCuentas()
    })

    const getCuentas = async () =>{
        try {
            
            const res = await axios({
                method : "GET",
                url : URI + "list",
                headers: headers 
               
            });
            
            setCuentas(res.data)
       
        }
        catch (error) {
            swal("No tiene Acceso a esta Opción!", "Presiona el butón!", "error");
            navigate("/");
        }
    }


const deleteCuenta = async (id) => {
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
                getCuentas()
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
                    <h2>Cuentas bancarias </h2>
                    <Link to="/crearCta" className='btn btn-primary mt-2 mb-2'><i className="fas fa-plus"></i></Link>
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Id Cuenta</th>
                                <th>Fecha Apertura</th>
                                <th>Saldo Cuenta</th>
                                <th>Id Cliente</th>
                                <th>Cliente</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            { cuentas.map ( (cuenta) => (
                                <tr key={ cuenta.id_cuenta}>
                                    <td> { cuenta.id_cuenta} </td>
                                    <td> { cuenta.fecha_apertura.substring(0,10)} </td>
                                    <td> { cuenta.saldo_cuenta } </td>
                                    <td> { cuenta.cliente.id_cliente} </td>
                                    <td> { cuenta.cliente.nombre_cliente} </td>
                                    <td>
                                        <Link to={`/editarCta/${cuenta.id_cuenta}`}><i className="fa-solid fa-pen-to-square" data-toggle="tooltip" title="Editar" id="editar"></i></Link>
                                        
                                        <button id="boton1" onClick={() => deleteCuenta(cuenta.id_cuenta)} ><i className="fa-solid fa-trash" data-toggle="tooltip" title="Eliminar" id="eliminar"></i></button>
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

export default MostrarCuenta;