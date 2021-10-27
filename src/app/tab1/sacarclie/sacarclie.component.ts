import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-sacarclie',
  templateUrl: './sacarclie.component.html',
  styleUrls: ['./sacarclie.component.scss'],
})
export class SacarclieComponent implements OnInit {
  ID: string = JSON.parse(localStorage.getItem('ID') || '{}');
  servicios: Array<any> = [];
  localidades: Array<any> = [];
  horarios:Array<any>=[];
  Turnos:Array<any>=[];
  //@Output() CTurnos = new EventEmitter<any>();

  servicio:string="";
  localidad:string="";
  dia:string="";
  horario:string="";

  marcadores:Array<any>=[];
  map:any;

  respuesta:Array<any>=[];
  nombreclicked:string="Calendario";
  fechas:Array<any>=[];
  mascal:string="a";

  spB:string="";
  spBtext:string="Buscar servicio";
  screar:string="";
  screartext:string="Sacar turno"

  constructor(public api:ClienteService) { }

  ngOnInit() {
    this.api.servicios().subscribe(resp=>
      this.servicios=resp
    )
    this.api.localidades().subscribe(resp=>
      this.localidades=resp
    )
    this.map= new google.maps.Map(
			document.getElementById("Mapa") as HTMLElement,
			{
				center: { lat: -34.60695148718977, lng: -58.443925928680294 },
				fullscreenControl: false,
				zoom:11, 
        zoomControl: false,
				mapId:'a13647e5271fd4a1',
			} as google.maps.MapOptions
		);  
  }

