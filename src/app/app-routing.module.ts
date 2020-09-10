import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { EditNoteBoxComponent } from './edit-note-box/edit-note-box.component';

const routes: Routes = [
  {
    path: 'add/:title',
    component: EditNoteBoxComponent
  },
    {
        path: 'edit/:id',
        component: EditNoteBoxComponent
      },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
