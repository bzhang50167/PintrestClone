import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { FaPinterest } from "react-icons/fa";
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { searchThunk } from '../../store/post';
import { BsLinkedin, BsGithub } from "react-icons/bs";


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchThunk(searchQuery));
    history.push('/search');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className='nav-bar'>
      <ul>
        <NavLink exact to="/">
          <FaPinterest size={30} />
        </NavLink>
      </ul>
      <ul>
        {sessionUser &&
          <NavLink exact to='/posts/new' className='create-link'>
            Create
          </NavLink>
        }
      </ul>
      <ul>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search..."
            className="search-input"
          />
        </form>
      </ul>
      <ul>
        <span>
          <a rel='norel' href="https://github.com/bzhang50167" target="_blank"><BsGithub /></a>
          <a rel='norel' href="https://www.linkedin.com/in/bao-heng-zhang-b43731256/" target="_blank"><BsLinkedin /></a>
        </span>
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
