import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeadlinesComponent } from './components/news/headlines/headlines.component';
import { WeatherDashboardComponent } from './components/weather/weather-dashboard/weather-dashboard.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path:"",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path:'home',
    component: HomeComponent,
  },
  {
    path:'headline',
    component: HeadlinesComponent,
  },
  {
    path:'weather',
    component: WeatherDashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
