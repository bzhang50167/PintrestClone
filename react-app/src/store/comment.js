const CREATE_COMMENT = 'comments/CREATE_COMMENT'
const GET_ALL_COMMENT = 'comments/GET_ALL_COMMENTS'
const GET_COMMENT_ID = 'comments/GET_COMMENT_BY_ID'

const creatCommentAction = (data) => {
    return {
        type: CREATE_COMMENT,
        data
    }
}

const getAllCommentsAction = (data) => {
    return {
        type: GET_ALL_COMMENT,
        data
    }
}

export const getAllCommentsThunk = () =>  async dispatch => {
    const res = await fetch('/comments/')

    if(res.ok){
        const data = await res.json()
        dispatch(getAllCommentsAction(data))
    }
}

export const createCommentThunk = (info) => async dispatch => {
    const res = await fetch('/comments/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(creatCommentAction(data))
    }
}

const initialState = { allComments: {}, oneComment: {} }

const commentReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_COMMENT:{
            const newState = {...state, allComments:{...state.allComments}}
            action.data.forEach(comment => newState.allComments[comment.id] = comment)
            return newState
        }
        case CREATE_COMMENT:{
            const newState = {...state, allComments:{...state.allComments}}
            newState[action.data.id] = action.data
            return newState
        }
        default:{
            return state
        }
    }

}

export default commentReducer
