// Loading web3
/*var Web3 = require('web3');
metamaskLoaded = 0;
if (typeof web3 !== 'undefined') {
  // If a web3 is already loaded i.e. metamask
  web3 = new Web3(web3.currentProvider);
  metamaskLoaded = 1;
} else {
  // Otherwise load the web3 provided in the html file and connect it to a local node
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}*/

var MENUDATA = {
  nameList:['Invoices', 'New invoice']  //Insérer les noms des nouvelles pages ici
};

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

//Store the promise response
var tmpInvoice;
var dateDefaultPayement = "Fri Sep 29 2017 00:00:00 GMT+0200 (CEST)";
var dueAt_Default = "2017-09-29";

// The full page
class App extends React.Component{
  constructor(){
    super();
    this.state = {
      currentPage: 0,
      meName : null,
      himName : null,
      meAddress : null,
      himAddress : null,
      alert :[{}],

    };
  }

  handleMenuClick(i){
    this.setState({
      currentPage:i,
    })
  }

  handlePageClick(value,fields){
      if (this.state.currentPage == 0){

      }
      else if (this.state.currentPage == 1){

      }
      else if (this.state.currentPage == 2){

      }
  }

  render(){
    var tries = 0;
    while (web3.eth.accounts[0] == '' && tries < 100){sleep(100);tries++;}
    if (web3.eth.accounts[0] == ''){
      return (
        <div>
          <Menu
          entries = {this.props.menudata.nameList} onClick={(i)=>this.handleMenuClick(i)}
          accountsName = {this.props.accountsName}/>
          <span> Your web3 provider didnt return an account in time, are you sure you have one?</span>
        </div>
        );
    }
    return(
      <div>
        <Menu
          entries = {this.props.menudata.nameList} onClick={(i)=>this.handleMenuClick(i)}
          accountsName = {this.props.accountsName}/>
        <Page
          currentPage = {this.state.currentPage} currentAccount={web3.eth.accounts[0]}
          onClick={(value,fields)=> this.handlePageClick(value,fields)}
          accountsName = {this.props.accountsName}/>
      </div>
    );
  }
}
// The menu Bar
class Menu extends React.Component{

  change(){
    changeAccount();
  }
  render(){
    //console.log(currentAccount)
    //console.log(web3.eth.getTransactionsByAccount(currentAccount))
    var menuEntries = this.props.entries.map(function(name,index){
      return (<a href="#" key={index} onClick={()=>this.props.onClick(index)}>
                  <i className="icon-envelope-letter"></i>
                  <span>{name}</span>
                </a>);

    },this);
    var nameOfAccount = this.props.accountsName[currentAccount];
    return (
      <header className="dapp-header">

          <div className="menuOne">
            <nav>
              <ul>
                <li>
                  {menuEntries}
                </li>
              </ul>
            </nav>
          </div>
          <div className="menuTwo">
            <select className="inputWhite inputAccounts" onChange={()=>this.change()} id="account">
        			<option  value="0x76d499C529cc06323EA0c5d5edcf9B11c02597cB" >Total</option>
        			<option value="0xC30F6af2c92eFd81DC27D30ccD573B0dA675D3b1" >Air France</option>
              <option value="0x8764eAD14051407D2761FeE6fab8597B07FE803c">Darty</option>
              <option value="0x29d773c667cEE478Fc22Fd756F772Fb5f719a39b">HSBC</option>
        		</select>
          </div>

      </header>
      )
  }
}
// The content
class Page extends React.Component{
  constructor(){
    super();

    this.state = {
      invoices : null,
      events : null,
      passed : true,
      invoiceSelected: null,
    };
    //  Call all th invoices registered for the current address
    //var currentAccount = currentAccount.toLowerCase();
    getInvoices(currentAccount, this);
    console.log("I passed once in the constructor")
  }

  render(){
    if(!this.state.passed){
      console.log("I passed once in the render")
      getInvoices(currentAccount.toLowerCase(), this);
    }
    this.state.passed = false;
    //console.log("events myjs: " + JSON.stringify(this.state.events));

    // Here we determine the status of the invoice
    if(this.state.invoices != null){
      this.state.invoices.map(function(Id,index){
        var status = null;
        var sBuyerApproved = this.state.invoices[index].buyerHasValidate;
        //var sBuyerPaid = this.state.invoices[index].BuyerPaid;
        var sSellerApproved = this.state.invoices[index].sellerHasValidate;
        var sSellerGotPaid = this.state.invoices[index].sellerGotPaid;

        var parts = this.state.invoices[index].dueAt.split('-');
        var sInvoiceDueDate = new Date(parts[0], parts[1]-1, parts[2]);

        //#Test Default
        var IsDefaultDate = (sInvoiceDueDate == dateDefaultPayement)? true:false;
        if(IsDefaultDate){
          this.state.invoices[index].duAt = "18-08-2017";
          sInvoiceDueDate = new Date("2017","08","18");
        }

        // Today's date
        var q = new Date();
        var m = q.getMonth();
        var d = q.getDate();
        var y = q.getFullYear();
        var date = new Date(y,m,d);

        // Invoice not approved if both parties didn't approve it. Going nowhere without that
        if (!sBuyerApproved || !sSellerApproved){
          status = "Waiting for Approval";
        }

        // Invoice approved but payment late
        else if ( (sInvoiceDueDate < date && (!sSellerGotPaid))){ //#A ENlever IsDefaultDate
          status = "Late";
        }

        else if (sSellerGotPaid){
          //this.state.invoices[index].BuyerPaid = 1;
          status = "Paid";
        }
        //#
        else if(IsDefaultDate){
          status = "Late";
        }

        else{
          status = 'Awaiting Payment';
        }

        this.state.invoices[index].status = status;

      },this
      );

    }

    if (this.props.currentPage == 1){
      return(<div>
          <InvoiceCreation onClick={(value,fields)=>this.props.onClick(value,fields)}
            />
        </div>
        );
    }


    else if (this.props.currentPage==0){
      return(<div>
          <InvoicesList onClick={(value,fields)=>this.props.onClick(value,fields)}
                        state = {this.state}
            />
        </div>
        );
    }
    else{
      return(<div>
          <Error
            />
        </div>
        );
    }

  }
}


