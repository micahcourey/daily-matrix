import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routing } from './app.routing';

// Services
import { UserService } from './services/user.service';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

// Guards
import { LoggedInGuard } from './guards/logged-in.guard';
import { AdminGuard } from './guards/admin.guard';

// Material Components
import {
  MatButtonModule, 
  MatFormFieldModule, 
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
  MatCardModule,
  MatDividerModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule,
  MatExpansionModule,
  MatDialogModule,
  MatSelectModule,
  MatTableModule
} from '@angular/material';

// App Components
import { AppComponent } from './app.component';
import { LoginPageComponent, ResetPasswordDialogComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ActivityEditorComponent } from './home-page/activity-editor/activity-editor.component';
import { GoalTrackerComponent, GoalDialogComponent } from './home-page/goal-tracker/goal-tracker.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { MatrixComponent } from './home-page/matrix/matrix.component';
import { LeaderboardComponent } from './home-page/leaderboard/leaderboard.component';

const routes: Routes = [ ];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    ActivityEditorComponent,
    GoalTrackerComponent,
    GoalDialogComponent,
    ResetPasswordDialogComponent,
    AdminPageComponent,
    MatrixComponent,
    LeaderboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    routing,
    RouterModule.forRoot(routes),
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatDividerModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule
  ],
  providers: [
    UserService,
    LoggedInGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [GoalDialogComponent, ResetPasswordDialogComponent]
})
export class AppModule { }
