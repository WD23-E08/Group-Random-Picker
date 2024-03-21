import React from 'react'
import { useState, useReducer, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../index.css';
import { gif } from './Gif';

const initialState = { 
    items: JSON.parse(localStorage.getItem("items")) || [], 
    isPlaying: false,
    pickedItem: null,
    pickedGif: null
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
                pickedItem: getRandomElement(state.items),
            }
        }
        case "pickGif": {
            return {
                ...state,
                pickedGif: getRandomElement(gif) 
            }
        }
        case "reset" :{
            localStorage.setItem('items', JSON.stringify([]));
            return initialState;
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

    const [modal, setModal] = useState({ open: false, message: '' });

    useEffect(() => {
        if (state.isPlaying) {
             const intervalId = setInterval(() => dispatch({ type: "pick" }), 100);
             const intervalGif = setInterval(() => dispatch({ type: "pickGif"}), 200)
             setTimeout(() => {
                clearInterval(intervalId);
                clearInterval(intervalGif);
                dispatch({ type: "play" });
            }, 4000);
        }
    }, [state.isPlaying]);

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(state.items));
    }, [state.items])

    function showModal(message) {
        setModal({ open: true, message });
    }

    function closeModal() {
        setModal({ open: false, message: '' });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(!name) {
            alert("Type something first !")
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

    const handlePlay = () => {
        if (state.items.length < 2) {
            alert("Minimum 2 items required to play");
            return;
        }
        dispatch({ type: "play" });
    };

    function handleReset() {
        dispatch({ type: "reset" })
    }

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
            <button className='reset-btn' onClick={handleReset}>Reset</button>
        </div>

        <Popup open={modal.open} closeOnDocumentClick onClose={closeModal}>
                <div className="modal">
                    <button className="close" onClick={closeModal}>
                        &times;
                    </button>
                    <div className="content">{modal.message}</div>
                </div>
        </Popup>

        <div className='gif'>
                {state.pickedItem ? (
                    <img src={state.pickedGif} alt="" />
                ) : (
                    <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmZrdnZkOGUwbnczcGpqOG1sOTBrcGltanJsb3o2NDJqY2Vvd2R2biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/juSCTzqDAV1Xq/giphy.gif" alt="" />
                )}
            </div>
    </>
  )
}

export default RandomPicker;