import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  ID: string;
  User: Array<any> = [{ NombreUsuario: "Usuario" }];
  Turnos:Array<any>=[];
  cant:number|string="";
  refre:string=""

  constructor(private router: Router,public api:ClienteService) { 
    //this.ID = JSON.parse(localStorage.getItem('ID') || '{}');
  }

  ngOnInit() {
    if (localStorage.getItem('Tipo') != 'cliente') {
			this.router.navigate(['']);
		}
		const formData = new FormData
		formData.append("ID", (localStorage.getItem('ID') || '{}'));

    this.api.traernom(formData).subscribe(resp=>{
      this.User=resp;
    })

    this.api.cargarTurnos(formData).subscribe(resp=>{
      this.Turnos=resp
      this.cant=this.Turnos.length
    })
  }
  refresh(){
    this.refre="rotate"
    const formData = new FormData
		formData.append("ID", (localStorage.getItem('ID') || '{}'));
    this.api.cargarTurnos(formData).subscribe(resp=>{
      this.Turnos=resp
      this.cant=this.Turnos.length
      this.refre=""
    })
  }
  cerrarsesion(){
    localStorage.removeItem('ID');
		localStorage.removeItem('Tipo');
		this.router.navigate(['']);
  }
}
