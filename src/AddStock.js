import React from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Table } from 'antd';
import 'antd/dist/antd.css';
import requests from './requests';

const StyledForm = styled(Form)`
  width: 50%;
  position: fixed;
  right: 20px;
  top: 20px;
`;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const StyledDiv = styled.div`
  width:50%;
`;

class AddStock extends React.Component {

  constructor(props:Props){
    super(props);
    this.state = {
      data:[],
      submittingItem:false
    }
  }

  onFinish = async values => {
      this.setState({
        submittingItem: true
      })
      try {
        console.log(values);
        const response = await requests.post("http://localhost:8080/add_item",values,{})
        this.setState({
          submittingItem: false
        })
      }
      catch (e) {
        console.log(e)
      }
    };

    onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

  async componentDidMount() {
    try {
      const data = await requests.get("http://localhost:8080/item_list",{})
      this.setState({
        data: data.body
      })
    } catch(e) {
      console.log(e)
    }
  }

  render() {
    const columns = [
      {
        title: 'Item Name',
        dataIndex: 'itemName',
        key: 'itemName',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
      },
    ];
    const {data} = this.state;
    return (
      <div>
        <StyledDiv>
          <Table dataSource={data} columns={columns}/>
        </StyledDiv>
        <StyledForm
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        >
        <StyledForm.Item
          label="Item Name"
          name="itemName"
          rules={[{ required: true }]}
        >
          <Input />
        </StyledForm.Item>

        <StyledForm.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true}]}
        >
          <Input />
        </StyledForm.Item>

        <StyledForm.Item
          label="Price"
          name="price"
          rules={[{ required: true}]}
        >
          <Input />
        </StyledForm.Item>

        <StyledForm.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </StyledForm.Item>
      </StyledForm>
      </div>
    )
  }
}

export default AddStock;