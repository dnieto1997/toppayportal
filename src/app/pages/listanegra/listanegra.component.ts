import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from './api.service';
import  * as FileSaver from 'file-saver';
import { read, utils, writeFile } from 'xlsx';
import * as Notiflix from 'notiflix';
import * as moment from 'moment';

export interface ListaInter {
  id:      number;
  cedula:  number;
  fecha:   string;
}

export const ListaLet  = {
  id:      0,
  cedula:  0,
  fecha:   ''
}

@Component({
  selector: 'app-listanegra',
  templateUrl: './listanegra.component.html',
  styleUrls: ['./listanegra.component.scss']
})
export class ListanegraComponent implements OnInit {

  @ViewChild('fullName') fullNameInput: any; 
  @ViewChild('dt') table2: any;
  public movies:any;
  public referencia: string = '';
  public estado: string = '';
  public display:boolean = false;
  public display2:boolean = false;
  public inputStatus: string = '';
  public inputReference: string = '';
  public inputMotivo: string = '';

  public inpuLista: ListaInter = ListaLet;
  public tableLista:any = [];

  constructor(
    private authService: AuthService,
    private http:ApiService
  ) { }

  ngOnInit(): void {
    this.Buscar();
  }

  Buscar(){

    this.http.todo(`0`).subscribe( (res:any) => {
      const {result} = res;
      this.tableLista = result;
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

  handleImport($event: any) {
   
    const files = $event.target.files;

    
    if (files.length) {
      const file = files[0];
      
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;
        
          if (sheets.length) {
              this.referencia = wb.Sheets[sheets[0]]['A1']['v'];
              this.estado =wb.Sheets[sheets[0]]['B1']['v'];

              const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
              this.movies = rows;
            }
        }
        reader.readAsArrayBuffer(file);
    }
  }

  cambiar(){
   
    Notiflix.Confirm.show(
      'Message Confirm',
      `Deseas importar el archivo?`,
      'Yes',
      'No',
      () => {

         Notiflix.Loading.dots();
        
         this.authService.importarListaNegra({arr:this.movies}).subscribe( (res:any) => {
          
          const {result, msg, alerta, arr} = res;

          if(alerta == 1){
            Notiflix.Report.success('Success', msg, 'Aceptar');
            import("xlsx").then(xlsx => {
                const worksheet = xlsx.utils.json_to_sheet(result);
                const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
                const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
                this.saveAsExcelFile(excelBuffer, "NewPayout");
            });
          }else{
            Notiflix.Report.warning('Warning', msg, 'Aceptar');
          }
          
          this.movies = [];
          this.fullNameInput.nativeElement.value = '';

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

  saveAsExcelFile(buffer: any, fileName: string): void {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  showDialog() {
    this.display = true;
    this.inpuLista = {
      id:      0,
      cedula:  0,
      fecha:   ''
    }
  }

  onRowEditInit(user: any) {
      
    this.display2 = true;
    this.inpuLista = user;

  }

  onRowEditCancel(user: any, i:Number) {

  Notiflix.Confirm.show(
    'Message Confirm',
    `Deseas <strong>Eliminar<strong> cedula ${user.cedula}?`,
    'Yes',
    'No',
    () => {
      Notiflix.Loading.arrows();

      this.http.eliminar(user).subscribe( (res:any) => {
       
        const {alerta,msg} = res;
        this.Buscar();
        if(alerta == 1){
          Notiflix.Report.success('Success', msg, 'Aceptar');
        }else{
          Notiflix.Report.warning('Error', msg, 'Aceptar');
        }
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

  cambiarHora(hora:string){
    return moment(hora).format('Y-MM-DD') ;
  }

  guardar(){
    if(this.inpuLista.cedula ==  0 || this.inpuLista.cedula ==  null){

      Notiflix.Report.warning('Error', 'Digite el numero de cedula', 'Aceptar');
    }else{
      
      Notiflix.Confirm.show(
        'Message Confirm',
        `Deseas <strong>Agregar<strong> cedula ${this.inpuLista.cedula}?`,
        'Yes',
        'No',
        () => {
          Notiflix.Loading.arrows();


          this.http.crear(this.inpuLista).subscribe( (res:any) => {
            
            const {result, msg, alerta} = res;
            if(alerta == 1){
              Notiflix.Report.success('Success', msg, 'Aceptar');
              this.display = false;
            }else{
              Notiflix.Report.warning('Warning', msg, 'Aceptar');
            }
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
  }

  editar(){
    if(this.inpuLista.cedula ==  0 || this.inpuLista.cedula ==  null){

      Notiflix.Report.warning('Error', 'Digite el numero de cedula', 'Aceptar');
    }else{
      
      Notiflix.Confirm.show(
        'Message Confirm',
        `Deseas <strong>Editar<strong> la cedula ${this.inpuLista.cedula}?`,
        'Yes',
        'No',
        () => {
          Notiflix.Loading.arrows();


          this.http.editar(this.inpuLista).subscribe( (res:any) => {
            
            const {result, msg, alerta} = res;
            if(alerta == 1){
              Notiflix.Report.success('Success', msg, 'Aceptar');
              this.display2 = false;
            }else{
              Notiflix.Report.warning('Warning', msg, 'Aceptar');
            }
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
  }

 
 //tabla
  filter(ev:any,colum:any){
    this.table2.filter(ev.value,colum, 'contains');
  }
}
