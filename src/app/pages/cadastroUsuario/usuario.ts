import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario-service';
import { Usuario } from '../../models/usuario';

@Component({
    selector: 'usuario',
    templateUrl: './usuario.html',
    styleUrls: ['usuario.scss'],
    providers: [Usuario]
})
export class UsuarioPage implements OnInit {

    public salvar(usuario: Usuario) {
        this.usuarioService.saveUser(usuario).subscribe((res: Usuario) => {
            this.buscando = false;
        }, err => {
            this.buscando = false;
        })
    }

    public buscarListaModelos() {
        this.buscando = true;
        this.modeloService.buscarModelos().subscribe((res: Modelo[]) => {
            for (let x of res) {
                if (x.imagem != undefined) {
                    x.imagem = JSON.parse(x.imagem);
                }
                console.log(x);
                this.listaModelo.push(x);
            }
            this.buscando = false;
            this.imagemSelecionada(this.listaModelo[0]);
        }, err => {
            this.buscando = false;
        })
    }

    public excluir(m: Modelo, index) {
        let modelo = { ...m };
        if (index == undefined) {
            index = this.verificaIndex(modelo);
        }
        modelo.deletado = true;
        modelo.imagem = JSON.stringify(modelo.imagem);
        this.salvar(modelo);
        this.listaModelo.splice(index, 1);
    }

    public verificaIndex(modelo: Modelo) {
        for (let i = 0;i < this.listaModelo.length;i++) {
            if (modelo.imagem == this.listaModelo[i].imagem) {
                return i;
            }
        }
    }
}
