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
