import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GetInfoService}from './get-info.service'
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private GetinfoService:GetInfoService,public router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.GetinfoService.isLoggedIn()) {
      console.log(state.url);
      
      if (state.url == "/dash-board") {
        this.router.navigate(["/friend-list"]);
      }
      if (state.url == "/signup") {
        this.router.navigate(["/friend-list"]);
      }
      return true;
    } else {
      if (state.url == "/dash-board") {
        return true;
      }
      if (state.url == "/signup") {
        return true;
      }
      this.router.navigate(["/dash-board"]);
    }
  }
}
