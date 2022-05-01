import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, RouterEvent } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkRoleUser(next);
  }
  
  checkRoleUser(route: ActivatedRouteSnapshot): boolean {
    const scopes: any[] = this.userRoles();
    if (this.identifyRelationship(scopes, route, false)) return true;
    else { this.router.navigate(['/','not-access']); return false; }
  }

  identifyRelationship(userRoles: any, route: ActivatedRouteSnapshot, state: boolean): boolean {
    for(let role of route.data.role) { state = userRoles.includes(role); if(state) break; }
    return state;
  }

  userRoles(): any {
    var arrayRoles = [];
    var roles = JSON.parse(localStorage.getItem('currentUser')!).user.roles;
    for (let role of roles) { arrayRoles.push(role.id) }; 
    return arrayRoles; 
  }
}
