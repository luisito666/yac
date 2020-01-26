import React from 'react';
import './index.css';

// Conect Component to Store
import { connect } from 'react-redux';

import * as usersActions from '../../store/actions/usersActions';

interface IProps {
    loginReducers: {username: ''};
    usersReducers: {users: []}
}

interface Istate {
    users: []
}


class UserComponent extends React.Component<IProps, any> {
    render() {
        console.log(this.props);
        return (
            <div className="chat-users mt-2">

                <h1> Online </h1>                
                <hr/>
                <div className="chat-users-scroll" id="chat-users-scroll">

                {this.props.usersReducers.users.map((element: any, index: number) => (
                    <div>
                        <span className={"d-inline badge " + (this.props.loginReducers.username === element.name ? 'badge-success' : 'badge-secondary')} key={index}>
                            {element.name}
                        </span>
                    </div>
                ))}  

                </div>          
            </div>
        )
    }
}

const mapStateToProps = ({usersReducers, loginReducers}: {usersReducers: any,  loginReducers: any}) => {
    return {
        usersReducers,
        loginReducers
    }
}

export default connect(mapStateToProps, usersActions)(UserComponent);
