import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/servicios/empresa.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  ID: string = JSON.parse(localStorage.getItem('ID') || '{}');
	Turnos: Array<any> = [];
  scarg:string="Cargar"
  scarclass:string=""
  servicios:any=[];
  fecha:string=""
  hora:string=""
  cliente:string=""
  servicio:string=""

  constructor(public api:EmpresaService) { }

  ngOnInit() {
    const formData = new FormData
		formData.append("ID", this.ID);

    this.api.cargarClientes(formData).subscribe(resp =>{
      this.Turnos=resp
    })

    this.api.cargarServicios().subscribe(resp=>
      this.servicios=resp
    )
  }

  select(){
    this.servicio=(<HTMLInputElement>document.getElementById("serv")).value;
  }

  doRefresh(event) {
    console.log('Begin async operation');
    const formData = new FormData
		formData.append("ID", this.ID);

    this.api.cargarClientes(formData).subscribe(resp =>{
      this.Turnos=resp
    })
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  Cargar(){
    if(this.fecha=='' || this.servicio=='' || this.hora=='' || this.cliente=='' ){
			alert('Complete todos los campos antes de continuar');
		}else{
			(<HTMLInputElement>document.getElementById('cargar')).disabled = true;
			this.scarclass = "spinner-border spinner-border-sm";
			this.scarg = "";

			const formData = new FormData
			formData.append("fecha",this.fecha);
			formData.append("servicio",this.servicio);
			formData.append("time",this.hora);
			formData.append("cliente",this.cliente);
			formData.append("ID",this.ID);

			this.api.crearCliente(formData).subscribe(resp=>{
				if(resp=="Usuario no encontrado"  || resp=="No se encontro un turno disponible" || resp=="Ya existe un turno vinculado a esa cuenta en dicho horario"){
					(<HTMLInputElement>document.getElementById('cargar')).disabled = false;
					this.scarclass = "";
					this.scarg = "Cargar";
					alert(resp);
				}else{
					(<HTMLInputElement>document.getElementById('cargar')).disabled = false;
					this.scarclass = "";
					this.scarg = "Cargar";
					this.Turnos=resp
					alert("Turno cargado con exito");
				}
			})
		}  
  }
}