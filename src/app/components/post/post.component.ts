import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() post: any = {};

  img1 = '../.././/assets/images/quedate_portada.jpg';

  constructor() { }

  ngOnInit() {}

}
