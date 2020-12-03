import { Component, Input, OnInit } from '@angular/core';
import { RespuestaPosts } from '../../interfaces/interfaces';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {

  @Input() posts: RespuestaPosts[] = [];

  constructor() { }

  ngOnInit() {
  }

}
