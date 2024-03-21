import { useContext } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import React from 'react'
import { RandomPickerContext } from '../contexts/RandomPickerContext'

function Modals() {
    const { state, dispatch } = useContext(RandomPickerContext);

  return (
    <>
        <Popup open={state.modal.open} closeOnDocumentClick onClose={() => dispatch({ type: "closeModal"})}>
                <div className="modal">
                    <button className="close" onClick={() => dispatch({ type: "closeModal"})}>
                        &times;
                    </button>
                    <div className="content">{state.modal.message}</div>
                </div>
        </Popup>
    </>
  )
}

export default Modals