import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { SacarclieComponent } from './sacarclie/sacarclie.component';

const routes: Routes = [
  {path: '',component: Tab1Page,},
  {path: 'cliente',component: SacarclieComponent,}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
