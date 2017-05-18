import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad Wallets');
		Wallet.all().then( resultWallets => this.wallets = resultWallets );

	}

}
