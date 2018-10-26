import React, { Component } from 'react'
import './usepassword.scss'
import EyeOpen from 'static/sign/eyeOpen.svg';
import EyeClose from 'static/sign/eyeClose.svg';
import WeChat from 'static/sign/wechat.svg';
import WeiBo from 'static/sign/weibo.svg'
import QQ from 'static/sign/qq.svg'

const LOGIN_METHOD = {
  usePassword: {
    verType: '手机验证码登录',
    info: '忘记密码？',
  },
  useVerificationCode: {
    verType: '密码登录（手机号或邮箱）',
    info: '接收短信验证码'
  }
}

const PASSWORD = 'usePassword'
const QR_CODE= 'useQRCode'

class usePassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentLoginMethod: PASSWORD,
      password: '',
      showPassword: false,
      showSocialAccountMethod: false
    }
  }

  // 绑定对应内容变化事件  
  changePasswordType = ()=>{ this.setState({ showPassword: !this.state.showPassword }) } // 修改password密码框的类型
  setPassword = (e)=>{ this.setState({ password: e.target.value }) } // 输入密码
  changeSocialAccountState = ()=>{ this.setState({ showSocialAccountMethod: true }) } //显示社交账户登陆选项

  render() {
    return (
      <div className='use-password'>
        <div className='account'>
          <input type='text' placeholder='手机号或邮箱'/>
        </div>
        <div className='password'>
          <input className={this.state.password.length?'':'no-password'} 
            type={this.state.showPassword?'text':'password'}  
            placeholder='密码' 
            value={this.state.password} 
            onChange={this.setPassword} />
          <img onClick={this.changePasswordType} src={this.state.showPassword?EyeOpen:EyeClose} alt='passwordImg'/>
        </div>
        <div className='options'>
          <button className='switch-type'>{LOGIN_METHOD[this.state.currentLoginMethod].verType}</button>
          <a className='plain' target='_blank' rel='noopener noreferrer' href='https://www.zhihu.com/account/password_reset'>{LOGIN_METHOD[this.state.currentLoginMethod].info}</a>
        </div>
        <button className='submit'>登录</button>
        <div className='other-types'>
          <button onClick={()=>{this.props.chooseSignInMethodEvent(QR_CODE)}}>二维码登录</button>
          <span>·</span>
          <button>海外手机登录</button>
          <span>·</span>
          <div>
            {this.state.showSocialAccountMethod?
              (
                <div className='social-account-list'>
                  <a target='_black' rel='noopener noreferrer' href='https://open.weixin.qq.com/connect/qrconnect?appid=wx268fcfe924dcb171&redirect_uri=https%3A%2F%2Fwww.zhihu.com%2Foauth%2Fcallback%2Fwechat&response_type=code&scope=snsapi_login&state=6d376135366342496d3651785a5a52725538734c77677959533141374e624f55#wechat'>
                    <img src={WeChat} alt='weChatLogo'/>
                  </a>
                  <a target='_blank' rel='noopener noreferrer' href='https://api.weibo.com/oauth2/authorize?scope=email&state=6d376135366342496d3651785a5a52725538734c77677959533141374e624f55&redirect_uri=http%3A%2F%2Fwww.zhihu.com%2Foauth%2Fcallback%2Fsina&response_type=code&client_id=3063806388'>
                    <img src={WeiBo} alt='weiBoLogo'/>
                  </a>
                  <a target='_blank' rel='noopener noreferrer' href='https://graph.qq.com/oauth2.0/show?which=Login&display=pc&scope=get_user_info%2Cget_info%2Cadd_t%2Cadd_pic_t%2Cget_other_info%2Cget_fanslist%2Cget_idollist%2Cadd_idol%2Cadd_share&state=6d376135366342496d3651785a5a52725538734c77677959533141374e624f55&redirect_uri=https%3A%2F%2Fwww.zhihu.com%2Foauth%2Fcallback%2Fqqconn&response_type=code&client_id=100490701'>
                    <img src={QQ} alt='QQLogo'/>
                  </a>
                </div>
              )
              :<button onClick={this.changeSocialAccountState}>社交账号登录</button>}
          </div>
        </div>
      </div>
    )
  }
}

export default usePassword