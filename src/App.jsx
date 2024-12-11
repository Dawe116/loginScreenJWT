import React,{useState} from 'react';
import axios from 'axios';
import './App.css';

export const App =()  =>{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [data, setData] = useState('');

 const handleLogin = async () => {
  try {
    const response = await axios.post('http://jwt.sulla.hu/login',{username,password});
    setToken(response.data.taken);
      
    } catch (error) {
      console.error("Hitelesítés sikertelen",error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://jwt.sulla.hu/data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Adatok lekerés sikertelen",error);
    }
  };


  return (
    <div>
      <h2>Bejelentkezés: </h2>
      Felhasználónév: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /><br/>
      Jelszo: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
      <button onClick={handleLogin}>Bejelentkezés</button><br/>
      {token && (
        <div>
          <h2>Védett végpont</h2>
          <button onClick={fetchData}>Végpont betöltése</button>
          {data && (
            <ul>
              {data.map((item) => (
                <li key={item.id}>{item.name} - {item.price}</li>
              ))}
            </ul>
          )}
        </div>
          
      )}
    </div>
  );
}

export default App;
