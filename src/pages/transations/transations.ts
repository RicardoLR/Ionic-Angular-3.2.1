import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Adding as AddingPage } from '../adding/adding';

import { Wallet as WalletModel } from '../../database';

import { WalletService } from '../../services/wallet.service';
import { TransactionService } from '../../services/transaction.service';

/** 
 * > ionic g page Transations 
 */
@IonicPage()
@Component({
  selector: 'page-transations',
  templateUrl: 'transations.html',
})
export class Transations {

  public title:string = "Transacciones";
  public transactions:any;

  /** propiedad para agregar una nueva vista por arriva de esta [navPush]="myAddingPage" */
  public myAddingPage = AddingPage;

  public myWalletActual :WalletModel = new WalletModel(0, "");


  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private walletService :WalletService, private transactionService:TransactionService) {
  }


  /* ionViewDidLoad Carga la vista cuando carga por primera vez
  y
  ionicViewWillEnter carga pagina cuando regresa y cuando entran por primera vez */
  ionViewWillEnter() {

    if( this.walletService.empty() ){
      this.walletService.validateFirstWallet();
      console.log( "this.walletService.getStorageID()", this.walletService.getStorageID() );
    }

    this.loadTransactionsIndexBD();

    this.loadWalletActual();
  }

  /** Cargaras todas las transacciones locales "de indexDB" */
  loadTransactionsIndexBD(){
    this.transactionService.all().then( (resultados)=>{
      this.transactions=resultados;
      console.log(this.transactions);
    });
  }

  loadWalletActual(){
    this.walletService.getMainWallet().then( (wallet) =>{
      this.myWalletActual = wallet;
    });
  }

}
