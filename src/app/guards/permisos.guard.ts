import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CanActivateChild } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class PermisosGuard implements CanActivateChild{

    constructor(
        public authService: AuthService
    ) { }

    canActivateChild(): Promise<boolean> {
        return new Promise(resolve =>{ 
            console.log('hola')
        
            this.authService.viewmenu(0).subscribe( (res:any) => {

                const {result, tipo} = res;

                result.forEach((element:any) => {
           
                    let arr = JSON.parse(element.roles);
                     if( arr.includes( tipo ) ){
                      console.log(element.roles)
                   
                      resolve(false);
                     }
                   });
    

            });
        });
    }


}



