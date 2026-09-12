import { Component } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonIcon
  ],
})
export class Tab1Page {
  constructor() {}
}