import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Transaction} from '../../database';


/**
 * Generated class for the Transations page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-transations',
  templateUrl: 'transations.html',
})
export class Transations {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Transations');

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
