import { Component, OnInit } from '@angular/core';
import { PickimagesService } from './core/services/pickimages.service';
import { StatusBar } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(private picker: PickimagesService) {
    this.picker.requestPermissions();
  }
  ngOnInit() {
    StatusBar.hide();
  }
}
