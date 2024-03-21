import React from 'react'
import '../App.css'
import { useContext, useState } from 'react'
import { RandomPickerContext } from '../contexts/RandomPickerContext'

function Form() {
    const { state, dispatch } = useContext(RandomPickerContext);
    const [ name, setName ] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if(!name) {
            showModal("Type something first !")
            return
        }
        if (state.items.includes(name.toUpperCase())) {
            // alert("Item already exists");
            showModal("Item already exists");
            return
        }
        dispatch({ type: "add", payload: name});
        setName("");
    }

    function handleDelete(item) {
        dispatch({ type: "delete", payload: item })
    }

    function showModal(message) {
        dispatch({type: "showModal", payload: message})
    }

  return (
    <>
        <form onSubmit={handleSubmit}>
            <input type="text" name='name' value={name} placeholder='Search...' onChange={(e) => setName(e.target.value)}/>
            <button className='btn' type='submit'>+</button>
        </form>

        <ul>
        {!!state.items.length && state.items?.map((item, index) => (
            <li key={index}>
            {item} <button className='dlt-btn' onClick={() => handleDelete(item)}><i className="fa-solid fa-trash-can"></i></button>
          </li>
        ))}
        </ul>
    </>
  )
}

export default Form