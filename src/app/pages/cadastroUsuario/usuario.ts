import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario-service';
import { Usuario } from '../../models/usuario';

@Component({
    selector: 'usuario',
    templateUrl: './usuario.html',
    styleUrls: ['usuario.scss'],
    providers: [UsuarioService] // aqui vai os services que voce vai usar, se usar mais de um separa por virgula
})
export class UsuarioPage implements OnInit {
    public usuario: Usuario = new Usuario();// instancia do usuario

    constructor(public usuarioService: UsuarioService) {// aqui voce precisa criar uma variave do usuarioService pra poder usar nos metodos

    }

    public salvar() {
        this.usuarioService.save(this.usuario).subscribe((res: Usuario) => { // esse save é um metodo abstrato todas as classes tem elez
            this.usuario = res; // res é o retorno do servidor, o que esta voltando do servidor depois de salvo
        })
    }
}
