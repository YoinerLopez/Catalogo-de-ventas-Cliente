import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {path:'', redirectTo:'/auth', pathMatch:'full'},
  { path: 'auth', loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard', loadChildren:()=>import('src/app/dashboard/dashboard.module').then(m=>m.DashboardModule)}
  //{ path:"**", redirectTo: '/auth', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
