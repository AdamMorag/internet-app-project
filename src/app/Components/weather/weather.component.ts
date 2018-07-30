import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(private _http: Http) { }

  private apiAdd = "http://api.openweathermap.org/data/2.5/weather?id=293397&APPID=e9a432cebcdd09c5655c862cdded9dca";

  private weatherDescription: any;

  ngOnInit() {

    this.weatherDescription =  "ממלא מקום";

    this._http.get(this.apiAdd).subscribe(weather => {
      this.weatherDescription = weather.json().weather[0].description;
      console.log(this.weatherDescription);
    });
  }

}
