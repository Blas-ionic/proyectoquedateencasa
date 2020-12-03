import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../model/usuarios.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { InfoUser } from '../interfaces/infouser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/';
  private apikey = 'AIzaSyAPx9z5CkbOCJTiDG6CZeyZ6U02to4ZQEQ';

  userToken: string;

  constructor(private http: HttpClient) { this.leerToken(); }

  login(usuario: UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}accounts:signInWithPassword?key=${this.apikey}`,
      authData).pipe(
        map( (resp: any) => {
          this.guardarToken( resp.idToken, resp.displayName);
          return resp;
        })
      );
  }

  logout(){
    localStorage.clear();
  }

  nuevoUsuario(usuario: UsuarioModel, uuid: string){
    const authData = {
      ...usuario,
      displayName: uuid,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}accounts:signUp?key=${this.apikey}`,
      authData).pipe(
        map( (resp: any) => {
          this.guardarToken( resp.idToken, resp.displayName);
          return resp;
        })
      );
  }

  private guardarToken(idToken: string, uuid: string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    localStorage.setItem('uuid', uuid);

  }

  leerToken(){
    if (localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAuthenticado(): boolean {
    return this.userToken.length > 2;
  }

  getUser(){
    const authData = {
      idToken: localStorage.getItem('token')
    };
    return this.http.post(`${this.url}accounts:lookup?key=${this.apikey}`, authData);
  }

  postUser(infusuario: InfoUser){
    const authData = {
      ...infusuario
    };
    return this.http.post(`${environment.urlUser}users.json`, authData);
  }

  getInfoUser(uuid: string){
    return this.http.get(`${environment.urlUser}users/${uuid}.json`);
  }

  putEmail(usuario: UsuarioModel){
    console.log(usuario);
    const authData = {
      idToken: localStorage.getItem('token'),
      email: usuario.email,
      returnSecureToken: true
    };
    console.log(authData);
    return this.http.post(`${this.url}accounts:update?key=${this.apikey}`,
    authData).pipe(
      map( (resp: any) => {
        this.guardarToken( resp.idToken, resp.displayName);
        return resp;
      })
    );;
  }

  putInfoUser(infusuario: InfoUser){
    const uuid = localStorage.getItem('uuid');
    const AuthData = {
      ...infusuario
    };
    return this.http.put(`${environment.urlUser}users/${uuid}.json`, AuthData);
  }
}
