import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { UsuarioModel } from '../../model/usuarios.model';
import { AuthService } from '../../servicies/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { InfoUser } from 'src/app/interfaces/infouser';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;

  usuario: UsuarioModel;
  loading: HTMLIonLoadingElement;

  infoUser: InfoUser = {
    description: '',
    username: '',
    name: '',
    photoUrl: 'av-1.png'
  };

  registerUser: UsuarioModel = {
    email: '',
    displayName: '',
    photoUrl: '',
    password: ''
  };

  constructor(
    private auth: AuthService,
    private router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController
    ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    this.initLoading();
  }

  ionViewDidEnter(){
    this.slides.lockSwipes( true );
  }

  login(form: NgForm){
    if (form.invalid) { return; }
    this.logincSuccess();
    setTimeout( () => {
      this.auth.login(this.usuario)
        .subscribe( (resp: any) => {
          this.loading.dismiss();
          this.toastSuccess(resp.email);
          this.router.navigateByUrl('/tabs/tab2');
        }, (err) => {
          this.loading.dismiss();
          this.toastError();
          console.log(err);
        });
    }, 2000);
  }

  async logincSuccess() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Espere un momento...',
      // duration: 2000
    });
    await this.loading.present();
  }

  async initLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Bienvenido',
      duration: 1000
    });
    await this.loading.present();
  }

  async toastSuccess(message: string) {
    const toast = await this.toastController.create({
      message: `Bienvenido ${message}`,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }

  async toastError() {
    const toast = await this.toastController.create({
      message: 'Correo y/o Contraseña Incorrecta.',
      position: 'bottom',
      duration: 2500
    });
    toast.present();
  }

  registro(form: NgForm){
    if (form.invalid) { return; }
    this.auth.postUser(this.infoUser).subscribe((resp: any) => {
    const uuid = resp.name;
    this.auth.nuevoUsuario(this.registerUser, uuid)
      .subscribe( usuario => {
        console.log(usuario);
        this.router.navigateByUrl('/tabs/tab2');
      }, (err) => {
        console.log(err);
      });
    });
  }

  mostrarRegistro(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  mostrarLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

}
