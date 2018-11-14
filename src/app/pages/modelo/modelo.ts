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
    public imgSelecionada: any;
    public buscando: Boolean = false;
    constructor(public modeloService: ModeloService) {
        this.buscarListaModelos();
    }

    ngOnInit() {
    }

    public imagemSelecionada(modelo) {
        console.log(modelo)
        this.imgSelecionada = modelo.imagem;
    }

    public adicionarNovaImagem(event) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.toBase64(fileList[0], (base64) => {
                let modelo = new Modelo();
                modelo.imagem = { 'background-image': 'url(' + base64 + ')', 'background-size': 'cover', 'background-position': '50%' };
                this.listaModelo.push(modelo);
                console.log(this.imagemSelecionada)
                if (!this.imgSelecionada) {
                    this.imgSelecionada = this.listaModelo[0];
                }
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
                        this.listaModelo[i] = modelo;
                        this.imgSelecionada = modelo;
                        break
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

    public salvar() {
        let modelos: Modelo[] = [];
        let modelo = new Modelo();
        var listaModelos: Modelo[] = [];

        for (let i = 0;i < this.listaModelo.length;i++) {
            modelo = new Modelo();
            modelo.imagem = JSON.stringify(this.listaModelo[i].imagem);
            debugger
            if (this.listaModelo[i].posicao == null) {
                modelo.posicao = i;
            }
            this.modeloService.save(modelo).subscribe(res => {
                console.log(res);
                listaModelos.push(res);
            }, err => {
                return;
            })
            // modelos.push(modelo);

        }
        this.listaModelo = [];
        this.listaModelo = listaModelos;
        // console.log(modelos);
        // this.modeloService.salvarLista(modelos).subscribe(res => {
        //     console.log(res)
        // })
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
            setTimeout(() => {

                this.buscando = false;
            }, 500);
        }, err => {
            this.buscando = false;
        })
    }
}
