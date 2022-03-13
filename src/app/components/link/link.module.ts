import { LinkComponent } from './link.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [LinkComponent],
  declarations: [LinkComponent],
  providers: [],
})
export class LinkModule { }
