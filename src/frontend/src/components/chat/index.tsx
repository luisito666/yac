import React from 'react';
import './index.css';

// Local YouTube
import YouTubeLocal from '../youtube';

// Models
import { Message } from '../../models';

// Scroll
import { animateScroll } from "react-scroll";
import { bindActionCreators } from 'redux';

// Conect Component to Store
import { connect } from 'react-redux';

// Actions of this Component
import * as chatActions from '../../store/actions/chatActions';
import * as loginActions from '../../store/actions/loginActions';

import { Redirect } from 'react-router-dom';

interface IProps {
    chatReducers: {messages: []};
    loginReducers: {username: ''};
    actions: {
        chatActions: {
            Broadcast: (mensaje: any, usuario: any) => void;
            Listen: () => void;
            LoadMessages: () => void;    
        },
        loginActions: {
            LoadUserStorage: () => void;
            LogOut: () => void;
        }
    }
}

interface Istate {
    message: string;
}


class ChatComponent extends React.Component<IProps, Istate> {

    constructor(props: IProps) {
        super(props)
        this.state = {
            message: ''
        }
        
    }

    componentDidMount() {
        // listen Sockets
        this.props.actions.chatActions.Listen();
        this.props.actions.chatActions.LoadMessages();
        this.props.actions.loginActions.LoadUserStorage();
        
        // Scroll
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {        
        if (e.key === 'Enter') {
            // Update the state
            if (this.state.message === '') {
                return
            }
            this.props.actions.chatActions.Broadcast(this.state.message, this.props.loginReducers.username);
            this.setState({message: ''});
        }
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        this.setState({
            message: value
        });
    }

    handleLogOut() {
        this.props.actions.loginActions.LogOut();
    }

    scrollToBottom() {
        animateScroll.scrollToBottom({
          containerId: 'app-mensajes'
        });
    }

    render() {
        if (this.props.loginReducers.username === null) {
            return <Redirect to="/"/>
        }
        return (
            <div className="main-container">
                <h1 className="chat-title">
                    Mel Studio Chat
                </h1>

                <div className="chat-window">

                    <h1>Chat</h1>
                    <hr/>

                    <div className="app-mensajes" id="app-mensajes">

                        {this.props.chatReducers.messages.map((element: Message, index: number) => (
                        <div className={(this.props.loginReducers.username === element.from ? 'text-right': '') } key={index}>
                            <span className="badge badge-secondary">{element.date}</span> - <span className={"badge " + (this.props.loginReducers.username === element.from ? 'badge-primary': 'badge-success')}>
                                { element.from}    
                            </span> 
                            
                            { element.youtube ? <YouTubeLocal videoID={element.youtube}/> : null }

                            { element.message ? <p> {element.message } </p> : null }  
                        </div>
                        ))}
                    </div>
                        <input 
                            onKeyPress={this.handleKeyPress.bind(this)}
                            onChange={e => this.handleChange(e)}   
                            value={this.state.message}                         
                            name="mensaje"
                            type="text"
                            className="input-chat form-control mb-2" 
                            placeholder="Enviar mensaje" 
                            required/>
                </div>

            </div>
        )
    }
}

export const mapStateToProps = ({chatReducers, loginReducers }: {chatReducers: any, loginReducers: any}) => {
    return {
        loginReducers,
        chatReducers
    }
}

export const mapDispatchToProps = (dispatch: any) => {
    return {
        actions: {
            loginActions: bindActionCreators(loginActions, dispatch),
            chatActions: bindActionCreators(chatActions, dispatch)
        }
    };
}

// export default ChatComponent;
export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent);
