
import StarRatingComponent from 'react-star-rating-component';

import ReactStars from "react-rating-stars-component";
import {Card,Button} from 'react-bootstrap'
import {useState,useEffect} from "react"
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { deletepost, getotherprofile, updatepost, vote } from './redux/actions/postActions';
function MovieCard({src,name,rating,id,owner})
{  
  const dispatch = useDispatch()
  
function fndelet()
  {
    dispatch(deletepost(id))
  }

  const onStarClick=(nextValue, prevValue, name)=>{
    // rating=(rating+nextValue)/2
    dispatch(vote(id,{rating:nextValue},owner._id))
  


  }
  


    return( <div  >
    <Card className="moviecard" style={{ width: '18rem' }}>
  <Card.Img variant="top" src={src}  style={{ width: '18rem' , height:"20rem"}} />
  <Card.Body>
    <Card.Title>{name}</Card.Title>
    <Card.Text>
    uploaded by :
    <br></br>
    <br></br>
   <Link to ={`/other/${owner._id}`} > <img className="avatar" src={owner.image.url}/></Link>
    
    <Link to={`/other/${owner._id}`} > <span className="textt">{owner.firstname} {owner.lastname}</span></Link>
    </Card.Text>
  </Card.Body>
  <div className="flexing">
  <StarRatingComponent value={rating} starCount={5} onStarClick={onStarClick} size={24} />
  </div>
  <Button  className="deletebutton" variant="danger" onClick={fndelet}  >Delte</Button>
  
  
   <Link to={`/movie/${id}`} className="seemore"> <Button className="seemore1"  variant="primary"  >Watch the trailer</Button> </Link>
  
</Card>  
    
    </div>)
   
 
}



export default MovieCard 