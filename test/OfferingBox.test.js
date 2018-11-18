import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiBigNumber from 'chai-bignumber';
import truffleAssert from 'truffle-assertions';
import shouldFail from 'openzeppelin-solidity/test/helpers/shouldFail';
import { ether } from 'openzeppelin-solidity/test/helpers/ether';

chai.use(chaiBigNumber());
chai.use(chaiAsPromised);
const { expect, assert } = chai;

const OfferingBox = artifacts.require('OfferingBox');

contract('OfferingBoxTest', async (accounts) => {
  let instance;
  let owner;
  let eventCount;

  beforeEach(async () => {
    instance = await OfferingBox.deployed();
    owner = await instance.owner();
    const balance = await instance.getBalanceContract();
    if (balance.gt(0)) {
      await instance.withdraw(balance);
    }
    eventCount = 0;
  });

  it('Should make first account an owner', async () => {
    expect(owner).to.equal(accounts[0]);
  });

  describe('donate', () => {
    it('sends 1 ether', async () => {
      const tx = await instance.donate({ value: ether(1) }).should.be.fulfilled;

      truffleAssert.eventEmitted(tx, 'Donate', (ev) => {
        return ev._from === accounts[0] && ev._to === instance.address && ev._value.eq(ether(1));
      });
    });

    it('sends 0 ether', async () => {
      const tx = await instance.donate({ value: ether(0), from: accounts[1] }).should.be.fulfilled;

      truffleAssert.eventEmitted(tx, 'Donate', (ev) => {
        return ev._from === accounts[1] && ev._to === instance.address && ev._value.eq('0');
      });
    });

  });

  describe('getBalanceContract', () => {
    it('gets balance', async () => {
      await instance.donate({ value: ether(1) }).should.be.fulfilled;
      const balance = await instance.getBalanceContract();
      expect(balance).to.bignumber.equal(ether(1));
    });
  });

  describe('withdraw', () => {
    it('withdraws only owner', async () => {
      await instance.donate({ value: ether(1) }).should.be.fulfilled;

      await instance.withdraw(ether(1)).should.be.fulfilled;
    });

    it('should not withdraws other account', async () => {
      await instance.donate({ value: ether(1) }).should.be.fulfilled;

      await shouldFail.reverting(instance.withdraw(ether(1), { from: accounts[1] }));
    });
  });
});
