import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { RespuestaPosts } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;

 constructor(private http: HttpClient) { }

 getPosts(pull: boolean = false) {
  this.paginaPosts ++;
  if (pull) {
    this.paginaPosts = 0;
  }

  return this.http.get<RespuestaPosts>(`${URL}/wp/v2/pages?pagina=${this.paginaPosts}`);
  }
}
