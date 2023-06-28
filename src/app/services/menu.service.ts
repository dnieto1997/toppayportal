import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public items: any= [];
  public nomUsuario:string = '';
  public tipo:any;
  public pais:string = '';

  constructor(
    public authService: AuthService,
  ) { }

   async mostrarmenu(){

    await this.authService.viewmenu(0).subscribe( (res:any) => {

      const {result, tipo, usuario, pais } = res;

      this.tipo = tipo;
      this.pais = pais;
      this.nomUsuario = usuario;

      let newArr:any = [];
      let i = 0;

      result.forEach((element:any) => {
       
        let arr = JSON.parse(element.roles);

        
        
        if( arr.includes( tipo ) ){
          
          
          if( result[i].tipo == 1 ){
            
           
            if(
              (pais == 2 && result[i].menu == "transactions") ||
              (pais == 2 && result[i].menu == "usuarios") ||
              (pais == 2 && result[i].menu == "conciliacion") ||
              (pais == 2 && result[i].menu == "dispersiones") ||
              (pais == 1 && result[i].menu == "Payoutperu") 
            ){
             /*  console.log('entr1'+result[i].alias+ ' '+pais+' '+result[i].menu) */
            }else{
              newArr.push({label:result[i].alias,icon: 'pi pi-angle-right',"routerLink":'/'+result[i].menu})

            }
          }

        }
        i++;
        
      });

      this.items = newArr;

  
    },(error: any) => {
        const { msg, status } = error.error;
        return error;
    });
  }

}
