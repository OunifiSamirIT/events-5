import axios from 'axios'
import { ERRORS, SET_EVENT, DELETE_PROFILE } from '../types';

export const AddEvents = (form, setShow, setMessage)=>dispatch=>{
    axios
      .post("/api/ADDEvent", form)
      .then(res => {
        setShow(true)
        setMessage("Event added with success")
        dispatch({
            type: ERRORS,
            payload: {}
        })
        setTimeout(() => {
            setShow(false)
        }, 4000);
      })
      .catch(err => {
          dispatch({
              type: ERRORS,
              payload: err.response.data
          })
      });
}



export const GetEvents = ()=>dispatch=>{
    axios
      .get("/api/Event")
      .then(res => {
          dispatch({
              type: SET_EVENT,
              payload: res.data
          })
      })
      .catch(err => {
          dispatch({
              type: ERRORS,
              payload: err.response.data
          })
      });
}



export const DeleteEvent = (id)=>dispatch=>{
   if(window.confirm("are you sure to delete this user?")){
    axios
    .delete(`/api/Event/${id}`)
    .then(res => {
        dispatch({
            type: DELETE_PROFILE,
            payload: id
        })
    })
    .catch(err => {
        dispatch({
            type: ERRORS,
            payload: err.response.data
        })
    });
   }
}


export const UpdateEvents = (id,setShow, setMessage)=>dispatch=>{
    axios
      .put(`/api/Event/${id}`)
      .then(res => {
        setShow(true)
        setMessage("Event update with success")
        dispatch({
            type: ERRORS,
            payload: id
        })
        
      })
      .catch(err => {
          dispatch({
              type: ERRORS,
              payload: err.response.data
          })
      });
}