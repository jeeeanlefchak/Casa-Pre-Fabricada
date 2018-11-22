import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../service/usuario-service';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['login.scss'],
  providers: [ UsuarioService ]
})

export class LoginPage implements OnInit {
  public user: Usuario = new Usuario();
  public loginSenhaErrado: string = null;
  public logado: boolean = false;
  public manterLogado: boolean = false;
  constructor(public router: Router, public userService: UsuarioService) {
    /*if (sessionStorage.getItem('idUsuario').length > 0){
      router.navigate(['/home']);
    }*/
  }

  ngOnInit() {
  }

  public logar() {
    this.loginSenhaErrado = null;
    this.userService.getUser(this.user).subscribe((resp: Usuario) => {
      if (resp != null){
        if (this.manterLogado){
          sessionStorage.setItem('idUsuario', resp.id.toString());
        }
        this.router.navigate(['/home']);
      }
    })
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
