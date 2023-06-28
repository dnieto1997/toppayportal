import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from 'moment';
import * as Notiflix from 'notiflix';
import  * as FileSaver from 'file-saver';

@Component({
  selector: 'app-payoutsuccess',
  templateUrl: './payoutsuccess.component.html',
  styleUrls: ['./payoutsuccess.component.scss']
})
export class PayoutsuccessComponent implements OnInit {

  @ViewChild('dt') table2: any;
  public table: any = [];
  public arrExcel: any = [];
  public fech1:any = moment().format('Y-MM-DD') ;
  public fech2:any = moment().format('Y-MM-DD') ;
  public estado:any;
  public aliado: string = '';
  public aliados: any;
  public valorPayout: any = [];
  public recaudoTotal: number = 0;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.verAliados();
  }

  Buscar(){
    if(this.fech1 > this.fech2){
      Notiflix.Report.warning('Error', 'La fecha inicial no puede ser mayor a la fecha final', 'Aceptar');
    }else{

      this.table = [];

      Notiflix.Loading.arrows();

      let user = this.estado;
      let ali = this.aliado;

      if(user == undefined || user == ''){
          user = 0;
      }

      if(this.aliado == ''){
        ali = '0';
      }

      let arr = {
                  fecha1:this.fech1,
                  fecha2:this.fech2,
                  aliado: ali,
                  estado:user
                }
      this.authService.payoutSuccess(arr).subscribe( (res:any) => {

        this.recaudoTotal = 0;

        const {result,log_tipo} = res;
        this.table = result;
        
        result.forEach((element:any) => {
          this.recaudoTotal += Number(element.amount) + ( Number(element.cost) + Number(element.iva) );
       /*   this.recaudoTotal += Number( element.cost ); */
       });
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

  Limpiar(){
    this.estado = '';
    this.fech1 = moment().format('Y-MM-DD') ;
    this.fech2 = moment().format('Y-MM-DD') ;
    this.aliado = '';
    this.table = [];
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

  verMotivo(motivo:any){
 
    this.authService.payoutMotivo({reference:motivo}).subscribe( (res:any) => {

      let { result } = res;
      let html = '';
    
      result.forEach((ele:any) => {
          html += `
            Motivo: ${ele.motivo} - ${ moment(ele.fecha).format('Y-MM-DD HH:mm:ss') } 
          `;
      });


      
    this.valorPayout =[
      {
        severity:'success', 
        summary:html, 
        detail:''
      }
    ];
   

    },(error: any) => {
      const { msg, status } = error.error;

      if(status == 0){
        this.authService.close();
      }
     
    });
    
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

      //let fecha = moment(element.created_at).format('Y-M-DD HH:mm:ss');
      let fecha = `${element.fecha} ${element.hora}`;

        this.arrExcel.push({
            "id":element.uid,
            "reference": element.reference,
            "user_doc": element.user_doc,
            "user_name": element.user_name,
            "merchant_name": element.merchant_name,
            "user_bank": element.user_bank,
            "user_type_account": element.user_type_account,
            "amount": Number(element.amount),
            "cost": Number(element.cost),
            "iva": Number(element.iva),
            "fecha creacion": element.fechac,
            "fecha actualizacion": element.fechau,
            "estado": element.estados,
        });

      });

        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.arrExcel);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "Payout-Success");
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
