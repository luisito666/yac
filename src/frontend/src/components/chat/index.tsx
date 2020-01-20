import React from 'react';
import './index.css';

// Local YouTube
import YouTubeLocal from '../youtube';

// Scroll
import { animateScroll } from "react-scroll";

// Conect Component to Store
import { connect } from 'react-redux';

// Actions of this Component
import * as chatActions from '../../actions/chatActions';

interface IProps {
    chatReducers: {mensaje: []};
    loginReducers: {username: ''};
    Broadcast: (mensaje: any, usuario: any) => void;
    Listen: () => void;
    username: string;
}

interface Istate {
    mensaje: string;
}


class ChatComponent extends React.Component<IProps, Istate> {

    constructor(props: IProps) {
        super(props)
        this.state = {
            mensaje: ''
        }
    }

    componentDidMount() {
        // listen Sockets
        this.props.Listen();

        // Scroll
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {        
        if (e.key === 'Enter') {
            // Update the state
            if (this.state.mensaje === '') {
                return
            }
            this.props.Broadcast(this.state.mensaje, this.props.loginReducers.username);
            this.setState({mensaje: ''});
        }
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        this.setState({
            mensaje: value
        });
    }

    scrollToBottom() {
        animateScroll.scrollToBottom({
          containerId: 'app-mensajes'
        });
    }

    render() {
        return (
            <div className="main-container">
                <h1>
                    Mel Studio Chat
                </h1>

                <div className="chat-window">

                    <h1>Chat</h1>
                    <hr/>

                    <div className="app-mensajes" id="app-mensajes">

                        {this.props.chatReducers.mensaje.map((element: any, index: number) => (
                        <div className={(this.props.loginReducers.username === element.de ? 'text-right': '') } key={index}>
                            <span className={"badge " + (this.props.loginReducers.username === element.de ? 'badge-primary': 'badge-success')}>
                                { element.de}    
                            </span>
                            
                            { element.youtube ? <YouTubeLocal videoID={element.youtube}/> : null }

                            { element.mensaje ? <p> {element.mensaje } </p> : null }  
                        </div>
                        ))}
                    </div>
                        <input 
                            onKeyPress={this.handleKeyPress.bind(this)}
                            onChange={e => this.handleChange(e)}   
                            value={this.state.mensaje}                         
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

// export default ChatComponent;
export default connect(mapStateToProps, chatActions)(ChatComponent);
