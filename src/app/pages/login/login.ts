import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['login.scss'],
  providers: []
})
export class LoginPage implements OnInit {
  // public empresa: Empresa = new Empresa();
  public loginSenhaErrado: string = null;
  public logado: boolean = false;
  constructor(public router: Router) {

  }

  ngOnInit() {
  }

  public logar() {
    this.loginSenhaErrado = null;
    // this.empresaService.logar(this.empresa).subscribe((dado: Empresa) => {
    //   if (dado.id) {
    //     sessionStorage.setItem('idEmpresa', dado.id.toString());
    //     this.logado = true;
    //     this.router.navigate(['/home']);
    //   } else {
    //     this.loginSenhaErrado = "Login ou Senha errado"
    //   }
    // })
  }


}
