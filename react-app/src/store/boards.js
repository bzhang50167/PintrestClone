const GET_ALL_BOARDS = 'boards/GET_ALL_BOARDS'
const GET_ONE_BOARD = 'boards/GET_ONE_BOARD'
const CREATE_BOARD_NAME = 'boards/CREATE_BOARD_NAME'
const DELETE_BOARD = 'boards/DELETE_BOARD'
const EDIT_BOARD_NAME = 'boards/EDIT_BOARD_NAME'

const getAllBoardsAction = (data) => {
    return {
        type:GET_ALL_BOARDS,
        data
    }
}

const getOneBoardAction = (data) => {
    return {
        type:GET_ONE_BOARD,
        data
    }
}

const createBoardNameAction = (data) => {
    return {
        type:CREATE_BOARD_NAME,
        data
    }
}

const deleteBoardAction = (boardId) => {
    return {
        type: DELETE_BOARD,
        boardId
    }
}

const editBoardNameAction = (data) => {
    return {
        type: EDIT_BOARD_NAME,
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

export const getOneBoardThunk = (id) => async dispatch => {
    const res = await fetch(`/groups/${id}`)

    if(res.ok){
        const data = await res.json()
        dispatch(getOneBoardAction(data))
    }
}

export const createBoardNameThunk = (data) => async dispatch => {
    const res = await fetch(`/groups/new`, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if(res.ok){
        const data = await res.json()
        dispatch(createBoardNameAction(data))
    }
}

export const addImageThunk = (data) => async dispatch => {
    const res = await fetch(`/groups/add`, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const removePostThunk = (post_id, board_id) => async dispatch => {
    const res = await fetch(`/groups/${board_id}/delete/${post_id}`, {
        method: 'DELETE'
    })

    if (res.ok){
        const data = await res.json()
        dispatch(getOneBoardAction(data))
    }
}

export const deleteBoardThunk = (boardId) => async dispatch => {
    const res = await fetch (`/groups/${boardId}/delete`,{
        method: 'DELETE'
    })

    if(res.ok){
        dispatch(deleteBoardAction(boardId))
    }
}

export const editBoardNameThunk = (info, id) => async dispatch => {
    const res = await fetch(`/groups/${id}/edit`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    })
    if(res.ok){
        const data = await res.json()
        dispatch(editBoardNameAction(data))
    }
}

const initalState = { allBoards:{}, oneBoard:{}}

const boardReducer = (state = initalState, action) => {
    switch(action.type){
        case GET_ALL_BOARDS: {
            const newState = {...state, allBoards:{...state.allBoards}, oneBoard:{}}
            action.data.forEach(board => newState.allBoards[board.id] = board)
            return newState
        }
        case GET_ONE_BOARD: {
            const newState = {...state, allBoards:{...state.allBoards}, oneBoard:{}}
            newState.oneBoard = action.data
            return newState
        }
        case CREATE_BOARD_NAME: {
            const newState = {...state, allBoards:{...state.allBoards}}
            newState.allBoards[action.data.id] = action.data
            return newState
        }
        case EDIT_BOARD_NAME: {
            const newState = {...state, allBoards:{...state.allBoards}, oneBoard:{}}
            newState.oneBoard[action.data.id] = action.id
            return newState
        }
        case DELETE_BOARD: {
            const newState = {...state, allBoards:{...state.allBoards}}
            delete newState.allBoards[action.boardId]
            return newState
        }
        default:{
            return state
        }
    }
}

export default boardReducer
