import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss',]
})
export class UsuariosComponent implements OnInit {

  @ViewChild('dt') table2: any;

  public users:any = [];
  public clonedProducts: { [s: string]: any; } = {};
  public display: boolean = false;
  public display2: boolean = false;

  public log_tipo: string= '';
  public arrtipo:any = [];
  public arrpais:any = [];
  public log_usuario:string = '';
  public log_merchantid:string = '';

  public log_id2:number = 0;
  public log_merchantid2:string = '';
  public log_usuario2:string = '';
  public log_tipo2: string= '';
  public log_pais:number = 0;
  public log_pais2:number = 0;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.Buscar();
    this.tipoUsuario();
    this.buscasPais();
  }

  Buscar(){

    this.authService.usuariosTable(`0`).subscribe( (res:any) => {
      const {result} = res;
      this.users = result;
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

  tipoUsuario(){

    this.authService.usuariosTipo(`0`).subscribe( (res:any) => {
      
      const {result} = res;
     
      this.arrtipo = result;
   
    },(error: any) => {
      const { msg, status } = error.error;
      Notiflix.Report.warning('Error', msg, 'Aceptar');

      if(status == 0){
        this.authService.close();
      }
     
    });

  }

  buscasPais(){

    this.authService.pais(`0`).subscribe( (res:any) => {
      
      const {result} = res;
      this.arrpais = result;
   
    },(error: any) => {
      const { msg, status } = error.error;
      Notiflix.Report.warning('Error', msg, 'Aceptar');

      if(status == 0){
        this.authService.close();
      }
     
    });

  }

  showDialog() {
    this.display = true;
    this.log_tipo = '';
    this.log_usuario = '';
    this.log_merchantid = '';
  }

  editar(){

    if(this.log_tipo2 == '' || this.log_usuario2 == ''){

      Notiflix.Report.warning('Error', 'Seleccione todos los campos', 'Aceptar');
    }else{
      
      Notiflix.Confirm.show(
        'Message Confirm',
        `Deseas <strong>Editar<strong> el usuario ${this.log_usuario2}?`,
        'Yes',
        'No',
        () => {
          Notiflix.Loading.arrows();

          let arr = {
                      log_tipo:this.log_tipo2,
                      log_usuario:this.log_usuario2, 
                      log_merchantid:this.log_merchantid2,
                      log_pais:this.log_pais2 
                    };

          this.authService.usuariosEditar(this.log_id2,arr).subscribe( (res:any) => {
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

  guardar(){

  
    if(this.log_tipo == '' || this.log_usuario == '' || this.log_pais == 0){

      Notiflix.Report.warning('Error', 'Seleccione todos los campos', 'Aceptar');
    }else{
      
      Notiflix.Confirm.show(
        'Message Confirm',
        `Deseas <strong>Crear<strong> el usuario ${this.log_usuario}?`,
        'Yes',
        'No',
        () => {
          Notiflix.Loading.arrows();

          let arr = { 
              log_tipo:this.log_tipo,
              log_usuario:this.log_usuario, 
              log_merchantid:this.log_merchantid,
              log_pais:this.log_pais 
            };

          this.authService.usuariosCrear(arr).subscribe( (res:any) => {
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

  cambiarPass(user: any){

    Notiflix.Confirm.show(
      'Message Confirm',
      `Deseas Restablecer la contraseña del usuario ${user.log_usuario}? <strong>"Toppaycol2022"<strong> `,
      'Yes',
      'No',
      () => {
        Notiflix.Loading.arrows();

        this.authService.usuariosPass(user.id,{}).subscribe( (res:any) => {
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

  onRowEditInit(user: any) {
      
      this.display2 = true;
      this.log_id2 = user.id
      this.log_tipo2 = user.log_tipo;
      this.log_usuario2 = user.log_usuario;
      this.log_merchantid2 = user.log_merchantid;
      this.log_pais2 = user.log_pais;

  }

  onRowEditCancel(user: any, i:Number) {

    Notiflix.Confirm.show(
      'Message Confirm',
      `Deseas <strong>Eliminar<strong> el usuario ${user.log_usuario}?`,
      'Yes',
      'No',
      () => {
        Notiflix.Loading.arrows();

        this.authService.usuariosDelete(user.id,0).subscribe( (res:any) => {
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

    //tabla
    filter(ev:any,colum:any){
      this.table2.filter(ev.value,colum, 'contains');
    }
  

}
