import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PiechartComponent } from './piechart/piechart.component';
import { BarchartComponent } from './barchart/barchart.component';
import { LinechartComponent } from './linechart/linechart.component';

const routes: Routes = [
  {path: "pie-chart", component: PiechartComponent},
  {path: "bar-chart", component: BarchartComponent},
  {path: "line-chart", component: LinechartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
