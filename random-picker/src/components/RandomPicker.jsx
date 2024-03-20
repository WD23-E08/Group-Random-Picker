import { useState, useReducer, useEffect } from 'react'
import '../index.css'
import React from 'react'

const initialState = { items: [], isPlaying: false }
function reducer(state, action) {
    switch(action.type) {
        case "add" :
              return { ...state, items: [...state.items, action.payload.toUpperCase()] }
        case "delete" : {
            return {
                items: state.items.filter((item) => item !== action.payload)
            }
        }
        case "play" :
            return {...state, isPlaying:!state.isPlaying }
        case "pick" :
            return state;
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
        let intervalId;
        if (state.isPlaying) {
            if (state.items.length < 2) {
                alert("Minimum 2 items required to play");
                dispatch({ type: "play" });
            } else {
                intervalId = setInterval(() => {
                    dispatch({ type: "pick" });
                }, 5000);
            }
        } else {
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
    }, [state.isPlaying, state.items]);
    function handleSubmit(e) {
        e.preventDefault();
        if(!name) {
            alert("Type something first !")
            return
        }
        if (state.items.includes(name)) {
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
        dispatch({ type: "play" });
    };
    const pickRandomItem = () => {
        if (state.isPlaying) {
            const randomItem = getRandomElement(state.items);
            return randomItem;
        }
        return null;
    };
  return (
    <>
        <h1>Add Items and Pick One</h1>
        {state.isPlaying && (
                    <div>
                        <h2>{pickRandomItem()}</h2>
                    </div>
        )}
        <form onSubmit={handleSubmit}>
            <input type="text" name='name' value={name} placeholder='Search...' onChange={(e) => setName(e.target.value)}/>
            <button className='btn' type='submit'>+</button>
        </form>
        <ul>
        {!!state.items.length && state.items?.map((item, index) => (
            <li key={index}>
            {item} <button className='dlt-btn' onClick={() => handleDelete(item)}>Delete</button>
          </li>
        ))}
        </ul>
        <button className='play-btn' onClick={handlePlay} disabled={state.isPlaying}>Play</button>
    </>
  )
}

export default RandomPicker;