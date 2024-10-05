import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterActorsComponent } from './pages/register-actors/register-actors.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [

  { path: 'home', component:HomeComponent  },
  { path: 'register', component:RegisterActorsComponent  },
  { path: 'users', component:UsersComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
