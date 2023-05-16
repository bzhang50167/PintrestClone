const GET_ALL_POST = 'post/GET_ALL_POST'
const GET_POST_BY_ID = 'post/GET_POST_BY_ID'

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

const initialState = { allPost:{} , onePost:{}}

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
        default:
            return state
    }
}


export default postReducer
