import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fondo',
  templateUrl: './fondo.component.html',
  styleUrls: ['./fondo.component.scss'],
})
export class FondoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
          center: { lat: -34.60695148718977, lng: -58.443925928680294 },
          fullscreenControl: false,
          scrollwheel: false,
          draggable: false,
          disableDoubleClickZoom: true,
          zoomControl: false,
          zoom:11, 
          mapId:'a13647e5271fd4a1',
      } as google.maps.MapOptions
    );  
  }

}
