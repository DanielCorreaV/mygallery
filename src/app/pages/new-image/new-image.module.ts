import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewImagePageRoutingModule } from './new-image-routing.module';

import { NewImagePage } from './new-image.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewImagePageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [NewImagePage]
})
export class NewImagePageModule {}
