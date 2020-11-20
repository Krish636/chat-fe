import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from './_guards/user.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [UserGuard],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
