import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { image } from 'src/app/models/file';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
  standalone: false
})
export class ViewPage implements OnInit {

  isPanelOpen: boolean = false;

  imageID: string = '';
  image: image = {
    description: '',
    date: 1,
    url: '',
  };

  constructor(
    private route: ActivatedRoute,
    private firebase: FirebaseService
  ) { 
    this.imageID = this.route.snapshot.paramMap.get('imgId') || '';
  }

  async ngOnInit() {
    this.image = await this.firebase.getImage(this.imageID);
  }

  togglePanel() {
    this.isPanelOpen = !this.isPanelOpen;
  }

}
