import React, {useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Create = () => {

    const[name ,setName]=useState("");
    const[email ,setEmail]=useState("");
    const[age ,setAge]=useState("0");
    const[error ,setError]=useState("");
    const[image, setImage] = useState(null);

   const navigate = useNavigate();
   //console.log(name , email,age);

const handleSubmit=async (event) => {
    event.preventDefault();

  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('age', age);
  if (image) {
      formData.append('image', image);
  }

try{
const response = await fetch("http://localhost:4000", {
    method :"POST",
    // headers: {
    //     'Content-Type': 'application/json',
    // },
    // body : JSON.stringify(formData),
    body:formData,
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
      setAge("");
      setEmail("");
      setName("");
      setImage(null);
      navigate("/all");  
  }
}catch(error){
    console.error("Fetch error:", error);
}
}

  return (
  <div className='container my-2'>
    {error && <div className="alert alert-danger" >
  {error}</div>}
    <h2 className='text-center'>Enter the Data</h2>
      
    <form onSubmit={handleSubmit}>
    <div className="form-floating mb-3">
    <label  className="form-label">Name</label>
    <input type="text" className="form-control" value={name} onChange={(e)=> setName(e.target.value)}/>
  </div>
  <div className="form-floating mb-3">
    <label  className="form-label">Email address</label>
    <input type="email" className="form-control" value={email} onChange={(e)=> setEmail(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label className="form-label">Age</label>
    <input type="number" className="form-control" value={age} onChange={(e)=> setAge(e.target.value)} />
  </div>
  <div className="mb-3">
          <label className="form-label">Profile Image</label>
          <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
  )
}

export default Create
