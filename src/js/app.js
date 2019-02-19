App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load cards.
    $.getJSON('../cards.json', function(data) {
      var cardsRow = $('#cardsRow');
      var cardTemplate = $('#cardTemplate');

      for (i = 0; i < data.length; i ++) {
        cardTemplate.find('.warrior-name').text(data[i].name);
        cardTemplate.find('.warName').attr('value', data[i].name);
        cardTemplate.find('.card-description').text(data[i].description);
        cardTemplate.find('img').attr('src', data[i].image);
        cardTemplate.find('.card-generation').text(data[i].generation);
        cardTemplate.find('.card-realm').text(data[i].realm);
        cardTemplate.find('.card-faction').text(data[i].faction);
        cardTemplate.find('.card-level').text(data[i].level);
        cardTemplate.find('.level').attr('value', data[i].level);
        cardTemplate.find('.card-attack').text(data[i].attack);
        cardTemplate.find('.attack').attr('value', data[i].attack);
        cardTemplate.find('.card-defend').text(data[i].defend);
        cardTemplate.find('.defend').attr('value', data[i].defend);
        cardTemplate.find('.card-strategy').text(data[i].strategy);
        cardTemplate.find('.strategy').attr('value', data[i].strategy);
        cardTemplate.find('.card-winCount').text(data[i].winCount);
        cardTemplate.find('.card-lossCount').text(data[i].lossCount);
        cardTemplate.find('.tokenURI').attr('value', data[i].tokenURI);

        cardsRow.append(cardTemplate.html());
      }
    });





    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
if (window.ethereum) {
  App.web3Provider = window.ethereum;
  try {
    // Request account access
    await window.ethereum.enable();
  } catch (error) {
    // User denied account access...
    console.error("User denied account access")
  }
}
// Legacy dapp browsers...
else if (window.web3) {
  App.web3Provider = window.web3.currentProvider;
}
// If no injected web3 instance is detected, fall back to Ganache
else {
  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
web3 = new Web3(App.web3Provider);




    return App.initContract();
  },

  initContract: function() {
    $.getJSON('WarriorFactory.json', function(data) {
  // Get the necessary contract artifact file and instantiate it with truffle-contract
  var WarriorFactoryArtifact = data;
  App.contracts.WarriorFactory = TruffleContract(WarriorFactoryArtifact);

  // Set the provider for our contract
  App.contracts.WarriorFactory.setProvider(App.web3Provider);

  // Use our contract to retrieve and mark the adopted pets
  //return App.markAdopted();
});

}

};

function createWarrior(warName, level, attack, defend, strategy, winCount, lossCount, tokenURI, to) {
App.contracts.WarriorFactory.deployed().then(function(instance){
  return instance.createWarrior(warName, level, attack, defend, strategy, winCount, lossCount, tokenURI, to);
});
}


$("#cardCollect").click(function() {
  createWarrior(
    $("#warName").val(),
    $("#level").val(),
    $("#attack").val(),
    $("#defend").val(),
    $("#strategy").val(),
    $("#winCount").val(),
    $("#lossCount").val(),
    $("#tokenURI").val(),
    $("#to").val());
});

$(function() {
  $(window).load(function() {
    App.init();
  });
});