// From now on those classes represent the different pages.

class InvoiceCreation extends React.Component{

  createInvoice(){
    //The owner is seller or not
    var indexOwner = searchOwner(currentAccount.toLowerCase());
    var buyerAddress = "";
    var sellerAddress = "" ;
    var sellerHasValidate_ = false;
    //Set seller and buyer
    if(document.getElementById('seller').checked){
      sellerAddress = ACCOUNTSNAME[indexOwner].address;
      buyerAddress = document.getElementById('counterpart').value;
      sellerHasValidate_ = true;
    }
    else{
      sellerAddress = document.getElementById('counterpart').value;
      buyerAddress = ACCOUNTSNAME[indexOwner].address;
      sellerHasValidate_ = false;
    }
    var today = new Date().toISOString().slice(0, 10);
    var amount = int2hex(document.getElementById('amount').value);
    var dueDate = document.getElementById('dueDate').value;
    var unit = document.getElementById('unit').value;

    var invoice = {
      Id : 0,
      buyerAddress: buyerAddress.toLowerCase(),
      sellerAddress: sellerAddress.toLowerCase(),
      amount : amount,
      currency : unit,
      dueAt: dueDate,
      issueAt : today,
      sellerHasValidate: sellerHasValidate_,
      Status:'',
      BuyerPaid : 0,
      SellerGotPaid: 0
      //ServiceAttached : [] // for the TCI but this will be after
    };
    console.log(invoice);
    //Ajout d'invoice au contrat
    addInvoice(invoice);
  }

  render(){
    var indexOwner = searchOwner(currentAccount.toLowerCase());
    var today = new Date().toISOString().slice(0, 10);

    var buyerList = ACCOUNTSNAME.map(function(name,index){
      if(ACCOUNTSNAME[index].name != ACCOUNTSNAME[indexOwner].name){
        return(<option key={index} value={ACCOUNTSNAME[index].address}>{ACCOUNTSNAME[index].name}</option>);
      }
    },this);
    return(<div className="dapp-flex-content">

        <aside className="dapp-aside">

        </aside>

        <main className="dapp-content">

          <div className="dapp-container">
            <h1>Enter your invoice info:</h1>
            <div>
                <div>
                  <p>
                    <label for='owner'>You are:</label><br/>
                    <input type="radio" name="type" className="radio_" id="seller" value="seller" > Seller </input> <br/>
                    <input type="radio" name="type" className="radio_" id="buyer" value="buyer"> Buyer </input>
                  </p>


                  <p>
                    <label for='counterpart'>Counterpart</label><br/>

                    <select name='counterpart' size='1' id='counterpart' className="inputForm inputWhite" >
                      {buyerList}
                    </select>
                  </p>

                   <p>
                    <label for='amount'>Amount</label><br/>
                    <input type="number" name="amount"  className= "amount inputForm inputWhite" id="amount" required/>

                    <select name='unit' className="unit" size='1' id='unit' className="inputForm_currency inputWhite">
                      <option value = "eur"> € </option>
                      <option value = "dol"> $ </option>
                      <option value = "pou"> £ </option>
                    </select>
                  </p>

                  <p>
                    <label for='dueDate'>Due Date</label><br/>
                    <input type="Date" name="dueDate" min={today} className="inputForm" id="dueDate" required/>
                  </p>
                </div>

                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect buttonForm" onClick={()=>this.createInvoice()}> Submit </button>
            </div>
          </div>

        </main>

        <aside className="dapp-actionbar">

        </aside>
      </div>
      );
  }
}

class InvoicesList extends React.Component{

  handleUpdate(){
    /* look for other alerts Ideally would show the status of the different
       invoices*/
  }

  handleClick(index){

    if (this.props.state.invoiceSelected == index){
      this.props.state.invoiceSelected = null;
    }
    else{
      this.props.state.invoiceSelected = index;
    }
    this.forceUpdate();
  }

  approveInvoice(index){
    var adresse = identification(this.props.state.invoices[index].sellerAddress, this.props.state.invoices[index].buyerAddress);
    invoiceValidation(adresse, this.props.state.invoices[index].indexBuyer, this.props.state.invoices[index].indexSeller, this.props.state.invoices[index].IsSeller);
  }

  declarePayment(index){
    console.log(this.props.state.invoices[index].sellerAddress);
    payementDeclaration(this.props.state.invoices[index].sellerAddress, this.props.state.invoices[index].indexSeller);
  }

