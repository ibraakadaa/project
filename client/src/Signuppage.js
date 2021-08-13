
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from './redux/actions/authActions';
import { useHistory } from 'react-router-dom';
import Compressor from 'compressorjs'

import {Form,Button,Modal,InputGroup,FormControl} from 'react-bootstrap'



export default function Signuppage() {
   


    const firstname = useRef("")
    const lastname = useRef("")
    const fileInput=useRef()
    const password=useRef()
    const[ file,setfile]=useState(); 
    const [image, setimage] = useState()

    const email=useRef()
    const [emailplaceholder, setemailplaceholder] = useState("")
const [passwordplaceholder, setpasswordplaceholder] = useState("")

    function addhandlechange(e) {
        e.preventDefault();
       fileInput.current.click(); 
    }

    const history = useHistory()
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [selectedImage, setSelectedImage] = useState("")
  
    useEffect(() => {
        if (auth.isAuth) {
            history.push('/')
        }

    }, [auth.isAuth])

    
    const handleSubmit = (e) => {
        e.preventDefault()
       if(email.current.value.length===0)
       {
         return null
       }
       if(firstname.current.value.length===0)
       {
         return null         
       }
       if(password.current.value.length===0)
       {
         return null
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
               
              dispatch(register({image: reader.result, 
                firstname:firstname.current.value,
               lastname:lastname.current.value,
                password:password.current.value,
                email:email.current.value}))
                setimage(reader.result)
              }
      
          }
      })
       // console.log(info)

    }

    function handleChange(e)
    {
      setfile(e.target.files[0] )  
  
  
        
    }

   
    

    return (
        <div>

<Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" ref={email} placeholder="Enter email" />
    <Form.Text className="text-muted">
        {emailplaceholder} <br/>
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" ref={password} placeholder="Password" />
  <Form.Text>
      {passwordplaceholder}
  </Form.Text>
  <Form.Label> First Name </Form.Label>
  <Form.Control size="lg" type="text" placeholder="Your first Name Here" ref={lastname} />
  <br />
  <Form.Label>Last Name</Form.Label> 
  <Form.Control size="lg" type="text" placeholder="Your Last Name Here"ref={firstname} />
  <br />

  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
  <div className="centring" ><Button className="centringb" variant="success"   onClick ={addhandlechange}  >Upload a your image</Button>  </div>
  <div className="centring" ><Button className="centringb"  onClick={handleSubmit} variant="primary" type="submit">REGISTER</Button></div>
  </Form.Group>
</Form>






                            <input
                                ref={fileInput} 
                                accept="image/*"
                                style={{display:'none'}} 
                                type="file"
                                onChange={handleChange}
                            />



                   
                  


                        



        </div>
    );
}