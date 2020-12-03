import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab4Page } from './tab4.page';
import { InformationPageModule } from '../../components/information/information/information.module';

const routes: Routes = [
  {
    path: '',
    component: Tab4Page,
  },
  {
    path: 'comunidad',
    loadChildren: () => import('../../components/about/comunity/comunity.module').then(m => m.ComunityPageModule)
  }
  ,
  {
    path: 'informacion',
    loadChildren: () => import('../../components/information/information/information.module').then(m => m.InformationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab4PageRoutingModule {}
