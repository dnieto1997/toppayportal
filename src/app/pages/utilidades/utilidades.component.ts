import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as Notiflix from 'notiflix';
import * as moment from 'moment';

@Component({
  selector: 'app-utilidades',
  templateUrl: './utilidades.component.html',
  styleUrls: ['./utilidades.component.scss']
})
export class UtilidadesComponent implements OnInit {

  public fech1:any = moment().format('Y-MM-01') ;
  public fech2:any = moment().format('Y-MM-DD') ;
  public table: any = [];
  public product:any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.Buscar(this.fech1,this.fech2);
  }


  Buscar(fech1:any,fech2:any){

    Notiflix.Loading.arrows()

    if(fech1 > fech2){
      Notiflix.Report.warning('Error', 'La fecha inicial no puede ser mayor a la fecha final', 'Aceptar');
      Notiflix.Loading.remove();
    }else{

      let arr = {fecha1:fech1,fecha2:fech2}

      this.authService.utilidadtable(arr).subscribe( (res:any) => {
        const {result} = res;
      /*   console.log(result) */
       this.table = result;
        Notiflix.Loading.remove();

      },(error: any) => {
        const { msg, status } = error.error;
        Notiflix.Report.warning('Error', msg, 'Aceptar');

        Notiflix.Loading.remove();

      });
    }
  }

  llamarTabla(){
    this.Buscar(this.fech1,this.fech2);
  }

  Limpiar(){
    this.fech1 = moment().format('Y-MM-01') ;
    this.fech2 = moment().format('Y-MM-DD') ;
  }

  FormatoFecha(fec:number){

    let Newfec = moment(fec).format('MM-Y') ;

    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    return meses[fec - 1];

    
  }

  FormatoFecha2(fec:string){

    let Newfec = moment(fec).format('DD-MM-Y') ;
    return Newfec;
  }

}
