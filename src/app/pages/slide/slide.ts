import { Component, OnInit } from '@angular/core';
import { SlideService } from '../../service/Slide-service';
import { Slide } from '../../models/Slide';

@Component({
    selector: 'slide',
    templateUrl: './slide.html',
    styleUrls: ['slide.scss'],
    providers: [SlideService]
})
export class SlidePage implements OnInit {
    
    public listaSlide: Slide[] = [];
    public imgSelecionada: Slide = new Slide();;
    public buscando: Boolean = false;
    constructor(public slideService: SlideService) {
        this.buscarListaSlides();
    }

    ngOnInit() {
    }

    public imagemSelecionada(slide: Slide) {
        this.imgSelecionada = new Slide();
        let x = typeof slide.imagem;
        if (x == 'string') {
            debugger
            slide.imagem = JSON.parse(slide.imagem);
        }
        // Slide.imagem  = JSON.parse(JSON.stringify(Slide.imagem));
        this.imgSelecionada = slide;
    }

    public adicionarNovaImagem(event) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.toBase64(fileList[0], (base64) => {
                let slide = new Slide();
                slide.imagem = { 'background-image': 'url(' + base64 + ')', 'background-size': 'cover', 'background-position': '50%' };
                if (!this.imgSelecionada) {
                    this.imagemSelecionada(this.listaSlide[0]);
                }
                setTimeout(() => {
                    this.salvar(slide);
                }, 200);
            });
        }
    }

    public editar(event) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.toBase64(fileList[0], (base64) => {
                let slide = new Slide();
                slide.imagem = { 'background-image': 'url(' + base64 + ')', 'background-size': 'cover', 'background-position': '50%' };

                for (let i = 0;i < this.listaSlide.length;i++) {
                    if (this.imgSelecionada == this.listaSlide[i]) {
                        let imagemParaDeletar = new Slide();
                        imagemParaDeletar = { ...this.imgSelecionada };
                        this.excluir(imagemParaDeletar, i);
                        this.salvar(slide);
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

    public salvar(slide: Slide) {
        slide.imagem = JSON.stringify(slide.imagem);
        this.buscando = true;
        this.slideService.save(slide).subscribe((res: Slide) => {
            if (!res.deletado) {
                console.log(res);
                res.imagem = JSON.parse(res.imagem);
                this.listaSlide.push(res);
            }
            this.buscando = false;
        }, err => {
            this.buscando = false;
        })
    }

    public buscarListaSlides() {
        this.buscando = true;
        this.slideService.buscarSlides().subscribe((res: Slide[]) => {
            for (let x of res) {
                if (x.imagem != undefined) {
                    x.imagem = JSON.parse(x.imagem);
                }
                console.log(x);
                this.listaSlide.push(x);
            }
            setTimeout(() => {
                this.buscando = false;
            }, 500);
        }, err => {
            this.buscando = false;
        })
    }

    public excluir(m: Slide, index) {
        let slide = { ...m };
        if (index == undefined) {
            index = this.verificaIndex(slide);
        }
        slide.deletado = true;
        slide.imagem = JSON.stringify(slide.imagem);
        this.salvar(slide);
        this.listaSlide.splice(index, 1);
    }

    public verificaIndex(slide: Slide) {
        for (let i = 0;i < this.listaSlide.length;i++) {
            if (slide.imagem == this.listaSlide[i].imagem) {
                return i;
            }
        }
    }
}
