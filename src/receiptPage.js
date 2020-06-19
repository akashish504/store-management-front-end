import React from 'react';
import 'antd/dist/antd.css';
import {Menu, Dropdown} from 'antd';
import styled from 'styled-components';
import requests from './requests';
import {withRouter} from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { Form, Input, Button, Select, Table } from 'antd';
import {filter} from 'ramda';
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const StyledDiv = styled.div`
  width:50%;
  position: fixed;
  top:20px;
`;

class ReceiptPage extends React.Component<{},{}> {

  constructor(props: Props) {
    super(props);
    this.state = {
      data : [],
      chosenItem: "",
      inStock: 0,
      tableData:[]
    };
  };

  formRef = React.createRef();

  async componentDidMount() {
    try {
      const data = await requests.get("http://localhost:8080/item_list",{})
      this.setState({
        data: data.body
      })
      console.log(data.body)
    } catch(e) {
      console.log(e)
    }
  };

  menu = () => {
  return(
    <Menu>
      {this.state.data.map((item,index) => (
      <Menu.Item onClick={()=> { this.setState({chosenItem:item.itemName, inStock:item.qu})}}>
          {item.itemName}
      </Menu.Item>))}
    </Menu>
  )};

  onItemSelect = value => {
    const {data} = this.state;
    let item = filter(t => t.itemName == value,data);
    console.log(item);
    this.formRef.current.setFieldsValue({
      stock: item[0].quantity,
      price: item[0].price
    });
  };

  onFinish = async (values) => {
    const {data} = this.state;
    let item = filter(t => t.itemName == values.itemName,data);
    console.log(item);
    values.price = item[0].price;
    console.log(values);
    const new_data = values
    const {tableData} = this.state;
    delete values.price;
    try {
      const response = await requests.post("http://localhost:8080/subtract_items",values,{})
      this.setState({
        tableData: [new_data, ...tableData]
      })
      console.log(this.state.tableData);
    } catch(e) {
      console.log(e)
    }
    this.formRef.current.resetFields();
  };


  render() {
    const columns = [
      {
        title: 'Item Name',
        dataIndex: 'itemName',
        key: 'itemName',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
      },
    ];
    const {data} = this.state;
    return(
      <StyledDiv>
      <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
        <Form.Item
          name="itemName"
          label="Item"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select Item"
            onChange={this.onItemSelect}
            allowClear
          >
            {this.state.data.map((item,index) => (<Option value={item.itemName}>{item.itemName}</Option>))}
          </Select>
        </Form.Item>
        <Form.Item
          name="stock"
          label="Stock"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </StyledDiv>
    )
  }
}

export default withRouter(ReceiptPage);