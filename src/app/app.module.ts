import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// ionic nativo
// 
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';


// Pagina "componentes" propios
import { Transations } from '../pages/transations/transations';
import { Adding } from '../pages/adding/adding';
import { Wallets } from '../pages/wallets/wallets';
import { Map } from '../pages/map/map';

import { NewWallet } from '../pages/new-wallet/new-wallet';


import { GeolocationService } from '../services/geolocation.service';
import { WalletService } from '../services/wallet.service';
import { TransactionService } from '../services/transaction.service';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,

    Transations,
    Adding,
    Map,
    Wallets,
    NewWallet
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,

    Transations,
    Adding,
    Map,
    Wallets,
    NewWallet
  ],
  providers: [
    Geolocation,
    GoogleMaps,
    Camera,
    GeolocationService,
    WalletService,
    TransactionService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
