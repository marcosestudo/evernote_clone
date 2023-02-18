import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

// A função receberá um parâmetro component do tipo Component e quantos parâmetros rest forme necessários
function PrivateRoute({ component: Component, ...rest }) { // Os parâmetros component / element e rest eram usados na versão antiga do react router dom
  return (
      // Verifica se o usuário está no locaStorage, se não estiver, redirecion apra tela de login
      localStorage.getItem('user')
        ? <Outlet />
        : <Navigate to={{ pathname: "/login" }} replace={true} />
  );
}

export default PrivateRoute;