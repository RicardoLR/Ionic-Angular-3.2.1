import { Injectable } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class GeolocationService{

	constructor(private geolocation: Geolocation) {}

	
	/** 
	@return Promisse */    
    get(){
        return this.geolocation.getCurrentPosition();
    }

}