import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

// Guards
import { LoggedInGuard } from './guards/logged-in.guard'
import { AdminGuard } from './guards/admin.guard'

// Components
import { LoginPageComponent } from './login-page/login-page.component'
import { HomePageComponent } from './home-page/home-page.component'
import { AdminPageComponent } from './admin-page/admin-page.component'

const appRoutes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'home', component: HomePageComponent, canActivate: [LoggedInGuard] },
  { path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)
