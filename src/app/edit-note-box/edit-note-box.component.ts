import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../services/notes.service';
import { Note } from '../contracts/Note';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';
import { DatePicker } from '@ionic-native/date-picker/ngx';

@Component({
  selector: 'app-edit-note-box',
  templateUrl: './edit-note-box.component.html',
  styleUrls: ['./edit-note-box.component.scss'],
})
export class EditNoteBoxComponent implements OnInit {

  note:Note;
  notificationDate:Date;
  clickSub:any;
  //id: string;
  constructor(private activatedRoute: ActivatedRoute,
              private notesService: NotesService,
              private router: Router,
              private localNotifications: LocalNotifications,
              private platform: Platform,
              private datePicker: DatePicker) { }

              // async presentAlert(data) {
              //   const alert = await this.alertController.create({
              //     header: 'Alert',
              //     message: data,
              //     buttons: ['OK']
              //   });
              //   await alert.present();
              // }
//@ViewChild('autosize',{static:true}) autosize: CdkTextareaAutosize;
            
// triggerResize() {,
              // private _ngZone: NgZone,
//  // Wait for changes to be applied, then trigger textarea resize.
//   this._ngZone.onStable.pipe(take(1))
//           .subscribe(() => this.autosize.resizeToFitContent(true));
//  }
 ngOnInit() {
   this.activatedRoute.paramMap.subscribe((param)=>{
    if(param.get('id')){
    this.notesService.getNoteById(param.get('id')).then((note:Note)=>{
      this.note = note;
    })


    //Offline test code
    // this.note= new Note();
    // this.note.Id=44;
    // this.note.Title = "kjhkj";
    // this.note.Content="fsgdsgfshgfdxfgghgggggggggggggggggggggggggggggggggggggggggg";
  }
  else if(param.get('title')){
    this.note = new Note();
    this.note.Title = param.get('title');
  }
   });
 }

 saveNote(){
   if(this.note.Id){
   this.notesService.updateNote(this.note).then(()=>{
     this.note = null;
     this.router.navigate(['/home']);
   });
  }
  else{
    this.notesService.addNote(this.note).then(()=>{
      this.note = null;
      this.router.navigate(['/home']);
    });
  }
 }

 deleteNote(id:string){
  this.notesService.deleteNote(id).then((data)=>{
  console.log("delete successful");
  this.note = null;
  this.router.navigate(['/home']);
  })
}

// unsub() {
//   this.clickSub.unsubscribe();
// }

setNotification() {
  // this.clickSub = this.localNotifications.on('click').subscribe(data => {
  //   console.log(data);
  //   this.presentAlert('You set a reminder for ' + data.data.secret);
  //   this.unsub();
  // });
    this.localNotifications.schedule({
      id: 1,
      text: 'Reminder for '+ this.note.Title,
      trigger: { at: this.notificationDate},
      foreground:true,
      sound: this.platform.is('android') ? 'file://sound.mp3': 'file://beep.caf',
      led: 'FF0000',
      data: { secret: this.note.Title }
    });
  }

  addScheduledNotification(){
    this.datePicker.show({
      date: new Date(),
      mode: 'datetime',
      minDate: new Date().getUTCMilliseconds(),
      titleText: 'Reminder',
      okText: 'Set',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        this.notificationDate = date;
        this.setNotification();
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }
}
