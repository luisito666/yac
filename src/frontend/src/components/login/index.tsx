import React from 'react';
import './index.css';

import { Redirect } from 'react-router-dom';

// Conect Component to Store
import { connect } from 'react-redux';

// Actions of this Component
import * as loginActions from '../../store/actions/loginActions';

interface IProps {
    loginReducers: {username: ''};
    Signin: (payload: any) => void;
    LoadUserStorage: () => void;
    username: string;
}

interface Istate {
    username: string;
}

class LoginComponent extends React.Component<IProps, Istate> {

    componentDidMount() {
        this.props.LoadUserStorage();
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        this.setState({
            username: value
        });
    }

    handleForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.props.Signin(this.state.username);
    }

    render() {      
        if( this.props.username ) {
            return <Redirect to="/chat"/> 
        } 
        return (
            <div className="second-body">
                <div className="custom-width text-center">
                    <form className="form-signin" onSubmit={e => this.handleForm(e)}>
                    
                        <h1 className="h3 mb-3 font-weight-normal"> Ingresa un Usuario </h1>
                        <label className="sr-only">Usuario</label>
                        <input 
                            onChange={e => this.handleChange(e)}
                            name="username"
                            type="text" 
                            id="inputEmail" 
                            className="form-control" 
                            placeholder="Usuario" 
                            required/>
                        
                        {/*<label className="sr-only">Contraseña</label>
                        <input 
                            onChange={e => this.handleChange(e)}
                            name="password"
                            type="password" 
                            id="inputPassword" 
                            className="form-control" 
                            placeholder="Contraseña" 
                            required/> */}                   
        
                        <button className="btn btn-lg btn-primary btn-block mt-2" type="submit">Sign in</button>
                        <p className="mt-5 mb-3 text-muted">&copy; 2020</p>
                    </form>
                </div>
            </div>
        )
    }

}

const mapStateToProps = ({loginReducers}: {loginReducers: any}) => {
    return loginReducers
}

export default connect(mapStateToProps, loginActions)(LoginComponent);
