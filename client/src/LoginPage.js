import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { login } from './redux/actions/authActions'
import { Form,Button } from 'react-bootstrap'

const LoginPage = () => {
    const [info, setInfo] = useState({
        email: "",
        password: ""
    })

    const password=useRef()
    const email=useRef()
    const [emailplaceholder, setemailplaceholder] = useState("")
const [passwordplaceholder, setpasswordplaceholder] = useState("")
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
      if ( email.current.value.length===0)
      { setemailplaceholder("please enter your email")
      return null
      }
      if(password.current.value.length===0)
      {setpasswordplaceholder("please enter your password")
      return null
      }
        e.preventDefault()
        dispatch(login({password:password.current.value,email:email.current.value}))
    }   
    const history = useHistory()
    useEffect(() => {
        if (auth.isAuth)
            history.push('/')
    }, [auth.isAuth])
    return (<div>
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
  
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
  </Form.Group>
  <Button onClick={handleSubmit} variant="primary" type="submit">
    LOGIN
  </Button>
</Form>

       
    </div>
    )
}

export default LoginPage
