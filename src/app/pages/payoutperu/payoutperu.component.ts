import { Component, OnInit,ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import * as Notiflix from 'notiflix';
import * as moment from 'moment';
import  * as FileSaver from 'file-saver';

@Component({
  selector: 'app-payoutperu',
  templateUrl: './payoutperu.component.html',
  styleUrls: ['./payoutperu.component.scss']
})
export class PayoutperuComponent implements OnInit {

  @ViewChild('dt') table2: any;
  public table: any = [];
  public display: boolean = false;
  public display2: boolean = false;
  public imagePath:string = '';
  public comprobanteRefr:string = '';
  public myid:string = '';
  public valor:string = '';
  public reference:string = '';
  public status: string = '0';
  public fech1:any = moment().format('Y-MM-DD') ;
  public fech2:any = moment().format('Y-MM-DD') ;
  public arrExcel: any = [];
  public motivo: string = '';

  constructor(
    private authService: AuthService,
    public menu: MenuService
  ) { }

  ngOnInit(): void {
    /* this.llamarTabla(); */
  }

  actualizar(){
    this.llamarTabla();
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

   //tabla
   filter(ev:any,colum:any){
    this.table2.filter(ev.value,colum, 'contains');
  }

  llamarTabla(){

    if(this.fech1 > this.fech2){
      Notiflix.Report.warning('Error', 'La fecha inicial no puede ser mayor a la fecha final', 'Aceptar');
    }else{
      Notiflix.Loading.arrows()

        let arr = {
          status:this.status,
          fech1:this.fech1,
          fech2:this.fech2,
        }

        this.authService.payouttablePeru(arr).subscribe( (res:any) => {

        const {result,log_tipo} = res;
        this.table = result;
     
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

  mostrarpago(id:any,valor:any){
    this.myid = id;
    this.valor = valor;
    this.reference = '';
    this.display2 = true;
  }

  pagado(){

    if( this.myid == '' || this.valor == '' || this.reference == '' ){

      Notiflix.Report.warning('Error', 'LLene todos los campos', 'Aceptar');
    
    }else{

      Notiflix.Confirm.show(
        'Message Confirm',
        `Deseas <strong>Pagar<strong> el id ${this.myid}?`,
        'Yes',
        'No',
        () => {
           Notiflix.Loading.arrows()
          this.authService.payoutpagarPeru(this.myid,{"valor":this.valor,"reference":this.reference}).subscribe( (res:any) => {
           
            const {result} = res;

            Notiflix.Report.success('sucess', result, 'Aceptar');
           
            Notiflix.Loading.remove();
            this.display2 = false;
            this.llamarTabla()
      
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
        this.authService.payoutrechazarPeru(id,{"motivo":this.motivo}).subscribe( (res:any) => {
         
          const {result} = res;

          Notiflix.Report.success('sucess', result, 'Aceptar');
          //this.dataTableView();
          Notiflix.Loading.remove();
          this.llamarTabla()

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

  verComprobante(url:any,reference:any){
    this.imagePath = url;
    this.display = true;
    this.comprobanteRefr = reference;
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
            "Aliado": element.merchant_name,
            "user name":element.user_name,
            "reference":element.reference,
            "user doc":element.user_doc,
            "user phone":element.user_phone,
            "method":element.method,
            "date": fecha,
            "amount": Number(element.amount),
            "cost": Number(element.cost),
            "iva": Number(element.iva),
            "user bank":element.user_bank,
            "user type account":element.user_type_account,
            "user num account":element.user_num_account,
            "status":element.estado,
            "inscrita":element.repetido,
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
