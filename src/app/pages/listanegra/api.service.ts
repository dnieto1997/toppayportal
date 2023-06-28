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

  todo(postDate:any):Observable<any>{
    return this.http.get('listanegra/ver',postDate)
  }

  crear(postDate:any):Observable<any>{
    return this.http.post('listanegra/crear',postDate)
  }

  editar(postDate:any):Observable<any>{
    return this.http.post('listanegra/editar',postDate)
  }

  eliminar(postDate:any):Observable<any>{
    return this.http.post('listanegra/eliminar',postDate)
  }


}
