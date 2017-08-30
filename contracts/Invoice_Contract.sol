pragma solidity ^0.4.8;
import "./TCI_Contract.sol";

//----------------------------------------------------
//------------------ Invoice -------------------------
//----------------------------------------------------
contract Invoice_Contract{
  /**********
  Definition of the data
  **********/
  struct Invoice{
    bytes32 amount;
    bytes32 currency;
    bytes32 dueAt;
    bytes32 issueAt;
    address sellerAddress;
    address buyerAddress;
    bool sellerHasValidate;
    bool buyerHasValidate;
    bool sellerGotPaid;
    bool HasTCI;
    bool InModifcation;
    bool HasBackUp;
    uint indexSeller;
    uint indexBuyer;
  }
  struct IndexTmp{
    uint tmp_IndexSeller;
  }
  Invoice public _invoice;
  IndexTmp public _indexTmp;
  TCI_Contract public _tci;

  /**********
  Restriction
  **********/
  modifier sellerOwnly(){
      if(msg.sender != _invoice.sellerAddress) throw;
      _;
  }
  modifier IsValidate(){
      if(!_invoice.sellerHasValidate && !_invoice.buyerHasValidate) throw;
      _;
  }

  /**********
  Events
  **********/
  //For the payement in ether
  event sendAmount (address indexed _to, bytes32 indexed _value);

  /**********
  Constructor
  **********/
  function Invoice_Contract (bytes32 amount, bytes32 currency, bytes32 dueAt, bytes32 issueAt, address sellerAddress, address buyerAddress, uint indexSeller, uint indexBuyer){
    _invoice.amount = amount;
    _invoice.currency = currency;
    _invoice.dueAt = dueAt;
    _invoice.issueAt = issueAt;
    _invoice.sellerAddress = sellerAddress;
    _invoice.buyerAddress = buyerAddress;
    _invoice.indexSeller = indexSeller;
    _invoice.indexBuyer = indexBuyer;
  }
  function secondInitialisation(bool sellerHasValidate){
    if(sellerHasValidate){
      _invoice.sellerHasValidate = true;
      _invoice.buyerHasValidate = false;
    }
    else{
      _invoice.sellerHasValidate = false;
      _invoice.buyerHasValidate = true;
    }
  }

  /**********
  Accessors
  **********/
  function setInModification (bool value){
    _invoice.InModifcation = value;
  }
  function getInModification() constant returns(bool){
    return _invoice.InModifcation;
  }

  function setHasBackUp (bool value){
    _invoice.HasBackUp = value;
  }

  function getIndexSeller() constant returns(uint){
    return _invoice.indexSeller;
  }
  function getIndexBuyer() constant returns(uint){
    return _invoice.indexBuyer;
  }

  function get_Tmp_indexSeller() constant returns(uint){
    return _indexTmp.tmp_IndexSeller;
  }

  function getSellerHasValidate() constant returns(bool){
    return _invoice.sellerHasValidate;
  }
  function getBuyerHasValidate() constant returns(bool){
    return _invoice.buyerHasValidate;
  }

  function getAmount() constant returns(bytes32){
    return _invoice.amount;
  }

  function getDueAt() constant returns(bytes32){
    return _invoice.dueAt;
  }

  function getCounterpartAddress(bool IsSeller) constant returns (address){
    if(IsSeller){
      return _invoice.buyerAddress;
    }
    else{
      return _invoice.sellerAddress;
    }
  }

  function getSellerGotPaid () public constant returns (bool){
    return (_invoice.sellerGotPaid);
  }

  function setHasValidate (bool value){
    _invoice.sellerHasValidate = value;
    _invoice.buyerHasValidate = value;
  }

  /**********
  Creation of TCI
  **********/
  function createTCI(bytes32 idTransaction, bytes32 amount, bytes32 currency){
      _invoice.HasTCI = true;
      _tci = new TCI_Contract(idTransaction, amount, currency);
  }

  /*function HasTciOrNot() public constant returns(bool){
    return _invoice.HasTCI;
  }*/

  /**********
  Display contract
  **********/
  function displayContract() public constant returns (bytes32, bytes32, bytes32, bytes32, address, address, bool, bool, bool, bool, uint, uint){
    return (_invoice.amount, _invoice.currency, _invoice.dueAt, _invoice.issueAt, _invoice.sellerAddress, _invoice.buyerAddress, _invoice.sellerHasValidate, _invoice.buyerHasValidate, _invoice.sellerGotPaid, _invoice.HasTCI, _invoice.indexSeller, _invoice.indexBuyer);
  }
  function displayContract_2() public constant returns (bool, bool){
    return(_invoice.InModifcation, _invoice.HasBackUp);
  }
  function displayContractTCI() public constant returns (bool, bytes32, bytes32, bytes32){
    return _tci.displayContractTCI();
  }

  /**********
  Validation
  **********/
 function validation(){
    //if(_invoice.sellerHasValidate){
        _invoice.buyerHasValidate = true;
    //}
  //  else{
        _invoice.sellerHasValidate = true;
    //}
  }

  /**********
  restore
  **********/
  function restore (bytes32 amount, bytes32 dueAt){
    _invoice.amount = amount;
    _invoice.dueAt = dueAt;
    _invoice.buyerHasValidate = true;
    _invoice.sellerHasValidate = true;
  }

  /**********
  Paid
  **********/
  function gotPaid() { //IsValidate()
      _invoice.sellerGotPaid = true;
      //_tci.SetStatusPayement(true);
  }

  /**********
  TCI defaultPayment
  **********/
  function defaultPayment(bool IsVerified){
    _tci.defaultPayment(IsVerified);
  }

  /**********
  Modification
  **********/
  function modifcation(bytes32 dueDate, bytes32 amount, bool IsSeller, uint tmp_IndexSeller){
    _invoice.dueAt = dueDate;
    _invoice.amount = amount;
    _indexTmp.tmp_IndexSeller = tmp_IndexSeller;
    //Restart the validation process
    if(IsSeller){
        _invoice.buyerHasValidate = false;
        _invoice.sellerHasValidate = true;
    }
    else{
        _invoice.sellerHasValidate = false;
        _invoice.buyerHasValidate = true;
    }
    //Cancel the insurance
    if(_invoice.HasTCI){
      _invoice.HasTCI = false;
    }
  }

  /**********
  Premium
  **********/
   // /!\ The contract must have an amout of ether
  /*function premiumPayement (string tci_amount) sellerOwnly(){
      if(!_invoice.owner.send(parseInt(tci_amount))){
        _invoice.IsPaid = false;
      }
      else{
        _invoice.IsPaid = true;
        sendAmount(_invoice.owner, tci_amount);
      }
  }*/

}

