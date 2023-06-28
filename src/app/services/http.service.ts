import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  

  get( serviceName: string, data: any){ 
     // alert(data)
    const token = localStorage.getItem(AuthConstants.AUTH);

    const headers = new HttpHeaders({
      "Accept": "application/json",
      "x-token": token || ''
    });

    const options = { headers: headers, withCredeintials: false, };
    const url     = environment.apiUrl + serviceName;
    
    return this.http.get(url ,options);

  }

  post( serviceName: string, data: any){ 

    const token = localStorage.getItem(AuthConstants.AUTH);
   
    const headers = new HttpHeaders({
      "Accept": "application/json",
      "x-token": token || ''
    });
    const options = { headers: headers, withCredeintials: false, };
    const url     = environment.apiUrl + serviceName;
    
    return this.http.post(url, data,options);

  }

  put( serviceName: string, data: any){ 

    const token = localStorage.getItem(AuthConstants.AUTH);

    const headers = new HttpHeaders({
      "Accept": "application/json",
      "x-token": token || ''
    });
    const options = { headers: headers, withCredeintials: false, };
    const url     = environment.apiUrl + serviceName;
    
    return this.http.put(url, data,options);

  }

  delete( serviceName: string, data: any){ 

    const token = localStorage.getItem(AuthConstants.AUTH);

    const headers = new HttpHeaders({
      "Accept": "application/json",
      "x-token": token || ''
    });
    const options = { headers: headers, withCredeintials: false, };
    const url     = environment.apiUrl + serviceName;
    
    return this.http.delete(url,options);

  }
}
