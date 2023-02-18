import React, { Fragment, useState } from 'react';
import { Button, Field, Control, Input, Column, Section, Help, Label } from "rbx";

import UserService from '../../../services/users';

import { Navigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToRegister, setRedirectToRegister] = useState(false); // poderia ser usado o hook useHistory do react router dom? - buscar
  const [redirectToNotes, setRedirectToNotes] = useState(false);
  const [error, setError] = useState(false);

  if (redirectToRegister)
    return <Navigate to={{ pathname: "/register" }} replace={true} />
  else if (redirectToNotes)
    return <Navigate to={{ pathname: "/notes" }} replace={true} />

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      await UserService.login({ email: email, password: password });
      setRedirectToNotes(true);
    } catch (error) {
      setError(true);
    }
  }

  return (
    <Fragment>
      <Column.Group centered>
        <form onSubmit={handleSubmit}>
          <Column size={12}>

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

            <Field>
              <Control>
                <Column.Group breakpoint="mobile">
                  <Column>
                    <a className="button is-white has-text-custom-purple" onClick={event => setRedirectToRegister(true)}>
                      Register or
                    </a>
                  </Column>
                  <Column>
                    <Button color="custom-purple" outlined>Login</Button>
                  </Column>
                </Column.Group>
              </Control>
            </Field>

            {error && <Help color="danger"> Invalid email or password </Help>}

          </Column>
        </form>
      </Column.Group>
    </Fragment>
  )
}

export default LoginForm;