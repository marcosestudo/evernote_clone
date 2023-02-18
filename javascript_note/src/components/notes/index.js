import React, { useState, useEffect, Fragment } from "react";

import { Column, Button } from "rbx";
import { push as Menu } from 'react-burger-menu';

// components
import List from './list';
import Editor from './editor';
import Search from './search';

// services
import NotesService from "../../services/notes";

// styles
import '../../styles/notes.scss'

function Notes(props) {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ title: "", body: "", id: "" });

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const response = await NotesService.index();
    // Se existir nota, a lista será atualizada
    if (response.data.length >= 1) {
      setNotes(response.data.reverse()); // .reverse() pra serem setadas as notas da mais nova (última adicionada) pra mais antiga
      setCurrentNote(response.data[0]);
    } else {
      setNotes([]);
    }
  }

  async function createNote() {
    await NotesService.create();
    fetchNotes();
  }

  async function deleteNote(note) {
    await NotesService.delete(note._id);
    fetchNotes();
  }

  async function updateNote(oldNote, params) {
    // Não podemos chamar o método fetch() toda vez que uma nota é atualizada pois isso acontece muito
    // Devemos atualizar a lista de notas manualmente
    const updatedNote = await NotesService.update(oldNote._id, params); // updatedNote recebe um json com a nota
    // buscamos a nota que será atualizada (oldNote) na lista de notas
    const index = notes.indexOf(oldNote);
    const newNotes = notes; // constante para guardar temporariamente as notas, pois não podemos atualizar diretamente a lista de notas, depois passaremos newNotes pro hook setNotes()
    newNotes[index] = updatedNote.data;
    setNotes(newNotes);
    setCurrentNote(updatedNote.data);
  }

  async function searchNotes(query) {
    const response = await NotesService.search(query);
    setNotes(response.data);
  }

  function selectNote(id) {
    // find retorna o primeiro elemento do array que fizer a callback retornar true
    const note = notes.find((note) => {
      return note._id == id;
    });
    setCurrentNote(note);
  }

  return (
    <Fragment>
      <Column.Group className="notes" id="notes">
        <Menu
          pageWrapId={"notes-editor"}
          isOpen={props.isOpen}
          onStateChange={(state) => props.setIsOpen(state.isOpen)}
          disableAutoFocus
          outerContainerId={"notes"}
          customBurgerIcon={false}
          customCrossIcon={false}
        >
          <Column.Group>
            <Column size={10} offset={1}>
              Search...
              <Search searchNotes={searchNotes} fetchNotes={fetchNotes} /> {/* o fetchNotes() também tá aqui pra chamar todas as notas quando cancelar-mos a busca */}
            </Column>
          </Column.Group>
          <List
            notes={notes}
            createNote={createNote}
            selectNote={selectNote}
            deleteNote={deleteNote}
            currentNote={currentNote}
          />
        </Menu>

        <Column size={12} className="notes-editor" id="notes-editor">
          {/* Passamos como parâmetro a nota que deve ser editada */}
          <Editor
            note={currentNote}
            updateNote={updateNote}
          />
        </Column>
      </Column.Group>
    </Fragment>
  );
}

export default Notes;