  serv(){
    this.servicio=(<HTMLInputElement>document.getElementById("servicio")).value
  }
  loc(){
    this.localidad=(<HTMLInputElement>document.getElementById("localidademp")).value
  }
  BServicio(){
    if(this.servicio=="" || this.localidad==""){
      alert("Complete servicio y localidad");
    }else{
      this.spB = "spinner-border spinner-border-sm";
      this.spBtext = "";

      const formData = new FormData
      formData.append("serv",this.servicio);
      formData.append("loc",this.localidad);

      this.api.buscarServicios(formData).subscribe(resp=>{
        this.spB = "";
        this.spBtext = "Buscar servicios";

        this.marcadores.forEach(element => {
          element.setMap(null)
        });
        this.marcadores=[];

        this.localidades.forEach(element => {
          if(element.LocalidadID==(<HTMLInputElement>document.getElementById("localidademp")).value){
            this.map.setCenter(new google.maps.LatLng(element.lat, element.lon));
            this.map.setZoom(14);
          }
        });

        this.respuesta=resp
        this.respuesta.forEach(elemento => {
          this.api.ReGeo(elemento.Ubicacion).subscribe(res=>{
            var lat=parseFloat(res[0].lat), lon=parseFloat(res[0].lon);

            const marker =new google.maps.Marker();
            marker.setPosition({lat: lat, lng: lon})
            marker.setMap(this.map)
            marker.setTitle(elemento.NombreUsuario)            
            marker.addListener("click", () => {
              this.nombreclicked=elemento.NombreUsuario;

              const formData = new FormData()
              formData.append('nom',this.nombreclicked)
              formData.append('ubi',elemento.Ubicacion)
              formData.append('serv',this.servicio)

              this.fechas=[]
              this.api.diaServicios(formData).subscribe(resp=>{
                var diapasado=0
                for (let i = 0; i < resp.length; i++) {
                  let x=new Date(); let hoy=x.getDate() 
                  let datomes={mes:'',cant:0,mesnum:0,dia:hoy,class:"",fecha:""};
                  
                  
                  if( ( hoy<=new Date(resp[i].Dia).getDate() && new Date(x).getMonth()<=new Date(resp[i].Dia).getMonth() ) || new Date(x).getMonth()!=new Date(resp[i].Dia).getMonth() ){
                    /*switch(new Date(resp[i].Dia).getMonth()){
                      case 0:  datomes = {mes:"Enero",cant:31,mesnum:1,dia: resp[i].Dia,class:"dia diaselected"}; break;
                      case 1:  datomes = {mes:"Febrero",cant:28,mesnum:2,dia: resp[i].Dia,class:"dia diaselected"}; break;
                      case 2:  datomes = {mes:"Marzo",cant:31,mesnum:3,dia: resp[i].Dia,class:"dia diaselected"}; break;
                      case 3:  datomes = {mes:"Abril",cant:30,mesnum:4,dia: resp[i].Dia,class:"dia diaselected"}; break;
                      case 4:  datomes = {mes:"Mayo",cant:31,mesnum:5,dia: resp[i].Dia,class:"dia diaselected"}; break;
                      case 5:  datomes = {mes:"Junio",cant:30,mesnum:6,dia: resp[i].Dia,class:"dia diaselected"}; break;
                      case 6:  datomes = {mes:"Julio",cant:31,mesnum:7,dia: resp[i].Dia,class:"dia diaselected"}; break;
                      case 7:  datomes = {mes:"Agosto",cant:31,mesnum:8,dia: resp[i].Dia,class:"dia diaselected"}; break;
                      case 8:  datomes = {mes:"Septiembre",cant:30,mesnum:9,dia: resp[i].Dia,class:"dia diaselected"}; break;
                      case 9:  datomes = {mes:"Octubre",cant:31,mesnum:10,dia: resp[i].Dia,class:"dia diaselected"}; break;
                      case 10: datomes = {mes:"Noviembre",cant:30,mesnum:11,dia: resp[i].Dia,class:"dia diaselected"}; break;
                      case 11: datomes = {mes:"Diciembre",cant:31,mesnum:12,dia: resp[i].Dia,class:"dia diaselected"}; break;
                    }*/

                    switch(new Date(resp[i].Dia).getMonth()){
                      case 0:  
                       
                        break;
                      case 1:  
                        
                        break;
                      case 2:  
                       
                        break;
                      case 3:  
                       
                        break;
                      case 4:  
                        
                        break;
                      case 5:  
                       
                        break;
                      case 6:  
                        
                        break;
                      case 7:  
                        
                        break;
                      case 8:  
                        
                        break;
                      case 9:
                        diapasado=this.armarCalendario(diapasado,resp,datomes,i,31)  
                        /*if(i<resp.length-1){
                          var sigdia=new Date(resp[i+1].Dia).getDate()+1
                        }
                        if(new Date(resp[i].Dia).getDate()+1>31){
                          datomes = {mes:"Noviembre",cant:30,mesnum:11,dia: 1,class:"dia diaselected",fecha: resp[i].Dia}; 
                          this.fechas.push(datomes);
                          for (let j = 2; j < sigdia; j++) {                              
                            datomes = {mes:"Noviembre",cant:30,mesnum:11,dia: j,class:"dia",fecha: ""};
                            this.fechas.push(datomes); 
                          }
                        }else{
                          datomes = {mes:"Octubre",cant:31,mesnum:10,dia: new Date(resp[i].Dia).getDate()+1,class:"dia diaselected",fecha: resp[i].Dia};
                          this.fechas.push(datomes);
                          if(i==resp.length-1 && new Date(resp[i].Dia).getDate()+1<31){
                            for (let j = new Date(resp[i].Dia).getDate()+2; j <= 31; j++) {
                              datomes = {mes:"Octubre",cant:31,mesnum:10,dia: j,class:"dia",fecha: ""};
                              this.fechas.push(datomes); 
                            }
                          }else if(sigdia>new Date(resp[i].Dia).getDate()+1 && sigdia!=new Date(resp[i].Dia).getDate()+1){
                            for (let j = new Date(resp[i].Dia).getDate()+2; j < sigdia; j++) {
                              datomes = {mes:"Octubre",cant:31,mesnum:10,dia: j,class:"dia",fecha: ""};
                              this.fechas.push(datomes); 
                            }
                          }
                        }
                        diapasado=new Date(resp[i].Dia).getDate()+1*/
                        break;
                      case 10: 
                        diapasado=this.armarCalendario(diapasado,resp,datomes,i,30)
                        /*if(i<resp.length-1){
                          var sigdia=new Date(resp[i+1].Dia).getDate()+1
                        }
                        if(new Date(resp[i].Dia).getDate()+1>30){
                          datomes = {mes:"Diciembre",cant:31,mesnum:12,dia: 1,class:"dia diaselected",fecha: resp[i].Dia}; 
                          this.fechas.push(datomes);
                          for (let j = 2; j < sigdia; j++) {                              
                            datomes = {mes:"Diciembre",cant:31,mesnum:12,dia: j,class:"dia",fecha: ""};
                            this.fechas.push(datomes); 
                          }
                        }else{
                          if(diapasado>new Date(resp[i].Dia).getDate()+1){
                            for (let j = 1; j < new Date(resp[i].Dia).getDate()+1; j++) {                              
                              datomes = {mes:"Noviembre",cant:30,mesnum:11,dia: j,class:"dia",fecha: ""};
                              this.fechas.push(datomes); 
                            }
                            datomes = {mes:"Noviembre",cant:30,mesnum:11,dia: new Date(resp[i].Dia).getDate()+1,class:"dia diaselected",fecha: resp[i].Dia};
                            this.fechas.push(datomes);
                            if(i==resp.length-1 && new Date(resp[i].Dia).getDate()+1<30){
                              for (let j = new Date(resp[i].Dia).getDate()+2; j <= 30; j++) {
                                datomes = {mes:"Noviembre",cant:30,mesnum:11,dia: j,class:"dia",fecha: ""};
                                this.fechas.push(datomes); 
                              }
                            }else if(sigdia>new Date(resp[i].Dia).getDate()+1 && sigdia!=new Date(resp[i].Dia).getDate()+1 ){
                              for (let j = new Date(resp[i].Dia).getDate()+2; j < sigdia; j++) {                              
                                datomes = {mes:"Noviembre",cant:30,mesnum:11,dia: j,class:"dia",fecha: ""};
                                this.fechas.push(datomes); 
                              }
                            }
                          }else{
                            datomes = {mes:"Noviembre",cant:30,mesnum:11,dia: new Date(resp[i].Dia).getDate()+1,class:"dia diaselected",fecha: resp[i].Dia};
                            this.fechas.push(datomes);
                            if(i==resp.length-1 && new Date(resp[i].Dia).getDate()+1<30){
                              for (let j = new Date(resp[i].Dia).getDate()+2; j <= 30; j++) {
                                datomes = {mes:"Noviembre",cant:30,mesnum:11,dia: j,class:"dia",fecha: ""};
                                this.fechas.push(datomes); 
                              }
                            }else if(sigdia>new Date(resp[i].Dia).getDate()+1 && sigdia!=new Date(resp[i].Dia).getDate()+1 ){
                              for (let j = new Date(resp[i].Dia).getDate()+2; j < sigdia; j++) {                              
                                datomes = {mes:"Noviembre",cant:30,mesnum:11,dia: j,class:"dia",fecha: ""};
                                this.fechas.push(datomes); 
                              }
                            }
                          }
                          
                        }
                        diapasado=new Date(resp[i].Dia).getDate()+1*/
                        break;
                      case 11: 
                        
                       
                        break;
                    }
                  }
                }
              })
            });
            this.marcadores.push(marker)
          },
          error=>{
          })
        });
      })
    }
  }
  mostrarfecha(dia:any){
    this.dia=dia
    
    var dato=new FormData();
    dato.append("fecha",dia);
    dato.append("nom",this.nombreclicked);

    this.api.horarios(dato).subscribe(resp=>{
      this.horarios=resp      
    })
  }
  hora(){
    this.horario=(<HTMLInputElement>document.getElementById("horarios")).value
  }
  crearTurno(){
    this.screar="spinner-border spinner-border-sm"
    this.screartext="";
    var dato=new FormData();
    dato.append("serv",this.servicio);
    dato.append("loc",this.localidad);
    dato.append("nom",this.nombreclicked);
    dato.append("fecha",this.dia);
    dato.append("horario",this.horario);
    dato.append("ID",this.ID);

    this.api.crearTurno(dato).subscribe(resp=>{
      if(resp=="Se han agotado los cupos para ese horario"){
        alert("Se han agotado los cupos para ese horario");	
        this.horarios=[]	
        this.mostrarfecha(this.dia)
      }else{
        alert(resp);
        var dato=new FormData();
        dato.append("ID",this.ID);
        this.api.cargarTurnos(dato).subscribe(resp=>{
          this.Turnos=resp
          //this.CTurnos.emit(this.Turnos);
        })
      }
      this.screar="";
      this.screartext="Sacar turno";
    })
  }
  armarCalendario(diapasado,resp,datomes,i,cant){
    if(i<resp.length-1){
      var sigdia=new Date(resp[i+1].Dia).getDate()+1
      console.log("sigdia:"+sigdia);
    }
    if(new Date(resp[i].Dia).getDate()+1>cant){
      datomes = {dia: 1,class:"dia diaselected",fecha: resp[i].Dia}; 
      this.fechas.push(datomes);
      //console.log("1erIF new Date(resp[i].Dia).getDate()+1>cant datomes:"+datomes);
      for (let j = 2; j < sigdia; j++) {                              
        datomes = {dia: j,class:"dia",fecha: ""};
        this.fechas.push(datomes); 
        console.log("1erFOR let j = 2; j < sigdia; j++ datomes:"+datomes);
      }
    }else{
      if(diapasado>new Date(resp[i].Dia).getDate()+1){
        console.log("2doIF diapasado>new Date(resp[i].Dia).getDate()+1 diapasado:"+diapasado);
        for (let j = 1; j < new Date(resp[i].Dia).getDate()+1; j++) {                            
          datomes = {dia: j,class:"dia",fecha: ""};
          this.fechas.push(datomes); 
          console.log("2doFOR let j = 1; j < new Date(resp[i].Dia).getDate()+1; j++ datomes:"+datomes);
        }
        datomes = {dia: new Date(resp[i].Dia).getDate()+1,class:"dia diaselected",fecha: resp[i].Dia};
        this.fechas.push(datomes);
        if(i==resp.length-1 && new Date(resp[i].Dia).getDate()+1<cant){
          for (let j = new Date(resp[i].Dia).getDate()+2; j <= cant; j++) {
            datomes = {dia: j,class:"dia",fecha: ""};
            this.fechas.push(datomes); 
          }
        }else if(sigdia>new Date(resp[i].Dia).getDate()+1){
          for (let j = new Date(resp[i].Dia).getDate()+2; j < sigdia; j++) {      
            datomes = {dia: j,class:"dia",fecha: ""};
            this.fechas.push(datomes); 
          }
        }
      }else{
        datomes = {dia: new Date(resp[i].Dia).getDate()+1,class:"dia diaselected",fecha: resp[i].Dia};
        this.fechas.push(datomes);
        if(i==resp.length-1 && new Date(resp[i].Dia).getDate()+1<cant){
          for (let j = new Date(resp[i].Dia).getDate()+2; j <= cant; j++) {
            datomes = {dia: j,class:"dia",fecha: ""};
            this.fechas.push(datomes); 
          }
        }else if(sigdia>new Date(resp[i].Dia).getDate()+1){
          for (let j = new Date(resp[i].Dia).getDate()+2; j < sigdia; j++) {                              
            datomes = {dia: j,class:"dia",fecha: ""};
            this.fechas.push(datomes); 
          }
        }
      }
    }
    diapasado=new Date(resp[i].Dia).getDate()+1
    return diapasado
  }
}