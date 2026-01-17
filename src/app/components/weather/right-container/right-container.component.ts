import { Component } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from 'src/app/Services/weather/weather-api.service'; 


@Component({
  selector: 'app-right-container',
  templateUrl: './right-container.component.html',
  styleUrls: ['./right-container.component.css']
})
export class RightContainerComponent {

  constructor(public weatherService: WeatherService){}
  
  ThumbsUp:any = faThumbsUp;
  ThumbsDown:any = faThumbsDown;
  FaceFrown:any = faFaceFrown;
  FaceSmile:any = faFaceSmile;

  
  onTodayClick(){
    this.weatherService.today = true;
    this.weatherService.week = false;
  }
  onWeekClick(){
    this.weatherService.week = true;
    this.weatherService.today = false;
  }
  onCelsiusClick(){
    this.weatherService.celsius = true;
    this.weatherService.fahrenhiet = false;
  }
  onFahrenhietClick(){
    this.weatherService.fahrenhiet = true;
    this.weatherService.celsius = false;
  }
}