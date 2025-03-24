import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SubmitKycontractComponent } from './form-components/submit-kycontract/submit-kycontract.component';
import { SearchKycontractsComponent } from './search-kycontracts/search-kycontracts.component';
import { SubmitObjectionComponent } from './form-components/submit-objection/submit-objection.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent
  },
  {
    path: "submit-kycontract",
    pathMatch: "full",
    component: SubmitKycontractComponent
  },
  {
    path: "search-kycontract",
    pathMatch: "full",
    component: SearchKycontractsComponent
  },
  {
    path: "submit-objection",
    pathMatch: "full",
    component: SubmitObjectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
