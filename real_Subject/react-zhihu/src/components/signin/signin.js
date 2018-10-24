import React, { Component } from 'react';
import './signin.scss';
import EyeOpen from 'static/sign/eyeOpen.svg';
import EyeClose from 'static/sign/eyeClose.svg';

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
      passwordState: false,
      password: ''
    }
    // 构造函数的绑定
    this.passwordType = this.passwordType.bind(this)
    this.passwordSet = this.passwordSet.bind(this)
  }
  passwordType() {
    this.setState({
      passwordState: !this.state.passwordState
    })
  }
  passwordSet(e) {
    this.setState({
      password: e.target.value
    })
  }
  render() {
    return (
      <div className="signin-wrap">
        <div className="account">
          <input type="text" placeholder="手机号或邮箱"/>
        </div>
        <div className="password">
          <input className={this.state.password.length?'':'no-password'} 
            type={ this.state.passwordState ? "text" : "password" }  
            placeholder="密码" 
            value={ this.state.password } 
            onChange={ this.passwordSet } />
          <img onClick={ this.passwordType } src={ this.state.passwordState ? EyeOpen : EyeClose } alt="passwordImg"/>
        </div>
        <div className="options">
          <button className="switch-type">{ PWDLOGIN[this.state.defaultPwdLogin].verType }</button>
          <button className="plain">{ PWDLOGIN[this.state.defaultPwdLogin].info }</button>
        </div>
        <button className="submit">登录</button>
        <div className="other-types">
          <button>二维码登录</button>
          <span>·</span>
          <button>海外手机登录</button>
          <span>·</span>
          <button>社交账号登录</button>
        </div>
      </div>
    )
  }
}

export default signIn