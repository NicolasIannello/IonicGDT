import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/servicios/registro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss'],
})
export class EmpresaComponent implements OnInit {
  Localidades:Array<any>=[];

  nombre:string="";
	mail:string="";
	contra:string="";
	contra2:string="";
	localidad:string="";
	ubicacion:string="";
  
  map:any;
  marker=new google.maps.Marker();

  spinner:string="";
  text:string="Crear cuenta";
  type:string="password";
  type2:string="password";

  constructor(public api: RegistroService, private router: Router) { }

  ngOnInit() {
    this.api.localidades().subscribe(resp=>
			this.Localidades=resp
		)

    this.map= new google.maps.Map(
			document.getElementById("Mapa") as HTMLElement,
			{ 
				center: { lat: -34.61199298552686, lng: -58.44019025298453 },
				fullscreenControl: false,
				zoom:11, 
				mapId:'a13647e5271fd4a1',
			} as google.maps.MapOptions
		);

    this.map.addListener("click", (mapsMouseEvent:any) => {
			
			this.marker.setPosition(mapsMouseEvent.latLng);
			this.marker.setMap(this.map);

			this.api.Geocode(mapsMouseEvent.latLng.lat(),mapsMouseEvent.latLng.lng()).subscribe(resp=>
				this.ubicacion=resp.display_name
			)
		})
  }

  Mostrar(){
    if(this.type=="password"){
      this.type="text";
    }else{
      this.type="password";
    }
  }
  Mostrar2(){
		if(this.type2=="password"){
			this.type2="text";
		}else{
			this.type2="password";
		}
	}
  loc(){
		this.Localidades.forEach(element => {
			if(element.LocalidadID==(<HTMLInputElement>document.getElementById("localidademp")).value){
				this.map.setCenter(new google.maps.LatLng(element.lat, element.lon));
				this.map.setZoom(14);
				this.localidad=(<HTMLInputElement>document.getElementById("localidademp")).value
			}
		});
	}
  ReGeo(){
		this.api.ReverseGeocode(this.ubicacion).subscribe(resp=>{
			this.marker.setPosition({lat: parseFloat(resp[0].lat), lng: parseFloat(resp[0].lon)});
			this.marker.setMap(this.map); 
		},
		error => {                             
			alert('Ubicacion no encontrada');
		})
	}
  crearEmp(){
		if(this.nombre=="" || this.localidad=="" || this.mail=="" || this.contra=="" || this.contra2=="" || this.ubicacion==""){
			alert("Complete todos los campos");
		}else if(this.contra!=this.contra2){
			alert("Las contraseñas no coinciden");
		}else if((this.mail.includes("@") && this.mail.includes(".com"))){
			this.spinner = "spinner-border";
			this.text = "";
			
			const formData=new FormData
			formData.append("nomemp",this.nombre);
			formData.append("localidademp",this.localidad);
			formData.append("mailemp",this.mail);
			formData.append("ubicacion",this.ubicacion);
			formData.append("contraemp",this.contra);
			formData.append("contraemp2",this.contra2);      

			this.api.crearEmp(formData).subscribe(resp=>{
				this.spinner = "";
				this.text = "Crear cuenta";
				alert(resp)
			})
		}else{
			alert("Ingrese un email valido");
		}
	}
}
