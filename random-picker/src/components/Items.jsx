import { useContext, useEffect } from 'react'
import React from 'react'
import '../App.css'
import { RandomPickerContext } from '../contexts/RandomPickerContext'

function Items() {
    const { state, dispatch } = useContext(RandomPickerContext);

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
        dispatch({type: "showModal", payload: message})
    }

    const handlePlay = () => {
        if (state.items.length < 2) {
            showModal("Minimum 2 items required to play");
            return;
        }
        dispatch({ type: "play" });
    };

    function handleReset() {
        dispatch({ type: "reset" })
    }

  return (
    <>
        <div className="play-reset-buttons">
            <button className='play-btn' onClick={handlePlay} disabled={state.isPlaying}>Play</button>
            <button className='reset-btn' onClick={handleReset}>Reset</button>
        </div>
    </>
  )
}

export default Items