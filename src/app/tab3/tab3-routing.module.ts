import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';
import { TablaclieComponent } from './tablaclie/tablaclie.component';

const routes: Routes = [
  {path: '',component: Tab3Page,},
  {path: 'cliente',component: TablaclieComponent,}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
