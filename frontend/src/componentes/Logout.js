import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
const Logout = () => { 
    const navigate = useNavigate();
    sessionStorage.clear();
    navigate("/");
    
    swal("Sesión Finalizada!", "Presiona el butón!", "success");

    return(
        <div className='container'>
        <br>
        </br>
           <p>Sesión Cerrada</p>
           
        </div>
        
    )
}

export default Logout