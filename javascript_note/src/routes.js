import React from "react";
import { BrowserRouter, Routes as RoutesWrapper, Route } from "react-router-dom";
import HomeScreen from './screens/home';
import NotesIndexScreen from './screens/notes/index';
import RegisterScreen from './screens/auth/register';
import LoginScreen from './screens/auth/login';
import UsereditScreen from './screens/users/edit';
// onde o usuário precisar estar logado, usaremos a PrivateRoute ao invés da Route normal
import PrivateRoute from "./components/auth/private_router";
import HomeRoute from "./components/auth/home_route";

function Routes() {
  return (
    <BrowserRouter>
      <RoutesWrapper>
        <Route exact path="/" element={<HomeScreen />} />
        {/* criar rota pra checar se está ogado quando entra na homepage, se sim, vai direto pras notas */}
        <Route exact path="/register" element={<RegisterScreen />} />
        <Route exact path="/login" element={<LoginScreen />} />
        <Route exact path="/notes" element={<PrivateRoute />}>
          <Route exact path="/notes" element={<NotesIndexScreen />} />
        </Route>
        <Route exact path="/users/edit" element={<PrivateRoute />}>
          <Route exact path="/users/edit" element={<UsereditScreen />} />
        </Route>
        <Route path="*" element={<h1> 404 :(</h1>} />
      </RoutesWrapper>
    </BrowserRouter>
  )
}

export default Routes;