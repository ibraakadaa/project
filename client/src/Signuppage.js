
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from './redux/actions/authActions';
import { useHistory } from 'react-router-dom';
import Compressor from 'compressorjs'


export default function Signuppage() {
    const history = useHistory()
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [selectedImage, setSelectedImage] = useState("")
    const [info, setInfo] = useState({
        firstname: "",
        email: '',
        password: ''
    })

    useEffect(() => {
        if (auth.isAuth) {
            history.push('/')
        }

    }, [auth.isAuth])

    const handleInfoChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(register(info))
       // console.log(info)

    }

    const handleImageChange = (e) => {
        if (e.target.files.length) {
            const myImage = e.target.files[0]
            new Compressor(myImage, {
                quality: 0.8,
                success(result) {
                    const reader = new FileReader()
                    reader.readAsDataURL(result)
                    reader.onloadend = () => {
                        setSelectedImage(reader.result)
                        setInfo({ image: reader.result })
                        
                    }

                }
            })

                }
            
        }
    

    return (
        <div>
                <form ><input type="submit" value="signup" onClick={handleSubmit} ></input>
                    <input
                                accept="image/*"
                                
                                type="file"
                                onChange={handleImageChange}
                            />
                            
                            <img src={selectedImage}></img>

                            <input
                                name="firstname"
                                placeholder="firstName"
                                label="First Name"
                                autoFocus
                                onChange={handleInfoChange}
                            />
                                <input
                                name="lastname"
                                placeholder="lastname"
                                label="Last Name"
                                autoFocus
                                onChange={handleInfoChange}
                            />
                        
                            <input
                              
                                id="email"
                                placeholder="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleInfoChange}
                            />
                       
                            <input
                                
                                name="password"
                                placeholder="Password"
                                type="password"
                                id="password"
                                
                                onChange={handleInfoChange}
                                ></input>
                   
                  
         </form></div>
    );
}