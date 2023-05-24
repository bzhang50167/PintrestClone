import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import AllPost from "./components/Posts/AllPost";
import OnePost from "./components/Posts/PostShow";
import PostForm from "./components/Posts/PostForm";
import UserPage from "./components/UserPage";
import PostorBoard from "./components/UserPage/PostorBoard";
import BoardShow from "./components/Boards/BoardShow";
import SearchPost from "./components/Posts/Search";
import Chat from "./components/DirectMessages/directmessages"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/post/:id'>
            <OnePost />
          </Route>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/'>
            <SplashPage />
          </Route>
          <Route exact path='/home'>
            <AllPost />
          </Route>
          <Route exact path='/posts/new'>
            <PostForm />
          </Route>
          <Route path='/user/:id'>
            <UserPage />
            <PostorBoard />
          </Route>
          <Route path='/board/:id'>
            <BoardShow />
          </Route>
          <Route exact path='/search'>
            <SearchPost />
          </Route>
          <Route path='/directmessage/:userId/:ownerId' exact={true}>
            <Chat />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
