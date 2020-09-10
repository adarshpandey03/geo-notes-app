import { Injectable } from '@angular/core';
import { Note } from '../contracts/Note';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private database:SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private notes: BehaviorSubject<Note[]> = new BehaviorSubject([]);

  constructor( private http:HttpClient,
    private platform:Platform,private sqlite:SQLite, private sqliteporter:SQLitePorter) { 
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'geoDatabase',
        location: 'default'
      })
      .then((db:SQLiteObject)=>{
        this.database = db;
        this.seedDatabase();
      });

     //Static data for testing
      // this.dbReady.next(true);
      // let note = new Note();
      // note.Id=12;
      // note.Title = "Test";
      // note.Content = "Test1,Test2";
      // let notes = [];
      // for (let index = 0; index < 50; index++) {
      // notes.push(note);
      // }
      // this.notes.next(notes);
    });
  }

  seedDatabase(){
    this.http.get('./assets/data/seed.sql',{responseType: 'text'})
    .subscribe(sql => {
      this.sqliteporter.importSqlToDb(this.database,sql)
      .then(()=>{
        this.loadNotes();
        this.dbReady.next(true);
      })
    })
  }

  getDatabaseState(){
    return this.dbReady.asObservable();
  }

  getNoteById = (id):Promise<Note>=>{
    return this.database.executeSql('SELECT * FROM notes WHERE id=?',[id]).then((data)=>{
      let note = new Note;
      //let content = [];
      //content = data.rows.item(0).content.split(",");
      note.Id = data.rows.item(0).id;
      note.Title = data.rows.item(0).title;
      note.Content = data.rows.item(0).content;
      note.Location = data.rows.item(0).location;
      return note;
    })
  }

  updateNote = (note:Note) => {
    let data = [note.Title, note.Content, note.Location];
    return this.database.executeSql(`UPDATE notes SET title=?, content=?, location=? WHERE id=${note.Id}`,
     data).then((data)=>{
       this.loadNotes();
     })
  }

  addNote(note:Note){
    let data = [note.Title, note.Content, note.Location];
    return this.database.executeSql(`INSERT INTO notes ( title, content, location) VALUES (? ,? ,?)`,
     data).then((data)=>{
       this.loadNotes();
     })
  }

  deleteNote(id:string){
    return this.database.executeSql(`DELETE FROM notes WHERE id=?`,
     [id]).then((data)=>{
       this.loadNotes();
     })
  }

  loadNotes(){
    return this.database.executeSql('SELECT * FROM notes', []).then((data)=>{
      let notes: Note[] = [];
      if(data.rows.length>0){
        for (let index = 0; index < data.rows.length; index++) {
          //let content = [];
          //content = data.rows.item(index).content.split(",");
          notes.push({
            Id: data.rows.item(index).id,
            Title:data.rows.item(index).title,
            Content: data.rows.item(index).content,
            Location:data.rows.item(index).location
          })
        }
      }
      this.notes.next(notes);
    })
  }


  getNotes = () => {
    return this.notes.asObservable();
  }
}
