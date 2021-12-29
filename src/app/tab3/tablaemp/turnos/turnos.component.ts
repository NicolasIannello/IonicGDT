import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/servicios/empresa.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss'],
})
export class TurnosComponent implements OnInit {
  ID: string;
	Turnos: Array<any> = [];
  typeDelim:string="text"
  selim:string="Eliminar"
  selimclass:string=""
  tipoelim:string="Codigo agrupador"
  datoelim:string=""

  constructor(public api:EmpresaService) { 
    this.ID = JSON.parse(localStorage.getItem('ID') || '{}');
  }

  ngOnInit() {
    const formData = new FormData
		formData.append("ID", this.ID);

    this.api.CargarTurnos(formData).subscribe(resp =>
      this.Turnos=resp      
    )
  }
  doRefresh(event) {
    console.log('Begin async operation');
    const formData = new FormData
		formData.append("ID", this.ID);

    this.api.CargarTurnos(formData).subscribe(resp =>{
      this.Turnos=resp
    })
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  Eliminar(){
    if (this.datoelim == "") {
			alert("Ingrese el dato para eliminar")
		} else {
			if (confirm('Esta por eliminar un turno. Presione aceptar para continuar')) {
				this.selimclass = "spinner-border spinner-border-sm";
				this.selim = "";

				const formData = new FormData
				formData.append("dato", this.datoelim);
				formData.append("tipo", this.tipoelim);
				formData.append("ID", this.ID);

				this.api.Eliminar(formData).subscribe((resp) => {
					if (resp == "no encontrado") {
						alert("No se pudo encontrar un turno con dicho valor");
					} else {
						alert("Turnos eliminados")
						this.Turnos = resp
					}
					this.selimclass = "";
					this.selim = "Eliminar turnos";
				})
			}
		}
  }

  select(){
    if(this.tipoelim=="Fecha"){
      this.typeDelim="date"
      this.datoelim=""
    }else{
      this.typeDelim="text"
      this.datoelim=""
    }
  }
}
