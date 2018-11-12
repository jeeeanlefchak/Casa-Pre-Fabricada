import { Component, ViewChild, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidemenu') sidemenu;

  public habiliarMenu: Boolean = false;
  constructor() {
  }



  public ngOnInit() {
  }


}
