import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SiginupComponent } from './components/auth/siginup/siginup.component';
import { CartComponent } from './views/cart/cart.component';
import { PreferencesComponent } from './views/preferences/preferences.component';
import { ReadersComponent } from './views/readers/readers.component';

const routes: Routes = [
  { path: '', redirectTo: '/cart', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SiginupComponent },
  { path: 'cart', component: CartComponent },
  { path: 'preferences', component: PreferencesComponent },
  { path: 'readers', component: ReadersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
