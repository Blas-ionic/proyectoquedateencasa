import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { PostsService } from 'src/app/servicies/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private postsService: PostsService, private popoverController: PopoverController) {}

  posts: any = [];
  habilitar = true;

  ngOnInit() {
    this.nextPost();
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

  refreshPost(event){
    this.nextPost(event, true);
  }

  nextPost( event?, pull: boolean = false ){
    if (pull){
      this.habilitar = true;
      this.posts = [];
    }
    this.postsService.getPosts(pull)
      .subscribe((resultado: any) => {
        this.posts = resultado;
        if (event) {
          event.target.complete();
          if ( resultado.length === 0 ){
          this.habilitar = false;
          }
        }
      });
  }

}
