import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Read = () => {
const[error,setError]=useState("");
const[data,setData]=useState([]);
async function getData(){
   const response= await fetch("http://localhost:4000");
   const result = await response.json();

    if(!response.ok){
    console.log(result.error);
    setError(result.error)
    }
    if(response.ok){
    console.log(result);
    setData(result);
    }
}

const handleDelete= async(id)=>{
    const response= await fetch(`http://localhost:4000/${id}` ,{
        method:"DELETE"
    });

    const result = await response.json();
    if(!response.ok){
        console.log(result.error);
        setError(result.error)
    }
    if(response.ok){
        setError("Deleted Successfully");
        setTimeout(()=>{
            setError("");
            getData();
        } , 2000)
    }

}



useEffect(()=>{
    getData();
}, []);
console.log(data);

  return (
    <div className='container my-2'>
         {error && <div class="alert alert-danger" >
            {error}</div>}
        <h2 className='text-center'>All Posts</h2>
        <div className='row'>
   { Array.isArray(data) ? data.map((ele)=>(

     <div className='col-3'>
     <div key={ele._id} className="card" >
     <img src={ele.image ? `http://localhost:4000/uploads/${ele.image}` : 'default-image-path.jpg'} alt={ele.name} className="card-img-top" />

  <div className="card-body">
    <h5 className="card-title">{ele.name}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
    <p className="text-muted">{ele.age}</p>
    <div className='card-footer'>
    <a href="#" className="card-link" onClick={()=>handleDelete(ele._id)}>Delete</a>
    <Link to={`/${ele._id}`} className="card-link">Edit</Link>
    </div>
  </div>
</div>
 </div>

  )) : <p>No data available</p>}

            

        </div>
      
    </div>
  )
}

export default Read
