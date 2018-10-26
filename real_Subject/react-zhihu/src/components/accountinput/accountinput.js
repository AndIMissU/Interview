import React, { Component } from 'react';
import './accountinput.scss';

class accountInut extends Component {
  render() {
    return(
      <div className='account'>
        <div className='select-counrty' onClick={this.changeCountryListState}>
          {this.state.currentCountry}
          {this.state.showCountryList?this.countryList():''}
        </div>
        <span>&nbsp;</span>
        <div className={`phone-wrap ${this.state.noPhoneNumber?'no-phone-number':''} 
          ${this.state.invalidPhoneNumber?'invalid-phone-number':''}`}
          onClick={this.focusPhoneInput}>
          <input ref={(input) => { this.phoneNumberInput = input }} 
            className={this.state.noPhoneNumber?'error-tip':''} 
            onBlur={this.setPhoneNumber}
            placeholder='手机号'
            type='text' />
        </div>
      </div>
    )
  }
}

export default accountInut