import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Logout({setRolee}) {
  const navigate = useNavigate();
  useEffect(()=>{
    axios.get('http://localhost:3001/auth/logout')
     .then(res=>{
        if(res.data.logout){
            setRolee('');
            navigate('/');
        }
     }).catch(err=>console.log(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default Logout
