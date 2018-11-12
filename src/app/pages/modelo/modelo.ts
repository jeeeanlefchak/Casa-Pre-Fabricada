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
    public modelo: Modelo[] = [];
    public imgSelecionada: any;
    constructor(public modeloService: ModeloService) {

    }

    ngOnInit() {
    }

    public imagemSelecionada(img) {
        console.log(img)
        this.imgSelecionada = img;
    }

    public adicionarNovaImagem(event) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.toBase64(fileList[0], (base64) => {
                let modelo = new Modelo();
                modelo.imagem = { 'background-image': 'url(' + base64 + ')', 'background-size': 'cover', 'background-position': '50%' };
                this.modelo.push(modelo.imagem);
                console.log(this.imagemSelecionada)
                if (!this.imgSelecionada) {
                    this.imgSelecionada = this.modelo[0];
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
                for (let i = 0;i < this.modelo.length;i++) {
                    if (this.imgSelecionada == this.modelo[i]) {
                        this.modelo[i] = modelo.imagem;
                        this.imgSelecionada = modelo.imagem;
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

        for (let i = 0;i < this.modelo.length;i++) {
            modelo = new Modelo();
            modelo.imagem = JSON.stringify(this.modelo[i]);
            if (this.modelo[i].posicao == null) {
                modelo.posicao = i;
            }
            modelos.push(modelo);
        }
        console.log(modelos);
        this.modeloService.salvarLista(modelos).subscribe(res => {
            console.log(res)
        })
    }
}
