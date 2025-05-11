import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryItemComponent } from './components/gallery-item/gallery-item.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';



@NgModule({
  declarations: [GalleryItemComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterLink,
    RouterModule
  ],
  exports: [GalleryItemComponent, RouterModule]
})
export class SharedModule { }
