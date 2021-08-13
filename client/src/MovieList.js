import MovieCard from "./MovieCard"
const MovieList=({movie})=>{


return (<div className="movieflexing" >

{movie.map((elm)=><MovieCard 
  
  id={elm._id} rating={elm.rating}
   src={elm.image.url} name={ elm.name}
   owner={elm.owner} /> )}


</div>)

}

export default MovieList