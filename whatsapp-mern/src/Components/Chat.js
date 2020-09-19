import React,{useState,useEffect} from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined, AttachFile, MoreVert, SettingsInputAntenna } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic'
import axios from '../axios'
import {useParams} from 'react-router-dom';
import db from '../firebase';


const Chat = ({messages}) => { 

    const [input, setInput] = useState('');
    // const [seed,setSeed] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");

    useEffect(() => {
        if (roomId){
            db.collection('rooms').doc(roomId).
            onSnapshot(snapshot => (setRoomName(snapshot.data().name)))
        }
    },[roomId])

    const sendMessage = async (e) => {
        e.preventDefault();
        
        await axios.post('/messages/new',{
            message: input,
            name: 'Utsav Pandey',
            timestamp: 'just now',
            received: false,
        });
        setInput("");
    };

    
    // useEffect(() => {
    //     setSeed(Math.floor(Math.random() * 5000));
    // },[])

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${(Math.floor(Math.random() * 5000))}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at....</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
        {/*<p className={`chat__message ${message.received && "chat__receiver"}`}> */}
                {/*<p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}> */}
            <div className="chat__body chat__scroller">
                {messages.map((message) => (
                    <p className={`chat__message ${true && "chat__receiver"}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">{message.timestamp}</span>
                    </p>
                ))}
                {/* <p className="chat__message">
                    <span className="chat__name">Utsav</span>
                    This is a message
                    <span className="chat__timestamp">
                        {new Date().toTimeString()}
                    </span>
                </p>

                <p className="chat__message">
                    <span className="chat__name">Utsav</span>
                    This is a message
                    <span className="chat__timestamp">
                        {new Date().toTimeString()}
                    </span>
                </p>

                <p className="chat__message chat__reciever">
                    <span className="chat__name">Utsav</span>
                    This is a message
                    <span className="chat__timestamp">
                        {new Date().toTimeString()}
                    </span>
                </p> */}
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form>
                    <input 
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message"
                    />
                    <button onClick={sendMessage} type="submit"> Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
