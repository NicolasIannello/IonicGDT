import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  typecontra:string;
  contra:string;
  user:string;

  constructor(public api:LoginService, private router: Router) { 
    this.typecontra="password";
    this.contra="";
    this.user="";
  }

  ngOnInit() {}

  Mostrar(){
    if(this.typecontra=="password"){
        this.typecontra="text";
                    this.router.navigate(['/tabs/tab2/hola']);

    }else{
        this.typecontra="password";
    }
  }
  EnviarIngreso(){
    const formData= new FormData
    formData.append("user", this.user);
    formData.append("contra", this.contra);

    this.api.iniciarsesion(formData).subscribe(texto=>{
        if(texto.Tipo=="cliente"){
            localStorage.setItem('Tipo',texto.Tipo);
            localStorage.setItem('ID',texto.ID);
            //this.router.navigate(['/Cliente']);
        }else if(texto.Tipo=="empresa"){
            localStorage.setItem('Tipo',texto.Tipo);
            localStorage.setItem('ID',texto.ID);
            //this.router.navigate(['/Empresa']);
        }else{
            alert(texto);
        }
    })
  }
}
