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

  verAliados(postDate:any):Observable<any>{
    return this.http.get('aliado/todos',postDate)
  }

  guardarAliado(postDate:any):Observable<any>{
    return this.http.post('aliado/crear',postDate)
  }

}
