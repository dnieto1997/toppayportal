import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router'
import * as Notiflix from 'notiflix';

import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public leftMenu: any;
  public display:any;

  constructor(
    public authService: AuthService,
    private router: Router,
    public Menu:MenuService
  ) { }

  ngOnInit(): void {
  
    this.Menu.mostrarmenu();

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

  handleImport($event: any) {
   
    Notiflix.Loading.arrows();

    const files = $event.target.value;

    this.authService.cambiarPais(files).subscribe( (res:any) => {
      
      const {msg} = res;

      Notiflix.Report.success('Success', msg, 'Aceptar');
      this.router.navigate(['']);
      Notiflix.Loading.remove();

    },(error: any) => {
      const { msg, status } = error.error;

      Notiflix.Loading.remove();

      if(status == 0){
        this.authService.close();
      }
     
    });
    
  }

  usuariosPais(tipo:any){

    let arr = ['danica','desarrollo','jpinto','marcela','andrea','aldeir','dairo'];
    return arr.includes( tipo );
    
  }

  async permisos(){

    const newStr = this.router.url.slice(1)

    if( !this.leftMenu.find( (res:any) => res.menu === newStr ) ){
      
      this.router.navigate(['']);
    }
  }


 


}
