import React, { Component } from 'react';
import './signup.scss';

// 各国国家代码
const COUNTRY_LIST = [ '中国 +86', '美国 +1', '日本 +81', '中国香港 +852', '中国台湾 +886', '马来西亚 +60', '澳大利亚 +61', 
  '加拿大 +1', '英国 +44', '新加坡 +65', '德国 +49', '俄罗斯 +7', '埃及 +20', '南非 +27', '希腊 +30', '荷兰 +31', '比利时 +32',
  '法国 +33', '西班牙 +34', '匈牙利 +36', '意大利 +39', '罗马尼亚 +40', '瑞士 +41', '奥地利 +43', '丹麦 +45',  '瑞典 +46',
  '挪威 +47', '波兰 +48', '秘鲁 +51', '墨西哥 +52', '古巴 +53', '阿根廷 +54', '巴西 +55', '智利 +56', '哥伦比亚 +57',
  '委内瑞拉 +58', '印度尼西亚 +62', '菲律宾 +63', '新西兰 +64', '泰国 +66', '哈萨克斯坦 +7', '韩国 +82', '越南 +84', '土耳其 +90',
  '印度 +91', '巴基斯坦 +92', '阿富汗 +93', '斯里兰卡 +94', '缅甸 +95', '伊朗 +98', '摩洛哥 +212', '阿尔及利亚 +213', '突尼斯 +216',
  '利比亚 +218', '冈比亚 +220', '塞内加尔 +221', '马里 +223', '几内亚 +224', '科特迪瓦 +225', '布基纳法索 +226', '尼日尔 +227',
  '多哥 +228', '贝宁 +229', '毛里求斯 +230', '利比里亚 +231', '塞拉利昂 +232', '加纳 +233', '尼日利亚 +234', '乍得 +235',
  '中非共和国 +236', '喀麦隆 +237', '圣多美和普林西比 +239', '加蓬 +241', '刚果民主共和国 +243', '安哥拉 +244', '阿森松岛 +247',
  '塞舌尔 +248', '苏丹 +249', '埃塞俄比亚 +251', '索马里 +252', '吉布提 +253', '肯尼亚 +254', '坦桑尼亚 +255', '乌干达 +256',
  '布隆迪 +257', '莫桑比克 +258', '赞比亚 +260', '马达加斯加 +261', '津巴布韦 +263', '纳米比亚 +264', '马拉维 +265', '莱索托 +266',
  '博茨瓦纳 +267', '斯威士兰 +268', '直布罗陀 +350', '葡萄牙 +351', '卢森堡 +352', '爱尔兰 +353', '冰岛 +354', '阿尔巴尼亚 +355',
  '马耳他 +356', '塞浦路斯 +357', '芬兰 +358', '保加利亚 +359', '立陶宛 +370', '拉脱维亚 +371', '爱沙尼亚 +372', '摩尔多瓦 +373',
  '亚美尼亚 +374', '白俄罗斯 +375', '安道尔共和国 +376', '摩纳哥 +377', '圣马力诺 +378', '乌克兰 +380', '斯洛文尼亚 +386',
  '捷克 +420', '斯洛伐克 +421', '列支敦士登 +423', '伯利兹 +501', '瓜地马拉 +502', '萨尔瓦多 +503', '洪都拉斯 +504', '尼加拉瓜 +505',
  '哥斯达黎加 +506', '巴拿马 +507', '海地 +509', '玻利维亚 +591', '圭亚那 +592', '厄瓜多尔 +593', '法属圭亚那 +594', '巴拉圭 +595',
  '马提尼克 +596', '苏里南 +597', '乌拉圭 +598', '文莱 +673', '巴布亚新几内亚 +675', '汤加 +676', '所罗门群岛 +677', '斐济 +679',
  '库克群岛 +682', '法属波利尼西亚 +689', '中国澳门 +853', '柬埔寨 +855', '老挝 +856', '孟加拉国 +880', '马尔代夫 +960', '黎巴嫩 +961',
  '约旦 +962', '叙利亚 +963', '伊拉克 +964', '科威特 +965', '沙特阿拉伯 +966', '也门 +967', '阿曼 +968', '阿拉伯联合酋长国 +971',
  '以色列 +972', '巴林 +973', '卡塔尔 +974', '蒙古 +976', '尼泊尔 +977', '塔吉克斯坦 +992', '土库曼斯坦 +993', '阿塞拜疆 +994',
  '格鲁吉亚 +995', '吉尔吉斯斯坦 +996', '乌兹别克斯坦 +998', '巴哈马 +1242', '巴巴多斯 +1246', '安圭拉岛 +1264', '安提瓜和巴布达 +1268',
  '开曼群岛 +1345', '百慕大群岛 +1441', '格林纳达 +1473', '蒙特塞拉特岛 +1664', '关岛 +1671', '圣露西亚 +1758', '波多黎各 +1787',
  '多明尼加共和国 +1809', '特立尼达和多巴哥 +1868', '牙买加 +1876', '塞尔维亚共和国 +381', '毛里塔尼亚 +222'
]

