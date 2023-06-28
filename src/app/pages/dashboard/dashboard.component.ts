import { Component, OnInit,Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public todayMoneyIn: any = [];
  public todayTransactionIn: any = [];
  public todayMoneyOut : any = [];
  public todayTransactionOut : any = [];
  public todayTransactionInf: any = [];

  public basicData:any = [];

  public basicOptions = {
    plugins: {
        legend: {
            labels: {
                color: '#443ea2'
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: '#443ea2'
            },
            grid: {
                color: '#443ea2'
            }
        },
        y: {
            ticks: {
                color: '#443ea2'
            },
            grid: {
                color: '#443ea2'
            }
        }
    }
};

  constructor(
    private authService: AuthService,
   
  ) { }

  ngOnInit(): void {

    this.llamarApis();
  }

  llamarApis(){

    this.authService.todaymoneyin(0).subscribe( (res:any) => {
      const { result , grafico } = res;
     
      let varMes:any = [];
      let varcashin:any = [];
      let varcashou:any = [];

      grafico.forEach((res:any) => {
          varMes.push(res.mes)
          varcashin.push(res.cashin)
          varcashou.push(res.cashou)
      });

      this.basicData = {
        labels: varMes,
        datasets: [
            {
                label: 'Cash Out',
                data: varcashou,
                fill: false,
                borderColor: '#D32F2F',
                tension: .4
            },
            {
                label: 'Cash In',
                data: varcashin,
                fill: false,
                borderColor: '#419544',
                tension: .4
            }
        ]
      };
      this.todayMoneyIn = result;

    },(error: any) => {
      const { msg, status } = error.error;
      Notiflix.Report.warning('Error', msg, 'Aceptar');

      if(status == 0){
        this.authService.close();
      }
     
    });

    this.authService.todaytransactionin(0).subscribe( (res:any) => {
      const {result} = res;

      this.todayTransactionIn = result;

    },(error: any) => {
      const { msg, status } = error.error;
      Notiflix.Report.warning('Error', msg, 'Aceptar');

      if(status == 0){
        this.authService.close();
      }
     
    });

    this.authService.todaytransactioninf(0).subscribe( (res:any) => {
      const {result} = res;
      this.todayTransactionInf = result;

    },(error: any) => {
      const { msg, status } = error.error;
      Notiflix.Report.warning('Error', msg, 'Aceptar');

      if(status == 0){
        this.authService.close();
      }
     
    });

    this.authService.todaymoneyout(0).subscribe( (res:any) => {
      const {result} = res;
      this.todayMoneyOut = result;

    },(error: any) => {
      const { msg, status } = error.error;
      Notiflix.Report.warning('Error', msg, 'Aceptar');

      if(status == 0){
        this.authService.close();
      }
     
    });

    this.authService.todaytransactionout(0).subscribe( (res:any) => {
      const {result} = res;
      this.todayTransactionOut = result;

    },(error: any) => {
      const { msg, status } = error.error;
      Notiflix.Report.warning('Error', msg, 'Aceptar');

      if(status == 0){
        this.authService.close();
      }
     
    });

  }


}
