import React, { Component } from "react";
import { connect } from "react-redux";

class FormSinhVien extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  state = {
    values: {
      maSV: "",
      hoTen: "",
      soDienThoai: "",
      email: "",
    },

    errors: {
      maSV: "",
      hoTen: "",
      soDienThoai: "",
      email: "",
    },
  };

  // Lấy giá trị của ô input
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      values: {
        ...this.state.values, //Lấy lại giá trị cũ
        [name]: value, //Gán lại giá trị moiws
      },

      // values: {
      //   ...this.state.values,
      //   [name]: value,
      // },
    });
  };

  handleSubmit = (event) => {
    //tránh load lại trang web:
    event.preventDefault();

    //Chặn ko cho lưu nếu có lỗi của form
    const isValid = event.target.checkValidity();

    if (!isValid) {
      return;
    }

    // nếu selectedUser có thì đang ở trạng thái edit, ngược lại là create
    if(this.props.selectedUser){
      this.props.dispatch({
        type: "UPPDATE_USER",
        payload: this.state.values,
      });
    }else{
      this.props.dispatch({
        type: "ADD_USER",
        payload: this.state.values,
      });
    }

    // console.log(event)
  };

  // lưu cảnh báo vào errors của state
  handleBlur = (event) => {
    let message = "";
    const { validationMessage, name, validity, title, minLength, maxLength } =
      event.target;
    const { valueMissing, tooShort, tooLong, patternMismatch } = validity;

    // console.log(patternMismatch);

    if (valueMissing) {
      message = `${title} is required`;
    }

    if (tooShort || tooLong) {
      message = `${title} from ${minLength}-${maxLength} characters`;
    }

    if (patternMismatch) {
      message = `${title} is invalid pattern`;
    }

    this.setState({
      errors: {
        ...this.state.errors,
        [name]: message,
      },
    });
  };

  static getDerivedStateFromProps(nextProps, currentState){
    console.log({nextProps, currentState })
    if(nextProps.selectedUser && currentState.values.id !== nextProps.selectedUser.id){
      //Chuyển giá trị của props thành state
      currentState.values = nextProps.selectedUser;
          }
    return currentState;
  }

  render() {
    const {
      maSV = "",
      hoTen = "",
      soDienThoai = "",
      email = "",
    } = this.state.values || {};
    return (
      <div className="card p-0">
        <div className="card-header bg-warning text-white font-weight-bold">
          THÔNG TIN SINH VIÊN
        </div>
        <div className="card-body">
          <form ref={this.formRef} noValidate onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Mã SV</label>
                  <input
                  pattern="[0-9]$"
                    // value={this.props.selectedUser?.maSV}
                    value={maSV}
                    title="Ma SV"
                    required // Để trống sẽ cảnh báo
                    name="maSV"
                    type="text"
                    className="form-control"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                  <span className="text-danger">{this.state.errors.maSV}</span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Họ tên</label>
                  <input
                  pattern="[A-z]{5,10}$"
                    value={hoTen}
                    title="Ho Ten"
                    required
                    minLength={5}
                    maxLength={10}
                    name="hoTen"
                    type="text"
                    className="form-control"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                  <span className="text-danger">{this.state.errors.hoTen}</span>
                </div>
              </div>

              <div className="col-6">
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                  pattern="0[0-9]{9}$"
                    value={soDienThoai}
                    title="Phone number"
                    required
                    name="soDienThoai"
                    type="text"
                    className="form-control"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                  <span className="text-danger">
                    {this.state.errors.soDienThoai}
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    value={email}
                    title="Email"
                    required
                    name="email"
                    // pattern="^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    type="text"
                    className="form-control"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                  <span className="text-danger">{this.state.errors.email}</span>
                </div>
              </div>
            </div>
            <button
              disabled={!this.formRef.current?.checkValidity()}
              className="btn btn-primary"
            >
              SAVE
            </button>
            {/* <button type="reset" className="btn btn-outline-dark">
              RESET
            </button> */}
          </form>
        </div>
      </div>
    );
  }
}

//Lấy giá trị trên store khi edit:
const mapStateToProps = (state) => {
  return {
    selectedUser: state.userReducer.selectedUser,
  };
};
export default connect(mapStateToProps)(FormSinhVien);
