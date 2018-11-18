const Contract = artifacts.require('./OfferingBox.sol');

module.exports = function (deployer) {
  deployer.deploy(Contract);
};
