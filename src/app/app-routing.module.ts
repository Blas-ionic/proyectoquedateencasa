import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', canActivate: [ AuthGuard ] ,
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)},
  {
    path: 'editar', canActivate: [ AuthGuard ],
    loadChildren: () => import('./components/tab3/edit/edit.module').then(m => m.EditPageModule)
  },
  { path: '**', pathMatch: 'full', redirectTo: '/splash'},
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
