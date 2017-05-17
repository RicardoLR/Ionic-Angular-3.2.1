import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';


import { Transaction } from '../../database';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { GeolocationService } from '../../services/geolocation.service';
import { Geolocation } from '@ionic-native/geolocation';


/**
 * > ionic g page Adding
 */
@IonicPage()
@Component({
	selector: 'page-adding',
	templateUrl: 'adding.html',
})
export class Adding {

	//transactionModel: Transaction;
	transactionModel :Transaction = new Transaction(null, "");
	shouldGeolocateMe: boolean = false;
	shouldSend: boolean = true;
	imageData: string;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private camera: Camera, 
		private geolocator: GeolocationService, 
		private platform: Platform,
		private geolocation: Geolocation) {
	}


	ionViewDidLoad() {
		this.transactionModel = new Transaction(null,"");
	}

	getPhoto(){
		let cameraOptions:CameraOptions = {
			quality: 20,
			destinationType: this.camera.DestinationType.DATA_URL,
			sourceType: this.camera.PictureSourceType.CAMERA,
			allowEdit: false,
			encodingType: this.camera.EncodingType.JPEG,
			targetWidth: 100,
			targetHeight: 100,
			saveToPhotoAlbum: false
		};
		this.camera.getPicture(cameraOptions).then((imageData)=>{
			let base64Image = 'data:image/jpeg;base64,'+imageData;
			this.imageData=base64Image;
			this.transactionModel.imageUrl=this.imageData;
		}).catch((err)=>console.log(err));
	}

	getLocation(){
		this.shouldSend=false;

		if(this.shouldGeolocateMe){

			/** Problemas con Geolocation */
			this.geolocator.myPosition().then( (pos)=>{
				this.transactionModel.setCoords(pos.coords);

				console.log(this.transactionModel);
				this.shouldSend=true;
				//console.log(pos.coords.latitude);
			}).catch( (err)=>{
				console.log(err);

				/** Problemas con Geolocation */
		        navigator.geolocation.getCurrentPosition( (pos)=>{
					this.transactionModel.setCoords(pos.coords);

					console.log(this.transactionModel);
					this.shouldSend=true;
					//console.log(pos.coords.latitude);
		        })
			});


		}else{
			this.transactionModel.cleanCoords();
			this.shouldSend=true;
			console.log(this.transactionModel);
		}
	}

	save(){
		if(this.shouldSend){
			this.transactionModel.save().then( result => {
				this.transactionModel = new Transaction(null,"");

				// Quito esta vista de la pila "stack", regreso a vista Transation
				this.navCtrl.pop();
			});
		}
	}


}
