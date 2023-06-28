import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor( public authService: AuthService,private storageService: StorageService, private router: Router){ }

  canActivate(): Promise<boolean> {
    return new Promise(resolve =>{ 
      resolve(true);
      this.storageService.get(AuthConstants.AUTH).then(res =>{ 
        if(res){ 

          const newStr = this.router.url.slice(1);

          this.verificarPermiso(newStr).then((res)=>{
            resolve(true);
          }).catch(err => {
            this.router.navigate(['']);
            resolve(true);
          });
        
        }else{ 
          this.router.navigate(['login']);
          resolve(false);
        }
      })
      .catch(err =>{ 
        resolve(false)
      })
    })
  }

  verificarPermiso = (newStr:any) => {
    return new Promise( (resolve, reject) => {
      const urlActual = {newStr}

      this.authService.viewmenu(0).subscribe( (res:any) => {
        const {result, tipo} = res;
        let newArr:any = [];
        let i = 0;
  
         result.forEach((element:any) => {
         
         let arr = JSON.parse(element.roles);
          if( arr.includes( tipo ) ){
            newArr.push(result[i])
          }
          i++;
        
        });

        if( !newArr.find( (res:any) => res.menu === urlActual.newStr ) ){
          
          reject( false);
        }
        
        resolve( true );

      });

    })
  }

  
}
