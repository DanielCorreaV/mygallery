import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewImagePage } from './new-image.page';

const routes: Routes = [
  {
    path: '',
    component: NewImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewImagePageRoutingModule {}
