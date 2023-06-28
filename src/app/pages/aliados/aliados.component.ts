import { Component, OnInit } from '@angular/core';
import { ApiService } from './Api.service';
import { AuthService } from 'src/app/services/auth.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-aliados',
  templateUrl: './aliados.component.html',
  styleUrls: ['./aliados.component.scss']
})
export class AliadosComponent implements OnInit {

  public display:boolean = false;
  public aliados:any;
  public arrPais:any[] =[
    {
      id:1,
      descripcion: 'Colombia'
    },
    {
      id:2,
      descripcion: 'Peru'
    }
  ];
  public merchant:string = ''; 
  public email:string = ''; 
  public pais:string = ''; 

  constructor(
    private http: ApiService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.verAliados();
  }

  showDialog(){
    this.display = true;
    this.pais = '';
    this.email = '';
    this.merchant = '';
  }

  closeDialog(){
    this.display = false;
    this.pais = '';
    this.email = '';
    this.merchant = '';
  }

  verAliados(){
    this.http.verAliados(0).subscribe( (res:any) => {
      const { result } = res;
      this.aliados = result;
    },(error: any) => {
      const { msg, status } = error.error;
      Notiflix.Report.warning('Error', msg, 'Aceptar');

      Notiflix.Loading.remove();

      if(status == 0){
        this.authService.close();
      }
    
    });
  }

  mostrarPais(id:number){
    if(id == 1){
      return 'Colombia'
    }else if(id == 2){
      return 'Peru';
    }
    return ''
  }

  estados(id:number){
    if(id == 1){
      return 'Activo'
    }else if(id == 2){
      return 'Inactivo';
    }
    return ''
  }

  onRowEditInit(arr:any){
  /*   console.log(arr) */
    Notiflix.Report.success('Token', arr.token, 'Aceptar');
  }

  guardar(){
    
    if(this.merchant == ''){
      Notiflix.Report.warning('Error', 'Digite el Merchant', 'Aceptar');
    }else if(this.email == ''){
      Notiflix.Report.warning('Error', 'Digite el Email', 'Aceptar');
    }else if(this.pais == ''){
      Notiflix.Report.warning('Error', 'Digite el Pais', 'Aceptar');
    }else{

      let arr = {
        "merchant":this.merchant,
        "email": this.email,
        "pais":this.pais 
      }

      Notiflix.Confirm.show(
        'Message Confirm',
        `Deseas <strong>Guardar<strong> el aliado ${this.merchant}?`,
        'Yes',
        'No',
        () => {
            Notiflix.Loading.arrows();
            this.http.guardarAliado(arr).subscribe( (res:any) => {
            
              const { alert2, msg, result } = res;

              if( alert2 == 1){
                Notiflix.Report.warning('Error', `${msg}`, 'Aceptar');
              }else if( alert2 == 2){
                Notiflix.Report.success('Success', `${msg}`, 'Aceptar');
                this.closeDialog();
                this.verAliados();
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

}