  subscribeTCI(index, Page){
    //TCI_form(this.props.state.invoices[index], Page);
    var tci = <TCI state = {this.props.state.invoices[index]} scenario = {0}/>;
    ReactDOM.render(tci, document.getElementById('content'));
  }

  editInvoice(index){
    var editInvoice = <Edit_Invoice state = {this.props.state.invoices[index]}/>;
    ReactDOM.render(editInvoice, document.getElementById('content'));
  }

  approveModif(index){
    approveModification(this.props.state.invoices[index].sellerAddress, this.props.state.invoices[index].indexSeller, this.props.state.invoices[index].IsSeller);
  }

  desapproveModif(index){
    var HasBackUp = this.props.state.invoices[index].HasBackUp;

    if(HasBackUp){
      console.log("HasBackUp: " + HasBackUp);
      console.log("IsSeller: " + this.props.state.invoices[index].IsSeller);
      console.log("InModifcation: " + this.props.state.invoices[index].InModifcation);
      desapproveModification(this.props.state.invoices[index].sellerAddress, this.props.state.invoices[index].indexSeller, this.props.state.invoices[index].IsSeller);
    }
    else{
      alert("There is no backup for this invoice.");
    }
  }

  removeInvoice(index){
    remove(this.props.state.invoices[index].sellerAddress, this.props.state.invoices[index].indexSeller, this.props.state.invoices[index].buyerAddress, this.props.state.invoices[index].indexBuyer);
  }

  declareClaim(index){
    console.log("sellerAddress " + this.props.state.invoices[index].sellerAddress);
    console.log("indexSeller " + this.props.state.invoices[index].indexSeller);
    console.log("indexSeller " + this.props.state.invoices[index].indexSeller);
    declareDefault(this.props.state.invoices[index].sellerAddress, this.props.state.invoices[index].indexSeller);
  }

  archive(index){
    alert('Invoice Archived');
  }

  statusAction(index){
    // Invoice statuses
    var waitingForApproval = this.props.state.invoices[index].status == "Waiting for Approval";
    var late = this.props.state.invoices[index].status == 'Late';
    var paid = this.props.state.invoices[index].status == 'Paid';
    var awaitingPayment = this.props.state.invoices[index].status == 'Awaiting Payment';

    var iAmBuyer = this.props.state.invoices[index].buyerAddress.toLowerCase() == currentAccount.toLowerCase();
    var buyerApproved = this.props.state.invoices[index].buyerHasValidate;
    var iAmSeller = this.props.state.invoices[index].sellerAddress.toLowerCase() == currentAccount.toLowerCase();
    var sellerApproved = this.props.state.invoices[index].sellerHasValidate;
    var sellerGotPaid = this.props.state.invoices[index].sellerGotPaid;
    var InModifcation = this.props.state.invoices[index].InModifcation;
    var sInvoiceDueDate = this.props.state.invoices[index].dueAt;

    //#A ENlever
    //var IsDefaultDate = (sInvoiceDueDate == dateDefaultPayement)? true:false;

    if (waitingForApproval){
        if ((iAmBuyer && !buyerApproved) ||( iAmSeller && !sellerApproved)){
          if(InModifcation){
            return(
              <div className="invoiceAction">
                <button className="invoiceActionInside" onClick={() => this.approveModif(index)}>Approve Modification</button>
              </div>
            );
          }
          else{
            return(
              <div className="invoiceAction">
                <button className="invoiceActionInside" onClick={() => this.approveInvoice(index)}>Approve Invoice</button>
              </div>
            );
          }
        }

        if(iAmBuyer && buyerApproved)
          return(
            <div className="invoiceAction">
              <button className="invoiceActionInsideInactive"  >Waiting Seller Approval</button>
            </div>
          );

        if(iAmSeller && sellerApproved)
          return(
            <div className="invoiceAction">
              <button className="invoiceActionInsideInactive"  >Waiting Buyer Approval</button>
            </div>
          );
    }
    if (late){
      if ((iAmSeller && !sellerGotPaid))
        return(
          <div className="invoiceAction">
            <button className="invoiceActionInside" onClick={() => this.declarePayment(index)}>Declare Payment</button>
          </div>
        );
      if ((iAmBuyer && !sellerGotPaid))
        return(
          <div className="invoiceAction">
            <button className="invoiceActionInsideInactive" >Waiting for seller to get paid</button>
          </div>
        );
    }

    if (paid){
        return(
          <div className="invoiceAction">
            <button className="invoiceActionInsideInactive" onClick={() => this.archive(index)}>Archived</button>
          </div>
        );
    }

    if (awaitingPayment){
      if (iAmSeller && !sellerGotPaid)  //#&& IsDefaultDate
        return(
          <div className="invoiceAction">
            <button className="invoiceActionInside" onClick={() => this.declarePayment(index)}>Declare Payment</button>
          </div>
        );
      if ((iAmBuyer && !sellerGotPaid)){
        //console.log('iAmBuyer')
        return(
          <div className="invoiceAction">
            <button className="invoiceActionInsideInactive" >Waiting for seller to get paid</button>
          </div>
        );
      }
    }



  }

