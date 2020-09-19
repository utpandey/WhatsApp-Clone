import React, { useState,useEffect } from 'react'
import './Sidebar.css'
import DonutLarge from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {Avatar, IconButton } from '@material-ui/core'
import avatar from '../img/port4.jpeg'
import {SearchOutlined} from '@material-ui/icons'
import SidebarChat from './SidebarChat';
import db from '../firebase';
import {useStateValue} from '../StateProvider';

const Sidebar = () => {

    const [rooms, setRooms] = useState([]);
    const [{user},dispatch] = useStateValue();

    useEffect(() => {
        const unsubsribe = 
        db.collection('rooms').onSnapshot((snapshot) => (
            setRooms(snapshot.docs.map( doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        ));

        return () => {
            unsubsribe();
        }
    },[])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                    
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder="Search or start new chat"/>
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {/* <SidebarChat />
                <SidebarChat /> */}
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                ))}
            </div>
        </div>
    )
}

export default Sidebar;
