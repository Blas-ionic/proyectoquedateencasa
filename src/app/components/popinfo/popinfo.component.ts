import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Componente } from '../../interfaces/componente';
import { AuthService } from '../../servicies/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popinfo',
  templateUrl: './popinfo.component.html',
  styleUrls: ['./popinfo.component.scss'],
})
export class PopinfoComponent implements OnInit {

  items: Componente[] = [
    {
      name: 'Perfil',
      redirecTo: '/tabs/quedatecasa/informacion'
    },
    {
      name: 'Acerca de',
      redirecTo: '/tabs/quedatecasa/comunidad'
    }
  ];

  constructor(private popoverController: PopoverController, private auth: AuthService, private router: Router) { }

  ngOnInit() {}

  onPerfil(){
    this.popoverController.dismiss(
      this.router.navigateByUrl('/tabs/usuario')
    );
  }
  onAbout(){
    this.popoverController.dismiss(
      this.router.navigateByUrl('/tabs/quedatecasa')
    );
  }

  logout(){
    this.popoverController.dismiss(
      this.auth.logout()
    );

    this.popoverController.dismiss(
      this.router.navigateByUrl('/login')
    );
  }

}
