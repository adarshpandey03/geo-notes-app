import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Tile } from '../contracts/tile';
import { NotesService } from '../services/notes.service';
import { Router } from '@angular/router';
import { GlobalDialogComponent } from '../global-dialog/global-dialog.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit, OnInit{
  tiles: Tile[] = [];
  newTitle: string;

  constructor(
    private notesService: NotesService,
    private platform: Platform,
    private route: Router,
    public dialog: MatDialog
  ) {
    this.initializeApp();
  }

  ngOnInit(){

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.notesService.getDatabaseState().subscribe((ready)=>{
        if(ready){
          //alert('ready');
          this.notesService.getNotes().subscribe((notes)=>{
            this.tiles=[];
            notes.forEach(note=>{
              let tile = new Tile();
              tile.rows=3;
              tile.note = note;
              this.tiles.push(tile);
            })
          })
        }
      })
    });
  }

  ngAfterViewInit(){
  }

  showEditNotePopup(selectedNote:Tile){
    this.route.navigate(['/edit',selectedNote.note.Id.toString()])
  }
  
  // addNote(){
  //   this.openDialog();
  // }
  openDialog(): void {
    this.newTitle = "";
    const dialogRef = this.dialog.open(GlobalDialogComponent, {
      width: '250px',
      data: {Title:this.newTitle}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.newTitle = result;
      if(this.newTitle){
        this.route.navigate(['/add',this.newTitle])
      }
    });
  }

}
