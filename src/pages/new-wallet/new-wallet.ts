import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { Wallet } from '../../database';

/**
 * Generated class for the NewWallet page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-new-wallet',
	templateUrl: 'new-wallet.html',
})
export class NewWallet {

	walletModel :Wallet = new Wallet(null, "");

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad NewWallet');
	}

	save(){
		this.walletModel.save().then(()=>{
			this.navCtrl.pop();

		});
	}


}
