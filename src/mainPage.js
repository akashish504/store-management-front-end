import React from 'react';
import {Button} from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import ReceiptPage from './receiptPage';
import AddStock from './AddStock';

interface Props {
  onLogout: () => void;
}

interface State {
  showReceipt: boolean;
}

class MainPage extends React.Component<Props,State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      showReceipt: false,
    };
  };

  loadReceiptPage = () => {
    this.setState({
      showReceipt: true
    })
    window.location.href = '/generateReceipt';
  }

  loadAddStockPage = () => {
    window.location.href = '/addStock';
  }

  render() {
    const {showReceipt} = this.state;
    return (
      <div>
        <Button onClick={this.loadReceiptPage}> Generate Receipt </Button>
        <Button onClick={this.loadAddStockPage}> Add Stock </Button>
        <Button> Add New Employee </Button>
        <Button onClick={this.props.onLogout}> Log Out </Button>
      </div>
    )
  }
}

export default MainPage;