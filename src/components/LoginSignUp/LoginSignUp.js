import React, {Component} from 'react'

class LoginSignUp extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
    }


    render() {
        return (
            <div className="login-sign-up">
                LoginSignUp!
            </div>
        )
    }
}


export default LoginSignUp