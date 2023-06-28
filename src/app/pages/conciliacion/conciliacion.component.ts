import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { read, utils, writeFile } from 'xlsx';
import * as moment from 'moment';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-conciliacion',
  templateUrl: './conciliacion.component.html',
  styleUrls: ['./conciliacion.component.scss']
})
export class ConciliacionComponent implements OnInit {

  public fech:any = moment().format('Y-MM-DD') ;
  public arrMetodo: any = [];
  public metodo: any;
  public excel: any;
  public total:number = 0;
  public table: any = [];
  public display:boolean = false;
  public arrBusqueda: any = [];
  public bancArr:string= '';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.vermetodos();
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

              const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
              this.excel = rows;
            }
        }
        reader.readAsArrayBuffer(file);
    }
  }

  Buscar(){

    if( this.metodo == undefined){
      Notiflix.Report.warning('Error', 'Seleccione un metodo de pago', 'Aceptar');
    }else{
   
      Notiflix.Loading.arrows();

      let arr = {fecha:this.fech, metodo:this.metodo, excel:this.excel}

      this.authService.verConsiliacion(arr).subscribe( (res:any) => {
          const {total, tabla} = res;
          
          this.total = total.total;
          this.table = tabla;

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

  vermetodos(){

    this.authService.verMethod(0).subscribe( (res:any) => {
      const {result} = res;
      this.arrMetodo = result;

    },(error: any) => {
      const { msg, status } = error.error;
   
      Notiflix.Report.warning('Error', msg, 'Aceptar');

      if(status == 0){
        this.authService.close();
      }
     
    });
  }

  buscarMov(arr:any){

    let destino = arr.destino.substring(arr.destino.length - 4);
    let valor = arr.valor;
    let fecha = arr.fecha;
    this.bancArr = arr.id;
    let ar = {destino:destino,valor:valor,fecha:fecha}

    this.authService.buscarConsiliacion(ar).subscribe( (res:any) => {
      const {rep} = res;
      
      this.arrBusqueda = rep;
      this.display = true;
      /* Notiflix.Loading.remove(); */

    },(error: any) => {
      const { msg, status } = error.error;
  
      Notiflix.Report.warning('Error', msg, 'Aceptar');
/*       Notiflix.Loading.remove(); */
      if(status == 0){
        this.authService.close();
      }
    
    });
  }

  Seleccionar(id:any){

   let ar = {idB:this.bancArr, idM:id};

   this.authService.ediatrConsiliacion(ar).subscribe( (res:any) => {
    const {rep} = res;
    
    this.Buscar();
    this.display = false;
    /* Notiflix.Loading.remove(); */

  },(error: any) => {
    const { msg, status } = error.error;

    Notiflix.Report.warning('Error', msg, 'Aceptar');
/*       Notiflix.Loading.remove(); */
    if(status == 0){
      this.authService.close();
    }
  
});
  }

}
