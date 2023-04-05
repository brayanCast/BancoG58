const Menu = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container-fluid">
      <div className="collapse navbar-collapse" id="navbarCollapse">
      <div className="navbar-nav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 list-group-horizontal" >
          <li className="nav-item list-group-item" id="barra2">
            <a className="nav-link active" aria-current="page" href="/clientes">
            Clientes
            </a>
          </li>
         
          <li className="nav-item list-group-item" id="barra2">
            <a className="nav-link" aria-current="page" href="/cuenta">
            Cuentas
            </a>
          </li>
         
          
        </ul>
        </div>
        <div class="navbar-nav ms-auto">  
                <a href="/logout" className="nav-item nav-link"><i class="fa-solid fa-power-off"></i></a>
            </div>
      </div>
      </div>
   </nav>



      
    );
  };
  
  export default Menu;