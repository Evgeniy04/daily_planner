export const ElementReducer = (state, action) => {
    switch (action.type) {
        case 'GET_ELEMENTS':
            return {todos: action.result}
    }
    return;
}