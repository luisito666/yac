import React from 'react';
import './index.css';

// Conect Component to Store
import { connect } from 'react-redux';

import * as usersActions from '../../store/actions/usersActions';

interface IProps {}

interface Istate {}


class UserComponent extends React.Component<IProps, Istate> {
    render() {
        return (
            <div className="chat-users mt-2">

            </div>
        )
    }
}

const mapStateToProps = ({usersReducers}: {usersReducers: any}) => {
    return usersReducers
}

export default connect(mapStateToProps, usersActions)(UserComponent);
