import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { Transaction } from '../../database';
import { GeolocationService } from '../../services/geolocation.service';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * > ionic g page Adding
 */
@IonicPage()
@Component({
	selector: 'page-adding',
	templateUrl: 'adding.html',
})
export class Adding {

	//model: Transaction;
	model :Transaction = new Transaction(null, "");
	shouldGeolocate: boolean = false;
	shouldSend: boolean = true;
	imageData: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, 
		private camera: Camera, public geolocator: GeolocationService) {
	}

	ionViewDidLoad() {
		this.model = new Transaction(null,"");
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
			this.model.imageUrl=this.imageData;
		}).catch((err)=>console.log(err));
	}

	getLocation(){
		this.shouldSend=false;
		
		if(this.shouldGeolocate){

			this.geolocator.get().then( (resultado)=>{

				this.model.setCoords(resultado.coords);

				console.log(this.model);
				this.shouldSend=true;
				//console.log(resultado.coords.latitude);
			}).catch((err)=>console.log(err));
		
		}else{
			this.model.cleanCoords();
			this.shouldSend=true;
			console.log(this.model);
		}
	}

	save(){
		if(this.shouldSend){
			this.model.save().then( result => {
			this.model = new Transaction(null,"");

			// Quito esta vista de la pila "stack", regreso a vista Transation
			this.navCtrl.pop();
			});
		}
	}


}
