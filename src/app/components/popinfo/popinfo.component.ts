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
      redirecTo: '/tabs/tab4//informacion'
    },
    {
      name: 'Acerca de',
      redirecTo: '/tabs/tab4/comunidad'
    }
  ];

  constructor(private popoverController: PopoverController, private auth: AuthService, private router: Router) { }

  ngOnInit() {}

  onPerfil(){
    this.popoverController.dismiss(
      this.router.navigateByUrl('/tabs/tab3')
    );
  }
  onAbout(){
    this.popoverController.dismiss(
      this.router.navigateByUrl('/tabs/tab4')
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
