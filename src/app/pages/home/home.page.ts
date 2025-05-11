import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { image } from 'src/app/models/file';

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
    this.firebase.getImages().subscribe((data) => {
      this.images = data;
    });
  }

  openCamera(){

  }

}
