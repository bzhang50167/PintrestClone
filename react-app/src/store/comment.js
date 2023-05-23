const CREATE_COMMENT = 'comments/CREATE_COMMENT'
const GET_ALL_COMMENT = 'comments/GET_ALL_COMMENTS'
const GET_COMMENT_ID = 'comments/GET_COMMENT_BY_ID'
const EDIT_COMMENT = 'comments/EDIT_COMMENT'
const DELETE_COMMENT = 'comments/DELETE_COMMENT'

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

const getCommentByIdAction = (data) => {
    return {
        type: GET_COMMENT_ID,
        data
    }
}

const editCommentAction = (data) => {
    return {
        type: EDIT_COMMENT,
        data
    }
}

const deleteCommentAction = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

export const getAllCommentsThunk = () => async dispatch => {
    const res = await fetch('/comments/')

    if (res.ok) {
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

export const getCommentByIdThunk = (id) => async dispatch => {
    const res = await fetch(`/comments/${id}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(getCommentByIdAction(data))
    }
}

export const editCommentThunk = (id, data) => async dispatch => {
    const res = await fetch(`/comments/${id}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text:data
        })
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(editCommentAction(data))
    }
}

export const deleteCommentThunk = (commentId) => async dispatch => {

    const res = await fetch(`/comments/${commentId}/delete`, {
        method:'DELETE'
    })

    if (res.ok) {
        dispatch(deleteCommentAction(commentId))
    }
}

const initialState = { allComments: {}, oneComment: {} }

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COMMENT: {
            const newState = { ...state, allComments: { ...state.allComments } }
            action.data.forEach(comment => newState.allComments[comment.id] = comment)
            return newState
        }
        case CREATE_COMMENT: {
            const newState = { ...state, allComments: { ...state.allComments }}
            newState.allComments[action.data.id] = action.data
            return newState
        }
        case GET_COMMENT_ID: {
            const newState = { ...state, allComments: { ...state.allComments }, oneComment: {} }
            newState.oneComment = action.data
            return newState
        }
        case EDIT_COMMENT: {
            const newState = { ...state, allComments: { ...state.allComments } }
            newState.allComments[action.data.id] = action.data
            return newState
        }
        case DELETE_COMMENT: {
            const newState = { ...state, allComments: { ...state.allComments } }
            delete newState.allComments[action.commentId]
            return newState
        }
        default: {
            return state
        }
    }

}

export default commentReducer
