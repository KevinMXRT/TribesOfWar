var cryptoTOW;
var userAccount;

function startApp() {
      $.getJSON('WarriorFactory.json', function(data) {
      var WarriorFactoryArtifact = data;
      cryptoTOW = TruffleContract(WarriorFactoryArtifact);
      cryptoTOW.setProvider(web3js);

      var accountInterval = setInterval(function() {
        // Check if account has changed
        if (web3.eth.accounts[0] !== userAccount) {
          userAccount = web3.eth.accounts[0];
          // Call a function to update the UI with the new account
          // getWarriorsByOwner(userAccount).then(displayWarriors);
        }
      }, 100);
    });

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
  }

  function createWarrior(warName, level, attack, defend, strategy, winCount, lossCount, tokenURI, to) {
  cryptoTOW.deployed().then(function(instance){
    return instance.createWarrior(warName, level, attack, defend, strategy, winCount, lossCount, tokenURI, to);
  });
}

window.addEventListener('load', function() {

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3js = web3.currentProvider;
  } else {
    // Handle the case where the user doesn't have Metamask installed
    // Probably show them a message prompting them to install Metamask
    alert('Install Metamask!')
  }
  web3 = new Web3(web3js);

  // Now you can start your app & access web3 freely:
  startApp();

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


});
