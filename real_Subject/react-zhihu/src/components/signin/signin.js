import React, { Component } from 'react';
import './signin.scss';
import EyeOpen from '../../static/sign/eyeOpen.svg';
import EyeClose from '../../static/sign/eyeClose.svg';

const PWDLOGIN = {
  pwd: {
    verType: "手机验证码登录",
    info: "忘记密码？"
  },
  vercode: {
    verType: "密码登录（手机号或邮箱）",
    info: "接收短信验证码"
  }
}

class signIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultPwdLogin: "pwd",
      passwordState: false
    }
  }
  passwordType() {
    this.setState({
      passwordState: !this.state.passwordState
    })
  }
  render() {
    return (
      <div className="signin-body">
        <div className="sign-in">
          <div className="signin-account">
            <input type="text" placeholder="手机号或邮箱"/>
          </div>
          <div className="signin-password">
            <input type={ this.state.passwordState ? "text" : "password" }  placeholder="密码"/>
            <img onClick={ ()=>this.passwordType() } src={ this.state.passwordState ? EyeOpen : EyeClose } alt="passwordImg"/>
          </div>
          <div className="signin-options">
            <button className="signin-options-switchType">{ PWDLOGIN[this.state.defaultPwdLogin].verType }</button>
            <button className="signin-options-info">{ PWDLOGIN[this.state.defaultPwdLogin].info }</button>
          </div>
        </div>
      </div>
    )
  }
}

export default signIn