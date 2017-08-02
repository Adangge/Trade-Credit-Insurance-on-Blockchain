pragma solidity ^0.4.8;
import "./Invoice_Contract.sol";
import "./TCI_Contract.sol";

//----------------------------------------------------
//------------------ Central -------------------------
//----------------------------------------------------
contract Central_Contract {
   /**********
    Definition of the data
   **********/
   struct awaiting{
     bytes32 amount;
     bytes32 dueAt;
   }
   struct Event{
     bytes32 msg;
     uint invoiceNumber;
   }
   mapping (address => Invoice_Contract[]) public seller;
   mapping (address => Invoice_Contract[]) public buyer;
   mapping (address => awaiting[]) public awaitingInvoice;
   mapping (address => Event[]) public events;
   mapping(address => uint) public limEvents;

   /**********
    Accesseurs
   **********/
   function getSellerContracts(address adresse) public constant returns (Invoice_Contract[]){
     return seller[adresse];
   }
   function getSellerContract(address adresse, uint index)public constant returns (bytes32, bytes32, bytes32, bytes32, address, address, bool, bool, bool, bool, uint, uint){
     return seller[adresse][index].displayContract();
   }
   function getSellerContract_2(address adresse, uint index)public constant returns (bool, bool){
     return seller[adresse][index].displayContract_2();
   }

   function getTCI (address adresse, uint index) public constant returns (bool, bytes32, bytes32, bytes32){
     return seller[adresse][index].displayContractTCI();
   }

   function getBuyerContracts(address adresse) public constant returns (Invoice_Contract[]){
     return buyer[adresse];
   }
   function getBuyerContract(address adresse, uint index)public constant returns (bytes32, bytes32, bytes32, bytes32, address, address, bool, bool, bool, bool, uint, uint){
     return buyer[adresse][index].displayContract();
   }
   function getBuyerContract_2(address adresse, uint index)public constant returns (bool, bool){
     return buyer[adresse][index].displayContract_2();
   }

   function getLengthEvents(address adresse) public constant returns (uint){
     return (events[adresse].length);
   }
   function getEvents(address adresse, uint i) public constant returns (bytes32, uint, uint){
     return (events[adresse][i].msg, events[adresse][i].invoiceNumber, i);
   }

   function getLength_Seller(address adresse) public constant returns (uint){
     return seller[adresse].length;
   }
   function getLength_Buyer(address adresse) public constant returns (uint){
     return buyer[adresse].length;
   }

   /**********
   Create Invoice
   **********/
   function createInvoice (bytes32 amount, bytes32 currency, bytes32 dueAt, bytes32 issueAt, address sellerAddress, address buyerAddress, bool sellerHasValidate){

      //  Création du contrat
      uint indexSeller = seller[sellerAddress].length;
      uint indexBuyer = buyer[buyerAddress].length;

      //  First initialisation
      Invoice_Contract newInvoiceAddress = new Invoice_Contract(amount, currency, dueAt, issueAt, sellerAddress, buyerAddress, indexSeller, indexBuyer);
      buyer[buyerAddress].push(newInvoiceAddress);
      seller[sellerAddress].push(newInvoiceAddress);

      //  Second initialisation
      uint indexContract = 0;
      indexContract = searchIndex(sellerAddress);
      seller[sellerAddress][indexContract].secondInitialisation(sellerHasValidate);

      //Register event
      storeEvents(sellerAddress, buyerAddress, "creation", indexSeller, indexBuyer, false);
   }

   //Search the last contract inserted
   function searchIndex (address adresse) public constant returns (uint){
     uint last = 0;
     if(seller[adresse].length == 0){
       last = seller[adresse].length;
     }
     else{
       last = seller[adresse].length - 1;
     }

     return last;
   }

   /**********
   Events
   **********/
   function storeEvents (address sellerAddress, address buyerAddress, bytes32 msg, uint invoiceNumber_s, uint invoiceNumber_b , bool sellerOnly){
     //Insert the event in the both sides
     Event memory tmp_s;
     tmp_s.msg = msg;
     tmp_s.invoiceNumber = invoiceNumber_s;
     Event memory tmp_b;
     tmp_b.msg = msg;
     tmp_b.invoiceNumber = invoiceNumber_b;
     //Pushes
     if(sellerOnly){
       events[sellerAddress].push(tmp_s);
       //Incrementation limEvents
       limEvents[sellerAddress]++;
     }
     else{
       events[sellerAddress].push(tmp_s);
       events[buyerAddress].push(tmp_b);
       //Incrementation limEvents
       limEvents[sellerAddress]++;
       limEvents[buyerAddress]++;
     }
     //Check seller to remove
     if(limEvents[sellerAddress] == 4){
       //reset limEvents
       limEvents[sellerAddress] = 0;
       //remove events
       removeEvents(sellerAddress);
     }
     //Check buyer to remove
     if(limEvents[buyerAddress] == 4){
       //reset limEvents
       limEvents[buyerAddress] = 0;
       //remove events
       removeEvents(buyerAddress);
     }

   }
   function removeEvents (address adresse){
     //Erase all the events stored once viwed
     uint length = events[adresse].length;
     //Replace the last events at the first place
     events[adresse][0] = events[adresse][length - 1];
     //Erase the 3 others
     for(uint i = 1; i <= length - 1; i++){
       delete events[adresse][i];
       events[adresse].length--;
     }
   }

   /**********
   Function bridge
   **********/
  function gotPaid(address adresse, uint index){
    seller[adresse][index].gotPaid();

    //Register event
    uint indexBuyer = seller[adresse][index].getIndexBuyer();
    address buyerAddress = seller[adresse][index].getCounterpartAddress(true);
    storeEvents(adresse, buyerAddress, "payment", index, indexBuyer, false);
  }

  function createTCI(address adresse, uint index, bytes32 idTransaction, bytes32 amount, bytes32 currency){
    seller[adresse][index].createTCI(idTransaction, amount, currency);
    //Register event
    uint indexBuyer = seller[adresse][index].getIndexBuyer();
    address buyerAddress = seller[adresse][index].getCounterpartAddress(true);
    storeEvents(adresse, buyerAddress, "creationTCI", index, indexBuyer, true);
  }

  function Validation(address adresse, uint index, bytes1 side){
    if(side == "b"){
      buyer[adresse][index].Validation();
    }
    else{
      seller[adresse][index].Validation();
    }
    //Register event
    uint indexBuyer = seller[adresse][index].getIndexBuyer();
    address buyerAddress = seller[adresse][index].getCounterpartAddress(true);
    storeEvents(adresse, buyerAddress, "validation", index, indexBuyer, false);
  }

  function defaultPayment(address adresse, uint index, bool IsVerifed){
    seller[adresse][index].defaultPayment(IsVerifed);
    //Register event
    uint indexBuyer = seller[adresse][index].getIndexBuyer();
    address buyerAddress = seller[adresse][index].getCounterpartAddress(true);
    storeEvents(adresse, buyerAddress, "default", index, indexBuyer, false);
  }

  function modifcation(address adresse, uint index, bytes32 dueDate, bytes32 amount, bool IsSeller){
    //Get the index of the old invoice storage
    uint indexTmp_Seller;
    indexTmp_Seller = awaitingInvoice[adresse].length;

    //Push the old one in the both side only if they agreed
    bool sellerHasValidate = seller[adresse][index].getSellerHasValidate();
    bool buyerHasValidate = seller[adresse][index].getBuyerHasValidate();
    //Store only if approved before
    if(sellerHasValidate && buyerHasValidate){
      awaiting tmp;
      tmp.amount = seller[adresse][index].getAmount();
      tmp.dueAt = seller[adresse][index].getDueAt();
      awaitingInvoice[adresse].push(tmp);
      //Set the paramater in the invoice
      seller[adresse][index].setHasBackUp(true);
    }
    //Set the paramater in the invoice
    seller[adresse][index].setInModification(true);
    //Insert the edit invoice in the table
    seller[adresse][index].modifcation(dueDate, amount, IsSeller, indexTmp_Seller);
    //Register event
    uint indexBuyer = seller[adresse][index].getIndexBuyer();
    address buyerAddress = seller[adresse][index].getCounterpartAddress(true);
    storeEvents(adresse, buyerAddress, "modification", index, indexBuyer, false);
  }

  function approveMofification(address adresse, uint index, bool IsSeller){
    bytes1 side;
    if(IsSeller){
      side = "s";
      //Restaure the parameter
      seller[adresse][index].setInModification(false);
      //Validate the approval
      Validation(adresse, index, side);
    }
    else{
      //Restaure the parameter
      seller[adresse][index].setInModification(false);
      seller[adresse][index].setHasValidate(true);
    }

    //Delete the old invoice
    uint indexToRemove_Seller = seller[adresse][index].get_Tmp_indexSeller();
    remove(adresse, indexToRemove_Seller, "");

    //Register event
    uint indexBuyer_ = seller[adresse][index].getIndexBuyer();
    address buyerAddress = seller[adresse][index].getCounterpartAddress(true);
    storeEvents(adresse, buyerAddress, "modificationApproved", index, indexBuyer_, false);
  }

  function desapproveModification(address adresse, uint index, bool IsSelle){
    uint index_Await_Seller = seller[adresse][index].get_Tmp_indexSeller();
    //Get the old data
    bytes32 previous_amount = awaitingInvoice[adresse][index_Await_Seller].amount;
    bytes32 previous_dueAt = awaitingInvoice[adresse][index_Await_Seller].dueAt;
    //Get back the old invoice
    seller[adresse][index].restore(previous_amount, previous_dueAt);
    //Remove it from the awaiting invoices
    remove(adresse, index_Await_Seller, "");
    //Register event
    uint indexBuyer = seller[adresse][index].getIndexBuyer();
    address buyerAddress = seller[adresse][index].getCounterpartAddress(true);
    storeEvents(adresse, buyerAddress, "modificationDesapproved.", index, indexBuyer, false);
  }

  function remove(address adresse, uint indexToRemove, bytes1 side){
    //Register event
    uint indexBuyer = seller[adresse][indexToRemove].getIndexBuyer();
    address buyerAddress = seller[adresse][indexToRemove].getCounterpartAddress(true);
    storeEvents(adresse, buyerAddress, "removed", indexToRemove, indexBuyer, false);

    uint i;
    if(side == "s"){
      //Replace
      seller[adresse][indexToRemove] = seller[adresse][seller[adresse].length-1];
      //Erase the last
      delete seller[adresse][seller[adresse].length-1];
      seller[adresse].length--;
    }
    else if (side == "b"){
      //Replace
      buyer[adresse][indexToRemove] = buyer[adresse][buyer[adresse].length-1];
      //Erase the last
      delete buyer[adresse][buyer[adresse].length-1];
      buyer[adresse].length--;
    }
    else{
      if (indexToRemove >=awaitingInvoice[adresse].length){}
        else{
          for (i = indexToRemove; i<awaitingInvoice[adresse].length-1; i++){
              awaitingInvoice[adresse][i] = awaitingInvoice[adresse][i+1];
          }
          delete awaitingInvoice[adresse][awaitingInvoice[adresse].length-1];
          awaitingInvoice[adresse].length--;
        }
    }
  }

}
