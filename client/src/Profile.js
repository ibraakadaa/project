import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyPost } from './redux/actions/postActions'
import MovieCard from './MovieCard'
import {InputGroup,Modal,Button, Nav, Navbar, Form, FormControl,Dropdown,DropdownButton} from "react-bootstrap";
import AddMovie from "./AddMovie";
import { Link, useHistory } from "react-router-dom";
import Compressor from 'compressorjs'
import ReactStars from "react-rating-stars-component";
import { logout, updatingprofileimage } from './redux/actions/authActions';





const Profile = () => {

    var frating = 0;
    var searchname = "";
const dispatch=useDispatch()
const auth = useSelector(state => state.auth)
const history = useHistory()
const[ file,setfile]=useState();
const[ selected,setselected]=useState(); 
const fileInput=useRef()

const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
    





const isLoading = useSelector(state => state.appState.isLoading)
const myposts = useSelector(state => state.posts.myposts)
const [filtermovie, setfiltermovie] = useState(myposts);
  
function addhandlechange(e) {
  e.preventDefault();
 fileInput.current.click(); 
}



function updating() {

    setfiltermovie(
      myposts.filter(
        (elm) =>
          elm.name.toLowerCase().includes(searchname.toLowerCase()) &&
          elm.rating >= frating
      )
    );
  }
    
  function handleChange(e)
  {
    setfile(e.target.files[0] )
    new Compressor(e.target.files[0], {
      quality: 0.8,
      success(result) {
          const reader = new FileReader()
          reader.readAsDataURL(result)
          reader.onloadend = () => {
           setselected(reader.result)
          }
  
      }
  })}

    


  const updatingphoto=()=>{

    if((!file)||(!auth.user._id))
  {alert("You must add a photo ")
  return null}
  new Compressor(file, {
    quality: 0.8,
    success(result) {
        const reader = new FileReader()
        reader.readAsDataURL(result)
        reader.onloadend = () => {
         setselected(reader.result)
        dispatch(updatingprofileimage( {image:reader.result },auth.user._id))
        }

    }
})
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
    },[myposts])


const disconnect=()=>{
  history.push('/')
    dispatch(logout())
  }

useEffect(() => {
   dispatch(getMyPost())
}, [])



    return (
        <div    >
            <Navbar bg="dark" variant="dark">
<Link to ="/">
<Navbar.Brand >
<img src="./logo.png"  style={{marginRight:"50px"}}/>
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
 &&<div><Link to="/profile"><img src={auth.user.image.url} alt="Avatar" class="avatar"/></Link>
 <Link to ="/profile"><div className="text-avatar"> {auth.user.lastname} {auth.user.firstname}</div></Link></div>}
 {auth.isAuth&&!(isLoading.ref==="signup")&&!(isLoading.ref==="Login")&&!(isLoading.ref==="Getmyprofile")
 &&<DropdownButton id="dropdown-basic-button" title="Compte">
<Dropdown.Item  onClick={disconnect}>disconnect</Dropdown.Item>

</DropdownButton>}

{!auth.isAuth&&<Link to="/login"><Button  variant="warning"  className="login">login</Button></Link>}

{!auth.isAuth&&<Link to="/register"><Button>register</Button></Link>}


</Form>
</Navbar>


<Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier la photo de profile</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
        <InputGroup className="flexing"><Button className="upload" variant="success"   onClick ={addhandlechange} >Upload a Photo</Button></InputGroup>     
          <img src={selected} ></img>
          <Button variant="primary" onClick={updatingphoto}>
            Save a photo 
          </Button>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      
      
      
        </Modal.Footer>
      </Modal>
    




{auth.isAuth&&<div className="profile"> <div>

{<img src={auth.user.image.url} ></img>} 
<div className="ecriture" >{`${auth.user.firstname} ${auth.user.lastname}`} </div>
</div>  </div>} 
<div className="flexing back" > <Button  onClick ={handleShow}  variant="info" className="buttonmodal" >updating profile image </Button></div>

{auth.isAuth&&!(isLoading.ref==="signup")&&!(isLoading.ref==="Login")&&!(isLoading.ref==="Getmyprofilegin")
 &&<AddMovie  ></AddMovie>}
  {!(isLoading.ref==="GetMyPosts")&&<div className="movieflexing">
       {filtermovie.map((elm)=><MovieCard   key={elm._id}
    id={elm._id} rating={elm.rating}
   src={elm.image.url} name={ elm.name} owner={elm.owner} /> )} 


        </div>}
       
        <input type="file"    ref={fileInput} style={{display:'none'}} onChange={handleChange} ></input> 

       
        </div>
    )
}

export default Profile
