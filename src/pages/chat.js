import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./css/chat_room.css"


const Chat = () => {
    let { room_name, receiver} = useParams();
    let [messages, setMessages] = useState([])


    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${room_name}/`);

        ws.onopen =  () => {
            console.log("Connected!");
        }

        ws.onclose = () => {
            console.log("Disconnected!");
        }

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            let message={content:data["message"], sender:data["sender"]}
            console.log(data)
            setMessages([...messages,message])
        }

    const getMessages = async () => {
        try {
            let response = await fetch(`http://127.0.0.1:8000/api/get_messages/${room_name}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            if (response.status === 200) {
                console.log(data);
                setMessages(data);
            }
        } catch (error) {
            console.log(error);
        }
    };


    const send = () => {
        const messageInputDom = document.querySelector('#chat-message-input');
        
        const message = messageInputDom.value;
        
        ws.send(JSON.stringify({
            'message': message,
            'sender': "wajdi@laser.com",
            'receiver':receiver,
            'room_name': room_name
        }));
        messageInputDom.value = '';
    };

    useEffect(() => {
        getMessages()
    }, [])

    return (
        <section style={{ backgroundColor: "#eee" }}>
            <div className="container py-2">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-8 col-lg-6 col-xl-6">
                        <div
                            className="card"
                            id="chat1"
                            style={{ borderRadius: 15, width: "100%", }}
                        >
                            <div
                                className="card-header d-flex justify-content-between align-items-center p-3 text-white border-bottom-0"
                                style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15, backgroundColor: "#232F3E" }}
                            >
                                <i className="fas fa-angle-left" />
                                <p className="mb-0 fw-bold">Live chat</p>
                                <i className="fas fa-times" />
                            </div>
                            <div className="card-body">
                                <div
                                    id="chat-log"
                                    className='overflow-auto"'
                                    style={{ height: "calc(90vh - 110px)", overflowY: "scroll" }}
                                >

                                    {messages.map((m) => {
                                        if (m["sender"] == "wajdi@laser.com") {
                                            return (
                                                <div className="d-flex flex-row justify-content-end mb-4">
                                                    <div
                                                        className="p-3 me-3 border"
                                                        style={{ borderRadius: 15, backgroundColor: "#fbfbfb" }}
                                                    >
                                                        <p className="small mb-0">
                                                            {m["content"]}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        else {
                                            return(
                                            <div className="d-flex flex-row justify-content-start mb-4">
                                                <div
                                                    className="p-3 ms-3"
                                                    style={{
                                                        borderRadius: 15,
                                                        backgroundColor: "rgba(57, 192, 237,.2)"
                                                    }}
                                                >
                                                    <p className="small mb-0">
                                                        {m["content"]}
                                                    </p>
                                                </div>
                                            </div>
                                            )
                                        }

                                    })

                                    }
                                </div>
                                <div className="form-outline" style={{ display: "flex" }}>
                                    <input
                                        className="form-control"
                                        id="chat-message-input"
                                        rows={4}
                                        placeholder="type your messaage"
                                    />
                                    <button
                                        type="button"
                                        className="btn"
                                        style={{ backgroundColor: "#232F3E" }}
                                        id="chat-message-submit"
                                        onClick={send}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={16}
                                            height={16}
                                            fill="white"
                                            className="bi bi-send"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Chat