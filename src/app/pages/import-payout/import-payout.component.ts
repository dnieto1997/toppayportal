import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { read, utils, writeFile } from 'xlsx';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-import-payout',
  templateUrl: './import-payout.component.html',
  styleUrls: ['./import-payout.component.scss']
})
export class ImportPayoutComponent implements OnInit {

  @ViewChild('dt') table2: any;
  public table: any = [];
  public movies:any;
  public referencia: string = '';
  public estado: string = '';
  public display:boolean = false;
  public inputStatus: string = '';
  public inputReference: string = '';
  public inputMotivo: string = '';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.buscar();
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

  buscar(){

    this.authService.payoutMasivo(0).subscribe( (res:any) => {
      const {result} = res;
      this.table = result;
      this.display = false;
      this.inputStatus = '';
      this.inputReference = '';
      this.inputMotivo = '';
      
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

  cambiar(){

    if(this.referencia != 'reference'){
      Notiflix.Report.warning('Warning', 'No se encontro la columna reference', 'Aceptar');
    }else if(this.estado != 'status'){
      Notiflix.Report.warning('Warning', 'No se encontro la columna status', 'Aceptar');
    }else{

      Notiflix.Confirm.show(
        'Message Confirm',
        `Deseas importar el archivo?`,
        'Yes',
        'No',
        () => {

           Notiflix.Loading.dots();

            this.authService.importPayout({arr:this.movies}).subscribe( (res:any) => {

              const {result, msg, alert2, arr} = res;
              
              if(alert2 == 1){
                Notiflix.Report.success('Success', msg+' ('+arr+') editados', 'Aceptar');
              }else{
                Notiflix.Report.warning('Warning', msg, 'Aceptar');
              }
              this.buscar();
              this.movies = '';
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

  notificar(id:any,status:any,reference:any){

    if(this.table.length == 0){
      Notiflix.Report.warning('Warning', 'No hay registros para notificar', 'Aceptar');
    }else{
      
      Notiflix.Confirm.show(
        'Message Confirm',
        `Deseas notificar al cliente?`,
        'Yes',
        'No',
        () => {
          
            this.authService.updateMasiva({id:id,status:status,reference:reference}).subscribe( (res:any) => {
             
              const {msg, alert2} = res;

              if(alert2 == 1){
                Notiflix.Report.success('Success', msg, 'Aceptar');
              }else{
                Notiflix.Report.warning('Warning', msg, 'Aceptar');
              }
              
              this.buscar();

            },(error: any) => {
    
                const { msg, status } = error.error;
                Notiflix.Report.warning('Error', msg, 'Aceptar');
                
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

  cambiarTodo(){

    Notiflix.Confirm.show(
      'Message Confirm',
      `Deseas notificar al cliente?`,
      'Yes',
      'No',
      () => {

        Notiflix.Loading.dots();

        this.authService.updateMasiva2({id:0}).subscribe( (res:any) => {

            const {msg, alert2,result} = res;

            Notiflix.Report.success('Success', 'Se enviaron '+res.result+' mesensajes al cliente', 'Aceptar');
            Notiflix.Loading.remove();
            this.buscar();

          },(error: any) => {
  
              //const { msg, status } = error.error;
              Notiflix.Loading.remove();
              Notiflix.Report.warning('Error', error, 'Aceptar');
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

  editar(arr:any){

    this.display = true;

    this.inputReference = arr.reference;
    this.inputStatus = arr.status;
    this.inputMotivo = arr.motivo;

  }

  guardarEdi(){

    Notiflix.Confirm.show(
      'Message Confirm',
      `Deseas editar la REF: ${this.inputReference}?`,
      'Yes',
      'No',
      () => {

          this.authService.editarRef(this.inputReference,{status:this.inputStatus,motivo:this.inputMotivo}).subscribe( (res:any) => {

            const {msg, alert2} = res;

            if(alert2 == 1){
              Notiflix.Report.success('Success', msg, 'Aceptar');
            }else{
              Notiflix.Report.warning('Warning', msg, 'Aceptar');
            }
            
            this.buscar();

          },(error: any) => {
  
              const { msg, status } = error.error;
              Notiflix.Report.warning('Error', msg, 'Aceptar');
              
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

  eliminar(id:any,status:any,reference:any){
   
    if(this.table.length == 0){
      Notiflix.Report.warning('Warning', 'No hay registros para notificar', 'Aceptar');
    }else{
      
      Notiflix.Confirm.show(
        'Message Confirm',
        `Deseas eliminar de la lista REF: ${reference}?`,
        'Yes',
        'No',
        () => {

            this.authService.eliminarRef(id,{status:status,reference:reference}).subscribe( (res:any) => {

              const {msg, alert2} = res;

              if(alert2 == 1){
                Notiflix.Report.success('Success', msg, 'Aceptar');
              }else{
                Notiflix.Report.warning('Warning', msg, 'Aceptar');
              }
              
              this.buscar();

            },(error: any) => {
    
                const { msg, status } = error.error;
                Notiflix.Report.warning('Error', msg, 'Aceptar');
                
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
