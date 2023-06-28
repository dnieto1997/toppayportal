import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as Notiflix from 'notiflix';
import * as moment from 'moment';

@Component({
  selector: 'app-payoutfilter',
  templateUrl: './payoutfilter.component.html',
  styleUrls: ['./payoutfilter.component.scss']
})
export class PayoutfilterComponent implements OnInit {

  @ViewChild('dt') table2: any;
  public tipo: string = '1';
  public contenido: string = '';
  public table: any = [];

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  Buscar(){

    if(this.contenido == ''){
      Notiflix.Report.warning('Error', 'Digite valor en busqueda', 'Aceptar');
    }else{
     
      Notiflix.Confirm.show(
        'Message Confirm',
        `Deseas realizar la busqueda?`,
        'Yes',
        'No',
        () => {

          Notiflix.Loading.arrows();
          let arr;

          if(this.tipo == '1'){
            arr = {reference:this.contenido}  
          }else if(this.tipo == '2'){
            arr = {cedula:this.contenido}  
          }else if(this.tipo == '3'){
            arr = {id:this.contenido}  
          }

          

          this.authService.payoutfilter(arr).subscribe( (res:any) => {
            const {result,alert2,msg} = res;
           
            this.table = result;

            if(alert2 == 1){
              Notiflix.Report.warning('warning', result, 'Aceptar');
            }
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
        },
        () => {
         
        },
        {
          width: '320px',
          borderRadius: '8px',
          
        },
      );
    }

  }

  FormatoFecha(fec:string){

    let Newfec = moment(fec).format('Y-MM-DD H:mm:ss a') ;
    return Newfec;
  }

    //tabla
    filter(ev:any,colum:any){
      this.table2.filter(ev.value,colum, 'contains');
    }
  


}
