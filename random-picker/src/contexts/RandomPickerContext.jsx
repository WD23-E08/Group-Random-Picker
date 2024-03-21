import { createContext, useReducer } from "react";
import { gif } from '../components/Gif.js';
import '../App.css'

export const RandomPickerContext = createContext();

const initialState = {
  items: JSON.parse(localStorage.getItem("items")) || [],
  isPlaying: false,
  pickedItem: null,
  pickedGif: null,
  modal: { open: false, message: '' }
};

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      return {
        ...state,
        items: [...state.items, action.payload.toUpperCase()],
      };
    }
    case "delete": {
      return {
        ...state,
        items: state.items.filter((item) => item !== action.payload),
      };
    }
    case "play": {
      return { ...state, isPlaying: !state.isPlaying };
    }
    case "pick": {
      return {
        ...state,
        pickedItem: getRandomElement(state.items),
      };
    }
    case "pickGif": {
      return {
        ...state,
        pickedGif: getRandomElement(gif),
      };
    }
    case "reset": {
      localStorage.setItem("items", JSON.stringify([]));
      return {...initialState, items: []};
    }
    case "showModal": {
        return {
            ...state,
            modal: { open: true, message: action.payload }
        }
    }
    case "closeModal": {
        return {
            ...state,
            modal: { open: false, message: '' }
        }
    }
    default:
      return state;
  }
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function RandomPickerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <RandomPickerContext.Provider value={{ state, dispatch }}>
      {children}
    </RandomPickerContext.Provider>
  );
}

export default RandomPickerProvider;
