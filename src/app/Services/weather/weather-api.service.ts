import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationDetails } from 'src/app/models/LocationDetails';
import { WeatherDetails } from 'src/app/models/WeatherDetails'; 
import { TemperatureData } from 'src/app/models/TemperatureData'; 
import { TodayData } from 'src/app/models/TodayData'; 
import { WeekData } from 'src/app/models/WeekData';
import { TodaysHighlight } from 'src/app/models/TodaysHighlights'; 
import { weatherEnvironment } from 'src/app/Environment/weatherEnvironment'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  locationDetails?: LocationDetails;
  weatherDetails?: WeatherDetails;
  temperatureData?: TemperatureData = new TemperatureData();
  todayData?: TodayData[] = [];
  weekData?: WeekData[] = [];
  todaysHighlight?:TodaysHighlight;

  cityName:string = 'Mumbai';
  language:string = 'en-US';
  date:string = '20200622';
  units:string = 'm';

  currentTime:Date;

  today:boolean=false;
  week:boolean=true;
  celsius:boolean=true;
  fahrenhiet:boolean=false;

  isLoading: boolean = false;
  

  constructor(private httpClient: HttpClient) {}

  getSummaryImage(summary:string):string{
    let baseAddress = 'assets/images/';

    let cloudySunny = 'cloudyandsunny.png';
    let rainSunny = 'rainyandsunny.png';
    let windy = 'windy.png';
    let sunny = 'sun.png';
    let rainy = 'rainy.png';

    if(String(summary).includes("Partly Cloudy") || String(summary).includes("P Cloudy"))return baseAddress + cloudySunny;
    else if(String(summary).includes("Partly Rainy") || String(summary).includes("P Rainy"))return baseAddress + rainSunny;
    else if(String(summary).includes("wind"))return baseAddress + windy;
    else if(String(summary).includes("rain"))return baseAddress + rainy;
    else if(String(summary).includes("Sun"))return baseAddress + sunny;
    
    return baseAddress + cloudySunny;
  }

  fillTemperatureDataModel(){
    this.currentTime = new Date();
    this.temperatureData.day = this.weatherDetails['v3-wx-observations-current'].dayOfWeek;
    this.temperatureData.time = `${String(this.currentTime.getHours()).padStart(2,'0')}:${String(this.currentTime.getMinutes()).padStart(2,'0')}`;
    this.temperatureData.temperature = this.weatherDetails['v3-wx-observations-current'].temperature;
    this.temperatureData.location = `${this.locationDetails.location.city[0]},${this.locationDetails.location.country[0]}`;
    this.temperatureData.rainPercent = this.weatherDetails['v3-wx-observations-current'].precip24Hour;
    this.temperatureData.summaryPhrase = this.weatherDetails['v3-wx-observations-current'].wxPhraseShort;
    this.temperatureData.summaryImage = this.getSummaryImage(this.temperatureData.summaryPhrase);
  }

  fillWeekData(){
    let weekCount =0;

    while(weekCount < 7){
      this.weekData.push(new WeekData());
      this.weekData[weekCount].day = this.weatherDetails['v3-wx-forecast-daily-15day'].dayOfWeek[weekCount].slice(0,3);
      this.weekData[weekCount].tempMax = this.weatherDetails['v3-wx-forecast-daily-15day'].calendarDayTemperatureMax[weekCount];
      this.weekData[weekCount].tempMin = this.weatherDetails['v3-wx-forecast-daily-15day'].calendarDayTemperatureMin[weekCount];
      this.weekData[weekCount].summaryImage = this.getSummaryImage(this.weatherDetails['v3-wx-forecast-daily-15day'].narrative[weekCount]);
      weekCount++;
    }
  }

  fillTodayData(){
    let todayCount = 0;
    while(todayCount < 7){
      this.todayData.push(new TodayData());
      this.todayData[todayCount].time = this.weatherDetails['v3-wx-forecast-hourly-10day'].validTimeLocal[todayCount].slice(11,16);
      this.todayData[todayCount].temperature = this.weatherDetails['v3-wx-forecast-hourly-10day'].temperature[todayCount];
      this.todayData[todayCount].summaryImage = this.getSummaryImage(this.weatherDetails['v3-wx-forecast-hourly-10day'].wxPhraseShort[todayCount]);
      todayCount++;
    }
  }

  getTimeFromString(localTime:string){
    return localTime.slice(11,16);
  }

  fillTodaysHighlight(){
    this.todaysHighlight = new TodaysHighlight();
    this.todaysHighlight.airQuality = this.weatherDetails['v3-wx-globalAirQuality'].globalairquality.airQualityIndex;
    this.todaysHighlight.humidity = this.weatherDetails['v3-wx-observations-current'].relativeHumidity;
    this.todaysHighlight.sunrise = this.getTimeFromString(this.weatherDetails['v3-wx-observations-current'].sunriseTimeLocal);
    this.todaysHighlight.sunset = this.getTimeFromString(this.weatherDetails['v3-wx-observations-current'].sunsetTimeLocal);
    this.todaysHighlight.uvIndex = this.weatherDetails['v3-wx-observations-current'].uvIndex;
    this.todaysHighlight.visibility = this.weatherDetails['v3-wx-observations-current'].visibility;
    this.todaysHighlight.windStatus = this.weatherDetails['v3-wx-observations-current'].windSpeed;
  }

  prepareData():void{
    this.fillTemperatureDataModel();
    this.fillWeekData();
    this.fillTodayData();
    this.fillTodaysHighlight();
    console.log(this.weatherDetails);
    console.log(this.temperatureData);
    console.log(this.weekData);
    console.log(this.todayData);
    console.log(this.todaysHighlight);
  }

  celsiusToFahrenheit(celsius:number):number{
    return +((celsius * 1.8) + 32).toFixed(2);
  }
  fahrenheitToCelsius(fahrenheit:number):number{
    return +((fahrenheit - 32) * 0.555).toFixed(2);
  }

  getLocationDetails(cityName:string, language:string):Observable<LocationDetails>{
    return this.httpClient.get<LocationDetails>(weatherEnvironment.weatherApiLocationBaseURL,{
      headers: new HttpHeaders()
      .set(weatherEnvironment.xRapidApiKeyName,weatherEnvironment.xRapidApikeyValue)
      .set(weatherEnvironment.xRapidApiHostName,weatherEnvironment.xRapidApiHostValue),
      params: new HttpParams()
      .set('query',cityName)
      .set('language',language)
    })
  }

  getWeatherReport(date:string, latitude:number,longitude:number,language:string,units:string):Observable<WeatherDetails>{
    return this.httpClient.get<WeatherDetails>(weatherEnvironment.weatherApiForecastBaseURL,{
      headers: new HttpHeaders()
      .set(weatherEnvironment.xRapidApiKeyName,weatherEnvironment.xRapidApikeyValue)
      .set(weatherEnvironment.xRapidApiHostName,weatherEnvironment.xRapidApiHostValue),
      params: new HttpParams()
      .set('date',date)
      .set('latitude',latitude)
      .set('longitude',longitude)
      .set('language',language)
      .set('units', units)
    });
  }

  getData(){
    this.isLoading = true;
    this.todayData = [];
    this.weekData = [];    
    this.temperatureData = new TemperatureData();
    this.todaysHighlight = new TodaysHighlight();
    let latitude = 0;
    let longitude = 0;

    this.getLocationDetails(this.cityName,this.language).subscribe({
      next:(response)=>{
        this.locationDetails = response;
        latitude = this.locationDetails?.location.latitude[0];
        longitude = this.locationDetails?.location.longitude[0];

        this.getWeatherReport(this.date,latitude,longitude,this.language,this.units).subscribe({
          next:(response)=>{
            this.weatherDetails = response;
            this.prepareData();
            this.isLoading = false; // Set loading to false when done
          },
          error:(error)=>{
            console.error('Error fetching weather:', error);
            this.isLoading = false; // Also set false on error
          }
        }) 
      },
      error:(error)=>{
        console.error('Error fetching location:', error);
        this.isLoading = false; // Set false on error
      }
    });
  }
}