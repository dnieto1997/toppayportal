import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './pages/component/navbar/navbar.component';
import { NavComponent } from './pages/component/nav/nav.component';
import { PayoutComponent } from './pages/payout/payout.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';
import { PayoutregisterComponent } from './pages/payoutregister/payoutregister.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {MessagesModule} from 'primeng/messages';
import { InputNumberModule } from "primeng/inputnumber";
import {TabViewModule} from 'primeng/tabview';
import {PasswordModule} from 'primeng/password';
import {CheckboxModule} from 'primeng/checkbox';
import {DialogModule} from 'primeng/dialog';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { BalancesComponent } from './pages/balances/balances.component';
import {MenubarModule} from 'primeng/menubar';
import {SidebarModule} from 'primeng/sidebar';
import {MenuModule} from 'primeng/menu';
import {FieldsetModule} from 'primeng/fieldset';
import {ChartModule} from 'primeng/chart';
import { PasswordComponent } from './pages/password/password.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { EstadomovComponent } from './pages/estadomov/estadomov.component';
import { UtilidadesComponent } from './pages/utilidades/utilidades.component';
import { ImportPayoutComponent } from './pages/import-payout/import-payout.component';
import { GastosComponent } from './pages/gastos/gastos.component';
import { DispersionesComponent } from './pages/dispersiones/dispersiones.component';
import { PayoutsuccessComponent } from './pages/payoutsuccess/payoutsuccess.component';
import { ConciliacionComponent } from './pages/conciliacion/conciliacion.component';
import { PayoutfilterComponent } from './pages/payoutfilter/payoutfilter.component';
import { PayoutpagosComponent } from './pages/payoutpagos/payoutpagos.component';
import { PayoutperuComponent } from './pages/payoutperu/payoutperu.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {CalendarModule} from 'primeng/calendar';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MenuService } from './services/menu.service';
import { AliadosComponent } from './pages/aliados/aliados.component';
import { ListanegraComponent } from './pages/listanegra/listanegra.component';
import { ToppaynequiComponent } from './pages/toppaynequi/toppaynequi.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    NavComponent,
    PayoutComponent,
    PayoutregisterComponent,
    PrestamosComponent,
    TransactionsComponent,
    PerfilComponent,
    BalancesComponent,
    PasswordComponent,
    UsuariosComponent,
    EstadomovComponent,
    UtilidadesComponent,
    ImportPayoutComponent,
    GastosComponent,
    DispersionesComponent,
    PayoutsuccessComponent,
    ConciliacionComponent,
    PayoutfilterComponent,
    PayoutpagosComponent,
    PayoutperuComponent,
    AliadosComponent,
    ListanegraComponent,
    ToppaynequiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
    DropdownModule,
    InputTextModule,
    MessagesModule,
    InputNumberModule,
    TabViewModule,
    PasswordModule,
    CheckboxModule,
    DialogModule,
    MenubarModule,
    SidebarModule,
    MenuModule,
    FieldsetModule,
    ChartModule,
    OverlayPanelModule,
    CalendarModule,
    MultiSelectModule,
    ConfirmPopupModule,
    ToastModule
  ],
  providers: [HttpClientModule,MenuService,{provide:LocationStrategy,useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
