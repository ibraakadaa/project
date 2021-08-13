import {useRef , useState  } from'react'
import ReactStars from "react-rating-stars-component";
import {v4 as uuidv4} from 'uuid';

import {Button,Modal,InputGroup,FormControl} from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import {addPost} from "./redux/actions/postActions"
import Compressor from 'compressorjs'





function AddMovie() { 
  const dispatch= useDispatch()  
  const[ file,setfile]=useState(); 

    
    const fileInput=useRef()
    const nameofmovie=useRef();
    const description=useRef();
    const trailer=useRef();
    const [Rating,setRating]=useState(1);
    
    function handleChange(e)
  {
    setfile(e.target.files[0] )  

      
  }

  function savemovie(){
if (nameofmovie.current.value.length===0 )
{alert ("you should give a name to movie " )
return null;}
if (trailer.current.value.length===0 )
{alert ("you should put  a url of  movie " )
return null;}
if (description.current.value.length===0 )
{alert ("you should give a description to movie " )
return null;}

if(!file){
  alert("You can't add the movie twice successively ")
}

  if(!file)
  {alert("You must add a photo ")
  return null}
  new Compressor(file, {
    quality: 0.8,
    success(result) {
        const reader = new FileReader()
        reader.readAsDataURL(result)
        reader.onloadend = () => {
         
        dispatch(addPost({image: reader.result, name:nameofmovie.current.value,
          rating:Rating, description:description.current.value,
          trailer:trailer.current.value}))
        }

    }
})
  
 handleClose()
}

  
  function addhandlechange(e) {
    e.preventDefault();
   fileInput.current.click(); 
}
const ratingChanged = (newRating) => {
setRating (newRating)};
    
    
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
    
    
    
    
    return <div>
      <div className="flexing back" >
       <Button variant="success" className="buttonmodal" onClick={handleShow}>
     Adding new movie
      </Button>
      </div>
      <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding a movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InputGroup>
      <InputGroup.Text >Name of Movie</InputGroup.Text>
      <FormControl as="textarea" aria-label="Name of movie"  ref={nameofmovie} />
      </InputGroup>
      <InputGroup>
      <InputGroup.Text >descritiopn of Movie</InputGroup.Text>
      <FormControl as="textarea" aria-label="description of movie"  ref={description} />
      </InputGroup>
      <InputGroup>
      <InputGroup.Text >trailer of Movie</InputGroup.Text>
      <FormControl as="textarea" aria-label="trailer of movie" placeholder="you can add a simple youtube link"  ref={trailer} />
      </InputGroup>
    
 
<InputGroup className="flexing">
<Button className="upload" variant="success"   onClick ={addhandlechange}     >Upload a Movie</Button>
</InputGroup>

<InputGroup className="flexing">
      <ReactStars
    count={5}
    onChange={ratingChanged}
    size={30}
    activeColor="#ffd700"
    value={1}
/>
</InputGroup>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={savemovie}>
            Save Movie
          </Button>
        </Modal.Footer>
      </Modal>
    
    <input type="file"    ref={fileInput} style={{display:'none'}} onChange={handleChange} ></input> 

  
    </div>
  
  }
  export default AddMovie