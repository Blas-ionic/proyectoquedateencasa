import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { Componente } from 'src/app/interfaces/componente';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page {

  constructor(private popoverController: PopoverController) { }

  componentes: Componente[] = [
    {
      icon: 'help-circle-outline',
      name: 'Información',
      redirecTo: '/tabs/quedatecasa/informacion'
    },
    {
        icon: 'people-outline',
        name: 'Comunidad',
        redirecTo: '/tabs/quedatecasa/comunidad'
    }
  ];

  img1 = '../.././/assets/images/quedate_portada.jpg';
  img2 = '../.././/assets/images/Catedral.jpg';

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopinfoComponent,
      event: ev,
      translucent: true
    });
    await popover.present();
    const { data } = await popover.onWillDismiss();
  }

}
