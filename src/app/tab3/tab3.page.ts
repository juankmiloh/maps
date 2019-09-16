import { Component, OnInit } from '@angular/core';
import { Marcador } from '../class/marcador';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit {
  marcadores : Marcador[] = [];
  lat = 4.60972222222;
  lng = -74.0816666667;
  latA : number;
  latB : number;
  lngA : number;
  lngB : number;
  polyline = false;

  constructor(private storage: Storage){  }

  ngOnInit(){
    this.polyline = false;
    this.storage.get('AddMarkerLine').then((val) => {
      let marcador : Marcador = JSON.parse(val);
      console.log(val);
      for (let i in marcador){
        // console.log(`i -> ${i}`);
        this.marcadores.push(marcador[i]);
        console.log(marcador);
        if(parseInt(i) > 0){ //si hay mas de un elemento en el arreglo de marcadores une los puntos (linea)
          this.polyline = true;
          this.latB = (marcador[i].lat);
          this.lngB = (marcador[i].lng);
        }
      }
    });
  }

  agregarMarcador(evento){
    this.ingresarMarcador(parseFloat(evento.coords.lat), parseFloat(evento.coords.lng), evento.coords.title, evento.coords.description);
    console.log(this.marcadores.length);
    //Almacenamiento en local storage
    this.storage.set('AddMarkerLine', JSON.stringify(this.marcadores));
    //Creación de la línea
    if(this.marcadores.length > 0){
      this.polyline = true;
      this.latA = this.latB;
      this.lngA = this.lngB;
      this.latB = parseFloat(evento.coords.lat);
      this.lngB = parseFloat(evento.coords.lng);
    }
  }

  ingresarMarcador(lat, lng, title, description){
    const nuevoMarcador = new Marcador(lat, lng, title, description);
    this.marcadores.push(nuevoMarcador);
  }

}