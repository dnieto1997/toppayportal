import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  public password:string = '';
  public rePassword:string = '';

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  cambiar(){
    if(this.password == ''){
      Notiflix.Report.warning('Error', 'Current password', 'Ok');
    }else if(this.rePassword == ''){
      Notiflix.Report.warning('Error', 'New password', 'Ok');
    }else{

      Notiflix.Loading.arrows();

      let arr = {passv:this.password,passn:this.rePassword}
      this.authService.changePass(arr).subscribe( (res:any) => {

        const {result, msg} = res;
       
        Notiflix.Report.success('Success', msg, 'Aceptar');

        this.password = '';
        this.rePassword = '';
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
  }

}
