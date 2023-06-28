import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class IndexGuard implements CanActivate {

  constructor( private storageService: StorageService, private router: Router){ }

  canActivate(): Promise<boolean> {
    return new Promise(resolve =>{ 
      resolve(true);
      this.storageService.get(AuthConstants.AUTH).then(res =>{ 
        if(res){ 
          this.router.navigate(['dashboard']);
          resolve(false);
        }else{ 
          resolve(true);
        }
      })
      .catch(err =>{ 
        resolve(false)
      })
    })
  }
}
