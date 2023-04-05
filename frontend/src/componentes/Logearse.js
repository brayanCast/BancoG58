
import swal from "sweetalert";
import axios from "axios";
import { useState }  from "react";
import { useNavigate } from "react-router-dom";
const URI = "http://localhost:8080/administrador/"

const Logearse = () => {
    const navigate = useNavigate();
    const [administradores, setAdministradores] = useState([])
    const [id_administrador, setId_administrador] = useState("");
    const [clave_administrador, setClave_administrador] = useState("");
   

    const guardar = async (e) => {
        e.preventDefault();
        
        try {          
            const res = await axios({
                method : "GET",
                url: URI + "login?usuario="+id_administrador+"&clave="+clave_administrador
            });
            
            //setClientes(res.data);
            
            if (res.data.id_administrador==null) {
                
                swal("Administrador NO Autorizado!", "Presiona el butón!", "error");
                navigate("/");
                
            } else {
               sessionStorage.setItem("usuario",id_administrador);
               sessionStorage.setItem("clave",clave_administrador);
               
               swal("Bienvenido "+ res.data.nombre_administrador+"!", "Presiona el botón!", "success");
               navigate("/menu");
            }
            
            
        }
        catch (error) {
            swal("Operación NO realizada!", "Presiona el botón!", "error");
        }

      };

    return(
        <div className="container" >
            <div className="row" id="centrado">
                <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3" >
                    <form onSubmit={guardar} >
                        <fieldset >
                            <h2>Ingreso del Administrador al sistema</h2>
                            <hr className="colorgraph"/>
                            <div className="form-group">
                                <input type="text" 
                                name="id" 
                                id="id" 
                                value={id_administrador} 
                                onChange={(e) => setId_administrador(e.target.value)}
                                maxLength={15} 
                                required
                                class="form-control input-lg"
                                onInvalid={e => e.target.setCustomValidity('El campo ID es obligatorio')}
                                onInput={e => e.target.setCustomValidity('')}
                                placeholder="Id Admin"
                                />                            
                            </div><br></br>
                            <div className="form-group">
                                <input type="password" name="password" id="password" 
                                value={clave_administrador}
                                onChange={(e) => setClave_administrador(e.target.value)}
                                maxLength={50}
                                required
                                onInvalid={e => e.target.setCustomValidity('El campo Contraseña  es obligatorio')}
                                onInput={e => e.target.setCustomValidity('')}
                                class="form-control input-lg" 
                                placeholder="Contraseña"/>
                            </div><br></br>
                            
                            
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12">
                                    <input type="submit" className="btn  btn-success btn-block" value="Ingresar"/>
                                </div>
                                
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>





       
    );
};

export default Logearse;