  serviceAction(index){
    var hasTCI = this.props.state.invoices[index].HasTCI;
    var iAmSeller = this.props.state.invoices[index].sellerAddress.toLowerCase() == currentAccount.toLowerCase();
    var InDefault = this.props.state.invoices[index].ServiceAttached.IsInDefault;
    var late = this.props.state.invoices[index].status == 'Late';
    var paid = this.props.state.invoices[index].status == 'Paid';
    var buyerApproved = this.props.state.invoices[index].buyerHasValidate;
    var sellerApproved = this.props.state.invoices[index].sellerHasValidate;

    if (iAmSeller){
      if (!hasTCI && !paid && buyerApproved && sellerApproved && !late){ //&& !late
        return(
          <div  className="serviceAction">
            <button className="serviceActionInside"onClick={() => this.subscribeTCI(index)}>Subscribe to a TCI</button>
          </div>
        );
      }
      else if( (hasTCI && !InDefault)){ //#|| ((hasTCI && !InDefault) && IsDefaultDate
        if (this.props.state.invoices[index].status == "Late" &&  !InDefault){
          return(
            <div  className="serviceAction">
              <button className="serviceActionInside" onClick={() => this.declareClaim(index)}>Declare a claim</button>
            </div>
          );
        }
        //A mettre en bas en dehors du else if sinon ne rentrera jamais
        else if (InDefault){
          return(
            <div  className="serviceAction">
              <button className="serviceActionInsideInactive" >Default payment activated</button>
            </div>
          );
        }
        else{
          return(
            <div  className="serviceAction">
              <button className="serviceActionInsideInactive" >Insurance registered</button>
            </div>
          );
        }
      }
    }
  }

  serviceEdit(index){
    var paid = this.props.state.invoices[index].status == 'Paid';
    var InModifcation = this.props.state.invoices[index].InModifcation;
    var buyerApproved = this.props.state.invoices[index].buyerHasValidate;
    var sellerApproved = this.props.state.invoices[index].sellerHasValidate;
    var awaitingPayment = this.props.state.invoices[index].status == 'Awaiting Payment';

    if(!paid){
      return(
        <div className="serviceAction">
          <button className="serviceActionInside"onClick={() => this.editInvoice(index)}>Edit</button>
        </div>
      );
    }
  }

  serviceDesaprove(index){
    var iAmBuyer = this.props.state.invoices[index].buyerAddress.toLowerCase() == currentAccount.toLowerCase();
    var buyerApproved = this.props.state.invoices[index].buyerHasValidate;
    var iAmSeller = this.props.state.invoices[index].sellerAddress.toLowerCase() == currentAccount.toLowerCase();
    var sellerApproved = this.props.state.invoices[index].sellerHasValidate;
    var InModifcation = this.props.state.invoices[index].InModifcation;

    if( ((iAmBuyer && !buyerApproved) ||( iAmSeller && !sellerApproved)) && !InModifcation ){
      return(
        <div className="serviceAction">
          <button className="invoiceActionInside" onClick={() => this.removeInvoice(index)}>Desapprove Invoice</button>
        </div>
      );
    }
  }

  serviceRestauration(index){
    var iAmBuyer = this.props.state.invoices[index].buyerAddress.toLowerCase() == currentAccount.toLowerCase();
    var buyerApproved = this.props.state.invoices[index].buyerHasValidate;
    var iAmSeller = this.props.state.invoices[index].sellerAddress.toLowerCase() == currentAccount.toLowerCase();
    var sellerApproved = this.props.state.invoices[index].sellerHasValidate;
    var InModifcation = this.props.state.invoices[index].InModifcation;

    if (((iAmBuyer && !buyerApproved) ||( iAmSeller && !sellerApproved)) && InModifcation){
      return(
        <div className="serviceAction">
          <button className="invoiceActionInside" onClick={() => this.desapproveModif(index)}>Back to the last agreed invoice</button>
        </div>
      );
    }
  }

  tciDetails(index){
    var IsInDefault = this.props.state.invoices[index].ServiceAttached.IsInDefault;
    var HasTCI = this.props.state.invoices[index].HasTCI;
    var iAmSeller = this.props.state.invoices[index].sellerAddress.toLowerCase() == currentAccount.toLowerCase();
    var paid = this.props.state.invoices[index].status == 'Paid';
    var currency = Currency(this.props.state.invoices[index].ServiceAttached.currency);

    if(HasTCI && iAmSeller){
      if(IsInDefault){
        return(
          <div>
            <div className="content">
              <span className="status">Recovery process : Activated</span>
            </div>

            <div className="content tci">
              <ul>
                <li className="tci">ID: {this.props.state.invoices[index].ServiceAttached.id}</li>
                <li className="tci">Coverage amount: {this.props.state.invoices[index].ServiceAttached.amount + "€"}</li>
              </ul>
            </div>
          </div>
        );
      }
      else{
        return(
          <div className="content">
            <span className="status">Recovery process : Desactivated</span>
          </div>
        );
      }
    }

    else{

    }

  }

  numberInvoice(index){
    var buyerTmp = this.props.state.invoices[index].buyerAddress;

    if (buyerTmp.toLowerCase() == currentAccount.toLowerCase()){
      var numberInvoice = parseInt(this.props.state.invoices[index].indexBuyer) + 1;
      return(
        <button className="mdl-button mdl-js-button mdl-button--fab invoiceNumber buttonBuyer">{numberInvoice}</button>
      );
    }

    else{
      var numberInvoice = parseInt(this.props.state.invoices[index].indexSeller) + 1;
      return(
        <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored invoiceNumber">{numberInvoice}</button>
      );
    }
  }


