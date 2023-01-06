import React, { Component } from 'react'
import FormSinhVien from './FormSinhVien'
import UserManagement from './UserManagement'

export default class BaiTapFormSinhVien extends Component {
  render() {
    return (
      <div className="w-75 mx-auto mt-5">
        <FormSinhVien/>
        <UserManagement/>
      </div>
    )
  }
}
