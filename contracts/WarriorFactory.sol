pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract WarriorFactory is ERC721Full {
  using SafeMath for uint256;

  modifier onlyOwnerOf(uint256 _warriorId) {
    require(msg.sender == warriorToOwner[_warriorId]);
    _;
  }

  mapping(uint256 => address) public warriorToOwner;
  mapping(address => uint256) public ownerWarriorCount;
  mapping(uint256 => address) public warriorApprovals;

  struct Warrior {
    string warName;
    uint16 level;
    uint16 attack;
    uint16 defend;
    uint16 strategy;
    uint16 winCount;
    uint16 lossCount;
  }

  Warrior[] public warriors;

  constructor () public ERC721Full('MXRT Tribes of War', 'MXRTOW') {

}

  function createWarrior(string memory _warName, uint16 _level, uint16 _attack, uint16 _defend, uint16 _strategy, uint16 _initialWinCount, uint16 _initialLossCount, string memory _tokenURI, address _to) public {
    uint256 id = warriors.length;
    warriors.push(Warrior(_warName, _level, _attack, _defend, _strategy, _initialWinCount, _initialLossCount));
    _mint(_to, id);
    _setTokenURI(id, _tokenURI);
    warriorToOwner[id] = _to;
    ownerWarriorCount[_to]++;
  }

  function balanceOf(address _owner) public view returns (uint256 _balance) {
    return ownerWarriorCount[_owner];
  }

  function ownerOf(uint256 _tokenId) public view returns (address _owner) {
    return warriorToOwner[_tokenId];
  }

  function _transfer(address _from, address _to, uint256 _tokenId) internal {
    ownerWarriorCount[_to] = ownerWarriorCount[_to].add(1);
    ownerWarriorCount[_from] = ownerWarriorCount[_from].sub(1);
    warriorToOwner[_tokenId] = _to;
    emit Transfer(_from, _to, _tokenId);
  }

  function transfer(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
    _transfer(msg.sender, _to, _tokenId);
  }

  function approve(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
    warriorApprovals[_tokenId] = _to;
    emit Approval(msg.sender, _to, _tokenId);
  }

  function takeOwnership(uint256 _tokenId) public {
    require(warriorApprovals[_tokenId] == msg.sender);
    address owner = ownerOf(_tokenId);
    _transfer(owner, msg.sender, _tokenId);
  }
}
