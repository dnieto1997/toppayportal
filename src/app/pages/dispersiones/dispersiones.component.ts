import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as Notiflix from 'notiflix';
import  * as FileSaver from 'file-saver';

@Component({
  selector: 'app-dispersiones',
  templateUrl: './dispersiones.component.html',
  styleUrls: ['./dispersiones.component.scss']
})
export class DispersionesComponent implements OnInit {

  @ViewChild('dt') table2: any;
  public display: boolean = false;
  public display2: boolean = false;
  public merchant: any;
  public banco: any;
  public cuenta: any;
  public valor: any;
  public tipo: any;
  public gmf: any;
  public idgmf: any;
  public valorgmf: any;
  public arrmerchant:any = [];
  public arrbanco:any = [];
  public arrDisperciones:any = [];
  public arrExcel: any = [];

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.verDisperciones();
    this.verAliados();
  }

  verDisperciones(){

    this.authService.dispercionesTable(`0`).subscribe( (res:any) => {
      const {result} = res;
     /*  console.log(result) */
      this.arrDisperciones = result;
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

  showDialog() {
    this.display = true;
    this.merchant = '';
    this.banco = '';
    this.cuenta = '';
    this.valor = '';
    this.tipo = '';
    this.gmf = '';
    this.display2 = false;
    this.idgmf = '';
    this.valorgmf = '';
  /*   this.arrmerchant = ''; */
  }

  guardar(){
  
    if(this.merchant == '' || this.cuenta == '' || this.banco == '' || this.valor == '' || this.tipo == ''){
      Notiflix.Report.warning('Error', 'Seleccione todos los campos', 'Aceptar');
    }else{

      Notiflix.Confirm.show(
        'Message Confirm',
        `Deseas <strong>Crear<strong> esta dispersion?`,
        'Yes',
        'No',
        () => {

          Notiflix.Loading.arrows();
          let arr = { merchant:this.merchant,
                      banco:this.banco, 
                      cuenta:this.cuenta,
                      valor:this.valor ,
                      tipo:this.tipo,
                      gmf:this.gmf  };

          this.authService.dispersionesCrear(arr).subscribe( (res:any) => {
              const {result, msg, alerta} = res;
              this.verDisperciones();
              if(alerta == 1){
                  Notiflix.Report.success('Success', msg, 'Aceptar');
                  this.display = false;
              }else{
                  Notiflix.Report.warning('Warning', msg, 'Aceptar');
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

  }

  verAliados(){

    this.authService.veraliados(0).subscribe( (res:any) => {
      const {result} = res;
      this.arrmerchant = result;
    },(error: any) => {
      const { msg, status } = error.error;
   
      Notiflix.Report.warning('Error', msg, 'Aceptar');

      if(status == 0){
        this.authService.close();
      }
     
    });
  }

  saverange(id:any){
   this.cuenta = '';
   let aliado = id.target.value;

   this.authService.verBancos({aliado:aliado}).subscribe( (res:any) => {
    const {result} = res;
  
    this.arrbanco = result;
  },(error: any) => {
    const { msg, status } = error.error;
 
    Notiflix.Report.warning('Error', msg, 'Aceptar');

    if(status == 0){
      this.authService.close();
    }
   
  });

  }

  saverange2(id:any){

    const resultado = this.arrbanco.filter( (mv:any)=>{
      return mv.id == id.target.value;

    });
    
    this.cuenta = resultado[0].cuenta;
  }

  onRowEditCancel(user: any, i:Number) {

    Notiflix.Confirm.show(
      'Message Confirm',
      `Deseas <strong>Eliminar<strong> la dispersion ${user.id}?`,
      'Yes',
      'No',
      () => {
        Notiflix.Loading.arrows();

        this.authService.dispersionDelete(user.id,0).subscribe( (res:any) => {
          const {alerta,msg} = res;
          this.verDisperciones();
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

  editar(user: any, i:Number){

    this.display2 = true;
    this.idgmf = user.id;
    this.valorgmf = user.gmf;
    
  }

  guardarGmf(){
  
    if(this.idgmf == ''){
      Notiflix.Report.warning('Error', 'Seleccione todos los campos', 'Aceptar');
    }else{

      Notiflix.Confirm.show(
        'Message Confirm',
        `Deseas <strong>Editar<strong> el GMF de esta dispersion?`,
        'Yes',
        'No',
        () => {

          Notiflix.Loading.arrows();
          let arr = { idgmf:this.idgmf,
                      valorgmf:this.valorgmf, 
                    };

          this.authService.dispersionesGmf(arr).subscribe( (res:any) => {
              const {result, msg, alerta} = res;
            /*   console.log(res) */
              this.verDisperciones();
              if(alerta == 1){
                  Notiflix.Report.success('Success', msg, 'Aceptar');
                  this.display2 = false;
              }else{
                  Notiflix.Report.warning('Warning', msg, 'Aceptar');
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

  }

 //tabla
  filter(ev:any,colum:any){
    this.table2.filter(ev.value,colum, 'contains');
  }

  exportCSV() {
    
    if(this.arrDisperciones.length == 0){

      Notiflix.Report.warning('No tienes datos en la tabla', '', 'Aceptar');
    }else{

      this.arrExcel = [];
      
      this.arrDisperciones.forEach((element:any) => {

      //let fecha = moment(element.created_at).format('Y-M-DD HH:mm:ss');
      let fecha = `${element.fecha} ${element.hora}`;

        this.arrExcel.push({
            "id":element.id,
            "Aliado": element.nomaliado,
            "Banco":element.bancoaliado,
            "Cuenta":element.cuenta,
            "Valor":element.valor,
            "Gmf":element.gmf,
            "Tipo movimiento":element.tipoaliado,
            "Pais":element.paisn,
            "Fecha pago":element.fechapago,
        });

      });
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.arrExcel);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "Dispersiones");
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
