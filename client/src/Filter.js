import { useState,useEffect } from "react";
import MovieList from "./MovieList";
import ReactStars from "react-rating-stars-component";
import {Button, Nav, Navbar, Form, FormControl,Dropdown,DropdownButton} from "react-bootstrap";
import AddMovie from "./AddMovie";
import { useDispatch ,useSelector} from "react-redux";
import {logout} from "./redux/actions/authActions"
import { Link } from "react-router-dom";



var frating = 0;
var searchname = "";
const Filter = ({ movie}) => {

 const  dispatch= useDispatch()
  const auth = useSelector(state => state.auth)
  const isLoading = useSelector(state => state.appState.isLoading)
   



const [filtermovie, setfiltermovie] = useState(movie);
  function updating() {

    setfiltermovie(
      movie.filter(
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
    },[movie])

    
useEffect(()=>{
  
},[auth.isAuth])


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
         {auth.user&&!(isLoading.ref==="signup")&&!(isLoading.ref==="Login")&&!(isLoading.ref==="Getmyprofile")
         &&<div><Link to="/profile"><img src={auth.user.image.url} alt="Avatar" class="avatar"/></Link>
         <Link to ="/profile"><div className="text-avatar"> {auth.user.lastname} {auth.user.firstname}</div></Link></div>}
         {auth.isAuth&&!(isLoading.ref==="signup")&&!(isLoading.ref==="Login")&&!(isLoading.ref==="Getmyprofile")
         &&<DropdownButton id="dropdown-basic-button" title="Compte">
  <Dropdown.Item  onClick={disconnect}>disconnect</Dropdown.Item>
  
   </DropdownButton>}
      
      {!auth.isAuth&&<Link to="login"><Button  variant="warning"  className="login">login</Button></Link>}
       
      {!auth.isAuth&&<Link to="register"><Button>register</Button></Link>}


        </Form>
      </Navbar>

      {auth.user&&!(isLoading.ref==="signup")&&!(isLoading.ref==="Login")&&!(isLoading.ref==="Getmyprofile")
         &&<AddMovie  ></AddMovie>}
     
      <MovieList
        movie={filtermovie}
      />
    </div></div> 
  );
};

export default Filter;
