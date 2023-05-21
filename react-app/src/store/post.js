const GET_ALL_POST = 'post/GET_ALL_POST'
const GET_POST_BY_ID = 'post/GET_POST_BY_ID'
const CREATE_POST = 'post/CREATE_POST'
const EDIT_POST = 'post/EDIT_POST'
const DELETE_POST = 'post/DELETE_POST'

const getAllPostAction = (data) => {
    return {
        type: GET_ALL_POST,
        data
    }
}

const getPostByIdAction = (data) => {
    return {
        type: GET_POST_BY_ID,
        data
    }
}

const createPostAction = (data) => {
    return {
        type: CREATE_POST,
        data
    }
}

const editPostAction = (data) => {
    return {
        type: EDIT_POST,
        data
    }
}

const deletePostAction = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
}

export const createPostThunk = (formData) => async dispatch => {
    const res = await fetch('/posts/new' ,{
        method: 'POST',
        body: formData
    })

    if (res.ok){
        const data = await res.json()
        console.log(data, 'DATA');
        dispatch(createPostAction(data))
    }
}

export const deletePostThunk = (postId) => async dispatch => {
    const res = await fetch(`/posts/${postId}/delete`, {
        method:'DELETE'
    })

    if (res.ok){
        dispatch(deletePostAction(postId))
    }
}

export const getAllPostThunk = () => async dispatch => {
    const res = await fetch('/posts/')

    if(res.ok){
        const data = await res.json()
        dispatch(getAllPostAction(data))
    }
}

export const getPostByIdThunk = (id) => async dispatch => {
    const res = await fetch(`/posts/${id}`)

    if (res.ok){
        const data = await res.json()
        console.log(data);
        dispatch(getPostByIdAction(data))
    }
}

export const editPostThunk = (id , formData) => async dispatch => {
    const res = await fetch(`/posts/${id}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    if(res.ok){
        const data = await res.json()
        dispatch(editPostAction(data))
    } else {
        console.log('not working');
    }
}

const initialState = { allPost:{} , onePost:{}, delete:null}

const postReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_POST: {
            const newState = {...state , allPost: {...state.allPost}}
            action.data.forEach(post => newState.allPost[post.id] = post)
            return newState
        }
        case GET_POST_BY_ID:{
            const newState = {...state, allPost: {...state.allPost}, onePost:{}}
            newState.onePost = action.data
            return newState
        }
        case CREATE_POST:{
            const newState = {...state, allPost:{...state.allPost}}
            newState.allPost[action.data.id] = action.id
            return newState
        }
        case EDIT_POST:{
            const newState = {...state, allPost: {...state.allPost}, onePost:{}}
            newState.onePost = action.data
            return newState
        }
        case DELETE_POST:{
            const newState = {...state, allPost: {...state.allPost}}
            delete newState.allPost[action.postId]
            return newState
        }
        default:{
            return state
        }
    }
}


export default postReducer
