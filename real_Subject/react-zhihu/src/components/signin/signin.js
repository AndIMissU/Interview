import React, { Component } from 'react';
import './signin.scss';
import EyeOpen from 'static/sign/eyeOpen.svg';
import EyeClose from 'static/sign/eyeClose.svg';

const LOGIN_METHOD = {
  usePassword: {
    verType: "手机验证码登录",
    info: "忘记密码？",
    href: 'https://www.zhihu.com/account/password_reset'
  },
  useVerificationCode: {
    verType: "密码登录（手机号或邮箱）",
    info: "接收短信验证码"
  }
}

class signIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentLoginMethod: "usePassword",
      showPassword: false,
      password: ''
    }
    // 构造函数的绑定
    this.changePasswordType = this.changePasswordType.bind(this)
    this.setPassword = this.setPassword.bind(this)
  }
  changePasswordType() {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }
  setPassword(e) {
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
            type={this.state.showPassword?"text":"password"}  
            placeholder="密码" 
            value={this.state.password} 
            onChange={this.setPassword} />
          <img onClick={this.changePasswordType} src={this.state.showPassword?EyeOpen:EyeClose} alt="passwordImg"/>
        </div>
        <div className="options">
          <button className="switch-type">{LOGIN_METHOD[this.state.currentLoginMethod].verType}</button>
          <a className="plain" href="asdsajdk">{LOGIN_METHOD[this.state.currentLoginMethod].info}</a>
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