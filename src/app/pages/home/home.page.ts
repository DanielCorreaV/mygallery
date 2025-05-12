import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { image } from 'src/app/models/file';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  constructor(private firebase: FirebaseService) {
    this.getImages();
  }

  images: image[] = []

  ngOnInit() {

  }

  getImages() {
    this.firebase.getImages().subscribe(async (data) => {
      this.images = data;
      console.log('Imagenes para guardar en widget:', data);
      await Preferences.set({
        key: 'widgetImages',
        value: JSON.stringify(data),
      });
    });

  }

  openCamera(){

  }

}
