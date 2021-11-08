import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';
import { ClienteComponent } from './cliente/cliente.component';
import { EmpresaComponent } from './empresa/empresa.component';

const routes: Routes = [
  {path: '',component: Tab2Page},
  {path: 'cliente',component: ClienteComponent},
  {path: 'empresa',component: EmpresaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
