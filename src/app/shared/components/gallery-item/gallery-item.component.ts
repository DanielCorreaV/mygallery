import { Component, OnInit } from '@angular/core';
import { File } from '../../../models/file';

@Component({
  selector: 'gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.scss'],
  standalone: false
})
export class GalleryItemComponent  implements OnInit {

  image: File = {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png',
    alt: 'awebo',
    description: "siuuuuu",
    date: new Date()
  }

  constructor() { 
    
  }

  ngOnInit() {

  }

}
