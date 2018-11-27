import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private _userService: UserService) {}

  canActivate() {
    return this._userService.isAdmin()
  }
}
