import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as Notiflix from 'notiflix';
import  * as FileSaver from 'file-saver';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  @ViewChild('dt') table2: any;
  public table: any = [];
  public fech1:any = dayjs().format('YYYY-MM-DD') ;
  public fech2:any = dayjs().format('YYYY-MM-DD') ;
  public reference: any;
  public aliado: any;
  public aliados: any;
  public arrExcel: any = [];
  public rows: number = 10;
  public recaudoTotal: number = 0;
  public tipo:any;
  public status:number = 1;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.verAliados();
  }

  verAliados(){

    this.authService.veraliados(0).subscribe( (res:any) => {
      const {result} = res;

      let arr:any = [];

      result.forEach((ele:any) => {
        arr.push(  { name: ele.merchant, code: ele.id } );
      });

      this.aliados = arr;

    },(error: any) => {
      const { msg, status } = error.error;
   
      Notiflix.Report.warning('Error', msg, 'Aceptar');

      if(status == 0){
        this.authService.close();
      }
     
    });
  }
  
  Buscar(){

    if(this.fech1 > this.fech2){
      Notiflix.Report.warning('Error', 'La fecha inicial no puede ser mayor a la fecha final', 'Aceptar');
    }else{

    }
    Notiflix.Loading.arrows()

    this.recaudoTotal = 0;

    let ref =  this.reference;
    if( this.reference == undefined || this.reference == ""){
      ref = 0;
    }

    let ali = 0;
    if( !this.aliado ){
      ali = 0;
    }else{
      ali = this.aliado.code;
    }

    this.authService.cashintable(`?fecha1=${this.fech1}&fecha2=${this.fech2}&reference=${ref}&aliado=${ali}&status=${this.status}`).subscribe( (res:any) => {
      const {result} = res;
     
      this.table = result;
     
      result.forEach((element:any) => {
         this.recaudoTotal += Number(element.amount) - ( Number(element.cost) + Number(element.iva) );
      });

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

  FormatoFecha(fec:string){

    let fc1 = fec.replace('.000Z','');
    let fc2 = fc1.replace('T',' ');
    let Newfec = dayjs(fec).format('YYYY-MM-DD h:mm:ss a');
    return fc2;
  }

  FormatoHora(hr:string){
    let Newhr = dayjs(hr).format('h:mm:ss a') ;
    return Newhr;
  }

  estadoCashin(num:Number){
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

  Limpiar(){
    this.reference = '';
    this.aliado = null;
    this.fech1 = dayjs().format('Y-M-DD') ;
    this.fech2 = dayjs().format('Y-M-DD') ;
    this.status = 1;
  }

  notificar(info:any){

    /* console.log(info) */
    if(info.status == 2 ){
      Notiflix.Report.warning('Warning', 'Operacion no valida', 'Aceptar');
    }else{

      Notiflix.Confirm.show(
        'Message Confirm',
        `Deseas <strong>Notificar<strong> la referencia  ${info.reference}?`,
        'Yes',
        'No',
        () => {
           Notiflix.Loading.arrows()
          
           let arr = `${info.reference}/${info.status}`;
            
            this.authService.estadMov(arr).subscribe( (res:any) => {
  
              const { msg, alert } = res;
            
              if(alert == 1){
                Notiflix.Report.warning('Warning', msg, 'Aceptar');
              }else{
  
                Notiflix.Report.success('Success', 'Notificacion exitosa', 'Aceptar');
              }
  
              Notiflix.Loading.remove();
  
            },(error: any) => {
  
              const { msg, status } = error.error;
  
          
              Notiflix.Report.warning('Error', msg, 'Aceptar');
              Notiflix.Loading.remove();
              
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


  //tabla
  filter(ev:any,colum:any){
   
    this.table2.filter(ev.value,colum, 'contains');
  }

  exportCSV() {
    
    if(this.table.length == 0){

      Notiflix.Report.warning('No tienes datos en la tabla', '', 'Aceptar');
    }else{

      this.arrExcel = [];
      
      this.table.forEach((element:any) => {

      let status = this.estadoCashin( element.status );
      //let Newfec = dayjs(element.created_at).format('Y-M-DD') ;

      this.arrExcel.push({
          "id":element.id,
          "aliado":element.merchant_name,
          "user name":element.user_name,
          "user email":element.user_email,
          "reference":element.reference,
          "referencepro":element.referencepro,
          "referencepro2":element.referencepro2,
          "user doc":element.user_doc,
          "user phone":element.user_phone,
          "method":element.method,
          "date":element.fecha,
          "amount": Number(element.amount),
          "currency":element.currency,
          "cost":Number(element.cost),
          "iva":Number(element.iva),
          "user bank":element.user_bank,
          "user type account":element.user_type_account,
          "user num account":element.user_num_account,
          "update":this.FormatoFecha(element.updated_at),
          "status":status,
      });

      });
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.arrExcel);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "PayIn");
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
