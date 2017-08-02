//Source d'erreur: -Les if avec bool / -L'event default / -La clé de l'API / -L'appel de l'api avec oraclize

//ACCOUNTSNAME
var ACCOUNTSNAME = [
  {
    address : '0x76d499C529cc06323EA0c5d5edcf9B11c02597cB',
    id : "98a3b81e-8fa9-48fd-8b9e-77de318ef0aa",
    name : "Total"
  },
  {
    address : '0xC30F6af2c92eFd81DC27D30ccD573B0dA675D3b1',
    id : "20878f8c-9238-4b95-ac67-e3bf6f743627",
    name : "Air France"
  },
  {
    address : '0x8764eAD14051407D2761FeE6fab8597B07FE803c',
    id : "e7126bfc-ed54-4299-9ad6-a788100fe36b",
    name : "Darty"
  },
  {
    address : '0x29d773c667cEE478Fc22Fd756F772Fb5f719a39b',
    id : "89a24e14-5baa-4725-aafb-b23e4b94d460",
    name : "HSBC"
  }
];

//Contracts deployement
var abi = [
    {
      "constant": false,
      "inputs": [
        {
          "name": "amount",
          "type": "bytes32"
        },
        {
          "name": "currency",
          "type": "bytes32"
        },
        {
          "name": "dueAt",
          "type": "bytes32"
        },
        {
          "name": "issueAt",
          "type": "bytes32"
        },
        {
          "name": "sellerAddress",
          "type": "address"
        },
        {
          "name": "buyerAddress",
          "type": "address"
        },
        {
          "name": "sellerHasValidate",
          "type": "bool"
        }
      ],
      "name": "createInvoice",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "seller",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "adresse",
          "type": "address"
        },
        {
          "name": "index",
          "type": "uint256"
        },
        {
          "name": "side",
          "type": "bytes1"
        }
      ],
      "name": "Validation",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "adresse",
          "type": "address"
        },
        {
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getSellerGotPaid",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "adresse",
          "type": "address"
        },
        {
          "name": "index",
          "type": "uint256"
        },
        {
          "name": "IsVerifed",
          "type": "bool"
        }
      ],
      "name": "defaultPayment",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "buyer",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "adresse",
          "type": "address"
        },
        {
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getSellerContract",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "bool"
        },
        {
          "name": "",
          "type": "bool"
        },
        {
          "name": "",
          "type": "bool"
        },
        {
          "name": "",
          "type": "bool"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "adresse",
          "type": "address"
        },
        {
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getBuyerContract",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "bool"
        },
        {
          "name": "",
          "type": "bool"
        },
        {
          "name": "",
          "type": "bool"
        },
        {
          "name": "",
          "type": "bool"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "adresse",
          "type": "address"
        },
        {
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getTCI",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        },
        {
          "name": "",
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "adresse",
          "type": "address"
        },
        {
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "HasTciOrNot",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "adresse",
          "type": "address"
        }
      ],
      "name": "getBuyerContracts",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "adresse",
          "type": "address"
        }
      ],
      "name": "searchIndex",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "adresse",
          "type": "address"
        }
      ],
      "name": "getSellerContracts",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "adresse",
          "type": "address"
        },
        {
          "name": "index",
          "type": "uint256"
        },
        {
          "name": "idTransaction",
          "type": "bytes32"
        },
        {
          "name": "amount",
          "type": "bytes32"
        },
        {
          "name": "currency",
          "type": "bytes32"
        }
      ],
      "name": "createTCI",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "adresse",
          "type": "address"
        }
      ],
      "name": "getLength_Seller",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "adresse",
          "type": "address"
        }
      ],
      "name": "getLength_Buyer",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "adresse",
          "type": "address"
        },
        {
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "gotPaid",
      "outputs": [],
      "payable": false,
      "type": "function"
    }
  ];
var MyContract = web3.eth.contract(abi);
var central = MyContract.at('0xde807c5ff3660fc945306172b097dfe7f371ef00');

//Length of the array
var sellerLength = 0;
var buyerLength = 0;
var passed = false;