  render(){
    var events = null;
    //Invoices
    if(this.props.state.invoices != null){
      var invoiceList = this.props.state.invoices.map(function(Id,index){
        var buyerTmp = this.props.state.invoices[index].buyerAddress;

        if (buyerTmp.toLowerCase() == currentAccount.toLowerCase()){
          buyerTmp = "You";
        }


        var sellerTmp = this.props.state.invoices[index].sellerAddress;
        if (sellerTmp.toLowerCase() == currentAccount.toLowerCase()){
          sellerTmp = "You";
        }

        var invoiceAction = this.statusAction(index);
        var serviceAction = this.serviceAction(index);
        var serviceEdit = this.serviceEdit(index);
        var serviceDesaprove = this.serviceDesaprove(index);
        var serviceRestauration = this.serviceRestauration(index);
        var tciDetails = this.tciDetails(index);
        var numberInvoice = this.numberInvoice(index);

        if(this.props.state.invoices[index].dueAt == dueAt_Default){
          var dueAt = "2017-04-20";
        }
        else{
          var dueAt = this.props.state.invoices[index].dueAt;
        }

        var currency = Currency(this.props.state.invoices[index].currency);

        var HasTCI;
        if(sellerTmp == "You")
          HasTCI = this.props.state.invoices[index].HasTCI? "Has TCI : Yes" : "Has TCI : No";


        if (buyerTmp == "You" || sellerTmp == "You"){
        if (this.props.state.invoiceSelected != index){
          return (<div key={index}>
                    <div className="content">
                      {numberInvoice}
                    </div>
                     <div className="invoiceSummary" onClick={()=>this.handleClick(index)}>
                        <div className="content">
                          <span className="buyer">Buyer : {buyerTmp}</span>
                          <span className="amount">Amount : {this.props.state.invoices[index].amount} {currency}</span>
                        </div>
                        <div className="content">
                          <span className="seller">Seller : {sellerTmp}</span>
                          <span className="amount">Status : {this.props.state.invoices[index].status}</span>
                        </div>
                      </div>
                    <div>
                      {invoiceAction}
                    </div>
                  </div>);
        }
        else
          return (<div key={index}>
                    <div className="content">
                      {numberInvoice}
                    </div>
                     <div className="invoiceSummary" onClick={()=>this.handleClick(index)}>
                      <div className="content">
                        <span className="buyer">Buyer : {buyerTmp}</span>
                        <span className="amount">Amount : {this.props.state.invoices[index].amount} {currency}</span>

                      </div>
                      <div className="content">
                        <span className="seller">Seller : {sellerTmp}</span>
                        <span className="amount">Status : {this.props.state.invoices[index].status}</span>
                      </div>

                      <div className="content">
                        <span className="sellerApproved">Seller approved : {this.props.state.invoices[index].sellerHasValidate? "Yes" : "No"}</span>
                        <span className="buyerApproved">Buyer approved: {this.props.state.invoices[index].buyerHasValidate? "Yes" : "No"}</span>
                      </div>

                      <div className="content">
                        <span className="sellerApproved">Seller got paid : {this.props.state.invoices[index].sellerGotPaid? "Yes" : "No"}</span>
                      </div>

                      <div className="content">
                        <span className="status">Due : {dueAt}</span>
                      </div>

                      <div className="content">
                        <span className="status">{HasTCI}</span>
                      </div>

                      <div className="content">
                        <span className="status left">{tciDetails}</span>
                      </div>

                    </div>
                    <div>
                      {invoiceAction}
                    </div>
                    <div>
                      {serviceEdit}
                    </div>
                    <div>
                      {serviceRestauration}
                    </div>
                    <div>
                      {serviceAction}
                    </div>
                    <div>
                    {serviceDesaprove}
                    </div>
                    </div>);
      }

      },this);
    }
    //Events
    if(this.props.state.events != null){
     var length = this.props.state.events.length;

     events = this.props.state.events.map(function(Id, index){
       //Display the three recent event only
        if( length <= 4 || ( (length > 4) && (index > length - 5) ) ){
          var IsSeller = this.props.state.events[index].IsSeller;
          var invoiceNumber = parseInt(this.props.state.events[index].invoiceNumber) + 1;
          if(IsSeller)
            var Id = <span className="IsSeller">{invoiceNumber}. </span>
          else
            var Id = <span className="IsBuyer">{invoiceNumber}. </span>

          //key
          var key_ = index + 98;
          //Default Payment
          if(this.props.state.events[index].msg == "default"){
            return(
              <div key={key_}>
                <div className="oaerror danger">
                  <strong>{Id}</strong> Is in default.
                </div><br/>
              </div>
            );
          }
          else if (this.props.state.events[index].msg == "modificationDesapproved."){
            return(
              <div key={key_}>
                <div className="oaerror warning">
                  <strong>{Id}</strong> Modification has been desaproved.
                </div> <br/>
              </div>
            );
          }
          else{
            //Defintion of the right message
            var _event = this.props.state.events[index].msg.toString();
            var message;
            if(_event == "creation")
              message = "Has been created.";
            else if(_event == "payment")
              message = "Has been paid.";
            else if(_event == "creationTCI")
              message = "A TCI has been created.";
            else if(_event == "validation")
              message = "Has been approved.";
            else if(_event == "modification")
              message = "Has been modified.";
            else if(_event == "modificationApproved")
              message = "Modification has been approved.";
            else if(_event == "removed")
              message = "An invoice has been removed.";
            //Return
            return(
              <div key={key_}>
                <div className="oaerror success">
                <strong>{Id}</strong>{message}
                </div><br/>
              </div>
            );
          }
        }
      }, this);
    }

    return(
      <div className="dapp-flex-content">

        <aside className="dapp-aside">
          <div className="container event_position">
             <div className="row">
                {events}
              </div>
          </div>
        </aside>

        <main className="dapp-content">
          <div className="dapp-container" id="content">
            <h1>Your invoices<em></em></h1>
            <div id="wrap">
              {invoiceList}
            </div>
          </div>
        </main>

        <aside className="dapp-actionbar">
        </aside>

      </div>
      );
  }

}

