import { Component, OnInit  } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public leftMenu: any;
  public nomUsuario:string = '';

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.viewMenu();

    /*  setTimeout( ()=>{
        this.permisos();
      },500); */

  }

  
   viewMenu(){
    
    this.authService.viewmenu(0).subscribe( (res:any) => {
      const {result, tipo, usuario} = res;
      
      let newArr:any = [];
      let i = 0;
     
      this.nomUsuario = usuario;
      console.log(this.nomUsuario)

      result.forEach((element:any) => {
       
       let arr = JSON.parse(element.roles);

       
      if( arr.includes( tipo ) ){
         newArr.push(result[i])
      }
      
      i++;
      
    });
    
      this.leftMenu = newArr;

    },(error: any) => {
      const { msg, status } = error.error;
      Notiflix.Report.warning('Error', msg, 'Aceptar');

      if(status == 0){
        this.authService.close();
      }
     
    });

  }

  logout(){

    Notiflix.Confirm.show(
      'Message Confirm',
      'Deseas salir de la sesion?',
      'Yes',
      'No',
      () => {
        
      this.authService.close();

      },
      () => {
       
      },
      {
        width: '320px',
        borderRadius: '8px',
        
      },
    );
  }

  async permisos(){

    const newStr = this.router.url.slice(1)
 
    if( !this.leftMenu.find( (res:any) => res.menu === newStr ) ){

      this.router.navigate(['']);
    }
  }

}
