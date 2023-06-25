import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';

const Channels = () => {
    const [channels, SetChannels] = useState([])

    const getChannels = async () => {
        try {
            let response = await fetch(`http://127.0.0.1:8000/api/get_rooms/1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            if (response.status === 200) {
                console.log(data);
                SetChannels(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getChannels()
    }, [])

    const columns = [
        { title: 'room name', dataIndex: 'room_name', key: 'room_name' },
        { title: 'customer', dataIndex: 'customer', key: 'customer' },
        { title: 'last message', dataIndex: 'last_message', key: 'last_message' },
        { title: 'time', dataIndex: 'timestamp', key: 'timestamp' },

        {
            title: 'reply',
            key: 'actions',
            render: (_, msg) => (
                <Button type="primary">
                    <Link to={`/chat/${msg.room_name}/${msg.customer}`}>reply</Link>
                </Button>
            ),
        },
    ];

    return (
        <div className="dashboard-container">
            <h2>Messages</h2>

            <Table dataSource={channels} columns={columns} />

        </div>
    )

}




export default Channels