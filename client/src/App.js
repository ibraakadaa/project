import { useState,useEffect } from'react'

import {v4 as uuidv4} from 'uuid';
import { useDispatch, useSelector } from 'react-redux'
import './App.css';
import AddMovie from './AddMovie'
import Filter from './Filter'
import Description from './Description';
import {Route, Switch} from "react-router-dom"
import LoginPage from "./LoginPage"
import Profile from "./Profile"
import   Signuppage from"./Signuppage"
import { getPosts } from './redux/actions/postActions';
import OtherProfile from './OtherProfile';
function App() { 
    
  //const isLoading = useSelector(state => state.appState.isLoading)
const moviepost=useSelector(state=>state.posts.postList)
const auth = useSelector(state => state.auth)
const isLoading = useSelector(state => state.appState.isLoading)




 const dispatch = useDispatch()
  
useEffect(() => {
dispatch(getPosts()) 
}, [])
//const isLoading = useSelector(state=>state.appState.isLoading.state)
//console.log(Loading)

  return (
    
    <div>
    <div>
<Switch>
<Route exact path="/register" render={(props)=><  Signuppage {...props}     />  }/>

        <Route exact path="/login" render={(props)=><LoginPage   {...props}     />  }/>

    
   {auth.isAuth&&<Route exact path="/profile" render={(props)=><Profile      />  }/>}
  {!(isLoading.ref==="GetPosts")&&!(isLoading.ref==="GetMyPosts")&&!(isLoading.ref==="getotherposts")&&<Route   path="/movie/:id" render={(props)=><Description     {...props}  movie={moviepost}      />   } />}
  <Route exact  path="/other/:id" render={(props)=><OtherProfile     {...props}  movie={moviepost}      /> } />
       {<Route path="/" render={(props)=><Filter   {...props}     movie={moviepost}         />} />}
  </Switch>
    </div>
    </div>
  );

    }
export default App;
