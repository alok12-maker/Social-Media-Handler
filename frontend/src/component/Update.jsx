import React, {useEffect, useState } from 'react'
import { useParams ,useNavigate } from 'react-router-dom';



const Update = () => {

    const[name ,setName]=useState("");
    const[email ,setEmail]=useState("");
    const[age ,setAge]=useState("0");
    const[error ,setError]=useState("");

    const {id} = useParams();
    const navigate = useNavigate();
   // console.log(id);
 const getSingleUser = async ()=>{
   
  const response = await fetch(`http://localhost:4000/${id}`);
  const result = await response.json();
    if(!response.ok){
        console.log(result.error);
        setError(result.error)
    }
    if(response.ok){
        setError("");
       setName(result.name);
       setEmail(result.email);
       setAge(result.age);
    //console.log('updated user ',response);
     }
}

const handleUpdate= async(e)=>{
 e.preventDefault();
  const updateUser = {
    name,
    email,
    age : Number(age)
};
 try{
const response = await fetch(`http://localhost:4000/${id}`, {
    method :"PATCH",
    headers: {
        'Content-Type': 'application/json',
    },
    body : JSON.stringify(updateUser),
  });
  const responseText = await response.text();
        const result = responseText ? JSON.parse(responseText) : {};
  //const result = await response.json();
if(!response.ok){
    console.log(result.error);
    setError(result.error)
}
if(response.ok){
    console.log(result);
    setError("");
    navigate("/all");  
}
}catch(error){
    console.error("Fetch error:", error);
}


}


useEffect(()=>{
    getSingleUser();
}, []);

  return (
    <div className='container my-2'>
    {error && <div class="alert alert-danger" >
  {error}</div>}
    <h2 className='text-center'>Edit the Data</h2>
      
    <form onSubmit = {handleUpdate}>
    <div className="mb-3">
    <label  className="form-label">Name</label>
    <input type="text" className="form-control" value={name} onChange={(e)=> setName(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label  className="form-label">Email address</label>
    <input type="email" className="form-control" value={email} onChange={(e)=> setEmail(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label className="form-label">Age</label>
    <input type="number" className="form-control" value={age} onChange={(e)=> setAge(e.target.value)} />
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
  )
}

export default Update
