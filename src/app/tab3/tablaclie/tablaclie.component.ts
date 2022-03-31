import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-tablaclie',
  templateUrl: './tablaclie.component.html',
  styleUrls: ['./tablaclie.component.scss'],
})
export class TablaclieComponent implements OnInit {
  ID: string;
  Turnos:Array<any>=[];
  claseTabla:string="table table-bordered table-striped table-wrapper-scroll-y my-custom-scrollbar tabla"
  claseBox:string="box"

  constructor(public api:ClienteService) { 
    //this.ID = JSON.parse(localStorage.getItem('ID') || '{}');
  }

  ngOnInit() {    
    const formData = new FormData
		formData.append("ID", (localStorage.getItem('ID') || '{}'));

    this.api.cargarTurnos(formData).subscribe(resp=>{
      this.Turnos=resp
    })
    
    if(screen.orientation.angle==90){
      this.claseTabla="table table-bordered table-striped table-wrapper-scroll-y my-custom-scrollbar tabla90"
      this.claseBox="box box90"
    }else{
      this.claseTabla="table table-bordered table-striped table-wrapper-scroll-y my-custom-scrollbar tabla"
      this.claseBox="box"
    }

    window.addEventListener("orientationchange", ()=>{
      if(screen.orientation.angle==90){
        this.claseTabla="table table-bordered table-striped table-wrapper-scroll-y my-custom-scrollbar tabla90"
        this.claseBox="box box90"
      }else{
        this.claseTabla="table table-bordered table-striped table-wrapper-scroll-y my-custom-scrollbar tabla"
        this.claseBox="box"
      }
    });
  }
  Eliminar(id:any){
    if(confirm('Esta por eliminar un turno. Presione aceptar para continuar')){
      var dato=new FormData();
      dato.append("IDtce",id);
      dato.append("IDclie",(localStorage.getItem('ID') || '{}'));
      dato.append("cel","+549");
      dato.append('env','false');

      this.api.Eliminar(dato).subscribe(resp=>{
        alert(resp);
        var dato=new FormData();
	      dato.append("ID",(localStorage.getItem('ID') || '{}'));
        this.api.cargarTurnos(dato).subscribe(resp=>{
          this.Turnos=resp
        })
      })
    }
  }
  doRefresh(event) {
    console.log('Begin async operation');
    const formData = new FormData
		formData.append("ID", (localStorage.getItem('ID') || '{}'));

    this.api.cargarTurnos(formData).subscribe(resp=>{
      this.Turnos=resp
    })
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}