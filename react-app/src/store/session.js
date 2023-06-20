// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GET_ALL_USER = 'session/GET_ALL_USER';
const EDIT_USER = 'session/EDIT_USER';
const ADD_FOLLOWER = 'session/ADD_FOLLOWER';
const REMOVE_FOLLOWER = 'session/REMOVE_FOLLOWER'

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const getAllUserAction = (data) => {
	return {
		type: GET_ALL_USER,
		data
	}
}

const editUserAction = (data) => {
	return {
		type: EDIT_USER,
		data
	}
}

const addFollowerAction = (id) => {
	return {
		type:ADD_FOLLOWER,
		id
	}
}

const removeFollowerAction = (id) => {
	return{
		type: REMOVE_FOLLOWER,
		id
	}
}


export const addFollowersThunk = (user1Id, user2Id) => async dispatch => {
	const res = await fetch(`/api/users/${user1Id}/follow/${user2Id}`,{
		method:'PUT'
	})

	if(res.ok){
		dispatch(addFollowerAction(+user2Id))
	} else {
		console.log('error is ocuring');
	}
}

export const removeFollowerThunk = (user1Id, user2Id) => async dispatch => {
	const res = await fetch(`/api/users/${user1Id}/unfollow/${user2Id}`, {
		method:'PUT'
	})

	if(res.ok){
		dispatch(removeFollowerAction(+user2Id))
	} else {
		console.log('error is occuring');
	}

}

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (info) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(info)
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const getAllUserThunk = () => async dispatch => {
	const res = await fetch('/api/users/')

	if (res.ok){
		const data = await res.json()
		dispatch(getAllUserAction(data))
	}
}

export const editUserThunk = (userId, formData) => async dispatch => {
	const res = await fetch(`/api/users/${userId}`, {
		method: 'PUT',
		body: formData
	})

	if(res.ok){
		const data = await res.json()
		dispatch(editUserAction(data))
	}
}

const initialState = { user: null, allUser: {} };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case ADD_FOLLOWER : {
			const newState = {...state, user: {...state.user}}
			newState.user.following.push(action.id)
			return newState
		}
		case REMOVE_FOLLOWER: {
			const newFollowing = state.user.following.filter((followerId) => followerId !== action.id);
			const newState = { ...state, user: { ...state.user, following: newFollowing } };
			return newState;
		}
		case GET_ALL_USER: {
			const newState = {...state, user: {...state.user}, allUser:{...state.allUser}}
			action.data.users.forEach(user => newState.allUser[user.id] = user)
			return newState
		}
		case EDIT_USER: {
			const newState = {...state, user:{}, allUser:{...state.allUser}}
			newState.allUser[action.data.id] = action.data
			newState.user = action.data
			return newState
		}
		default:
			return state;
	}
}
