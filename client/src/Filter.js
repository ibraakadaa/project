import { useState,useEffect } from "react";

import ReactStars from "react-rating-stars-component";
import {Button, Nav, Navbar, Form, FormControl,Dropdown,DropdownButton} from "react-bootstrap";
import AddMovie from "./AddMovie";
import { useDispatch ,useSelector} from "react-redux";
import {logout} from "./redux/actions/authActions"
import { Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";



var frating = 0;
var searchname = "";
const Filter = ({ movie}) => {

  const history = useHistory()




 const  dispatch= useDispatch()
 const moviepost=useSelector(state=>state.posts.postList)
 const auth = useSelector(state => state.auth)
  const isLoading = useSelector(state => state.appState.isLoading)
   



const [filtermovie, setfiltermovie] = useState(movie);
  function updating() {

    setfiltermovie(
      moviepost.filter(
        (elm) =>
          elm.name.toLowerCase().includes(searchname.toLowerCase()) &&
          elm.rating >= frating
      )
    );
  }
 
  

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
    },[moviepost])

    
useEffect(()=>{
  
},[auth.isAuth])

useEffect(() => {

  history.push('/')

  
}, [])

const disconnect=()=>{
  dispatch(logout())
}




  return (
   <div><div>
     
      <Navbar bg="dark" variant="dark">

        <Navbar.Brand >
        <img src="./logo.png"  style={{marginRight:"50px"}}/>
          Movie streaming
      
        </Navbar.Brand>
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
         &&<div><Link to="/profile"><img src={auth.user && auth.user.image.url} alt="Avatar" class="avatar"/></Link>
         <Link to ="/profile"><div className="text-avatar"> {auth.user && auth.user.lastname} {auth.user && auth.user.firstname}</div></Link></div>}
         {auth.isAuth&&!(isLoading.ref==="signup")&&!(isLoading.ref==="Login")&&!(isLoading.ref==="Getmyprofile")
         &&<DropdownButton id="dropdown-basic-button" title="Compte">
  <Dropdown.Item  onClick={disconnect}>disconnect</Dropdown.Item>
  
   </DropdownButton>}
      
      {!auth.isAuth&&<Link to="login"><Button  variant="warning"  className="login">login</Button></Link>}
       
      {!auth.isAuth&&<Link to="register"><Button>register</Button></Link>}


        </Form>
      </Navbar>

      {auth.isAuth&&!(isLoading.ref==="signup")&&!(isLoading.ref==="Login")&&!(isLoading.ref==="Getmyprofile")
         &&<AddMovie  ></AddMovie>}
     {<div className="movieflexing"> 
     {filtermovie.map((elm)=><MovieCard
  key={elm._id}
  id={elm._id} rating={elm.rating}
   src={elm.image.url} name={ elm.name}
   owner={elm.owner} /> )}  </div>
  }

    </div></div> 
  );
};



/* {!(isLoading.ref="")&&<MovieList
        movie={filtermovie}
      />} */

export default Filter;
