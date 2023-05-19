import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { FaPinterest } from "react-icons/fa";
import { useHistory } from 'react-router-dom/cjs/react-router-dom';


function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const [searchQuery, setSearchQuery] = useState('')
	const dispatch = useDispatch()
	const history = useHistory()

	console.log(sessionUser, 'user');

	const handleSearch = (e) => {
		setSearchQuery(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		history.push(``)
	}

	return (
		<div className='nav-bar'>
			<ul>
				<NavLink exact to="/">
					<FaPinterest size={30} />
				</NavLink>
			</ul>
			<ul>
				<NavLink exact to='/posts/new'>
					Create
				</NavLink>
			</ul>
			<ul>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={searchQuery}
						onChange={handleSearch}
						placeholder="Search..."
						className="search-input"
					/>
					<button type="submit" className="search-button">Search</button>
				</form>
			</ul>
			<ul>
				<NavLink exactly to='/home'>
					Home
				</NavLink>
			</ul>
			{isLoaded && (
				<ul>
					<ProfileButton user={sessionUser} />
				</ul>
			)}
		</div>
	);
}

export default Navigation;
