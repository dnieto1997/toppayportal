import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeGuard } from './guards/home.guard';
import { IndexGuard } from './guards/index.guard';
import {  PermisosGuard } from './guards/permisos.guard';
import { AliadosComponent } from './pages/aliados/aliados.component';
import { BalancesComponent } from './pages/balances/balances.component';
import { ConciliacionComponent } from './pages/conciliacion/conciliacion.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DispersionesComponent } from './pages/dispersiones/dispersiones.component';
import { EstadomovComponent } from './pages/estadomov/estadomov.component';
import { GastosComponent } from './pages/gastos/gastos.component';
import { ImportPayoutComponent } from './pages/import-payout/import-payout.component';
import { LoginComponent } from './pages/login/login.component';
import { PasswordComponent } from './pages/password/password.component';
import { PayoutComponent } from './pages/payout/payout.component';
import { PayoutfilterComponent } from './pages/payoutfilter/payoutfilter.component';
import { PayoutpagosComponent } from './pages/payoutpagos/payoutpagos.component';
import { PayoutperuComponent } from './pages/payoutperu/payoutperu.component';
import { PayoutregisterComponent } from './pages/payoutregister/payoutregister.component';
import { PayoutsuccessComponent } from './pages/payoutsuccess/payoutsuccess.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UtilidadesComponent } from './pages/utilidades/utilidades.component';
import { ListanegraComponent } from './pages/listanegra/listanegra.component';
import { ToppaynequiComponent } from './pages/toppaynequi/toppaynequi.component';

const routes: Routes = [
  {
    path: 'login', component:LoginComponent,
    canActivate:[IndexGuard],
  },
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate:[HomeGuard],
    
  },
  {
    path: 'payout', component: PayoutComponent,
    canActivate:[HomeGuard],
  },
  {
    path: 'payoutregister', component: PayoutregisterComponent,
    canActivate:[HomeGuard],
    
  },
  {
   path: 'prestamos', component: PrestamosComponent,
   canActivate:[HomeGuard],
   
  },
  {
    path: 'transactions', component: TransactionsComponent,
    canActivate:[HomeGuard],
  
  },
  {
    path: 'perfil', component: PerfilComponent,
    canActivate:[HomeGuard],
  },
  {
    path: 'balances', component: BalancesComponent,
    canActivate:[HomeGuard],
  },
  {
    path: 'password', component: PasswordComponent,
    canActivate:[HomeGuard],
  },
  {
    path: 'usuarios', component: UsuariosComponent,
    canActivate:[HomeGuard],
  },
  {
    path: 'estadomov', component: EstadomovComponent,
    canActivate:[HomeGuard],
  },
  {
    path: 'utilidades', component: UtilidadesComponent,
    canActivate:[HomeGuard],
  },
  {
    path: 'importPayout', component: ImportPayoutComponent,
    canActivate:[HomeGuard],
  },
  {
    path: 'gastos', component:GastosComponent,
    canActivate:[HomeGuard],
  },
  {
    path: 'dispersiones', component:DispersionesComponent,
    canActivate:[HomeGuard],
  },
  {
    path: 'payoutsuccess', component:PayoutsuccessComponent,
    canActivate:[HomeGuard],
  },
  {
    path: 'conciliacion', component:ConciliacionComponent,
    canActivate:[HomeGuard],
  },
  {
    path: 'payoutfilter', component:PayoutfilterComponent,
    canActivate:[HomeGuard],
  },
  {
    path: 'payoutpagos', component:PayoutpagosComponent,
    canActivate:[HomeGuard],
  },
  {
    path: 'Payoutperu', component:PayoutperuComponent,
    canActivate:[HomeGuard],
  },
  {
    path: 'aliados', component:AliadosComponent,
    canActivate:[HomeGuard],
  }
  ,
  {
    path: 'listanegra', component:ListanegraComponent,
    canActivate:[HomeGuard],
  }
  ,
  {
    path: 'toppaynequi', component:ToppaynequiComponent,
    canActivate:[HomeGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