class TCI extends React.Component{

  Form_TCI(){
    //  Form
      var currency = Currency(this.props.state.currency);
      var sellerName = "";
      var buyerName = "";
      //console.log(this.props.state.invoices)
      for (var i = 0; i < ACCOUNTSNAME.length; i++) {
        if (this.props.state.sellerAddress.toLowerCase() == ACCOUNTSNAME[i].address.toLowerCase()) {
          sellerName = ACCOUNTSNAME[i].name;
        }
        if (this.props.state.buyerAddress.toLowerCase() == ACCOUNTSNAME[i].address.toLowerCase()) {
          buyerName = ACCOUNTSNAME[i].name;
        }
      }

      return (
        <div>
          <h1>Your invoice info:</h1>
              <div>
                <p>
                  <label for='seller'>Seller</label><br/>
                  <input type='text' name='seller'  className= 'inputForm' id='seller' value=  {sellerName}  disabled/>
                </p>

                <p>
                  <label for='buyer'>Buyer</label><br/>
                  <input type='text' name='buyer'  className='inputForm' id='buyer' value={buyerName} disabled/>
                </p>

                 <p>
                  <label for='amount'>Amount</label><br/>
                  <input type='text' name='amount'  className= 'inputForm' id='amount' value={this.props.state.amount + currency} disabled/>
                 </p>

                <p>
                  <label for='issueDate'>Issue date</label><br/>
                  <input type='text' name='issueDate' id='issueDate' className='inputForm' value={this.props.state.issueAt} disabled/>
                </p>

                <p>
                  <label for='dueDate'>Due date</label><br/>
                  <input type='text' name='dueDate' id='dueDate' className='inputForm' value={this.props.state.dueAt} disabled/>
                </p>
              </div>

              <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect buttonForm' onClick={() => this.reload(1, true)}> Estimate TCI </button>
        </div>
      );
  }

  //  Display result API
  display_API_request(){
    //  Variables
    var _sellerId = "";
    var _buyerId = "";
    for (var i = 0; i < ACCOUNTSNAME.length; i++) {
      if (this.props.state.sellerAddress.toLowerCase() == ACCOUNTSNAME[i].address.toLowerCase()) {
        _sellerId = ACCOUNTSNAME[i].id;
      }
      if (this.props.state.buyerAddress.toLowerCase() == ACCOUNTSNAME[i].address.toLowerCase()) {
        _buyerId = ACCOUNTSNAME[i].id;
      }
    }
    var _amount = this.props.state.amount;
    var _currency = this.props.state.currency;
    var _dueAt = this.props.state.dueAt;
    var _issueAt = this.props.state.issueAt;
    tmpInvoice = {
      amount: this.props.state.amount,
      currency: this.props.state.currency,
      dueAt: this.props.state.dueAt,
      issueAt:this.props.state.issueAt,
      sellerAddress:this.props.state.sellerAddress,
      buyerAddress: this.props.state.buyerAddress,
      sellerHasValidate: this.props.state.sellerHasValidate,
      buyerHasValidate: this.props.state.buyerHasValidate,
      sellerGotPaid: this.props.state.sellerGotPaid,
      HasTCI: this.props.state.HasTCI,
      IsSeller: this.props.state.IsSeller,
      indexSeller: this.props.state.indexSeller,
      indexBuyer: this.props.state.indexBuyer,
      status : this.props.state.status
    };
    console.log("_sellerId: " + _sellerId)
    console.log("_buyerId: " + _buyerId)
    console.log("_amount: " + _amount)
    console.log("_currency: " + _currency)
    console.log("_dueAt: " + _dueAt)
    console.log("_issueAt: " + _issueAt)
    //Call the API
    var jqxhr = $.get( "API_request.php", { sellerId: _sellerId, buyerId: _buyerId, invoice_Amount: _amount, invoice_currency: _currency, invoice_dueAt: _dueAt, invoice_issueAt: _issueAt}, function(data) {
      console.log( "success" );
    })
      .done(function(data) {
        if (data == "") {
          alert("There was an error with the API for this invoice.\nPlease, check the dueDate.");
          update();
        }
        else{
          var _data = JSON.parse(data);
          console.log(_data);
          //get the data
          var tci = JSON.parse(_data.tci);
          console.log(tci);
          var api_status = JSON.parse(_data.status);
          console.log(api_status);
          //Display the result
          ReactDOM.render(<API_request invoice={tmpInvoice} tci={tci} scenario={0} api_status={api_status} />, document.getElementById('content') );
        }
    });

    return(<div className="loader loader_2"></div>);
  }

