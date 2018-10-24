

import React, { Component } from 'react';
import './sign.scss';
import SignIn from '../signin/signin';
import SignUp from '../signup/signup';
import HeaderLogo from '../../static/sign/headerIcon.svg';

/**
 * 0 表示登录页面
 * 1 表示注册页面
 */
const STATUS = {
  login: {
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

class Sign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultState: "login",
      defaultDownload: "close"
    }
  }
  changeState() {
    this.setState({
      defaultState: this.state.defaultState === "login" ? "signup": "login"
    })
  }
  showDownloadCode() {
    this.setState({
      defaultDownload: this.state.defaultDownload === "show"? "close": "show"
    },()=>{
      console.log(this.state.defaultDownload+ "Code")
    })
  }
  render() {
    return (
      <div className="sign">
        <div className="sign-container">
          <div className="sign-header">
            <img src={ HeaderLogo } alt="headerIcon"/>
            <p>{ STATUS[this.state.defaultState].title }</p>
          </div>
          <div className="sign-body">
            { this.state.defaultState === "login"? <SignIn /> : <SignUp /> }
            <div className="signInfoTip">
              { STATUS[this.state.defaultState].footerTip }
              <span onClick={ () => this.changeState() }>{ STATUS[this.state.defaultState].btnName }</span>
            </div>
            <div className={this.state.defaultDownload === "show"? "showDownloadCode": "showDownloadCode showDownloadCode-hidden"}></div>
          </div>
        </div>
        <div>
          <button className="downloadBtn" onClick={()=>this.showDownloadCode()}>{DOWNLOAD[this.state.defaultDownload]}</button>
        </div>
      </div>
    );
  }
}

export default Sign;
