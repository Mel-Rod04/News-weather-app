import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeadlinesComponent } from './components/news/headlines/headlines.component';
import { CategoryComponent } from './components/news/category/category.component';
import { LeftContainerComponent } from './components/weather/left-container/left-container.component';
import { RightContainerComponent } from './components/weather/right-container/right-container.component';
import { WeatherDashboardComponent } from './components/weather/weather-dashboard/weather-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeadlinesComponent,
    CategoryComponent,
    LeftContainerComponent,
    RightContainerComponent,
    WeatherDashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
