import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-estadomov',
  templateUrl: './estadomov.component.html',
  styleUrls: ['./estadomov.component.scss']
})
export class EstadomovComponent implements OnInit {

  public reference: string = '';
  public status: number = 1;


  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  cambiar(){

    
    if(this.reference == ''){
      Notiflix.Report.warning('Error', 'Digite la referencia', 'Ok');
    }else{

      Notiflix.Confirm.show(   
        'Message Confirm',
        `Deseas Cambiar de estado ala referencia ${this.reference}?`,
        'Yes',
        'No',
        () => {
      
          Notiflix.Loading.arrows();

          let arr = `${this.reference}/${this.status}`;

          this.authService.estadMov(arr).subscribe( (res:any) => {

         /*    console.log(res) */

            const { msg, alert } = res;
          
            if(alert == 1){
              Notiflix.Report.warning('Warning', msg, 'Aceptar');
            }else{

              Notiflix.Report.success('Success', msg, 'Aceptar');
            }

            this.reference = '';
            this.status = 1;
            Notiflix.Loading.remove();

          },(error: any) => {

            const { msg, status } = error.error;

            this.reference = '';
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

  cambiar2(){

    
    if(this.reference == ''){
      Notiflix.Report.warning('Error', 'Digite la referencia', 'Ok');
    }else{

      Notiflix.Confirm.show(   
        'Message Confirm',
        `Deseas Cambiar de estado al ID ${this.reference}?`,
        'Yes',
        'No',
        () => {
      
          Notiflix.Loading.arrows();

          let arr = `${this.reference}/${this.status}`;

          this.authService.estadMov2(arr).subscribe( (res:any) => {


            const { msg, alert } = res;
          
            if(alert == 1){
              Notiflix.Report.warning('Warning', msg, 'Aceptar');
            }else{

              Notiflix.Report.success('Success', msg, 'Aceptar');
            }

            this.reference = '';
            this.status = 1;
            Notiflix.Loading.remove();

          },(error: any) => {

            const { msg, status } = error.error;

            this.reference = '';
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

}
