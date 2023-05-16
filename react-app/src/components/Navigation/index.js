import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { FaPinterest } from "react-icons/fa";


function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	console.log(sessionUser,'user');

	return (
		<div className='nav-bar'>
			<ul>
				<NavLink exact to="/">
						<FaPinterest size={30} />
				</NavLink>
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
