import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public list:any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.verInfo();
  }

  verInfo(){
    Notiflix.Loading.arrows()

    this.authService.perfil(0).subscribe( (res:any) => {

      const {result} = res;
      this.list = result;

          //this.dataTableView();
          Notiflix.Loading.remove();

    },(error: any) => {
      const { msg, status } = error.error;
   
      Notiflix.Report.warning('Error', msg, 'Aceptar');

      Notiflix.Loading.remove();

      if(status == 0){
        this.authService.close();
      }
     
    });
  }

}