  reload(value, bool){
    var invoice = {
      amount: this.props.state.amount,
      currency: this.props.state.currency,
      dueAt: this.props.state.dueAt,
      issueAt:this.props.state.issueAt,
      sellerAddress:this.props.state.sellerAddress,
      buyerAddress: this.props.state.buyerAddress,
      sellerHasValidate: this.props.state.sellerHasValidate,
      buyerHasValidate: this.props.state.buyerHasValidate,
      sellerGotPaid: this.props.state.sellerGotPaid,
      HasTCI: this.props.state.HasTCI,
      IsSeller: this.props.state.IsSeller,
      indexSeller: this.props.state.indexSeller,
      indexBuyer: this.props.state.indexBuyer,
      status : this.props.state.status
    };
    var tci = <TCI state={invoice} scenario={value} choice={bool}/>;
    ReactDOM.render(tci, document.getElementById('content'));
  }

  render(){
    //  Get the content
    if(this.props.scenario == 0)
      var content = this.Form_TCI();
    else if (this.props.scenario == 1)
      var content = this.display_API_request();
    else
      var content = this.final_message();

    return(
      <div>
        <header className="dapp-header">

            <div className="menuOne">
            </div>
            <div className="menuTwo">
              <select className="inputWhite inputAccounts" id="account" onchange="changeAccount()">
                <option  value="0x76d499C529cc06323EA0c5d5edcf9B11c02597cB">Total</option>
                <option value="0xC30F6af2c92eFd81DC27D30ccD573B0dA675D3b1">Air France</option>
                <option value="0x8764eAD14051407D2761FeE6fab8597B07FE803c">Darty</option>
                <option value="0x29d773c667cEE478Fc22Fd756F772Fb5f719a39b">HSBC</option>
              </select>
            </div>

        </header>

        <div className="dapp-flex-content">

          <aside className="dapp-aside">

          </aside>

          <main className="dapp-content">
            <div className="dapp-container formTCI">
              {content}
            </div>

          </main>

          <aside className="dapp-actionbar">

          </aside>
        </div>
      </div>
      );
  }

}

class API_request extends React.Component{

  Rejected(){
    return(
      <div>
          <h3> Euler Hermes can not provide coverage for the supplied invoice. </h3>
          <p>
              <label for='status' className='label_'>Status: </label><br/>
              <p type='text' className='result_2' name='status' id='status'>{this.props.tci.status} </p>
          </p>
          <p>
              <label for='status' className='label_'>Rejection reason: </label><br/>
              <p type='text' className='result_2' name='status' id='status'>{this.props.tci.rejectionReason }</p>
          </p>
          <button id='false' className='mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored buttonForm' onClick={() => this.reload(2, false)}> Ok </button>
      </div>
    );
  }

  Pending(){
    var currency = Currency(this.props.tci.coverage.currency);

    return(
      <div>
        <h1>Your TCI info:</h1>
        <div>
            <p>
              <label for='status' className='label_'>Status: </label><br/>
              <p type='text' className='result' name='status' id='status'>{this.props.tci.status} </p>
            </p>
              <p>
                <label for='amount' className='label_'>Cover price: </label><br/>
                <p type='text' className='result' name='amount' id='amount'> {Math.round(this.props.tci.coverage.coverPrice) + currency} </p>
              </p>
            <button id='false' value ='"+ invoice_form +"' className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent buttonForm_2' onClick={() => this.reload(2, false)}> Cancel</button>
            <button id='true' value ='"+ invoice_form +"' className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect buttonForm_2 ' onClick={() => this.reload(2, true)}> Pay for this TCI </button>
        </div>
    </div>
   );
 }

 Error(){
   return(
     <div>
       <h1>An error occured..</h1>
       <div>
           <p>
             <label for='status' className='label_'>Status: </label><br/>
             <p type='text' className='result' name='status' id='status'>{this.props.tci.message} </p>
           </p>
           <button id='false' className='mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored buttonForm' onClick={() => this.reload(2, false)}> TRY AGAIN  </button>
       </div>
   </div>
  );
 }

  final_message(){
    var invoice = {
      sellerAddress: this.props.invoice.sellerAddress,
      indexSeller: this.props.invoice.indexSeller
    };
    TCI_Validation(invoice, this.props.choice, this.props.tci);
  }

  reload(value, bool){
    var invoice = {
      amount: this.props.invoice.amount,
      currency: this.props.invoice.currency,
      dueAt: this.props.invoice.dueAt,
      issueAt:this.props.invoice.issueAt,
      sellerAddress:this.props.invoice.sellerAddress,
      buyerAddress: this.props.invoice.buyerAddress,
      sellerHasValidate: this.props.invoice.sellerHasValidate,
      buyerHasValidate: this.props.invoice.buyerHasValidate,
      sellerGotPaid: this.props.invoice.sellerGotPaid,
      HasTCI: this.props.invoice.HasTCI,
      IsSeller: this.props.invoice.IsSeller,
      indexSeller: this.props.invoice.indexSeller,
      indexBuyer: this.props.invoice.indexBuyer,
      status : this.props.invoice.status
    };
    var tci = this.props.tci;
    var tci = <API_request invoice={invoice} scenario={value} choice={bool} tci={tci}/>;
    ReactDOM.render(tci, document.getElementById('content'));
  }

