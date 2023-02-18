import React, { Fragment } from 'react';
import Moment from 'moment';
import { Button, Column, Tag, Title, List } from "rbx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import '../../../styles/notes.scss';

function NotesList(props) {
  return (
    <Fragment>
      <Column.Group breakpoint="mobile">
        <Column size={6} offset={1}>
          <Title size={6}>
            {props.notes.length} Notes
          </Title>
        </Column>

        <Column size={2}>
          <Button state="active" color="custom-purple" outlined size="small" onClick={() => props.createNote()}>
            Add note
          </Button>
        </Column>
      </Column.Group>
      <List className="notes-list">
        {/* estamos usando o index gerado pelo map como key no segundo parâmetro */}
        {props.notes.map((item, index) =>
          <div key={index} className={`list-item ${item == props.currentNote ? "is-active" : ""}`}>
            {/* Tive que envolver os List.Item numa div por que a classe active abaixo não estava funcionando, estava passando a
            informação pro List.Item mas não estava mudando a cor do fundo, buscar solução melhor, por enquanto 
            criei essa div em volta e funcionou 
            Deixar pra buscar uma soluão se o problema persistir com bootstrap, buscar solução pro Bulma não faz sentido já que nunca vou usá-lo */}
            <List.Item onClick={() => props.selectNote(item._id)} active={item == props.currentNote}>
              <Title size={6}>
                {/* regex removendo as tags html do texto e do título em rich text, e pegando somente as primeiras 15 letras do title e as primeira 30 do body */}
                {item.title.replace(/(<([^>]+)>)/ig, "").substring(0, 15)}
              </Title>
              <Title size={6} subtitle spaced={false}>
                {item.body.replace(/(<([^>]+)>)/ig, "").substring(0, 30)}
              </Title>

              <Column.Group breakpoint="mobile">
                <Column size={10}>
                  <Tag color="dark">
                    {Moment(item.created_at).format('DD/MM')}
                  </Tag>
                </Column>

                <Column size={2}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => props.deleteNote(item)}
                    color="grey"
                  />
                </Column>
              </Column.Group>
            </List.Item>
          </div>
        )}
      </List>
    </Fragment>
  )
}

export default NotesList;