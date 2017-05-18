import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { NewWallet } from '../new-wallet/new-wallet';

import { Wallet, IWallet } from '../../database';


/**
 */
@IonicPage()
@Component({
  selector: 'page-wallets',
  templateUrl: 'wallets.html',
})
export class Wallets {

	wallets: IWallet[];

	/* Agregar pagina por arriba de la tab Wallet vinculada por [navPush]="addNewWalletPage" */
	addNewWalletPage = NewWallet;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewWillEnter() {
		console.log('ionViewDidLoad Wallets');
		Wallet.all().then( resultWallets => this.wallets = resultWallets );

	}

}
