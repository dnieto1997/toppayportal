import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as Notiflix from 'notiflix';
import  * as FileSaver from 'file-saver';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.scss'],
  template:`
    <app-navbar></app-navbar>
  `
})
export class PayoutComponent implements OnInit {

  @ViewChild('dt') table2: any;

  public table: any = [];
  public fech1:any = dayjs().format('YYYY-MM-DD') ;
  public fech2:any = dayjs().format('YYYY-MM-DD') ;
  public user: any;
  public pais: any;
  public aliado: any;
  public aliados: any;
  public arrExcel: any = [];
  public rows: number = 10;
  public tipo:any = '';
  public valorPayout: any = [];
  public motivo: string = '';
 
  constructor(
    private authService: AuthService,
    public menu: MenuService
  ) {}

  ngOnInit(): void {
    this.verAliados();
  }
  
 /*  ngAfterViewInit() { */

  llamarTabla(f1:any,f2:any,u:any,aliado:any){

    Notiflix.Loading.arrows()

    let user = u;
    if(u == undefined ){
      user = 0;
    }

    if(aliado == undefined ){
      aliado = 0;
    }

    this.authService.payouttable(`?fecha1=${f1}&fecha2=${f2}&user=${user}&aliado=${aliado}`).subscribe( (res:any) => {
      const {result,log_tipo,pais} = res;
      
      this.pais = pais;
      this.table = result;
      this.tipo = log_tipo;
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


  getSomeClass(num:Number){
    if( num == 1 || num == 5){
      return `badge bg-success`;
    }else if(num == 2){
      return `badge bg-warning text-dark`;
    }else if(num == 3){
      return `badge bg-danger`;
    }else{
      return `badge bg-dark`;
    }
  }

  pagado(id:any){

    Notiflix.Confirm.show(
      'Message Confirm',
      `Deseas <strong>Pagar<strong> el id ${id}?`,
      'Yes',
      'No',
      () => {
         Notiflix.Loading.arrows()
        this.authService.payoutpagar(id,{"prueba":0}).subscribe( (res:any) => {
          const {result} = res;
          Notiflix.Report.success('sucess', result, 'Aceptar');
          //this.dataTableView();
          Notiflix.Loading.remove();

          this.Buscar();
    
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

  rechazado(id:any){

    if(this.motivo == ''){
      Notiflix.Report.warning('Error', 'Debes ingresar un motivo de rechazo', 'Aceptar');
      return;
    }

    Notiflix.Confirm.show(
      'Message Confirm',
      `Deseas <strong>Rechazar<strong> el id ${id}?`,
      'Yes',
      'No',
      () => {
       
         Notiflix.Loading.arrows()
        this.authService.payoutrechazar(id,{"motivo":this.motivo}).subscribe( (res:any) => {
          const {result} = res;
         
          Notiflix.Report.success('sucess', result, 'Aceptar');
          //this.dataTableView();
          Notiflix.Loading.remove();
          this.motivo = '';
          this.Buscar();
    
        },(error: any) => {
          const { msg, status } = error.error;
       
          Notiflix.Report.warning('Error', msg, 'Aceptar');
          this.motivo = '';
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

  ach(id:any){
    Notiflix.Confirm.show(
      'Message Confirm',
      `Deseas hacer <strong>ACH<strong> al id ${id}?`,
      'Yes',
      'No',
      () => {
        
        this.authService.payoutach(id,{"prueba":0}).subscribe( (res:any) => {
          const {result} = res;

          Notiflix.Report.success('sucess', result, 'Aceptar');
          //this.dataTableView();
          Notiflix.Loading.remove();

          this.Buscar();
    
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

  Buscar(){
    if(this.fech1 > this.fech2){
      Notiflix.Report.warning('Error', 'La fecha inicial no puede ser mayor a la fecha final', 'Aceptar');
    }else{
     this.llamarTabla(this.fech1,this.fech2,this.user,this.aliado);
    }
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
            Motivo: ${ele.motivo} - ${ dayjs(ele.fecha).format('YYYY-MM-DD HH:mm:ss') } 
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

  Limpiar(){
    this.aliado = '';
    this.motivo = '';
    this.fech1 = dayjs().format('YYYY-MM-DD') ;
    this.fech2 = dayjs().format('YYYY-MM-DD') ;
  }

  notificar(info:any){
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

  getReptClass(num:string){

    if(num == "SI"){
      return `badge bg-success`;
    }
      
    return `badge bg-secondary text-dark`;
    
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

      //let fecha = dayjs(element.created_at).format('Y-M-DD HH:mm:ss');
      let fecha = `${element.fecha} ${element.hora}`;

      if(this.pais == 1){
        this.arrExcel.push({
            "id":element.uid,
            "Aliado": element.merchant_name,
            "username":element.user_name,
            "useremail":element.user_email,
            "reference":element.reference,
            "userdoc":element.user_doc,
            "userphone":element.user_phone,
            "method":element.method,
            "date": fecha,
            "amount": Number(element.amount),
            "currency":element.currency,
            "userbank":element.user_bank,
            "usertypeaccount":element.user_type_account,
            "usernumaccount":element.user_num_account,
            "cost":element.cost,
            "iva":element.iva,
            "gmf": Number(element.gmf),
            "update":this.FormatoFecha(element.updated_at),
            "status":element.estado,
            "motivo":element.motivo,
        });

      }else{
        this.arrExcel.push({
          "id":element.uid,
          "Aliado": element.merchant_name,
          "username":element.user_name,
          "useremail":element.user_email,
          "reference":element.reference,
          "userdoc":element.user_doc,
          "userphone":element.user_phone,
          "method":element.method,
          "date": fecha,
          "amount": Number(element.amount),
          "currency":element.currency,
          "userbank":element.user_bank,
          "usertypeaccount":element.user_type_account,
          "usernumaccount":element.user_num_account,
          "cost":element.cost,
          "iva":element.iva,
          "update":this.FormatoFecha(element.updated_at),
          "status":element.estado,
          "motivo":element.motivo,
      });

      }

      });
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.arrExcel);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "Payout");
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
