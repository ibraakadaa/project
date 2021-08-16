import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MovieCard from './MovieCard'
import { getotherposts, getotherprofile } from './redux/actions/postActions'
import { Link, useHistory } from "react-router-dom";

import {Button, Nav, Navbar, Form, FormControl,Dropdown,DropdownButton} from "react-bootstrap";
import { getotheruser, logout } from './redux/actions/authActions';
import ReactStars from "react-rating-stars-component";
import AddMovie from './AddMovie';
import logo from "./logo.png"



const OtherProfile = ({match}) => {
  const history = useHistory()

    var frating = 0;
    var searchname = "";
const dispatch = useDispatch()
const isLoading = useSelector(state => state.appState.isLoading)
const o = useSelector(state => state.posts.o)
const auth = useSelector(state => state.auth) 
const error = useSelector(state => state.appState.errors)

if(auth)
if(auth.user._id===match.params.id)
history.push('/profile')



const [filtermovie, setfiltermovie] = useState(o);

function updating() {
  if(!(isLoading.ref==="getotherposts"))
  setfiltermovie(
        o.filter(
        (elm) =>
          elm.name.toLowerCase().includes(searchname.toLowerCase()) &&
          elm.rating >= frating
      )
    );
  }
 //console.log("i'ts runnig ")
  

  function Filtermovie(e) {
    searchname = e.target.value;
    
    updating();
  }

  

  const ratingChanged = (newRating) => {
    

    frating = newRating;

    updating();
};

  useEffect(() => {
       updating()
    },[o])


const disconnect=()=>{
  history.push('/')
    dispatch(logout())
  }


useEffect(() => {

 dispatch(getotherprofile(match.params.id))
 dispatch(getotheruser(match.params.id))
}, [])



    return ( <div>        <Navbar bg="dark" variant="dark">
        <Link to ="/">
        <Navbar.Brand >
       
        <img src={logo} style={{marginRight:"50px"}}></img>
        Movie streaming
        </Navbar.Brand>
        </Link>
        <Nav className="mr-auto"></Nav>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            onChange={(e) => Filtermovie(e)}
          />
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
          />
         {auth.isAuth&&!(isLoading.ref==="signup")&&!(isLoading.ref==="Login")&&!(isLoading.ref==="Getmyprofile")
         &&<div><Link to="/profile"><img src={auth.user.image.url===""} alt="Avatar" class="avatar"/></Link>
         <Link to ="/profile"><div className="text-avatar"> {auth.user.lastname} {auth.user.firstname}</div></Link></div>}
         {auth.isAuth&&!(isLoading.ref==="signup")&&!(isLoading.ref==="Login")&&!(isLoading.ref==="Getmyprofile")
         &&<DropdownButton id="dropdown-basic-button" title="Compte">
        <Dropdown.Item  onClick={disconnect}>disconnect</Dropdown.Item>
        
        </DropdownButton>}
        
        {!auth.isAuth&&<Link to="/login"><Button  variant="warning"  className="login">login</Button></Link>}
        
        {!auth.isAuth&&<Link to="/register"><Button>register</Button></Link>}
        
        
        </Form>
        </Navbar>
        {(error==="Cast to ObjectId failed for value \""+`${match.params.id}`+"\" (type string) at path \"_id\" for model \"user\"")&&<div class="error">User d'ont exist <div><Link to ="/"><Button>go back to home page</Button></Link></div> </div>}
       {!(error==="Cast to ObjectId failed for value \""+`${match.params.id}`+"\" (type string) at path \"_id\" for model \"user\"")&&<div className="profile"> <div>

          {<img src={auth.otheruser.image.url} ></img>} 
        <div className="ecriture" >{`${auth.otheruser.firstname} ${auth.otheruser.lastname}`} </div>
          </div>  </div>}
       
       {<div className="movieflexing">
   
       {filtermovie.map((elm)=><MovieCard 
    key={elm._id}
  id={elm._id} rating={elm.rating}
   src={elm.image.url} name={ elm.name}
   owner={elm.owner} /> )}
 

  
       </div>
       }


       </div>
    )
}

export default OtherProfile
//<img src={"logo.png"||"https://image.freepik.com/vecteurs-libre/cliquez-vecteur-logo-film_18099-258.jpg"}  style={{marginRight:"50px"}}/>
        