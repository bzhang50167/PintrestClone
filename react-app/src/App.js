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
        </Switch>
      )}
    </>
  );
}

export default App;