//Add Invoices
function addInvoice(invoice){
    console.log("sellerAddress: " + invoice.sellerAddress);
    console.log("buyerAddress: " + invoice.buyerAddress);
    central.createInvoice(invoice.amount, invoice.currency, invoice.dueAt, invoice.issueAt, invoice.sellerAddress.toLowerCase(), invoice.buyerAddress.toLowerCase(), invoice.sellerHasValidate, {from : web3.eth.accounts[0]}, function(err, res){
      if(err == null){
        console.log("res:" + res);
        update();
      }

      else{
        console.error("err 1:" + err);
      }
    });
}

//Get Invoices (done)
function getInvoices(address, Page){
  var invoices = [];
  var events = [];
  var loop_tci = 0;
  var loop_seller_2 = 0;
  var loop_buyer_2 = 0;
  var callEventsDone = false;
  var getEventsDone = false;
  var compteur = 0;
  console.log("address getInvoice: " + address);

  //  Get the array length
  central.getLength_Buyer(address, {from : web3.eth.accounts[0]}, function(error_1, res_1){
    var buyerLength = res_1;
    console.log("buyerLength = " + res_1);

    central.getLength_Seller(address, {from : web3.eth.accounts[0]}, function(error_2, res_2){
      var sellerLength = res_2;
      console.log("sellerLength = " + res_2);

      //  Var for the while
      var i = 0;
      var j = 0;

      //  Get the invoices of the both side (buyer and seller)
      while (i < sellerLength || j < buyerLength){
        // Get buyer
        if(j < buyerLength){
          central.getBuyerContract(web3.eth.accounts[0].toLowerCase(), j, {from : web3.eth.accounts[0]}, function(error_3, res_3){
            var invoice = {
              amount: 0,
              currency: "",
              dueAt: "",
              issueAt:"",
              sellerAddress:"",
              buyerAddress: "",
              sellerHasValidate: 0,
              buyerHasValidate: 0,
              sellerGotPaid: 0,
              HasTCI: 0,
              InModifcation: 0,
              HasBackUp: 0,
              IsSeller: 0,
              indexSeller: 0,
              indexBuyer: 0,
              status : '', //just for the interface
              ServiceAttached: {IsInDefault: 0, id :"", amount : 0, currency : ""},
              eventInvoice: null
            };
            if(error_3 == null){
              invoice.amount = parseInt(res_3[0].substr(2,34)) / 100;
              invoice.currency = hex2a(res_3[1].substr(2));
              invoice.dueAt = hex2a(res_3[2].substr(2));
              invoice.issueAt = hex2a(res_3[3].substr(2));
              invoice.sellerAddress = res_3[4];
              invoice.buyerAddress = res_3[5];
              invoice.sellerHasValidate = res_3[6];
              invoice.buyerHasValidate = res_3[7];
              invoice.sellerGotPaid = res_3[8];
              invoice.HasTCI = res_3[9];
              invoice.IsSeller = false;
              invoice.indexSeller = parseInt(res_3[10]);
              invoice.indexBuyer = parseInt(res_3[11]);

              central.getBuyerContract_2(web3.eth.accounts[0].toLowerCase(), loop_buyer_2, {from : web3.eth.accounts[0]}, function(error_, res_){
                invoice.InModifcation = res_[0];
                invoice.HasBackUp = res_[1];
                // Add this invoice
                invoices.push(invoice);
                //Get the events
                central.getLengthEvents(web3.eth.accounts[0].toLowerCase(), {from : web3.eth.accounts[0]}, function(error_, res_){
                  var lengthEvents = res_;
                  //Only if not done
                  if(!callEventsDone){ //changer lz bool mettre un autre
                    for (var k = 0; k < lengthEvents; k++) {
                      //compteur
                      compteur ++;
                      //Get the events
                      central.getEvents(web3.eth.accounts[0].toLowerCase(), k, {from : web3.eth.accounts[0]}, function(error_, res_){
                        //Decrement
                        compteur --;
                        //Tmp event
                        var _event = {
                          msg: "",
                          invoiceNumber: 0
                        };
                        //Get values
                        _event.msg = hex2a(res_[0]);
                        _event.invoiceNumber = res_[1];
                        var indexEvent = res_[2];
                        //Last asynchrone notification for the pushes
                        if(compteur == 0){
                          getEventsDone = true;
                        }
                        //Add the event
                        events.push(_event);
                        //Check if it was the last
                        if(invoices.length == parseInt(sellerLength) + parseInt(buyerLength) && getEventsDone){
                          Page.state.invoices = invoices;
                          Page.state.events = events;
                          Page.state.passed = true;
                          console.log("Renvoie de invoices = " + Page.state.invoices);
                          console.log("Renvoie des events (buyer) = " + JSON.stringify(Page.state.events));
                          console.log("Get events = " + getEventsDone);
                          Page.forceUpdate();
                        }
                      }); //asynchrone getEvents
                    }//for
                  }//if
                  //Call Events done once
                  callEventsDone = true;
                });//asynchrone getLengthEvents
              });//asynchrone displayContract_2
            }
            //  Error
            else{console.error(error_3);}
            //Incrémentation
            loop_buyer_2++;
          });
        }
        // Get seller
        if(i < sellerLength){
          central.getSellerContract(web3.eth.accounts[0].toLowerCase(), i, {from : web3.eth.accounts[0]}, function(error_4, res_4){
            //var tmp for storage
            var invoice = {
              amount: 0,
              currency: "",
              dueAt: "",
              issueAt:"",
              sellerAddress:"",
              buyerAddress: "",
              sellerHasValidate: 0,
              buyerHasValidate: 0,
              sellerGotPaid: 0,
              HasTCI: 0,
              IsSeller: 0,
              InModifcation: 0,
              HasBackUp: 0,
              indexSeller: 0,
              indexBuyer: 0,
              status : '', //just for the interface
              ServiceAttached: {IsInDefault: 0, id :"", amount : 0, currency : ""},
              eventInvoice: null
            };
            if(error_4 == null){
              invoice.amount = parseInt(res_4[0].substr(2,34)) / 100;
              invoice.currency = hex2a(res_4[1].substr(2));
              invoice.dueAt = hex2a(res_4[2].substr(2));
              invoice.issueAt = hex2a(res_4[3].substr(2));
              invoice.sellerAddress = res_4[4];
              invoice.buyerAddress = res_4[5];
              invoice.sellerHasValidate = res_4[6];
              invoice.buyerHasValidate = res_4[7];
              invoice.sellerGotPaid = res_4[8];
              invoice.HasTCI = res_4[9];
              invoice.IsSeller = true;
              invoice.indexSeller = parseInt(res_4[10]);
              invoice.indexBuyer = parseInt(res_4[11]);

              central.getSellerContract_2(web3.eth.accounts[0].toLowerCase(), loop_seller_2, {from : web3.eth.accounts[0]}, function(error_, res_){
                invoice.InModifcation = res_[0];
                invoice.HasBackUp = res_[1];
                //Get the TCI
                central.getTCI(web3.eth.accounts[0].toLowerCase(), loop_tci, {from : web3.eth.accounts[0]}, function(error_5, res_5){
                  //Add the tci
                  invoice.ServiceAttached.IsInDefault = res_5[0];
                  invoice.ServiceAttached.id = hex2a(res_5[1].substr(2));
                  invoice.ServiceAttached.amount = parseInt(res_5[3].substr(2,34)) / 100;
                  invoice.ServiceAttached.currency = hex2a(res_5[2].substr(2));
                  // Add this invoice
                  invoices.push(invoice);
                  //Refresh
                  if( invoices.length == parseInt(sellerLength) + parseInt(buyerLength) && getEventsDone){
                    console.log("events contratInteraction: " + JSON.stringify(events));
                    //  Return invoices and events
                    Page.state.invoices = invoices;
                    Page.state.events = events;
                    Page.state.passed = true;
                    console.log("Renvoie de invoices = " + Page.state.invoices);
                    Page.forceUpdate();
                  }
                  //Get the events
                  central.getLengthEvents(web3.eth.accounts[0].toLowerCase(), {from : web3.eth.accounts[0]}, function(error_, res_){
                    var lengthEvents = res_;
                    console.log("length_events: " + lengthEvents);
                    //Only if not done
                    if(!callEventsDone){
                    for (var k = 0; k < lengthEvents; k++) {
                      compteur ++;
                      //Get the events
                      central.getEvents(web3.eth.accounts[0].toLowerCase(), k, {from : web3.eth.accounts[0]}, function(error_, res_){
                        //Decrement
                        compteur --;
                        //Tmp event
                        var _event = {
                          msg: "",
                          invoiceNumber: 0
                        };
                        //Get values
                        _event.msg = hex2a(res_[0]);
                        _event.invoiceNumber = res_[1];
                        var indexEvent = res_[2];
                        //Last asynchrone notification for the pushes
                        if(compteur == 0){
                          getEventsDone = true;
                        }
                        //Add the event
                        events.push(_event);
                        //Check if it was the last
                        if(invoices.length == parseInt(sellerLength) + parseInt(buyerLength) && getEventsDone){
                          Page.state.invoices = invoices;
                          Page.state.events = events;
                          Page.state.passed = true;
                          console.log("Renvoie de invoices = " + Page.state.invoices);
                          console.log("Renvoie des events (seller)= " + JSON.stringify(Page.state.events));
                          console.log("Get events = " + getEventsDone);
                          Page.forceUpdate();
                        }
                      }); //asynchrone getEvents
                    }//for
                    }//if
                    //Call Events done once
                    callEventsDone = true;
                  });//asynchrone getLengthEvents
                }); // asynchrone tci
                //Incremnent the loop_tci
                loop_tci ++;
              }); // asynchrone display contract_2
            }
            //  Error
            else{
              console.error(error_4);
            }
            //Incremnent the index
            loop_seller_2 ++;
          }); // asynchrone seller
        } //if sellerLength

        //  Incrementation
        if(i < sellerLength){
          i++;
        }
        if(j < buyerLength){
          j++;
        }
      } //while

      //Case empty => clean events
      if(0 == parseInt(sellerLength) && 0 == parseInt(buyerLength)){
        console.log("I passed here for the null event")
        Page.state.events = null;
        Page.state.passed = true;
        Page.forceUpdate();
      }

    });

  });
}

