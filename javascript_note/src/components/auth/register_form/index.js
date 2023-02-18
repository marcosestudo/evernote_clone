import React, { Fragment, useState } from 'react';
import { Button, Field, Control, Input, Column, Section, Help, Label } from "rbx";
import { Navigate, Link } from "react-router-dom"; // no V6, redirect foi trocado por Navigate
import UsersService from '../../../services/users';

function RegisterForm() {
  // Estados de contole do formulário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Se a conta for criada com sucesso, o estado abaixo redireciona direto pro login, também póde ser feito com o hook redirect (atual Navigate) do react router dom
  const [redirectToLogin, setRedirectToLogin] = useState(false); // redirectToLogin não foi usado neste form, usei o <Link> pra ficarem registradas as duas formas, este hook foi usado no login_form
  // Se acontecer um erro, seta pra true e renderiza a mensagem de erro lá embaixo do form
  const [error, setError] = useState(false);

  async function HandleSubmit(evt) {
    evt.preventDefault();
    try {
      // name, email e password veem dos states criados acima pro form controlado
      const user = await UsersService.register({ name: name, email: email, password: password });
      setRedirectToLogin(true);
    } catch (error) {
      setError(true);
    }
  }

  if (redirectToLogin)
    return <Navigate to={{ pathname: '/login' }} replace={true} />

  return (
    <Fragment>
      <Column.Group centered>
        <form onSubmit={HandleSubmit}>
          <Column size={12}>

            {/* Name field */}
            <Field>
              <Label size="small">Name:</Label>
              <Control>
                <Input
                  type="name"
                  required
                  name="name"
                  value={name}
                  onChange={event => setName(event.target.value)}
                />
              </Control>
            </Field>

            {/* Email field */}
            <Field>
              <Label size="small">Email:</Label>
              <Control>
                <Input
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              </Control>
            </Field>

            {/* Password field */}
            <Field>
              <Label size="small">Password:</Label>
              <Control>
                <Input
                  type="password"
                  required
                  name="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
              </Control>
            </Field>

            {/* Log in or register buttons */}
            <Field>
              <Control>
                <Column.Group breakpoint="mobile">
                  <Column>
                    <Link to="/login" className="button is-white has-text-custom-purple">
                      Login or
                    </Link>
                  </Column>
                  <Column>
                    <Button color="custom-purple" outlined>Register</Button>
                  </Column>
                </Column.Group>
              </Control>
            </Field>

            {/* Sintaxe alternativa do if no jsx / react: se error == true, renderiza o help */}
            {error && <Help color="danger"> Invalid email or password </Help>}

          </Column>
        </form>
      </Column.Group>
    </Fragment>
  )
}

export default RegisterForm;