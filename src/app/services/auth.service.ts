import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpService,
    private router: Router,
    public storageService: StorageService
  ) { }

  login( postDate: any ): Observable<any>{ 

    return this.httpService.post('auth/login', postDate);
    
  }

  todaymoneyin( postDate: any ): Observable<any>{ 

    return this.httpService.get('dashboard/todaymoneyin', postDate);
    
  }

  todaytransactionin( postDate: any ): Observable<any>{ 

    return this.httpService.get('dashboard/todaystransactionin', postDate);
    
  }

  todaytransactioninf( postDate: any ): Observable<any>{ 

    return this.httpService.get('dashboard/todaystransactionerrorin', postDate);
    
  }

  todaymoneyout( postDate: any ): Observable<any>{ 

    return this.httpService.get('dashboard/todaymoneyout', postDate);
    
  }

  todaytransactionout( postDate: any ): Observable<any>{ 

    return this.httpService.get('dashboard/todaystransactionout', postDate);
    
  }

  payInDashboard( postDate: any ): Observable<any>{ 

    return this.httpService.get('dashboard/payInDashboard', postDate);
    
  }

  payOutDashboard( postDate: any ): Observable<any>{ 

    return this.httpService.get('dashboard/payOutDashboard', postDate);
    
  }


  viewmenu( postDate: any ): Observable<any>{ 

    return this.httpService.get('menu', postDate);
    
  }

  payouttable( postDate: any ): Observable<any>{ 
   
    return this.httpService.get('payout/table'+postDate, 0);
    
  }

  payoutpagar( postDate: any ,postDate2: any ): Observable<any>{ 

    return this.httpService.put(`payout/pagar/${postDate}`, postDate2);
    
  }

  payoutrechazar( postDate: any ,postDate2: any ): Observable<any>{ 

    return this.httpService.put(`payout/rechazar/${postDate}`, postDate2);
    
  }

  payoutach( postDate: any ,postDate2: any ): Observable<any>{ 

    return this.httpService.put(`payout/payoutach/${postDate}`, postDate2);
    
  }

  payoutSuccess( postDate: any ): Observable<any>{ 
   
    return this.httpService.post('payout/success', postDate);
    
  }

  
  payoutMotivo( postDate: any ): Observable<any>{ 
   
    return this.httpService.post('payout/bucarmotivo', postDate);
    
  }

  pagosPayout( postDate: any ): Observable<any>{ 
   
    return this.httpService.post('payout/pagos', postDate);
    
  }

  payoutMasivo( postDate: any ): Observable<any>{ 
   
    return this.httpService.get('payout/masiva', postDate);
    
  }

  payoutfilter( postDate: any ): Observable<any>{ 
   
    return this.httpService.post('payout/filtro', postDate);
    
  }

  updateMasiva( postDate: any ): Observable<any>{ 
   
    return this.httpService.post('payout/msgmasiva', postDate);
    
  }

  updateMasiva2( postDate: any ): Observable<any>{ 
   
    return this.httpService.post('payout/notificar', postDate);
    
  }

  estadosSolicitud( postDate: any ): Observable<any>{ 
   
    return this.httpService.post('payout/estadoSol', postDate);
    
  }


  eliminarRef( postDate: any ,postDate2: any ): Observable<any>{ 

    return this.httpService.put(`payout/deleteRef/${postDate}`, postDate2);
    
  }

  editarRef( postDate: any ,postDate2: any ): Observable<any>{ 

    return this.httpService.put(`payout/editarRef/${postDate}`, postDate2);
    
  }


  veraliados( postDate2: any ): Observable<any>{ 

    return this.httpService.get(`aliado/todos`, postDate2);
    
  }

  perfil( postDate2: any ): Observable<any>{ 

    return this.httpService.get(`aliado/perfil`, postDate2);
    
  }

  vercuentas( postDate: any,postDate2: any ): Observable<any>{ 

    return this.httpService.get(`wallets/todos/${postDate2}`, postDate);
    
  }

  vercuentasid( postDate: any,postDate2: any ): Observable<any>{ 

    return this.httpService.get(`wallets/id/${postDate2}`, postDate);
    
  }

  savepayoutregister( postDate: any ): Observable<any>{ 
   
    return this.httpService.post('wallets/save', postDate);
    
  }

  cashintable( postDate: any ): Observable<any>{ 
   
    return this.httpService.get('cashin/table'+postDate, 0);
    
  }

  verbalance( postDate: any ): Observable<any>{ 
   
    return this.httpService.get('balance/ver', postDate);
    
  }

  
  changePass( postDate: any ): Observable<any>{ 
   
    return this.httpService.post('auth/changepass', postDate);
    
  }

  estadMov( postDate: any ): Observable<any>{ 
   
    return this.httpService.get('cashin/estado/'+postDate, 0);
    
  }

  estadMov2( postDate: any ): Observable<any>{ 
   
    return this.httpService.get('cashin/estado2/'+postDate, 0);
    
  }


  utilidadtable( postDate: any ): Observable<any>{ 
   
    return this.httpService.post('utilidades/table', postDate);
    
  }

  importPayout( postDate: any ): Observable<any>{ 
   
    return this.httpService.post('payout/importar', postDate);
    
  }

  importarListaNegra( postDate: any ): Observable<any>{ 
   
    return this.httpService.post('listanegra/importar', postDate);
    
  }

  buscarbalance( postDate: any ): Observable<any>{ 
   
    return this.httpService.post('balance/buscar', postDate);
    
  }

  gastosTable( postDate: any ): Observable<any>{ 
   
    return this.httpService.get('gastos/ver/'+postDate, 0);
    
  }

  gastosDelete( postDate: any ,postDate2: any ): Observable<any>{ 
    return this.httpService.delete(`gastos/eliminar/${postDate}`, postDate2);
  }

  gastosGuardar( postDate: any ): Observable<any>{ 
    return this.httpService.post('gastos/crear', postDate);
  }

  usuariosTable( postDate: any ): Observable<any>{ 
    return this.httpService.get('usuarios/ver', 0);
  }

  usuariosDelete( postDate: any ,postDate2: any ): Observable<any>{ 
    return this.httpService.delete(`usuarios/eliminar/${postDate}`, postDate2);
  }

  usuariosTipo( postDate: any ): Observable<any>{ 
    return this.httpService.get('usuarios/tipo', 0);
  }

  pais( postDate: any ): Observable<any>{ 
    return this.httpService.get('pais/ver', 0);
  }

  usuariosCrear( postDate: any ): Observable<any>{ 
    return this.httpService.post('usuarios/crear', postDate);
  }

  usuariosEditar( postDate: any ,postDate2: any ): Observable<any>{ 
    return this.httpService.put(`usuarios/editar/${postDate}`, postDate2);
  }

  usuariosPass( postDate: any ,postDate2: any ): Observable<any>{ 
    return this.httpService.put(`usuarios/password/${postDate}`,postDate2);
  }

  dispersionesCrear( postDate: any ): Observable<any>{ 
    return this.httpService.post('dispersiones/crear', postDate);
  }

  dispersionesGmf( postDate: any ): Observable<any>{ 
    return this.httpService.post('dispersiones/gmf', postDate);
  }

  verBancos( postDate: any ): Observable<any>{ 
    return this.httpService.post('dispersiones/bancos', postDate);
  }

  dispercionesTable( postDate: any ): Observable<any>{ 
    return this.httpService.get('dispersiones/ver', 0);
  }

  dispersionDelete( postDate: any ,postDate2: any ): Observable<any>{ 
    return this.httpService.delete(`dispersiones/eliminar/${postDate}`, postDate2);
  }

  verMethod( postDate: any ): Observable<any>{ 
    return this.httpService.get('conciliacion/verMethod', 0);
  }

  verConsiliacion( postDate: any ): Observable<any>{ 
    return this.httpService.post('conciliacion/buscarMovimiento', postDate);
  }

  buscarConsiliacion( postDate: any ): Observable<any>{ 
    return this.httpService.post('conciliacion/buscarConsiliacion', postDate);
  }

  ediatrConsiliacion( postDate: any ): Observable<any>{ 
    return this.httpService.post('conciliacion/editarMovimiento', postDate);
  }

  payouttablePeru( postDate: any ): Observable<any>{ 
   
    return this.httpService.post('payoutperu/table', postDate);
    
  }

  payoutpagarPeru( postDate: any ,postDate2: any ): Observable<any>{ 

    return this.httpService.put(`payoutperu/pagar/${postDate}`, postDate2);
    
  }

  payoutrechazarPeru( postDate: any ,postDate2: any ): Observable<any>{ 
    return this.httpService.post(`payoutperu/rechazar/${postDate}`, postDate2);
    
  }

  cambiarPais( postDate: any ): Observable<any>{ 
    return this.httpService.get(`usuarios/cambiarpais/${postDate}`, 0);
  }


  close(){
      this.storageService.removeItem(AuthConstants.AUTH);
      this.router.navigate(['']);
      /* location.reload(); */
  }
}