//Declare Payement (done)
function payementDeclaration(sellerAddress, indexSeller){
  central.gotPaid(sellerAddress.toLowerCase(), indexSeller, {from : web3.eth.accounts[0]}, function(err, res){
    if(err == null){
      console.log("res:" + res);
    }
    else{
      console.error("err:" + JSON.stringify(err));
    }
  });
}

//Add or not the tci to the contract
function TCI_Validation(invoice, choice, _tmpTCI){
  if(choice == false){
    //Actualisation
    update();
  }
  else{
    console.log("sellerAdress: " + invoice.sellerAddress.toLowerCase());
    console.log("indexSeller: " + invoice.indexSeller);
    console.log("_tmpTCI: " + JSON.stringify(_tmpTCI));
    console.log("_tmpTCI.id: " + _tmpTCI.id);
    console.log("coverPrice: " + int2hex(Math.round(_tmpTCI.coverage.coverPrice)));
    console.log("currency: " + _tmpTCI.coverage.currency);
    var tmp_amount = Math.round(_tmpTCI.coverage.coverPrice);
    console.log(int2hex(tmp_amount.toString()));

    central.createTCI(invoice.sellerAddress.toLowerCase(), invoice.indexSeller, _tmpTCI.id, int2hex(tmp_amount.toString()), _tmpTCI.coverage.currency, {from : web3.eth.accounts[0]}, function(err, res){
      if(err == null){
        console.log("res:" + res);
        document.getElementById("content").innerHTML =(
        "<header class='dapp-header'>"
      +    "<div class='menuTwo'>"
      +      "Welcome " + web3.eth.accounts[0] +"!"
      +    "</div>"
      +  "</header>"
      +  "<div class='dapp-flex-content'>"
      +   "<aside class='dapp-aside'>"
      +   "</aside>"
      +    "<div class='dapp-container formTCI'>"
      +      "<h1>Your invoice info:</h1>"
      +      "<div>"
      +          "<p> You are now insured! Thanks for chosing Euler Hermes. </p> "
      +          "<button class='mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect buttonForm_2 ' onClick='update()'>Ok</button>"
      +      "</div>"
      +    "</div>"
      +  "</div>");
      }
      else{
        console.error(err);
      }
    });
  }
}

