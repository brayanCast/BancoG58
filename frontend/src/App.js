
import './App.css';

import MenuPpal from "./componentes/Menu"
;
import MostrarClientes from "./componentes/MostrarCliente"
import MostrarCuentas from "./componentes/MostrarCuenta"
import CrearClientes from "./componentes/CrearCliente"
import CrearCuentas from "./componentes/CrearCuenta"
import EditarClientes from "./componentes/EditarCliente"
import EditarCuentas from "./componentes/EditarCuenta"
import Logearse from "./componentes/Logearse"
import Logout from "./componentes/Logout"
import {BrowserRouter, Route, Routes} from "react-router-dom"
function App() {
  return (
    
    <div className="App">
   
      <BrowserRouter>
      <Routes>
      <Route path="/clientes" element={<MostrarClientes />} />
      <Route path="/cuenta" element={<MostrarCuentas />} />
      <Route path="/menu" element={<MenuPpal />} />
 
      <Route path="/crear" element={<CrearClientes />} />
      <Route path="/crearCta" element={<CrearCuentas />} />
      <Route path="/editar/:id" element={<EditarClientes />} />
      <Route path="/editarCta/:id" element={<EditarCuentas />} />
      <Route path="/" element={<Logearse />} />
      <Route path="/logout" element={<Logout />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
