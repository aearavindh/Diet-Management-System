import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ChallengerComponent } from './challenger/challenger.component';



@NgModule({
  declarations: [AlertComponent, LoadingSpinnerComponent, ChallengerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
	ChallengerComponent]
})
export class SharedModule { }
