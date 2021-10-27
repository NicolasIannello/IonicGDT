import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router: Router) {}

  tab1(){
    if(localStorage.getItem('Tipo')=='cliente'){
      this.router.navigate(['/tabs/tab1/cliente']);
    }else if(localStorage.getItem('Tipo')=='empresa'){
      this.router.navigate(['/tabs/tab1/empresa']);
    }else{
      this.router.navigate(['/tabs/tab1']);
    }
  }
  tab2(){
    if(localStorage.getItem('Tipo')=='cliente'){
      this.router.navigate(['/tabs/tab2/cliente']);
    }else if(localStorage.getItem('Tipo')=='empresa'){
      this.router.navigate(['/tabs/tab2/empresa']);
    }else{
      this.router.navigate(['/tabs/tab2']);
    }
  }
  tab3(){
    if(localStorage.getItem('Tipo')=='cliente'){
      this.router.navigate(['/tabs/tab3/cliente']);
    }else if(localStorage.getItem('Tipo')=='empresa'){
      this.router.navigate(['/tabs/tab3/empresa']);
    }else{
      this.router.navigate(['/tabs/tab3']);
    }
  }
}
