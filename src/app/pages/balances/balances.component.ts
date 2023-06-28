import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import  * as FileSaver from 'file-saver';
import * as Notiflix from 'notiflix';
import * as moment from 'moment';

import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.scss']
})
export class BalancesComponent implements OnInit {

  @ViewChild('dt') table2: any;

  public date1 : Date = new Date('2022-10-01 00:00');
  public date2 : Date = new Date(Date.now())  ;
  public totalPayIn:any;
  public totalPayOut:any;
  public disperPayIn:any;
  public disperPayOut:any;
  public table:any;
  public rows: number = 10;
  public arrExcel: any = [];
  public deuda:number = 0;

  public aliado: any;
  public aliados: any;

  public tipo:any;

  constructor(
    private authService: AuthService,
    public menu: MenuService
  ) { }

  ngOnInit(): void {
    this.verAliados();
    this.buscarBalance();

  }

  buscarBalance(){
   
    Notiflix.Loading.arrows();

    this.authService.verbalance(0).subscribe( (res:any) => {

      const {result,result2,log_tipo} = res;
      
      this.table = result2;
      this.tipo = log_tipo;
      let totalPayIn = 0; 
      let totalPayOut = 0; 

      this.totalPayIn =  result.payin;
      this.totalPayOut =  result.payout;

      let p1 = 0;
      let p2 = 0;

      result2.forEach((element:any) => {
        if(element.estado == 1){
          this.deuda += Number(element.valor);

          if(element.tipo == 'E'){
            totalPayIn += (Number(element.valor) + Number(element.gmf));
            p1 += Number(element.valor) 
          }

          if(element.tipo == 'S'){
            totalPayOut += (Number(element.valor) + Number(element.gmf));
            p2 += Number(element.valor) 
          }
        }
      });


      this.disperPayIn = totalPayIn;
      this.disperPayOut = totalPayOut;

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

  verAliados(){

    this.authService.veraliados(0).subscribe( (res:any) => {
      const {result} = res;
      this.aliados = result;

    },(error: any) => {
      const { msg, status } = error.error;
   
      Notiflix.Report.warning('Error', msg, 'Aceptar');

      if(status == 0){
        this.authService.close();
      }
     
    });
  }

  buscarBalance2(){

    let fecha1 = moment(this.date1).format('Y-MM-DD HH:mm') ;
    let fecha2 = moment(this.date2).format('Y-MM-DD HH:mm') ;
   
    Notiflix.Loading.arrows();
   
    this.authService.buscarbalance({aliado:this.aliado,fecha1:fecha1,fecha2:fecha2}).subscribe( (res:any) => {

      const {result,result2,log_tipo,fe} = res;
      this.tipo = log_tipo;
      this.table = result2;
      let totalPayIn = 0; 
      let totalPayOut = 0; 
      
      this.totalPayIn =  result.payin;
      this.totalPayOut =  result.payout;
      
      let p1 = 0;
      let p2 = 0;
      
      result2.forEach((element:any) => {
        if(element.estado == 1){
          this.deuda += Number(element.valor);
          
          
          if(element.tipo == 'E'){
            totalPayIn += (Number(element.valor) + Number(element.gmf));
            p1 += Number(element.valor) 
          }
          
          if(element.tipo == 'S'){
            totalPayOut += (Number(element.valor) + Number(element.gmf));
            p2 += Number(element.valor) 
          }
          
        }
      });
      
      console.log(result2)
      this.disperPayIn = totalPayIn;
      this.disperPayOut = totalPayOut;

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

  Limpiar(){
    this.aliado = '';
    this.date2 = new Date(Date.now())  ;
    this.date1 = new Date('2022-10-01 00:00');
  }


  getSomeClass(num:Number){
    if(num == 1){
      return `badge bg-success`;
    }else if(num == 2){
      return `badge bg-warning text-dark`;
    }else if(num == 3){
      return `badge bg-danger`;
    }else{
      return `badge bg-dark`;
    }
  }

  estadoPayout(num:Number){
    if(num == 1){
      return `Success`;
    }else if(num == 2){
      return `Waiting`;
    }else if(num == 3){
      return `Declined`;
    }else{
      return `Error`;
    }
  }

  filter(ev:any,colum:any){
    this.table2.filter(ev.value,colum, 'contains');
  }

  exportCSV() {
    
    if(this.table.length == 0){

      Notiflix.Report.warning('No tienes datos en la tabla', '', 'Aceptar');
    }else{

      this.arrExcel = [];

      this.table.forEach((element:any) => {

      let status = this.estadoPayout( element.status );

      this.arrExcel.push({
          "Id":element.id,
          "Fecha de pago":element.fechapago,
          "Aliado":element.aliado,
          "Banco":element.bancoaliado,
          "Tipo":element.tipon,
          "Cuenta":element.cuenta,
          "Valor":element.valor,
          "GMF":element.gmf,
          "Estado":element.estadon,
        
      });

      });
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.arrExcel);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "Balance");
        });
    }
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
