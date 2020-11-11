import React, { useReducer } from 'react';
import { DB } from '../db';
import { ElementContext } from './ElementContext';
import { ElementReducer } from './ElementReducer';

export const ElementState = ({ children }) => {
    const initialState = {
        todos: []
    };

    const [state, dispatch] = useReducer(ElementReducer, initialState);

    const fetchTodos = async (date) => {
        await DB.getElements(date).then(result => {
            dispatch({type: 'GET_ELEMENTS', result});
        })
    };

    return (
        <ElementContext.Provider
        value={{
            todos: state.todos,
            fetchTodos,
        }}
        >
        {children}
        </ElementContext.Provider>
    )
}
