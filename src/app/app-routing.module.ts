import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutPageComponent} from './about/about-page.component';
import {CompilerMainComponent} from './compiler-main/compiler-main.component';

const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'main', component: CompilerMainComponent },
    { path: 'about', component: AboutPageComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
