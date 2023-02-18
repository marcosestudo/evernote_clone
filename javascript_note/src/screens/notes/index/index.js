import React, { Fragment, useState } from "react";
import HeaderLogged from "../../../components/header_logged";
import Notes from "../../../components/notes";


function NotesScreen() {
  // O estado será compartilhado entre o HeaderLogged e o Notes
  // Ele será mudado no Header para dizer se a sidebar aparece ou não n Notes
  // O estado e o setState serão passados com parâmetro pros components
  const [isOpen, setIsOpen] = useState(false);
  let user = JSON.parse(localStorage.getItem('user'));

  return (
    <Fragment>
      <HeaderLogged setIsOpen={setIsOpen} user={user.name}/>
      <Notes isOpen={isOpen} setIsOpen={setIsOpen}/>
    </Fragment>
  );
}

export default NotesScreen;
