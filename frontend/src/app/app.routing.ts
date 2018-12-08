import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

// Guards
import { AuthGuard } from './auth.guard'

// Components
import { LoginPageComponent } from './login-page/login-page.component'
import { SignupPageComponent } from './signup-page/signup-page.component'
import { HomePageComponent } from './home-page/home-page.component'
import { AdminPageComponent } from './admin-page/admin-page.component'

const appRoutes: Routes = [
  { path: '', component: SignupPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)
