import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Transaction } from '../../database';
import { Adding as AddingPage } from '../adding/adding';


import { WalletService } from '../../services/wallet.service';

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


  constructor(public navCtrl: NavController, public navParams: NavParams, private walletService :WalletService) {
  }


  /* ionViewDidLoad Carga la vista cuando carga por primera vez
  y
  ionicViewWillEnter carga pagina cuando regresa y cuando entran por primera vez */
  ionViewWillEnter() {
    this.walletService.validateFirstWallet();
    console.log( "this.walletService", this.walletService.getStorageID() );


    /** Ejemplo cargando una transaccion de ejemplo */
    let transaction = new Transaction(20,"Primera Transaccion");
    transaction.save();

    this.loadTransactionsIndexBD();
  }

  /** Cargaras todas las transacciones locales "de indexDB" */
  loadTransactionsIndexBD(){
    Transaction.all().then( (resultados)=>{
      this.transactions=resultados;
      console.log(this.transactions);
    });
  }

}
