import { Component, OnInit } from '@angular/core';
import { ModeloService } from '../../service/modelo-service';
import { Modelo } from '../../models/modelo';

@Component({
    selector: 'modelo',
    templateUrl: './modelo.html',
    styleUrls: ['modelo.scss'],
    providers: [ModeloService]
})
export class ModeloPage implements OnInit {
    public listaModelo: Modelo[] = [];
    public imgSelecionada: Modelo = new Modelo();;
    public buscando: Boolean = false;
    public salvandoDescricao: Boolean = false;

    constructor(public modeloService: ModeloService) {
        this.buscarListaModelos();
    }

    ngOnInit() {
    }

    public imagemSelecionada(modelo: Modelo) {
        this.imgSelecionada = new Modelo();
        let x = typeof modelo.imagem;
        if (x == 'string') {
            modelo.imagem = JSON.parse(modelo.imagem);
        }
        // modelo.imagem  = JSON.parse(JSON.stringify(modelo.imagem));
        this.imgSelecionada = modelo;
    }

    public adicionarNovaImagem(event) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.toBase64(fileList[0], (base64) => {
                let modelo = new Modelo();
                modelo.imagem = { 'background-image': 'url(' + base64 + ')', 'background-size': 'cover', 'background-position': '50%' };
                if (!this.imgSelecionada) {
                    this.imagemSelecionada(this.listaModelo[0]);
                }
                setTimeout(() => {
                    this.salvar(modelo);
                }, 200);
            });
        }
    }

    public editar(event) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.toBase64(fileList[0], (base64) => {
                let modelo = new Modelo();
                modelo.imagem = { 'background-image': 'url(' + base64 + ')', 'background-size': 'cover', 'background-position': '50%' };
                for (let i = 0;i < this.listaModelo.length;i++) {
                    if (this.imgSelecionada == this.listaModelo[i]) {
                        let imagemParaDeletar = new Modelo();
                        imagemParaDeletar = { ...this.imgSelecionada };
                        this.excluir(imagemParaDeletar, i);
                        this.salvar(modelo);
                        break;
                    }
                }
            });
        }
    }

    public toBase64(file, retorno) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            retorno(reader.result);
        };
    }

    public salvar(modelo: Modelo) {
        modelo.imagem = JSON.stringify(modelo.imagem);
        this.buscando = true;
        this.modeloService.save(modelo).subscribe((res: Modelo) => {
            if (!res.deletado) {
                console.log(res);
                res.imagem = JSON.parse(res.imagem);
                this.listaModelo.push(res);
            }
            this.buscando = false;
        }, err => {
            this.buscando = false;
        })
    }

    public salvarDescricao(modelo: Modelo) {
        this.salvandoDescricao = true;
        let m = modelo;
        m.imagem = JSON.stringify(m.imagem);
        this.modeloService.save(m).subscribe((modelo: Modelo) => {
            for (let i = 0;i < this.listaModelo.length;i++) {
                if (this.listaModelo[i].id == modelo.id) {
                    modelo.imagem = JSON.parse(modelo.imagem);
                    this.listaModelo[i] = modelo;
                    debugger
                    break;
                }
            }
            this.salvandoDescricao = false;
        }, err => {
            this.salvandoDescricao = false;
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
