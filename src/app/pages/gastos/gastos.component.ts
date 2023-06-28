import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as Notiflix from 'notiflix';
import * as moment from 'moment';
import  * as FileSaver from 'file-saver';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {

  @ViewChild('dt') table2: any;
  public fech1:any = moment().format('Y-MM-DD') ;
  public fech2:any = moment().format('Y-MM-DD') ;
  public table: any = [];
  public arrExcel: any = [];
  public inputFecha: string = '';
  public inputValor: number = 0;
  public inputDetalles: string = '';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.Buscar();

  }

  resetInput(){
    this.inputFecha = '';
    this.inputValor = 0;
    this.inputDetalles = '';
  }

  FormatoFecha(fec:string){

    let Newfec = moment(fec).format('Y-M-DD h:mm:ss a') ;
    return Newfec;
  }

  Buscar(){
   
    //this.resetInput();
    Notiflix.Loading.arrows();
   
    this.authService.gastosTable(`${this.fech1}/${this.fech2}`).subscribe( (res:any) => {
      const {result} = res;
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

  guardar(){
    
    
    Notiflix.Confirm.show(
      'Message Confirm',
      `Deseas <strong>Guardar<strong> este gasto?`,
      'Yes',
      'No',
      () => {
        Notiflix.Loading.arrows()
        
        let arr = {
          fecha:this.inputFecha,
          valor:this.inputValor,
          detalle:this.inputDetalles
        }
        
        this.authService.gastosGuardar(arr).subscribe( (res:any) => {
          const {result} = res;
          this.Buscar();
          
          Notiflix.Loading.remove();
          
        },(error: any) => {
          const { msg, status } = error.error;
          Notiflix.Report.warning('Error', msg, 'Aceptar');
          
          Notiflix.Loading.remove();
          
          if(status == 0){
            this.authService.close();
          }
          
        });
        
        this.resetInput();
      },
    () => {
    
    },
    {
      width: '320px',
      borderRadius: '8px',
      
    },
    );
  }

  Eliminar(id:any){

    
    Notiflix.Confirm.show(
      'Message Confirm',
      `Deseas <strong>Eliminar<strong> el id ${id}?`,
      'Yes',
      'No',
      () => {
        this.resetInput();
        Notiflix.Loading.arrows()
        this.authService.gastosDelete(id,0).subscribe( (res:any) => {
          const {result} = res;
         /*  console.log(res) */
          this.Buscar();
        
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

  Limpiar(){
    this.fech1 = moment().format('Y-MM-DD') ;
    this.fech2 = moment().format('Y-MM-DD') ;
    this.resetInput();
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

        let fecha = moment(element.fechasis).format('Y-M-DD HH:mm:ss');

          this.arrExcel.push({
              "id":element.id,
              "fecha": element.fecha,
              "valor":element.valor,
              "detalles":element.detalle,
              "usuario":element.log_usuario,
              "fecha sistema":fecha,
          });

        });
          import("xlsx").then(xlsx => {
              const worksheet = xlsx.utils.json_to_sheet(this.arrExcel);
              const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
              const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
              this.saveAsExcelFile(excelBuffer, "Gastos");
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
