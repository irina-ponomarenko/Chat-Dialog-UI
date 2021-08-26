import React, {useState, useEffect} from "react";

import Form from "../form/Form";
import Input from "../ui/input/Input";
import Button from "../ui/button/Button";
import "./chat.css";
import ListMessages from "../listMessages/ListMessages";
import TextArea from "../ui/textarea/TextArea";
import HeaderChat from "../headerChat/HeaderChat";

const Chat = () => {
    let [ listMessages, setListMessages ] = useState([]);
    let [ keyIsHere, setKeyIsHere ] = useState(!!localStorage.getItem('token'));
    let [ nameIsHere, setNameIsHere ] = useState(localStorage.getItem('name'));
    let [ changeValue, setChangeValue ] = useState('');

    useEffect(() => {
        fetch('/api/get-messages?keyIsHere=' + localStorage.getItem('token'))
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                setListMessages(result);
            });
    }, []);

    let createNewUser = () => {
        if (localStorage.getItem('token') !== null && localStorage.getItem('name') !== null) {
            setKeyIsHere(!keyIsHere);
        }
        else {
            fetch('/api/create-new-user')
                .then((returnId) => {
                    return returnId.json()
                })
                .then((token) => {
                    localStorage.setItem('token', token.id);
                })

            let inputName = document.querySelector('.add-name').value;
            localStorage.setItem('name', inputName);
            setKeyIsHere(!keyIsHere);
        }
    }

    let  handlerSubmit = (e) => {
        e.preventDefault();
        console.log(e.currentTarget);
        e.currentTarget.reset();
        let newMessage = document.querySelector('.new-message').value;

        fetch('/api/communicate', {
            method: 'POST',
            body: JSON.stringify({
                newMessage: newMessage,
                nameIsHere: nameIsHere,
                idStorage: localStorage.getItem('token'),
                saveName: localStorage.getItem('name')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                let newListMessages = [ ...listMessages, result ];
                setListMessages(newListMessages);
            });
        setChangeValue('');
    }

    let onChangeValue = (e) => {
        setChangeValue(e.target.value);
    }

    return (
        <div className="container">
            <div className="chat-container">
                <HeaderChat/>
                <Form
                    onSubmit={handlerSubmit}
                >
                    <ListMessages>
                        {
                            listMessages.map((item, index) => {
                                return (
                                    <li className="item-message" key={item._id || index}>
                                        <p>{item.body}</p>
                                    </li>
                                )
                            })
                        }
                    </ListMessages>
                    <div className="container-add-field">
                        <TextArea
                            extraClass="new-message"
                            value={changeValue}
                            onChange={onChangeValue}
                        />
                        <Button
                            type="submit"
                            text="Send message"
                        />
                    </div>
                    <React.Fragment>
                        <Input
                            type="text"
                            extraClass="edd-name"
                            placeholder="Enter your name"
                        />
                        <Button
                            type="button"
                            extraClass="new-chat"
                            text="Start chat"
                            onClick={createNewUser}
                        />
                    </React.Fragment>
                </Form>
            </div>
        </div>
    );
};

export default Chat;
