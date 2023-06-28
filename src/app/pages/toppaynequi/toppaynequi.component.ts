import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from './api.service';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es';
import { ConfirmationService, MessageService } from 'primeng/api';
import  * as FileSaver from 'file-saver';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-toppaynequi',
  templateUrl: './toppaynequi.component.html',
  styleUrls: ['./toppaynequi.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class ToppaynequiComponent implements OnInit {

  @ViewChild('dt') table2: any;

  public aliado: any;
  public inputAliado: any;
  public monto: number = 0;
  public messages: any;
  public arrTabla:any = [];
  public fech1:any = dayjs().format('YYYY-MM-DD') ;
  public fech2:any = dayjs().format('YYYY-MM-DD') ;
  public arrExcel: any = [];

  constructor(
    private http: ApiService,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.verAliados();
    this.verConfi();
  }

  verAliados(){

    this.http.aliados(0).subscribe( (res:any) => {
      const {result} = res;

      let arr:any = [];
      
      result.forEach((ele:any) => {
        arr.push( { name: ele.merchant, code: ele.id } );
      });
      
      this.aliado = arr;
    
    },(error: any) => {
      const { msg, status } = error.error;
   
      if(status == 0){
        this.authService.close();
      }
     
    });
  }

  verConfi(){

    this.http.verParametros(0).subscribe( (res:any) => {
      const {result} = res;
    
      this.inputAliado = JSON.parse(result.aliados);
      this.monto = result.monto;

    },(error: any) => {
      const { msg, status } = error.error;
   
      if(status == 0){
        this.authService.close();
      }
     
    });
  }

  verTabla(){

    if(this.fech1 > this.fech2){
      this.messages = [{ severity: 'warn', summary: 'Advertencia', detail: 'La fecha inicial no puede ser mayor a la fecha final' }];
      return;
    }

    Notiflix.Loading.dots();
    this.http.verTabla({fecha1:this.fech1, fecha2:this.fech2}).subscribe( (res:any) => {
      const {result} = res;
      this.arrTabla = result;
      Notiflix.Loading.remove();
    },(error: any) => {
      const { msg, status } = error.error;
      Notiflix.Loading.remove();
      if(status == 0){
        this.authService.close();
      }
     
    });
  }

  Limpiar(){
    this.fech1 = dayjs().format('YYYY-MM-DD') ;
    this.fech2 = dayjs().format('YYYY-MM-DD') ;
  }

  guardar(event:any){
    this.monto;
    this.inputAliado;

    if(this.inputAliado == undefined || this.inputAliado.length == 0){
      this.messages = [{ severity: 'warn', summary: 'Advertencia', detail: 'Tienes q seleccionar solo un Aliado' }];
      return;
    }

    if(this.monto == null || this.monto == 0){
      this.messages = [{ severity: 'warn', summary: 'Advertencia', detail: 'Monto no valido' }];
      return;
    }

    this.confirmationService.confirm({
      target: event.target,
		  message: `Deseas guardar la operacion ?`,
		  icon: 'pi pi-exclamation-triangle',
		  accept: () => {

        this.http.guardarParametros({monto:this.monto,aliados:  JSON.stringify(this.inputAliado) }).subscribe( (res:any) => {
          const {result} = res;
    
          this.verTabla()
        },(error: any) => {
          const { msg, status } = error.error;
       
          if(status == 0){
            this.authService.close();
          }
         
        });

      },
		  reject: () => {
			 
		  }
	  });

    
  }

  async notificar(info:any){

    Notiflix.Confirm.show(
      'Message Confirm',
      `Deseas <strong>Pagar<strong> la referencia: ${info.reference}?`,
      'Yes',
      'No',
      () => {

          Notiflix.Loading.dots();

           this.http.apiNeki({info:info}).subscribe( (res:any) => {
            const {result,msg} = res;
            console.log( result );
            Notiflix.Notify.success(msg+' '+info.reference);
            this.verTabla();
            Notiflix.Loading.remove();
          },(error: any) => {
            const { msg, status } = error.error;
            Notiflix.Notify.warning(msg+' '+info.reference);

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

  filter(ev:any,colum:any){
    this.table2.filter(ev.value,colum, 'contains');
  }

  exportCSV() {
   
    if(this.arrTabla.length == 0 ){

    alert('No tienes datos en la tabla');
    }else{

      this.arrExcel = [];
      
      this.arrTabla.forEach((element:any) => {

        //let fecha = dayjs(element.created_at).format('Y-M-DD HH:mm:ss');
        let fecha = `${element.fecha} ${element.hora}`;

        this.arrExcel.push({
            "id":element.uid,
            "Merchant": element.merchant_name,
            "Referencia":element.reference,
            "Banco":element.user_bank,
            "Nequi":element.user_type_account,
            "Metodo":element.method,
            "Documento":element.user_doc,
            "Nombre":element.user_name,
            "celular":element.user_phone,
            "valor": Number(element.amount),
            "correo":element.user_email,
            "fecha": this.FormatoFecha(element.created_at),
        });

      });
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.arrExcel);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "Nequi TopUp");
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

  FormatoFecha(fec:string){
    let fc1 = fec.replace('.000Z','');
    let fc2 = fc1.replace('T',' ');
    let Newfec = dayjs(fec).format('YYYY-MM-DD h:mm:ss a');
    return fc2;
  }

}
