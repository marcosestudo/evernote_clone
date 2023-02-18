import React, { Fragment, useState, useEffect } from 'react';

import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6

function Editor(props) {
  const [currentContent, setCurrentContent] = useState('')
  const [timer, setTimer] = useState(null); // depois de dois segundos sem digitar, a nota será salva automaticamente

  // temos o método updateNote() que vem nas props e esse interno
  function updateNote(content) {
    // removendo tags html do rich text e pegando os primeiros 30 caracteres pra serem o título da mota
    const title = content.replace(/(<([^>]+)>)/ig, "").slice(0, 30);
    props.updateNote(props.note, { title: title, body: content })
  }

  // os parâmetros são do react quill, dê uma olhada na documentação
  // aqui só usaremos o content e o source
  // source é de onde está vindo a mudança, pode vir do usuário ou da api por exemplo, veja na documentação
  function handleChange(content, delta, source) {
    if (source == 'user') {
      clearTimeout(timer);
      // setCurrentContent será sempre chamada quando algo for digitado, updateNote só será chamada quando zerar o timer
      // content será sempre atualizado, mas a api só será chamada pra salvar depois de passar os dois segundos do setTimeout sem nenhma mudança
      setCurrentContent(content);
      setTimer(setTimeout(() => updateNote(content), 2000));
    }
  }

  useEffect(() => {
    setCurrentContent(props.note.body);
  }, [props.note])

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
      ['link'],
      ['clean'],
    ]
  }

  return (
    <Fragment>
      <ReactQuill
        value={currentContent}
        modules={modules}
        onChange={handleChange}
      />
    </Fragment>
  )
}

export default Editor;