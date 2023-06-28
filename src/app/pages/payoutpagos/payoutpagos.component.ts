import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { read, utils, writeFile } from 'xlsx';
import * as Notiflix from 'notiflix';
import  * as FileSaver from 'file-saver';

@Component({
  selector: 'app-payoutpagos',
  templateUrl: './payoutpagos.component.html',
  styleUrls: ['./payoutpagos.component.scss']
})
export class PayoutpagosComponent implements OnInit {

  @ViewChild('dt') table2: any;
  public movies:any;
  public table: any = [];
  public arrExcel: any = [];

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
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
            /*   this.referencia = wb.Sheets[sheets[0]]['A1']['v'];
              this.estado =wb.Sheets[sheets[0]]['B1']['v']; */

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

          this.authService.pagosPayout({arr:this.movies}).subscribe( (res:any) => {

            const {result, msg, alert2} = res;
            
            if(alert2 == 1){
              Notiflix.Report.warning('Warning', msg, 'Aceptar');
            }else{
              this.table = result;
            }
           
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

  exportCSV() {
    
    if(this.table.length == 0){

      Notiflix.Report.warning('No tienes datos en la tabla', '', 'Aceptar');
    }else{

      this.arrExcel = [];
      
      this.table.forEach((element:any) => {

      //let fecha = moment(element.created_at).format('Y-M-DD HH:mm:ss');
      let fecha = `${element.fecha} ${element.hora}`;

        this.arrExcel.push({
            "id":element.id,
            "reference": element.reference,
            "merchant_name":element.merchant_name,
            "amount":element.amount,
            "status":element.status,
        });

      });
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.arrExcel);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "Movimientos_realizados");
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
