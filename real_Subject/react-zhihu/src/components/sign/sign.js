

import React, { Component } from 'react';
import './sign.scss';
import SignUp from './sign'

/**
 * 0 表示登录页面
 * 1 表示注册页面
 */
const STATUS = {
  login: {
    btnName: '登录',
    footerTip: '没有账号?'
  },
  signup: {
    btnName: '注册',
    footerTip: '已有账号？'
  }
}
class Sign extends Component {
  constructor(props) {
    super(props)

    this.state = {
      defaultState: 'login',
    }
  }
  render() {
    return (
      <div className="sign">
        <div className="sign-container">
          <div className="sign-header">
            <img src={require('../../static/header-icon.png')} alt="titleImg"/>
            <p>{STATUS[this.state.defaultState].btnName}知乎，发现更大的世界</p>
          </div>
          <div className="sign-body">
            <SignUp />
          </div>
        </div>
      </div>
    );
  }
}

export default Sign;
