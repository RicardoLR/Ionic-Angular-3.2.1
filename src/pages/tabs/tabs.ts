import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';


import { Transations } from '../transations/transations';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Transations;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
