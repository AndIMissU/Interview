import React, { Component } from 'react';
import AccountInput from 'components/accountinput/accountinput';
import './byphone.scss';

// 验证方式
const VERIFICATION_METHOD = {
  useMessage: {
    placeholderTip: '请输入 6 位短信验证码',
    methodInfo: '获取短信验证码',
    anotherMethod: '接收语音验证码'
  },
  useVoice: {
    placeholderTip: '请输入 6 位语音验证码',
    methodInfo: '获取语音验证码',
    anotherMethod: '接收短信验证码'
  }
}

const MESSAGE = 'useMessage'
const VOICE = 'useVoice'
const MAX_SECOND = 60      // 默认等待的秒数

class byPhone extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentVerificationMethod: MESSAGE,  // 当前发送验证码的方式
      // showChangeLoginMethod: false, // 是否显示切换登录方式按钮
      showChangeLoginMethod: props.changeLoginMethodState, // 是否显示切换登录方式按钮

      verificationCode: '',  // 验证码
      noVerficationCode: false,  // 是否没有填入验证码
      invalidVerificationCode: false,  // 验证码是否无效
      isSendVerficationCode: false,  // 验证码是否发送
      reSendVerficationCode: false,  // 是否重新发送验证码
      currentSecond: MAX_SECOND,  // 当前剩余等待的秒数
    }
  }

  // 输入验证码
  setVerifivationCode = (e)=>{
    this.setState({
      verificationCode: e.target.value
    })
  }
 
  // 更改方法
  // 验证输入框内容
  // 选择语音接收验证码 / 短信接收验证码
  changVerificationMethod = ()=>{
    this.setState({
      currentVerificationMethod: this.state.currentVerificationMethod === MESSAGE ? VOICE : MESSAGE,
    },()=>{
      this.getVerificationCode()
    })
  }

  // 获取验证码
  getVerificationCode = ()=>{
    if (!this.checkPhoneState()) return  // 如果手机号未填则返回
    if (this.state.isSendVerficationCode) return  // 在60秒内验证码是已经发送的状态 如果已经发送则返回
    this.setState({
      isSendVerficationCode: true
    },()=>{
      let _timer = setInterval(()=>{
        this.setState({
          currentSecond: this.state.currentSecond - 1
        })
        if(this.state.currentSecond === 0) {
          // 将当前秒数还原为默认状态 验证码变为未发送状态 重新发送验证码状态置为true
          this.setState({
            isSendVerficationCode: false,
            reSendVerficationCode: true,
            currentSecond: MAX_SECOND   
          })
          clearInterval(_timer)
        }
      },1000)
    })
    if (this.checkPhoneState()) {
      let _state = this.getPhoneInfo()
      alert(
        _state.currentCountryCode + ' '
        + _state.phoneNumber 
        + ' 请求'
        + VERIFICATION_METHOD[this.state.currentVerificationMethod].methodInfo
      )
    }
  }

  // 检查验证码状态
  checkVerificationCodeState = ()=>{
    let _noVerficationCode = !this.state.verificationCode
    let _invalidVerificationCode = false
    if (_noVerficationCode) {
      _invalidVerificationCode = false
    } else {
      _invalidVerificationCode = !/^\d{6}$/.test(this.state.verificationCode)
    }
    this.setState({
      noVerficationCode: _noVerficationCode,
      invalidVerificationCode: _invalidVerificationCode
    })
    return !_noVerficationCode && !_invalidVerificationCode
  }

  // 聚焦验证码的输入框时 隐藏报错提示
  focusVerificationCodeInput = ()=>{
    this.setState({
      noVerficationCode: false,
      invalidVerificationCode: false
    },()=>{
      this.verificationCodeInput.focus() // 自动聚焦验证码的输入框
    })
  }
  // 给父组件提供验证码
  getCode = ()=>{ return this.state.verificationCode }
  // 调用子组件的方法
  checkPhoneState = ()=>{ return this.refs['accountInput'].checkPhoneState() } // 检查账户输入的状态
  getPhoneInfo = ()=>{ return this.refs['accountInput'].getPhoneInfo() } // 获取手机号

  render() {
    return (
      <div>
        <AccountInput ref='accountInput' hasCountryList={true} placeholder='手机号'/>
        <div className={`verification-code
          ${this.state.noVerficationCode?('no-verfication-code-' + this.state.currentVerificationMethod):''}
          ${this.state.invalidVerificationCode?'invalid-vertification-code':''}`}
          onClick={this.focusVerificationCodeInput}>
          <input ref={(input) => { this.verificationCodeInput = input }} 
            onChange={this.setVerifivationCode}
            placeholder={VERIFICATION_METHOD[this.state.currentVerificationMethod].placeholderTip}
            type='text' />
          <p onClick={this.getVerificationCode}
            className={this.state.isSendVerficationCode?'timer-count-down':''}>
            {(!this.state.isSendVerficationCode && this.state.reSendVerficationCode)?'重发':''}
            {this.state.isSendVerficationCode?(this.state.currentSecond+' 秒后可重发'):VERIFICATION_METHOD[this.state.currentVerificationMethod].methodInfo}
          </p>
        </div>
        {this.state.showChangeLoginMethod?(
          <div className="change-login-method" onClick={this.props.changeLoginMethodToByPassword}>
            密码登录（手机号或邮箱）
          </div>
        ):''}
        <div className={`not-send-verification-code ${this.state.isSendVerficationCode?'sent-verfication-code':''}`}
          onClick={this.changVerificationMethod}>
          {VERIFICATION_METHOD[this.state.currentVerificationMethod].anotherMethod}
        </div>
      </div>
    )
  }
}

export default byPhone