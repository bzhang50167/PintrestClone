const GET_ALL_BOARDS = 'boards/GET_ALL_BOARDS'

const getAllBoardsAction = (data) => {
    return {
        type:GET_ALL_BOARDS,
        data
    }
}


export const getAllBoardsThunk = () => async dispatch => {
    const res = await fetch('/groups/')

    if(res.ok){
        const data = await res.json()
        dispatch(getAllBoardsAction(data))
    }
}


const initalState = { allBoards:{}, oneBoard:{}}

const boardReducer = (state = initalState, action) => {
    switch(action.type){
        case GET_ALL_BOARDS: {
            const newState = {...state, allBoards:{...state.allBoards}}
            console.log(action.data,'action in the reducer');
            action.data.forEach(board => newState.allBoards[board.id] = board)
            return newState
        }
        default:{
            return state
        }
    }
}

export default boardReducer
