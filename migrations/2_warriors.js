var WarriorFactory = artifacts.require("./WarriorFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(WarriorFactory);
};
