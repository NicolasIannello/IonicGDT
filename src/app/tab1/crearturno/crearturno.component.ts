import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/servicios/empresa.service';

@Component({
  selector: 'app-crearturno',
  templateUrl: './crearturno.component.html',
  styleUrls: ['./crearturno.component.scss'],
})
export class CrearturnoComponent implements OnInit {
  ID: string;
  screar:string=""
  screartext:string="Crear"
  servicios:Array<any>=[]
  dia1:boolean=false
  dia2:boolean=false
  dia3:boolean=false
  dia4:boolean=false
  dia5:boolean=false
  dia6:boolean=false
  dia7:boolean=false
  servicio:string=""
  fechafin:string=""
  duracion:string=""
  capacidad:String=""
  horainicio:string=""
  horafin:string=""

  constructor(public api:EmpresaService) { 
	this.ID = JSON.parse(localStorage.getItem('ID') || '{}');
  }

  ngOnInit() {
    this.api.cargarServicios().subscribe(resp=>{
      this.servicios=resp
    })
  }
  /*serv(){
		this.servicio = (<HTMLInputElement>document.getElementById("servicio")).value;
  }*/
  crearTurno(){
    if (this.servicio == "" || this.fechafin == "" || this.horainicio == "" || this.horafin == "" || this.duracion == "" || this.capacidad == "") {
			alert("Complete todos los campos");
		} else if (this.dia1 == false && this.dia2 == false && this.dia3 == false && this.dia4 == false && this.dia5 == false && this.dia6 == false && this.dia7 == false) {
			alert("Debe seleccionar al menos un dia de la semana");
		} else if (this.horainicio >= this.horafin) {
			alert("Revise horarios ingresados");
		} else {
			this.screar = "spinner-border spinner-border";
			this.screartext = "";

			const formData = new FormData
			formData.append("servicio", this.servicio);
			formData.append("Monday", String(this.dia1));
			formData.append("Tuesday", String(this.dia2));
			formData.append("Wednesday", String(this.dia3));
			formData.append("Thursday", String(this.dia4));
			formData.append("Friday", String(this.dia5));
			formData.append("Saturday", String(this.dia6));
			formData.append("Sunday", String(this.dia7));
			formData.append("FechaFin", this.fechafin);
			formData.append("HoraInicio", this.horainicio);
			formData.append("HoraFin", this.horafin);
			formData.append("DuracionMin", this.duracion);
			formData.append("Capacidad", String(this.capacidad));
			formData.append("ID", this.ID);

			this.api.crearTurno(formData).subscribe(resp => {
				if (resp == "superpuesto") {
					alert("No se pudo crear el turno, horarios superpuestos con otro turno");
				} else {
					alert('Turnos creados')
				}
				this.screar = "";
				this.screartext = "Generar turnos";
			})
		}
  }
}
