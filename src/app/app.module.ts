import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
 MatToolbarModule, 
 MatGridListModule,
MatListModule,
MatDialogModule } from "@angular/material";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NotesService } from './services/notes.service';
import { HomePage } from './home/home.page';
import { EditNoteBoxComponent } from './edit-note-box/edit-note-box.component';
import { FormsModule } from '@angular/forms';
import { GlobalDialogComponent } from './global-dialog/global-dialog.component';
import { LocalNotifications} from '@ionic-native/local-notifications/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';

@NgModule({
  declarations: [AppComponent, HomePage, EditNoteBoxComponent, GlobalDialogComponent],
  entryComponents: [GlobalDialogComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot({
      swipeBackEnabled: true    
  }), 
    AppRoutingModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    ScrollingModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatGridListModule,
    MatListModule,
    MatDialogModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    , SQLite, SQLitePorter,
    NotesService,
    LocalNotifications,
    DatePicker
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
