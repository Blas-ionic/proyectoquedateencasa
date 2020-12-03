import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../servicies/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../../model/usuarios.model';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    public toastController: ToastController
    ) { }

    user: any = [];
    info: any = [];
    loading: HTMLIonLoadingElement;

  ngOnInit() {
    this.onUser();
    this.onInfo();
  }

  onUpdate(form: NgForm){
    console.log(this.user.email);
    this.auth.putEmail(this.user)
      .subscribe(resp => {
        this.toastSuccess();
        this.router.navigateByUrl('/tabs/tab3');
      }, (err) => {
        this.toastError();
      });
  }

  onUpdateInfo(form: NgForm){
    console.log(this.info);
    this.auth.putInfoUser(this.info)
      .subscribe( resp => {
        this.toastSuccess();
        this.router.navigateByUrl('/tabs/tab3');
      });
  }

  async toastSuccess(){
    const toast = await this.toastController.create({
      message: 'Actualizado Completamente',
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }

  async toastError(){
    const toast = await this.toastController.create({
      message: 'El correo ya existe.',
      position: 'bottom',
      duration: 2500
    });
    toast.present();
  }

  async perfilLoading(){
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Espere un momento...',
      duration: 2000
    });
    await this.loading.present();
  }

  onUser(){
    this.auth.getUser()
    .subscribe((resp: any) => {
        this.user = resp.users[0];
      });
  }

  onInfo(){
    const uuid = localStorage.getItem('uuid');
    this.auth.getInfoUser(uuid)
    .subscribe(resp => {
      this.info = resp;
    });
  }

}
