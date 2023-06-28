import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.scss']
})
export class PrestamosComponent implements OnInit {

  public select1:boolean = true;
  public select2:boolean = false;
  public select3:boolean = false;
  public select4:boolean = false;
  public select5:boolean = false;
  public select6:boolean = false;
  public select7:boolean = false;
  public display: boolean = false;

  //INPUTS
  public inpCorreo:string = '5555';
  public inpCelular:Number = 555;
  public inpRcelular:string = '5555';
  public inpPassword:string = '14Diciembre1988';
  public inpPoliticas:boolean = true;

  public displayMaximizable: boolean = false;

  constructor(
   
  ) { }

  ngOnInit(): void {
  }

  showDialog() {
    this.display = true;
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  btnsgt1(){

  }


}
