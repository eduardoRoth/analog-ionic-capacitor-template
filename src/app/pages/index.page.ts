import { Component, inject, signal } from '@angular/core';

import {
  IonButton,
  IonCard, IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon, IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoAngular, logoIonic, logoCapacitor } from 'ionicons/icons';
import {HttpClient} from "@angular/common/http";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonCard,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonLabel,
    IonCard,
    IonCardContent
  ],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
          <ion-grid>
            <ion-row class="ion-justify-content-center">
              <ion-col size="auto">
                <ion-card>
                  <ion-card-content>
                    <ion-row class="ion-justify-content-center ion-align-items-center">
                      <a href="https://analogjs.org/" target="_blank">
                        <img alt="Analog Logo" class="logo analog" src="/analog.svg" />
                      </a>
                    </ion-row>
                    <ion-row class="ion-justify-content-center ion-align-items-center">

                      @for(tech of stack(); track 'name'){
                        <ion-col size="auto">
                          @if(tech.icon){
                            <ion-icon
                              [name]="tech.icon"
                              size="large"
                              [color]="tech.color"
                            ></ion-icon>
                          }
                        </ion-col>
                      }
                    </ion-row>
                    <h2>Analog + Ionic + Capacitor</h2>
                    <h3>
                      The fullstack meta-framework for Angular, now powered with Ionic +
                      Capacitor!
                    </h3>

                    <ion-row class="ion-justify-content-center">
                      <ion-col size="auto">
                        <ion-button (click)="increment()"
                        >Count {{ count() }}</ion-button
                        >
                      </ion-col>
                    </ion-row>
                    <ion-row class="ion-justify-content-center">
                      <ion-col size="auto">
                        <ion-button (click)="showToast()">Show Toast</ion-button>
                      </ion-col>
                    </ion-row>
                    <p class="read-the-docs">
                      For guides on how to customize this project, visit the
                      <a href="https://analogjs.org" target="_blank"
                      >Analog documentation</a
                      >
                    </p>
                  </ion-card-content>
                </ion-card>
              </ion-col>
            </ion-row>
          </ion-grid>
    </ion-content>
  `,
  styles: [
    `
      .logo {
        will-change: filter;
      }

      .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
      }

      .read-the-docs {
        color: #888;
      }
    `,
  ],
})
export default class HomeComponent {
  private readonly toastCtrl = inject(ToastController);
  private readonly http = inject(HttpClient);

  stack = toSignal(
    this.http.get<[{
      name: string,
      icon: string,
      color: string,
    }]>('/api/v1/stack')
  );
  count = signal(0);

  increment() {
    this.count.update((value) => ++value);
  }

  async showToast() {
    const toastExists = await this.toastCtrl.getTop();
    if(toastExists) {
      await this.toastCtrl.dismiss();
    }
    await (
      await this.toastCtrl.create({
        message: `You've clicked the button ${this.count()} times`,
        color: 'primary',
        duration: 2500,
      })
    ).present();
  }

  constructor() {
    addIcons({
      logoAngular,
      logoIonic,
      logoCapacitor,
      'logo-vite': '/vite.svg'
    });
  }
}
