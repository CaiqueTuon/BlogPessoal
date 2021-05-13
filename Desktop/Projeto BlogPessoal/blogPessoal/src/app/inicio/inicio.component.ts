import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment.prod';
import { Comentario } from '../model/Comentario';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { ComentarioService } from '../service/comentario.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  tituloPost: string

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number
  nomeTema: string = ''

  comentario: Comentario = new Comentario()
  listaComentarios: Comentario[]

  user: User = new User()

  idUserLogado = environment.id
  fotoUserLogado = environment.foto
  nomeUserLogado = environment.foto

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private alertas: AlertasService,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
    private comentarioService: ComentarioService
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      alert('Sua Sessão Expirou, Faça o Login Novamente')
      this.router.navigate(['/entrar'])
  
    }

    this.findAllPostagens()
    this.findAllTemas()
    this.findByIdUser()
  }

  findAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
      console.log(this.listaPostagens)
    }, err => {
      console.log(this.listaPostagens)
    })
  }

  findByIdUser() {
    this.authService.getByIdUser(environment.id).subscribe((resp: User) => {
      this.user = resp
    })
  }

  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  findByNomeTema() {
    console.log(this.nomeTema)
    if (this.nomeTema == '') {
      this.findAllTemas()
    } else {
      this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[]) => {
        this.listaTemas = resp
      })
    }
  }

  findByTituloPostagem(){
    if(this.tituloPost == ''){
      this.findAllPostagens()
    } else {
      this.postagemService.getByNomePostagem(this.tituloPost).subscribe((resp: Postagem[])=>{
        this.listaPostagens = resp
      })
    }

  }

  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema
    this.user.id = environment.id
    this.postagem.usuario = this.user
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
      this.findAllPostagens()
      this.findByIdUser()
      this.findAllTemas()
      this.postagem = new Postagem()
    })
  }

  comentar(id: number){

    this.user.id = this.idUserLogado;
    this.comentario.usuario = this.user;

    this.postagem.id = id;
    this.comentario.postagem = this.postagem;

    this.comentarioService.postComentario(this.comentario).subscribe((resp: Comentario) => {
      this.comentario = resp
      this.alertas.showAlertSuccess('Comentário inserido com sucesso!');
      this.comentario = new Comentario();
      this.findAllPostagens();
    }, err => {
      console.log(this.comentario)
    })

  }

  findallComentarios(){
    this.comentarioService.getAllComentarios().subscribe((resp: Comentario[])=>{
      this.listaComentarios = resp
    })
  }

}
