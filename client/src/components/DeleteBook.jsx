import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function DeleteBook() {
    const navigate = useNavigate();
    const {id}=useParams();
    useEffect(()=>{
        axios.delete('http://localhost:3001/book/book/'+id)
         .then(res=>{
            if(res.data.deleted){
                navigate('/books');
            }
         }).catch(err=>console.log(err));
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
}

export default DeleteBook
