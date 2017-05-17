import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

// Estalaciones nativas
import { Geolocation } from '@ionic-native/geolocation';


import {
	GoogleMaps,
	GoogleMap,
	GoogleMapsEvent,
	LatLng
} from '@ionic-native/google-maps';


//import { GoogleMapsLatLng, GoogleMapsMarkerOptions, GoogleMapsMarker } from 'ionic-native';

import { GeolocationService } from '../../services/geolocation.service';
import { Transaction } from '../../database';


/**

*/
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class Map {

  public map:GoogleMap;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
  	private geolocator: GeolocationService, 

  	private platform: Platform,
    private geolocation: Geolocation,
    private googleMaps: GoogleMaps) {}


  ionViewDidEnter() {

	this.geolocator.myPosition().then( (pos)=>{

	  //Cargar Mapa
	  this.loadMap(pos.coords.latitude, pos.coords.longitude);
	}).catch((err)=>{
		console.log(err);

		/** Problemas con Geolocation */
        navigator.geolocation.getCurrentPosition( (pos)=>{
        	console.log("map.ts", pos);
		  	//Cargar Mapa
		  	this.loadMap(pos.coords.latitude, pos.coords.longitude);
        })
	});
  }

  
  loadMap(lat, lng){
	let location = new LatLng(lat, lng);

	let element: HTMLElement = document.getElementById('map');
	this.map = this.googleMaps.create(element,
		{
			'controls':{
				'compass':true,
				'myLocationButton':true,
				'indoorPicker':true,
				'zoom':true
			},
			'gestures':{
				'scroll':true,
				'tilt':true,
				'rotate':true,
				'zoom':true
			},
			'camera':{
				'latLng': location,
				'tilt':30,
				'zoom':15,
				'bearing':50
			}
		}
	);

	/** When Map is ready */
	this.map.one(GoogleMapsEvent.MAP_READY).then( () => {
        this.loadMarkerMyPosition(location);
		this.loadMarkers();
	});

  }

  loadMarkerMyPosition(location :LatLng){
	let markerOptions = {
		position: location,
		title: 'Aqui esta'
	};

	this.map.addMarker(markerOptions).then((marker) => {
		marker.showInfoWindow();
	});
  }


  loadMarkers(){
	Transaction.all().then( (results)=>this.loadTransactionMarkers(results) );
  }

  loadTransactionMarkers(transactions){
	for (var i = 0;i < transactions.length;i++){
	  let transaction = transactions[i];

	  if(!transaction.hasLocation()) continue;
	  
	  let markerLocation  = new LatLng(transaction.lat, transaction.lng);

	  let markerOptions = {
		position: markerLocation,
		title: transaction.title,
		icon: transaction.getImage()
	  };

	  this.map.addMarker(markerOptions).then((marker)=>{
		marker.showInfoWindow();
	  }).catch((err)=>console.log(err));
	}
  }



}
