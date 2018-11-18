import React from 'react'
import {
  Header,
  Image,
  Form,
  Message,
  Input,
  Button
} from 'semantic-ui-react';
import Web3Container from '../lib/Web3Container'
import Layout from '../components/Layout';


class Dapp extends React.Component {
  state = {
    loading: false,
    ether: 0,
    errorMessage: '',
    successMessage: ''
  };

  onSubmit = async (event) => {
    event.preventDefault();

    const { web3, accounts, contract } = this.props
    this.setState({ loading: true, errorMessage: '', successMessage: '' });

    // Modern dapp browsers
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }
    }

    try {
        const txReceipt = await contract.methods
            .donate()
            .send({
              from: accounts[0],
              value: web3.utils.toWei(this.state.ether.toString(), 'ether'),
            })
            .on('transactionHash');
        await web3.eth.getTransactionReceiptMined(txReceipt.transactionHash);
        this.setState({ successMessage: `GoogleHomeから結果発表があります` });
    } catch (err) {
        this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  }

  render () {
    const { ether, errorMessage, successMessage, loading } = this.state
    return (
      <div style={{ marginTop: 10 }}>
        <Header as='h1' textAlign='center'>
          <Image src="/static/img/saisen.png" /> おみくじ
        </Header>

        <Form onSubmit={this.onSubmit} error={!!errorMessage} success={!!successMessage}>
          <Form.Field>
            <Input
              id="form-input-control-send"
              placeholder="Enter ether"
              value={ether}
              onChange={event => this.setState({ ether: event.target.value })}
              label={{ basic: true, content: 'ether' }}
              labelPosition="right"
              type="number"
              step="0.0001"
            />
          </Form.Field>
          <Message success>
            <Message.Header>{successMessage}</Message.Header>
          </Message>
          <Message error header="Oops!" content={errorMessage} />
          <Button
            loading={loading}
            disabled={loading}
            floated="right"
            content="Donate"
            onClick={event => this.setState({ typeOfSubmit: 'transfer' })}
            primary
          />
        </Form>
      </div>
    )
  }
}

export default () => (
  <Layout>
    <Web3Container
      renderLoading={() => <div>Loading Dapp Page...</div>}
      render={({ web3, accounts, contract }) => (
        <Dapp accounts={accounts} contract={contract} web3={web3} />
      )}
    />
  </Layout>
)
