import { Component, OnInit } from '@angular/core';
import { SlideService } from '../../service/Slide-service';
import { Slide } from '../../models/Slide';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['home.scss'],
  providers: [SlideService]
})
export class HomePage implements OnInit {
  public listaSlide: Slide[] = [];
  public imgSelecionada: Slide = new Slide();
  public indexSlide: number = 0;
  constructor(public slideService: SlideService) {
    this.buscaSlides();
  }

  ngOnInit() {
  }

  public mudaSlide(slide) {
    this.imagemSelecionada(slide)
  }

  public tempoMudarSlide(slide?) {
    setTimeout(() => {
      if (slide == null || slide == undefined) {
        slide = this.listaSlide[this.indexSlide];
      }
      if (this.indexSlide == this.listaSlide.length - 1) {
        this.indexSlide = 0;
      } else {
        this.indexSlide += 1;
      }
      this.imagemSelecionada(slide);
      this.tempoMudarSlide();
    }, 4000);
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
