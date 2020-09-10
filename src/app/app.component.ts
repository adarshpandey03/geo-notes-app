import { Component, QueryList, ViewChildren} from '@angular/core';
import { IonRouterOutlet, Platform, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})



export class AppComponent{
  title = 'Geo-Notes';
  // tiles: Tile[] = [];
  clickSub: any;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  constructor(
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private localNotifications: LocalNotifications,
    private platform: Platform,
    private alertController:AlertController
  ) {
    this.backButtonEvent();
    platform.ready().then(()=>{
      
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
      this.clickSub =   this.localNotifications.on('click').subscribe(data => {
        console.log(data);
        this.presentAlert('You set a reminder for ' + data.data.secret);
        this.unsub();
      });
    });
  }
  
  async presentAlert(data) {
    const alert =  await this.alertController.create({
      header: 'Alert',
      message: data,
      buttons: ['OK']
    });
    await alert.present();
  //  alert.then(data=>{
  //    data.present();
  //  });
  }

  unsub() {
    this.clickSub.unsubscribe();
  }
  backButtonEvent() {
    document.addEventListener("backbutton", () => {
    this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
    if (outlet && outlet.canGoBack()) {
    outlet.pop();
    }else if(this.router.url === "home"){
    navigator['app'].exitApp(); // work for ionic 4
    } else if (!outlet.canGoBack()) {
    navigator['app'].exitApp(); // work for ionic 4
    }
    });
    
});
  }
}


