import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { PopinfoComponent } from './popinfo/popinfo.component';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';

@NgModule({
  declarations: [
    PostComponent,
    PostsComponent,
    PopinfoComponent,
    AvatarSelectorComponent
  ],
  exports: [
    PostsComponent,
    PopinfoComponent,
    AvatarSelectorComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
