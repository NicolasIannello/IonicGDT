import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  typecontra:string="password";
  contra:string="";
  user:string="";
  text:string="Iniciar Sesion"
  spinner:string="";

  constructor(public api:LoginService, private router: Router) { 
  }

  ngOnInit() {
    if(localStorage.getItem('Tipo')=='cliente'){
      this.router.navigate(['/tabs/tab2/cliente']);
    }
  }

  Mostrar(){
    if(this.typecontra=="password"){
        this.typecontra="text";
    }else{
        this.typecontra="password";
    }
  }
  EnviarIngreso(){
    this.spinner = "spinner-border";
    this.text = "";
    const formData= new FormData
    formData.append("user", this.user);
    formData.append("contra", this.contra);

    this.api.iniciarsesion(formData).subscribe(texto=>{
        if(texto.Tipo=="cliente"){
            this.spinner = "";
            this.text = "Iniciar Sesion";
            localStorage.setItem('Tipo',texto.Tipo);
            localStorage.setItem('ID',texto.ID);
            this.router.navigate(['/tabs/tab2/cliente']);
        }else if(texto.Tipo=="empresa"){
            this.spinner = "";
            this.text = "Iniciar Sesion";
            localStorage.setItem('Tipo',texto.Tipo);
            localStorage.setItem('ID',texto.ID);
            //this.router.navigate(['/Empresa']);
        }else{
            alert(texto);
            this.spinner = "";
            this.text = "Iniciar Sesion";
        }
    })
  }
}
