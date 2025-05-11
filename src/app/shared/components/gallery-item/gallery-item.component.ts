import { Component, Input, OnInit } from '@angular/core';
import { image } from '../../../models/file';

@Component({
  selector: 'gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.scss'],
  standalone: false
})
export class GalleryItemComponent  implements OnInit {

  @Input() image: image = {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png',
    description: "siuuuuu",
    date: 1234
  }

  constructor() { 
    
  }

  ngOnInit() {

  }

}
