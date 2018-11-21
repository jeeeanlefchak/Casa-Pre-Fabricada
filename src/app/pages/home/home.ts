import { Component, OnInit } from '@angular/core';
import { SlideService } from '../../service/Slide-service';
import { Slide } from '../../models/Slide';
import { ModeloService } from '../../service/modelo-service';
import { Modelo } from '../../models/modelo';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['home.scss'],
  providers: [SlideService, ModeloService]
})
export class HomePage implements OnInit {
  public listaSlide: Slide[] = [];
  public imgSelecionada: Slide = new Slide();
  public indexSlide: number = 0;
  public listaModelo: Modelo[] = [];

  constructor(public slideService: SlideService, public modeloService: ModeloService) {
    this.buscaSlides();
    this.buscarModelos();
  }

  ngOnInit() {
  }

  public buscarModelos() {
    this.modeloService.buscarModelos().subscribe((lista: Modelo[]) => {
      this.listaModelo = lista;
    })
  }

  public mudaSlide(slide) {
    this.imagemSelecionada(slide)
  }

  public voltarSlide() {
    this.verificarIndexSlideDecrescente();
    this.imagemSelecionada(this.listaSlide[this.indexSlide]);
  }

  public proximoSlide() {
    this.verificarIndexSlideCrescente();
    this.imagemSelecionada(this.listaSlide[this.indexSlide])
  }

  public tempoMudarSlide(slide?) {
    setTimeout(() => {
      if (slide == null || slide == undefined) {
        slide = this.listaSlide[this.indexSlide];
      }
      this.verificarIndexSlideCrescente();
      this.imagemSelecionada(slide);
      this.tempoMudarSlide();
    }, 16000);
  }

  public verificarIndexSlideCrescente() {
    if (this.indexSlide == this.listaSlide.length - 1) {
      this.indexSlide = 0;
    } else {
      this.indexSlide += 1;
    }
  }

  public verificarIndexSlideDecrescente() {
    if (this.indexSlide == 0) {
      this.indexSlide = this.listaSlide.length - 1;
    } else {
      this.indexSlide -= 1;
    }
  }

  public imagemSelecionada(slide: Slide) {
    this.imgSelecionada = new Slide();
    let x = typeof slide.imagem;
    if (x == 'string') {
      slide.imagem = JSON.parse(slide.imagem);
    }
    this.imgSelecionada = slide;
  }

  public buscaSlides() {
    this.slideService.buscarSlides().subscribe((res: Slide[]) => {
      for (let x of res) {
        x.imagem = JSON.parse(x.imagem);
        this.listaSlide.push(x);
      }
      this.imagemSelecionada(this.listaSlide[0]);
      this.tempoMudarSlide()
    })
  }
}