// 注册验证方式
const VERIFICATION_METHOD = {
  message: {
    placeholderTip: '请输入 6 位短信验证码',
    VerificationCodeWay: '获取短信验证码',
    anotherMethod: '接收语音验证码'
  },
  voice: {
    placeholderTip: '请输入 6 位语音验证码',
    VerificationCodeWay: '获取语音验证码',
    anotherMethod: '接收短信验证码'
  }
}

const MESSAGE = "message"
const VOICE = "voice"
class signUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '',
      noPhoneNumber: false,
      invalidPhoneNumber: false,
      showCountryList: false,
      defaultVerificationMethod: MESSAGE,
      currentCountry: COUNTRY_LIST[0]
    }
    // 构造函数的绑定
    this.setPhoneNumber = this.setPhoneNumber.bind(this)
    this.changeCountryListState = this.changeCountryListState.bind(this)
    this.chooseCountry = this.chooseCountry.bind(this)
    this.changeSignUpMethod = this.changeSignUpMethod.bind(this)
    this.focusPhoneInput = this.focusPhoneInput.bind(this)
  }

  // 绑定对应内容变化事件
  setPhoneNumber(e){ this.setState({ phoneNumber: e.target.value }) } // 输入手机号码
  chooseCountry(e) { this.setState({ currentCountry: e.target.innerHTML }) } // 选择国家

  /* 
   * 更改注册的方法
   * 验证输入框内容
   * 选择语音接收验证码 / 短信接收验证码
   */
  changeSignUpMethod() {
    this.getVerificationCode()
    this.setState({
      defaultVerificationMethod: this.state.defaultVerificationMethod === MESSAGE ? VOICE : MESSAGE
    },()=>{
      console.log(VERIFICATION_METHOD[this.state.defaultVerificationMethod].VerificationCodeWay)
    })
  }
  // 获取验证码
  getVerificationCode() {
    this.checkForm()
  }
  // 验证表单
  checkForm() {
    this.setState({
      noPhoneNumber: !this.state.phoneNumber,
      invalidPhoneNumber: this.state.currentCountry === COUNTRY_LIST[0] && !/^1[34578]\d{9}$/.test(this.state.phoneNumber)
    })
  }
  // 聚焦手机号的输入框时 隐藏报错提示
  focusPhoneInput() {
    this.phoneNumberInput.focus()  // 自动聚焦手机号这个输入框
    this.setState({
      noPhoneNumber: false,
      invalidPhoneNumber: false
    })
  }
  // 是否显示国家列表
  changeCountryListState() {
    this.setState({
      showCountryList: !this.state.showCountryList
    })
  }
  // 是否渲染国家列表信息
  countryList() {
    return (
      <ul className="country-list" onClick={this.chooseCountry}>
        {COUNTRY_LIST.map((country, index) => (
          <li key={index}>{country}</li>
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="signup-wrap">
        <div className="account">
          <div className="select-counrty" onClick={this.changeCountryListState}>
            {this.state.currentCountry}
            {this.state.showCountryList?this.countryList():''}
          </div>
          <span>&nbsp;</span>
          <div className={`phone-wrap ${this.state.noPhoneNumber?'no-phone-number':''} 
            ${this.state.invalidPhoneNumber? 'invalid-phone-number':''}`}
            onClick={this.focusPhoneInput}>
            <input ref={(input) => { this.phoneNumberInput = input; }} 
              className={this.state.noPhoneNumber?'error-tip':''} 
              type="text" 
              placeholder="手机号" 
              onChange={this.setPhoneNumber}/>
          </div>
        </div>
        <div className="verification-code">
          <input type="text" placeholder={VERIFICATION_METHOD[this.state.defaultVerificationMethod].placeholderTip}/>
          <p>{VERIFICATION_METHOD[this.state.defaultVerificationMethod].VerificationCodeWay}</p>
        </div>
        <p onClick={this.changeSignUpMethod}>{VERIFICATION_METHOD[this.state.defaultVerificationMethod].anotherMethod}</p>
        <button className="subbmit">注册</button>
        <div className="agreement">
          <span>注册即代表同意
            <a href="https://www.zhihu.com/terms">《知乎协议》</a>
            <a href="https://www.zhihu.com/terms/privacy">《隐私政策》</a>
          </span>
          <a href="https://www.zhihu.com/org/signup">注册机构号</a>
        </div>
      </div>
    )
  }
}

export default signUp