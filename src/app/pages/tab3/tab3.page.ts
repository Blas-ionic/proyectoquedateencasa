import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicies/auth.service';
import { Router } from '@angular/router';
import { LoadingController, MenuController, PopoverController } from '@ionic/angular';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  constructor(
    private auth: AuthService,
    private router: Router,
    private popoverController: PopoverController,
    private loadingController: LoadingController
    ) {}

  img1 = '../.././/assets/avatars/av-1.png';

  user: any = {};
  userInfo: any = {};
  loading: HTMLIonLoadingElement;
  habilitar = true;


  ngOnInit() {
    this.perfilLoading();
    setTimeout( () => {
      this.getUser();
      this.getInfor();
    }, 1000);
  }

  logout(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopinfoComponent,
      event: ev,
      translucent: true
    });
    await popover.present();
    const { data } = await popover.onWillDismiss();
  }

  async perfilLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Espere un momento...',
      duration: 2000
    });
    await this.loading.present();
  }

  doRefresh(event) {
    this.habilitar = true;
    this.getUser();
    this.getInfor();
    setTimeout(() => {
      event.target.complete();
      this.habilitar = false;
    }, 500);
  }

  getUser(){
    this.auth.getUser().subscribe((resp: any) => {
      this.user = resp.users[0];
    });
  }

  getInfor(){
    const uuid = localStorage.getItem('uuid');
    this.auth.getInfoUser(uuid).subscribe( infoUser => {
      this.userInfo = infoUser;
    });
  }

}
