import { GET_OTHER_SUCCESS, GET_PROFILE_FAILED, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS } from "../actions/authTypes"
import { GET_MY_POST_FAILED, GET_MY_POST_REQUEST, GET_MY_POST_SUCCESS } from "../actions/postTypes"

const initState = {
    statepayload:null,
    token: localStorage.getItem('token'),
    isAuth: Boolean(localStorage.getItem('isAuth')),
    otheruser:{firstname:"",lastname:"",image:{url:""}},
    user: JSON.parse(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')):{ _id:1,firstname:"",lastname:"",image:{url:""}}
}

const authReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            localStorage.setItem('isAuth', true)
            return {
                ...state,
                isAuth: true,
                token: payload.token
            }
        case GET_PROFILE_SUCCESS:
           {
           localStorage.setItem('user', JSON.stringify(payload))
            return {statepayload:payload,
                ...state,
                user: payload
                
            }
        }
        case GET_OTHER_SUCCESS:
            return{
                ...state,
                otheruser:{
                    firstname:payload.firstname,
                    lastname:payload.lastname,
                    image:{url:payload.image.url}}
            }


        case LOGOUT:
            localStorage.clear()
            return {
                ...state,
                isAuth: false,
                user: null,
                token: null,
            }
    
        default:
            return state
    }
}

export default authReducer