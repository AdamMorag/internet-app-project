import { Component, OnInit, ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { LocationsService } from '../../Services/locations.service';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: any;

  constructor(private locations: LocationsService) { }

  ngOnInit() {

    var mapProp = {
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.locations.getLocations().subscribe((locations: any[]) => {
      locations.forEach(location => {
        var infoWindow = new google.maps.InfoWindow({ map: this.map });

        var pos = {
          lat: location.location.coordinates[1],
          lng: location.location.coordinates[0]
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent(location.description);
      });


      var pos = {
        lat: locations[0].location.coordinates[1],
        lng: locations[0].location.coordinates[0]
      };

      this.map.setCenter(pos);
    });
  }

}
