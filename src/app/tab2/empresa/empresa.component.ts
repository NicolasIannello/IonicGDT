import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/servicios/empresa.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss'],
})
export class EmpresaComponent implements OnInit {
  ID: string;
  User: Array<any> = [{ NombreUsuario: "Usuario" }];
  cant:number|string="";
  refre:string=""

  constructor(private router: Router,public api:EmpresaService) { 
    //this.ID = JSON.parse(localStorage.getItem('ID') || '{}');
  }

  ngOnInit() {
    if (localStorage.getItem('Tipo') != 'empresa') {
			this.router.navigate(['']);
		}
		const formData = new FormData
		formData.append("ID", JSON.parse(localStorage.getItem('ID') || '{}'));

    this.api.traernom(formData).subscribe(resp=>{
      this.User=resp;
    })

		this.api.CargarTurnos(formData).subscribe(resp =>
			this.cant = resp.length
		)
  }
  refresh(){
    this.refre="rotate"
    const formData = new FormData
		formData.append("ID", JSON.parse(localStorage.getItem('ID') || '{}'));
    this.api.CargarTurnos(formData).subscribe(resp=>{
      this.cant=resp.length
      this.refre=""
    })
  }

  cerrarsesion(){
    localStorage.removeItem('ID');
		localStorage.removeItem('Tipo');
		this.router.navigate(['']);
  }
}
