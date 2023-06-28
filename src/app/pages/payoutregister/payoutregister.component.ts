import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-payoutregister',
  templateUrl: './payoutregister.component.html',
  styleUrls: ['./payoutregister.component.scss']
})
export class PayoutregisterComponent implements OnInit {

  public aliadosAr: any = [];
  
  public aliado: any = '';
  public cuenta: any = '';
  public cuentasAr: any = [];
  public valorCuentatext: any = [];
  public valorCuenta: any = '';
  public tipoCuenta:any = '';
  public banco:any = '';
  public numeroCuenta:any;
  public valor:any;
  public estadoUnput:boolean = true;
  public loading = false;
  public valorPayout: any = [];


  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.resetInput();
    this.verAliados()
  }

  resetInput(){
    //this.aliadosAr = [];
    this.aliado = '';
    this.cuenta = '';
    this.cuentasAr = [];
    this.valorCuentatext = [];
    this.valorCuenta = '';
    this.tipoCuenta = '';
    this.banco = '';
    this.numeroCuenta = '';
    this.valor = '';
    this.estadoUnput = true;
    this.valorPayout = [];
  }

  verAliados(){
    
    this.aliadosAr = [];

    this.authService.veraliados(0).subscribe( (res:any) => {
      const {result} = res;

      result.forEach((element:any) => {
        
        this.aliadosAr.push({"name":element.merchant,"code": element.id,"amount":element.amount})
      });

    },(error: any) => {
      const { msg, status } = error.error;
   
      Notiflix.Report.warning('Error', msg, 'Aceptar');

      if(status == 0){
        this.authService.close();
      }
     
    });
  }

  verCuentas(aliado:any){
    //console.log(aliado.amount)

    this.valorPayout =[{severity:'success', summary:`The Amount Payout: $${ Intl.NumberFormat('de-DE').format(aliado.amount) }`, detail:''}];
    
    if(!aliado){
      this.cuentasAr = [];
      this.cuenta = '';
      this.valorCuentatext = [];
      

      this.cuenta = '';
      this.tipoCuenta = '';
      this.banco = '';
      this.numeroCuenta = '';
      this.valor = '';

    }else{
      this.cuentasAr = [];
      this.cuenta = '';
      this.valorCuentatext = [];
     

      this.cuenta = '';
      this.tipoCuenta = '';
      this.banco = '';
      this.numeroCuenta = '';
      this.valor = '';

      this.authService.vercuentas(0,aliado.code).subscribe( (res:any) => {
        const {result} = res;
        this.cuentasAr.push({"name":"Banco externo","code":0})
        result.forEach((element:any) => {
          this.cuentasAr.push({"name":element.alias+' ( '+element.num_account+' )',"code": element.uid})
        });
      },(error: any) => {
          const { msg, status } = error.error;
      
          Notiflix.Report.warning('Error', msg, 'Aceptar');

          if(status == 0){
            this.authService.close();
          }
      
      });
    }
  }

  verCuentas2(aliado:any){

    if(!aliado){
      this.valorCuentatext = [];
     
    }else{
      if(aliado.code == 0){

        this.tipoCuenta = '';
        this.banco = '';
        this.numeroCuenta = '';
        this.valor = '';

        this.valorCuentatext = [];
      
        this.valorCuenta = '';
        this.estadoUnput = false;

      }else{

        this.tipoCuenta = '';
        this.banco = '';
        this.numeroCuenta = '';
        this.valor = '';

        this.valorCuentatext = [];
        this.valorCuenta = '';
        this.estadoUnput = true;
        this.authService.vercuentasid(0,aliado.code).subscribe( (res:any) => {
          const {result} = res;

          /* this.valorCuentatext = ` The Amount: ${result[0].amount} (el valor maximo de retiro es el 80%)`; */
          this.valorCuentatext =[{severity:'info', summary:`The Amount: $${ Intl.NumberFormat('de-DE').format(result[0].amount) }`, detail:' (el valor maximo de retiro es el 80%)'}];
          this.valorCuenta = result[0].amount;
        },(error: any) => {
            const { msg, status } = error.error;
        
            Notiflix.Report.warning('Error', msg, 'Aceptar');

            if(status == 0){
              this.authService.close();
            }
        
        });
      }
    }

  }

  guardar(){
    
    if(!this.aliado){
      Notiflix.Notify.warning('Seleccione un aliado');
    }else  if(!this.cuenta){
      Notiflix.Notify.warning('Seleccione una cuenta');
    }else  if(!this.cuenta){
      Notiflix.Notify.warning('Seleccione una cuenta');
    }else  if(!this.tipoCuenta && this.cuenta.code == 0){
      Notiflix.Notify.warning('Seleccione el tipo cuenta');
    }else  if(!this.banco && this.cuenta.code == 0){
      Notiflix.Notify.warning('Seleccione el banco');
    }else  if(!this.numeroCuenta && this.cuenta.code == 0){
      Notiflix.Notify.warning('Seleccione el numero cuenta');
    }else  if(!this.valor){
      Notiflix.Notify.warning('Digite el valor');
    }else  if( ( this.valorCuenta-(this.valorCuenta*0.20) ) < this.valor && this.cuenta.code != 0){
      Notiflix.Report.warning('Error', `El valor maximo de retiro es el 20%  ( ${ this.valorCuenta-(this.valorCuenta*0.20) } )`, 'Aceptar');
    }else{

      let arr = {
        "merchant_id":this.aliado.code,
        "account_id": this.cuenta.code,
        "type_account": this.tipoCuenta,
        "banck": this.banco,
        "num_account": this.numeroCuenta,
        "amount": this.valor,
        "total": this.valorCuenta
      }

      Notiflix.Confirm.show(
        'Message Confirm',
        `Deseas <strong>Registrar<strong> el payout?`,
        'Yes',
        'No',
        () => {

          Notiflix.Loading.arrows();

          this.authService.savepayoutregister(arr).subscribe( (res:any) => {
            const {result, msg} = res;

            this.ngOnInit()
          
            Notiflix.Report.success('success', msg, 'Aceptar');
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