//Validation (done)
function invoiceValidation (address, indexBuyer, indexSeller, IsSeller){
  console.log("address: " + address.toLowerCase());
  console.log ("indexBuyer:" + indexBuyer);
  console.log ("indexSeller:" + indexSeller);
  console.log("IsSeller: " + IsSeller);

  var side = sideIdentification(IsSeller);
  var index;
  if(side == "b")
    index = indexBuyer;
  else {
    index = indexSeller;
  }
  console.log("side: " + side);

  central.Validation(address.toLowerCase(), index, side, {from : web3.eth.accounts[0]}, function(err, res){
    if(err == null){
      console.log("res:" + res);
    }

    else{
      console.error("err:" + JSON.stringify(err));
    }
  });
}

//Modification
function modification (sellerAddress, indexSeller, dueDate, amount, IsSeller){

  central.modifcation(sellerAddress.toLowerCase(), indexSeller, dueDate, int2hex(amount), IsSeller, {from: web3.eth.accounts[0]}, function(err, res){
    if(err == null){
      console.log("res:" + res);
      update();
    }

    else{
      console.error("err:" + err);
    }
  });
}

//Approve invoice
function approveModification (sellerAdress, indexSeller, IsSeller){

  central.approveMofification(sellerAdress.toLowerCase(), indexSeller, IsSeller, {from: web3.eth.accounts[0]}, function(err, res){
    if(err == null){
      console.log("res:" + res);
    }

    else{
      console.error("err:" + err);
    }
  });
}

