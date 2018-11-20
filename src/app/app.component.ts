import { Component, ViewChild, OnInit, DoCheck } from '@angular/core';
import { ServidorService } from './service/servidor-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ServidorService]
})
export class AppComponent implements OnInit {
  @ViewChild('sidemenu') sidemenu;

  public habiliarMenu: Boolean = false;
  public statusServer: boolean = false;

  constructor(public servidorService: ServidorService) {
  }



  public ngOnInit() {
    this.timer();
  }

  public verificarStatusServidor() {
    this.servidorService.verificaConexao().subscribe(res => {
      this.statusServer = res;
    }, err => {
      this.statusServer = false;
    })
  }

  public timer(){
    setTimeout(() => {
      this.verificarStatusServidor();
      this.timer();
    }, 5000);
  }

}
