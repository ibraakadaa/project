import React from 'react'
import {useState,useEffect} from "react"
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch ,useSelector} from "react-redux";
import StarRatingComponent from 'react-star-rating-component';
import { updatepost } from './redux/actions/postActions';




 const Description = ({match,history,movie}) => {
   
  const dispatch = useDispatch()

  function extracting(str){
        str=str.split("")
        let a=[]
  for(let i=0;i<str.length;i++)
 {if(str[i]=="&")
   return a.join("")
   else 
  a[i] =str[i]
   }
 return a.join("")
   }



     if(movie.find(elm=>elm._id===match.params.id)){
        var show=true
    var {name,_id,trailer,description,rating}=movie.find(elm=>elm._id===match.params.id)
    
     trailer=trailer.replace("watch?v=","embed/")
     trailer=extracting(trailer)
    
   } else show=false
   const isLoading = useSelector(state => state.appState.isLoading)


   const onStarClick=(nextValue, prevValue, name)=>{
    dispatch(updatepost(_id,{rating:nextValue}))

  }
       
       
     
     



    return (
       <div><div>
           {!show && <div className="errorpage"><h1 >Error page not found</h1>
           <br/>
           <Link to="/"><Button variant ="dark">Go to home page</Button></Link></div>}
           
           
            {show &&<div className="description">
           
           <iframe  src={trailer}> </iframe>
           <h1 style={{width:"70%" ,backgroundColor:'aqua',textAlign:"center ",fontFamily:'Roboto'}}>{name}</h1>
           <br/>
           <p style={{width:"70%",fontWeight:"bold",fontFamily:'Roboto'}}>{description}</p>
           <h2>Rate the movie</h2>
           <StarRatingComponent value={rating} starCount={5} onStarClick={onStarClick} size={24} />

   
           <Button onClick={()=>history.goBack()} variant ="dark">Go Back </Button></div>}
           </div>

        </div>
    )
}
export default Description 