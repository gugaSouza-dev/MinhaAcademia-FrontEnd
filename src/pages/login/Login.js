import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import validator from 'email-validator';
import "./Login.css";
import login from '../../assets/img/login.jpg';
import registro from '../../assets/img/registro.jpg';
import ocean from '../../assets/img/ocean.jpg';
import logo from '../../assets/img/camaleao.jpg';

function toggleForm() {
    var container = document.querySelector('.container');
    container.classList.toggle('active')
}


export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            senha: '',
            // confSenha: ''
        }
    }

    cadastroFeito() {
        swal({
            title: "Boa!",
            text: "Sua Conta Foi Criada",
            icon: "success",
            timer: 3000
        });
    }

    emailJaExiste() {
        swal({
            text: "Email ja cadastrado",
            icon: "error",
            timer: 3000
        });
    }

    emailInvalido(){
        swal({
            text: "Email inválido",
            icon: "error",
            timer: 3000
        });
    }

    atualizaEstadoEmail(event) {
        this.setState({ email: event.target.value });
    }

    atualizaEstadoSenha(event) {
        this.setState({ senha: event.target.value });
    }

    // atualizaEstadocConfSenha(event) {
    //     this.setState({ confSenha: event.target.value });
    // }

    efetuaLogin(event) {
        event.preventDefault();

        axios.post('http://localhost:3333/login', {
            email: this.state.email,
            senha: this.state.senha
        })
            .then(data => {
                localStorage.setItem("academia", data.data.token);
                console.log(data);
            })
            .catch(erro => {
                console.log(erro);
            })
            .finally(data =>{
                this.props.history.push('/');
            })
    }


    cadastraUsuario = (event) => {
        event.preventDefault();
        if (this.state.senha.length < 7) {
            document.getElementById('senhaMensagem').style.color = 'rgba(255, 75, 75, 0.686)';
            document.getElementById('senhaMensagem').innerHTML = 'Senha precisa ter mais que 7 caracteres';

        } else {

            if (validator.validate(this.state.email)) {

                axios.post('http://localhost:3333/registro', {
                    email: this.state.email,
                    senha: this.state.senha
                })
                    .then(data => {
                        this.cadastroFeito();
                        localStorage.setItem("academia", data.data.token);
                        console.log(data);
                    })
                    .catch(erro => {
                        this.emailJaExiste();
                        console.log(erro);
                    })
                    .finally(data =>{
                        this.props.history.push('/');
                    })
            } else {
                console.log("email invalido")
                this.emailInvalido();
            }
        }
    }


    render() {
        return (
            <section style={{ backgroundImage: `url(${ocean})`, backgroundSize: 'cover' }}>
                <div className="container">
                    <div className="login">
                        <div className="imgContainer">
                            <img className="img" src={login} alt="Imagem meramente ilustrativa ao lado do login" />
                        </div>
                        <div className="formContainer">
                            <form id="form" onSubmit={this.efetuaLogin.bind(this)}>
                                <div className="logo">
                                    <img className="logoImg" src={logo} alt="Logo em forma de camaleao" />
                                </div>
                                <h2>Login</h2>
                                <input
                                    // className="login_email"
                                    placeholder="Email"
                                    type="text"
                                    value={this.state.email}
                                    onChange={this.atualizaEstadoEmail.bind(this)}
                                />

                                <input
                                    // className="login_senha"
                                    placeholder="Senha"
                                    type="password"
                                    value={this.state.senha}
                                    onChange={this.atualizaEstadoSenha.bind(this)}
                                />
                                <input type="submit" value="Entrar" />
                                <p className="signUp">Nâo possui conta? <a onClick={toggleForm}>  Registre-se</a></p>
                            </form>
                        </div>

                    </div>


                    <div className="registro">

                        <div className="formContainer">

                            <form id="form" onSubmit={this.cadastraUsuario.bind(this)}>
                                <div className="logo">
                                    <img className="logoImg" src={logo} alt="Logo em forma de camaleao" />
                                </div>
                                <h2>Crie sua conta</h2>
                                <input
                                    placeholder="Email"
                                    type="text"
                                    required={true}
                                    value={this.state.email}
                                    onChange={this.atualizaEstadoEmail.bind(this)}
                                />
                                <input
                                    placeholder="Senha"
                                    type="password"
                                    required={true}
                                    value={this.state.senha}
                                    minLength={7}
                                    onChange={this.atualizaEstadoSenha.bind(this)}
                                />
                                <div className="senhaMsg">
                                    <span id='senhaMensagem'></span>
                                </div>
                                {/* 
                                <input
                                    placeholder="Confirme senha"
                                    type="password"
                                    required={true}
                                    value={this.state.confSenha}
                                    onChange={this.atualizaEstadocConfSenha.bind(this)}
                                /> */}
                                <input type="submit" value="Entrar" />
                                <p className="signUp">Já possui conta? <a onClick={toggleForm}>  Login</a></p>
                            </form>
                        </div>
                        <div className="imgContainer">
                            <img className="img" src={registro} alt="Imagem meramente ilustrativa ao lado do registro" />
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}