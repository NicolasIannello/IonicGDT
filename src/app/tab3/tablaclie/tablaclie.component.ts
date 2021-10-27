import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-tablaclie',
  templateUrl: './tablaclie.component.html',
  styleUrls: ['./tablaclie.component.scss'],
})
export class TablaclieComponent implements OnInit {
  ID: string = JSON.parse(localStorage.getItem('ID') || '{}');
  Turnos:Array<any>=[];

  constructor(public api:ClienteService) { }

  ngOnInit() {    
    const formData = new FormData
		formData.append("ID", this.ID);

    this.api.cargarTurnos(formData).subscribe(resp=>{
      this.Turnos=resp
    })
  }
  Eliminar(id:any){
    if(confirm('Esta por eliminar un turno. Presione aceptar para continuar')){
      var dato=new FormData();
      dato.append("IDtce",id);
      dato.append("IDclie",this.ID);

      this.api.Eliminar(dato).subscribe(resp=>{
        alert(resp);
        var dato=new FormData();
	      dato.append("ID",this.ID);
        this.api.cargarTurnos(dato).subscribe(resp=>{
          this.Turnos=resp
        })
      })
    }
  }
  doRefresh(event) {
    console.log('Begin async operation');
    const formData = new FormData
		formData.append("ID", this.ID);

    this.api.cargarTurnos(formData).subscribe(resp=>{
      this.Turnos=resp
    })
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
