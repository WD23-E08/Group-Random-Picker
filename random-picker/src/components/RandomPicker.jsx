import React from 'react'
import { useContext, useState } from 'react';
import '../index.css';
import { RandomPickerContext } from '../contexts/RandomPickerContext';
import Form from './Form';
import Items from './Items';
import Modals from './Modals';


function RandomPicker() { 
    const { state, dispatch } = useContext(RandomPickerContext);

  return (
    <>  
        {state.pickedItem ? (
            <h1>{state.pickedItem}</h1>
            ) : (
            <h1>Add Items and Pick One</h1>
        )}

        <Form/>
        <Items/>
        <Modals/>

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