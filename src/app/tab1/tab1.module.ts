import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ClienteComponent } from './registro/cliente/cliente.component';
import { EmpresaComponent } from './registro/empresa/empresa.component';
import { SacarclieComponent } from './sacarclie/sacarclie.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page,ClienteComponent,EmpresaComponent,SacarclieComponent]
})
export class Tab1PageModule {}
