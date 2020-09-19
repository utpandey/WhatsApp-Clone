import React,{useEffect,useState} from 'react';
import './App.css';
import Login from './Components/Login';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';
import Pusher from 'pusher-js';
import axios from './axios'
import {useStateValue} from './StateProvider';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
function App() {
  const [{user},dispatch] = useStateValue();
  // const [user,setUser] = useState(null);
  const [messages,setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync')
      .then((response) => {
        console.log(response.data)
        setMessages(response.data);
      })
      
  },[])

  useEffect(() => {
    const pusher = new Pusher('486dce3f7f3b9ae6871f', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages,newMessage])
    });

    return ()=> {
      
      channel.unsubscribe();
      channel.unbind_all();
    }

    
  },[messages])

  // console.log(messages);

  return (
    <div className="app">
    {!user ? (
      <Login />
    ) : (
      <div className="app__body">
        <Router>
          <Sidebar />
          <Switch> 
            <Route path='/rooms/:roomId'> 
              <Chat  messages={messages} /> 
            </Route> 
            <Route path='/'>
              <Chat messages={messages} />
            </Route>
          </Switch> 
        </Router>
      </div>
      )}
    </div>
  );
}

export default App;
