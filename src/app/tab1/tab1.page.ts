import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  div:string="box"

  constructor() {}

  nav(){
    if(this.div=="box"){
      this.div="box marg"
    }else if(this.div=="box marg"){
      this.div="box"
    }
  }
}