//Desapprove Modification
function desapproveModification (sellerAdress, indexSeller, IsSeller){

  central.desapproveModification(sellerAdress.toLowerCase(), indexSeller, IsSeller, {from: web3.eth.accounts[0]}, function(err, res){
    if(err == null){
      console.log("res:" + res);
    }

    else{
      console.error("err:" + err);
    }
  });
}

//Remove
function remove(sellerAdress, indexSeller, buyerAddress, indexBuyer){
  //For the seller
  central.remove(sellerAdress.toLowerCase(), indexSeller, "s", {from: web3.eth.accounts[0]}, function(err, res){
    if(err == null){
      console.log("res:" + res);
      //For the buyer
      central.remove(buyerAddress.toLowerCase(), indexBuyer, "b", {from: web3.eth.accounts[0]}, function(err, res){
        if(err == null){
          console.log("res:" + res);
          update();
        }

        else{
          console.error("err:" + err);
        }
      });
    }
    else{
      console.error("err:" + JSON.stringify(err));
    }
  });
}

//Default
function declareDefault (sellerAdress, indexSeller){
  var IsVerified = true; //A redéfinir

  console.log("sellerAdress: " + sellerAdress);
  console.log("indexSeller: " + indexSeller);

  central.defaultPayment(sellerAdress.toLowerCase(), indexSeller, IsVerified, {from: web3.eth.accounts[0].toLowerCase()}, function(err, res){
    if(err == null){
      console.log("res:" + res);
      alert("Your claim has been sent!\nYou will recieve a quick response.");
    }

    else{
      console.error("err:" + JSON.stringify(err));
    }
  });
}

//Search the owner
function searchOwner(address){
  var indexOwner = 0;
  for (var i = 0; i < ACCOUNTSNAME.length; i++) {
    if (address == ACCOUNTSNAME[i].address.toLowerCase()) {
      indexOwner = i;
    }
  }
  return indexOwner;
}

//Convert hexadecimal to ASCII
function hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) {
        var v = parseInt(hex.substr(i, 2), 16);
        if (v) str += String.fromCharCode(v);
    }
    return str;
}

//Convert int to hexadecimal
function int2hex(int){
  var hex = ("000000000000000000000000000000" + int.toString(16)).substr(-32);
  hex = "0x" + hex;
  return hex;
}

//Identify the sender
function identification (sellerAddress, buyerAddress){
  if (sellerAddress.toLowerCase() == web3.eth.accounts[0].toLowerCase())
    return sellerAddress.toLowerCase();
  else {
    return buyerAddress.toLowerCase();
  }
}

function sideIdentification(IsSeller){
  var side;
  if(IsSeller)
    side = "s";
  else{
    side = "b";
  }
  return side;
}

function update(){
  ReactDOM.render(<App menudata={MENUDATA} accountsName = {ACCOUNTSNAME}/>,
  document.getElementById('content') );
}

function Currency(value){
  var result;

  if(value == "dol")
   result = "$";
  else if(value == "eur" || value == "EUR" )
   result = "€";
  else{
    result = "£";
  }
  return result;

}
