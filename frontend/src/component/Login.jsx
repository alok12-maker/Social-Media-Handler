import React ,{ useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
   // const[error ,setError]=useState("");

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data from the backend
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:4000/'); 
            const data = await response.json();
            setUsers(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

  
    const Submit = async(event) => {
        event.preventDefault();

        const user = users.find(user => user.email === email || user.name === name);

        if (user) {
          setMessage(`Welcome back, ${user.name}!`);
          navigate("/all");
        
        } else {
          setMessage('User not found. Please check your credentials.');
        
        }
        
           
    };


  return (
    <div className='container my-4'>
        
      <h2 style={{ fontWeight: 'bold' }}>Login</h2>
      <h4 className='login-subheader'>Enter Your details.</h4>

      <form >
        <div className="form-floating mb-3">
        <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="floatingPassword">Name</label>
        </div>
        <div className="form-floating mb-3">
        <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="floatingInput">Email address</label>

        </div>
        <button type="submit" className="btn btn-primary" onClick={Submit}>Login</button>
      </form>
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
   
   
  )
}

export default Login
