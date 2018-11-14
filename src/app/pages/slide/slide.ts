import { Component, OnInit } from '@angular/core';
import { Slide } from '../../models/slide';
import { SlideService } from '../../service/slide-service';

@Component({
    selector: 'slide',
    templateUrl: './slide.html',
    styleUrls: ['slide.scss'],
    providers: [SlideService]
})
export class SlidePage implements OnInit {
    
    public imgSelecionada: any;
    public slide : Slide[] =[];
    constructor(public slideService : SlideService) {

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
                let slide = new Slide();
                slide.imagem = { 'background-image': 'url(' + base64 + ')', 'background-size': 'cover', 'background-position': '50%' };
                this.slide.push(slide.imagem);
                console.log(this.imagemSelecionada)
                if (!this.imgSelecionada) {
                    this.imgSelecionada = this.slide[0];
                }
            });
        }
    }

    public editar(event) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.toBase64(fileList[0], (base64) => {
                let slide = new Slide();
                slide.imagem = { 'background-image': 'url(' + base64 + ')', 'background-size': 'cover', 'background-position': '50%' };
                for (let i = 0;i < this.slide.length;i++) {
                    if (this.imgSelecionada == this.slide[i]) {
                        this.slide[i] = slide.imagem;
                        this.imgSelecionada = slide.imagem;
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
        let slides: Slide[] = [];
        let slide = new Slide();

        for (let i = 0;i < this.slide.length;i++) {
            slide = new Slide();
            slide.imagem = JSON.stringify(this.slide[i]);
            if (this.slide[i].posicao == null) {
                slide.posicao = i;
            }
            slides.push(slide);
        }
        console.log(slides);
        // this.slideService.salvarLista(slides).subscribe(res => {
        //     console.log(res)
        // })
    }
}
