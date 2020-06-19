import React from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import requests from './requests';

const StyledForm = styled(Form)`
  width: 50%;
  margin: 200px auto;
`;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface Props {
  onLogin: () => void;
}


class Login extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
    this.state = {
      successfulLogin: false
    };
  };

//  executeRoute = () => {
//
//    const {from} = {from: {pathname: this.props.redirectionUrl}};
//    this.props.history.push(from);
//  };
//
//  componentDidUpdate(prevProps, prevState, snapshot) {
//    if (this.state.successfulLogin) {
//      window.location.href = '/menu';
//    }
//  }

  onFinish = async values => {
    try {
      const response = await requests.postWithoutToken("http://localhost:8080/authenticate",values,{})
      const userObject = {token: "Bearer ".concat(response.token)};
      localStorage.setItem('token', JSON.stringify(userObject));
      this.props.onLogin();
      this.setState({
        successfulLogin: true
      })
    }
    catch (e) {
      console.log(e)
    }
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  render() {
    return (
        <StyledForm
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <StyledForm.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </StyledForm.Item>

          <StyledForm.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </StyledForm.Item>

          <StyledForm.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </StyledForm.Item>
        </StyledForm>
      );
    }
};

export default Login;