import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: [
    `
      .container{
        margin-left:3%;
        margin-right:3%;
        margin-top:2%;
      }
    `
  ]
})
export class AppComponent {
  title = 'cad-estag';
}
