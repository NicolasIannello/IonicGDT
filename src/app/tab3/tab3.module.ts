import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { TablaclieComponent } from './tablaclie/tablaclie.component';
import { TablaempComponent } from './tablaemp/tablaemp.component';
import { TurnosComponent } from './tablaemp/turnos/turnos.component';
import { ClientesComponent } from './tablaemp/clientes/clientes.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
  ],
  declarations: [Tab3Page,TablaclieComponent,TablaempComponent,TurnosComponent,ClientesComponent]
})
export class Tab3PageModule {}
