import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from "../components/navigation/navigation.component";
import { HeaderComponent } from "../components/header/header.component";
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NavigationComponent, HeaderComponent],
  exports: [NavigationComponent, HeaderComponent],
})
export class SharedModule { }