import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import { reLog, setCurrentUser, logoutUser } from '../actions/authActions';
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { Button } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.tryLogin = this.tryLogin.bind(this);
        this.logout = this.logout.bind(this);
    }

    /* componentDidUpdate(){
        this.tryLogin()
    } */

    componentDidMount() {
        this.tryLogin()
    }

    logout() {
        this.props.logoutUser();
    }

    tryLogin() {
        debugger;
        const { isAuthenticated } = this.props.auth;
        if (isAuthenticated) {
            return;
        }

        if (localStorage.jwtToken && !isAuthenticated) {
            // Set auth token header auth
            setAuthToken(localStorage.jwtToken);
            // Decode token and get user info and exp
            const decoded = jwt_decode(localStorage.jwtToken);
            // Set user and isAuthenticated
            this.props.setCurrentUser(decoded);

            // Check for expired token
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                // Logout user
                this.props.logoutUser();
            }
        } else {
            Router.push("/login");
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className={"container"}>
                    <div className="ui grid centered jml">
                        {this.props.auth && this.props.auth.isAuthenticated &&
                            <Button
                                content={`déconnexion `}
                                onClick={this.logout}
                                positive
                                disabled={false}
                            />
                        }
                    </div>
                    {this.props.children}
                </div>

                <ToastContainer />
                <style jsx>{`
                    .jml{
                        min-height: 80px;
                        padding: 20px;
                    }
                `}</style>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
    return {
        reLog: () => dispatch(reLog()),
        setCurrentUser: (decoded) => dispatch(setCurrentUser(decoded)),
        logoutUser: () => dispatch(logoutUser())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout); 
