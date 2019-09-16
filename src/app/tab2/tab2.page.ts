import { Component, OnInit } from '@angular/core';
import { Marcador } from '../class/marcador';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
  marcadores : Marcador[] = [];
  lat = 4.60972222222;
  lng = -74.0816666667;

  constructor(private storage: Storage){  }

  ngOnInit(){
    this.storage.get('addMarker').then((val) => {
      let marcador : Marcador = JSON.parse(val);
      // console.log(val);
      for (let i in marcador){
        // console.log(`i -> ${i}`);
        this.marcadores.push(marcador[i]);
      }
    });
  }

  agregarMarcador(evento){
    this.ingresarMarcador(parseFloat(evento.coords.lat), parseFloat(evento.coords.lng), evento.coords.title, evento.coords.description);
    //Almacenamiento en local storage
    this.storage.set('addMarker', JSON.stringify(this.marcadores));
    console.log(this.marcadores.length);
  }

  ingresarMarcador(lat, lng, title, description){
    const nuevoMarcador = new Marcador(lat, lng, title, description);
    this.marcadores.push(nuevoMarcador);
  }

}