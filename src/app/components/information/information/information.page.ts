import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {

  constructor() { }

  img1 = '../.././/assets/images/quedate_portada.jpg';
  img2 = '../.././/assets/images/Catedral.jpg';

  ngOnInit() {
  }

}
