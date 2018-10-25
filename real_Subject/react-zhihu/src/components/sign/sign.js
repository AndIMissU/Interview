

import React, {Component } from 'react';
import './sign.scss';
import SignIn from '../signin/signin';
import SignUp from '../signup/signup';
import HeaderLogo from 'static/sign/headerIcon.svg';

/**
 * 0 表示登录页面
 * 1 表示注册页面
 */
const STATUS = {
  signin: {
    title: "登录知乎，发现更大的世界",
    btnName: "注册",
    footerTip: "没有账号？"
  },
  signup: {
    title: "注册知乎，发现更大的世界",
    btnName: "登录",
    footerTip: "已有账号？"
  }
}

const DOWNLOAD = {
  close: "下载知乎 App",
  show: "关闭二维码"
}

const SIGNIN = "signin"
const SIGNUP = "signup"
const SHOW = "show"
const CLOSE = "close"

class Sign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentState: SIGNUP,
      currentDownload: CLOSE
    }
  }
  changeState() {
    this.setState({
      currentState: this.state.currentState === SIGNIN ? SIGNUP : SIGNIN
    })
  }
  showDownloadCode() {
    this.setState({
      currentDownload: this.state.currentDownload === SHOW? CLOSE : SHOW
    },()=>{
      console.log(this.state.currentDownload)
    })
  }
  render() {
    return (
      <div className="sign-wrap">
        <div className="container">
          <div className="header">
            <img src={HeaderLogo} alt="headerIcon"/>
            <p>{STATUS[this.state.currentState].title}</p>
          </div>
          <div className="body">
            {this.state.currentState === SIGNIN ? <SignIn /> : <SignUp />}
            <div className="info-tip">
              {STATUS[this.state.currentState].footerTip}
              <span onClick={() => this.changeState()} >{STATUS[this.state.currentState].btnName}</span>
            </div>
            <div className={this.state.currentDownload === SHOW ? "download-code": "download-code close-download-code"}></div>
          </div>
        </div>
        <button className="download-btn" onClick={()=>this.showDownloadCode()}>{DOWNLOAD[this.state.currentDownload]}</button>
      </div>
    );
  }
}

export default Sign;
