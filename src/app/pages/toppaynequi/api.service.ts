import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from 'src/app/services/http.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public http:HttpService
  ) { }

  aliados(postDate:any):Observable<any>{
    return this.http.get('aliado/todos',postDate)
  }

  guardarParametros(postDate:any):Observable<any>{
    return this.http.post('toppay/guardar',postDate)
  }

  verParametros(postDate:any):Observable<any>{
    return this.http.get('toppay/ver',postDate)
  }

  verTabla(postDate:any):Observable<any>{
    return this.http.post('toppay/tabla',postDate)
  }

  apiNeki(postDate:any):Observable<any>{
    return this.http.post('toppay/nequi',postDate)
  }

}
