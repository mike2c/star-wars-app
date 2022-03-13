import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LinkComponent } from './link/link.component';
@NgModule({
  declarations: [
    AppComponent,
    LinkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    // SearchService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
