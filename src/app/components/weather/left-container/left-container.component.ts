import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from 'src/app/Services/weather/weather-api.service'; 


@Component({
  selector: 'app-left-container',
  templateUrl: './left-container.component.html',
  styleUrls: ['./left-container.component.css']
})
export class LeftContainerComponent implements OnInit{
  constructor(public weatherService: WeatherService) {}

  ngOnInit(): void {
    console.log('Component initialized');
    this.weatherService.getData();
  }
  search:any = faMagnifyingGlass;
  locationIcon:any = faLocation;
  cloud:any = faCloud;
  rain:any = faCloudRain;
  
  public onSearch(location:string){
    this.weatherService.cityName = location;
    this.weatherService.getData();
  }
}
