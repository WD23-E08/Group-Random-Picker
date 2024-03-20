import { useState, useReducer, useEffect } from 'react'
import '../index.css'
import React from 'react'

const initialState = { 
    items: JSON.parse(localStorage.getItem("items")) || [], 
    isPlaying: false,
    pickedItem: null
}

function reducer(state, action) {
    switch(action.type) {
        case "add" : {
            return { ...state, items: [...state.items, action.payload.toUpperCase()] }
        }
        case "delete" : {
            return {
                items: state.items.filter((item) => item !== action.payload)
            }
        }
        case "play" : {
            return {...state, isPlaying: !state.isPlaying }
        }
        case "pick" : {
            return {
                ...state,
                pickedItem: getRandomElement("", state.items)
            }
        }
        default: return state;
    }
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function RandomPicker() {
    const [ name, setName ] = useState("");
    const [ state, dispatch ] = useReducer(reducer, initialState);

    useEffect(() => {
        if (state.isPlaying) {
             const intervalId = setInterval(() => dispatch({ type: "pick" }), 2000);
             setTimeout(() => {
                clearInterval(intervalId);
                dispatch({ type: "play" });
            }, 6000);
        }
    }, [state.isPlaying]);

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(state.items));
    }, [state.items])

    function handleSubmit(e) {
        e.preventDefault();
        if(!name) {
            alert("Type something first !")
            return
        }
        if (state.items.includes(name.toUpperCase())) {
            alert("Item already exists");
            return
        }
        dispatch({ type: "add", payload: name});
        setName("");
    }

    function handleDelete(item) {
        dispatch({ type: "delete", payload: item })
    }

    const handlePlay = () => {
        if (state.items.length < 2) {
            alert("Minimum 2 items required to play");
            return;
        }
        dispatch({ type: "play" });
    };

  return (
    <>  
        {state.pickedItem ? (
            <h1>{state.pickedItem}</h1>
            ) : (
            <h1>Add Items and Pick One</h1>
        )}

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

        <div className="play-reset-buttons">
            <button className='play-btn' onClick={handlePlay} disabled={state.isPlaying}>Play</button>
            <button className='reset-btn'>Reset</button>
        </div>
    </>
  )
}

export default RandomPicker;