  render(){
    //  Get the content
    if(this.props.scenario == 0){
      if(this.props.tci.status == "Rejected")
        var content = this.Rejected();
      else if (this.props.tci.status == "Pending")
        var content = this.Pending();
      else
        var content = this.Error();
    }
    else{
      var content = this.final_message();
    }


    return(
      <div>
        <header className="dapp-header">

            <div className="menuOne">
            </div>
            <div className="menuTwo">
              <select className="inputWhite inputAccounts" id="account" onchange="changeAccount()">
                <option  value="0x76d499C529cc06323EA0c5d5edcf9B11c02597cB">Total</option>
                <option value="0xC30F6af2c92eFd81DC27D30ccD573B0dA675D3b1">Air France</option>
                <option value="0x8764eAD14051407D2761FeE6fab8597B07FE803c">Darty</option>
                <option value="0x29d773c667cEE478Fc22Fd756F772Fb5f719a39b">HSBC</option>
              </select>
            </div>

        </header>

        <div className="dapp-flex-content">

          <aside className="dapp-aside">

          </aside>

          <main className="dapp-content">
            <div className="dapp-container formTCI">
              {content}
            </div>

          </main>

          <aside className="dapp-actionbar">

          </aside>
        </div>
      </div>
      );
  }
}

class Edit_Invoice extends React.Component{

  form_Modification(){
    //  Form
      var currency = Currency(this.props.state.currency);
      var sellerName = "";
      var buyerName = "";
      //console.log(this.props.state.invoices)
      for (var i = 0; i < ACCOUNTSNAME.length; i++) {
        if (this.props.state.sellerAddress.toLowerCase() == ACCOUNTSNAME[i].address.toLowerCase()) {
          sellerName = ACCOUNTSNAME[i].name;
        }
        if (this.props.state.buyerAddress.toLowerCase() == ACCOUNTSNAME[i].address.toLowerCase()) {
          buyerName = ACCOUNTSNAME[i].name;
        }
      }

      return (
        <div>
          <h1>Your invoice info:</h1>
              <div>
                <p>
                  <label for='seller'>Seller</label><br/>
                  <input type='text' name='seller'  className= 'inputForm' id='seller' value=  {sellerName}  disabled/>
                </p>

                <p>
                  <label for='buyer'>Buyer</label><br/>
                  <input type='text' name='buyer'  className='inputForm' id='buyer' value={buyerName} disabled/>
                </p>

                 <p>
                 <label for='amount'>Amount</label><br/>
                   <input type="number" name="amount"  className= "amount inputForm" id="amount" placeholder={this.props.state.amount} required/>
                   <input type="unit" name="currency"  className= "unit inputForm_currency disableEur" id="currency" value={currency} disabled/>
                 </p>

                <p>
                  <label for='issueDate'>Issue date</label><br/>
                  <input type='text' name='issueDate' id='issueDate' className='inputForm' value={this.props.state.issueAt} disabled/>
                </p>

                <p>
                  <label for='dueDate'>Due date</label><br/>
                  <input type='date' name='dueDate' min={this.props.state.dueAt} id='dueDate' className='inputForm' placeholder={this.props.state.dueAt} required/>
                </p>
              </div>

              <button id='false' value ='"+ invoice_form +"' className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent buttonForm_2' onClick={() => this.cancel()}> Cancel</button>
              <button id='true' value ='"+ invoice_form +"' className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect buttonForm_2 ' onClick={() => this.edit()}> Edit </button>
              <button id='true' value ='"+ invoice_form +"' className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect buttonForm_2 ' onClick={() => this.erase()}> Delete </button>
        </div>
      );
  }

  erase(){
    remove(this.props.state.sellerAddress, this.props.state.indexSeller, this.props.state.buyerAddress, this.props.state.indexBuyer);
  }

  edit(){
    var sellerAddress = this.props.state.sellerAddress;
    var indexSeller = this.props.state.indexSeller;
    var IsSeller = this.props.state.IsSeller;

    var dueDate = document.getElementById("dueDate").value;
    var amount = document.getElementById("amount").value;

    modification(sellerAddress, indexSeller, dueDate, amount, IsSeller);
  }

  cancel(){
    update();
  }

  render(){
    //  Get the content
    var content = this.form_Modification();

    return(
      <div>
        <header className="dapp-header">

            <div className="menuOne">
            </div>
            <div className="menuTwo">
              <select className="inputWhite inputAccounts" id="account" onchange="changeAccount()">
                <option  value="0x76d499C529cc06323EA0c5d5edcf9B11c02597cB">Total</option>
                <option value="0xC30F6af2c92eFd81DC27D30ccD573B0dA675D3b1">Air France</option>
                <option value="0x8764eAD14051407D2761FeE6fab8597B07FE803c">Darty</option>
                <option value="0x29d773c667cEE478Fc22Fd756F772Fb5f719a39b">HSBC</option>
              </select>
            </div>

        </header>

        <div className="dapp-flex-content">

          <aside className="dapp-aside">

          </aside>

          <main className="dapp-content">
            <div className="dapp-container formTCI">
              {content}
            </div>

          </main>

          <aside className="dapp-actionbar">

          </aside>
        </div>
      </div>
      );
  }
}

class Error extends React.Component{
  render(){
    return(
      <div className="dapp-flex-content">

        <aside className="dapp-aside">

        </aside>

        <main className="dapp-content">
          <div className="dapp-container">
            <h1>Error : The Page you requested does not exist</h1>


          </div>

        </main>

        <aside className="dapp-actionbar">

        </aside>
      </div>
      );
  }

}


ReactDOM.render(<App menudata={MENUDATA} accountsName = {ACCOUNTSNAME}/>,
document.getElementById('content') );
