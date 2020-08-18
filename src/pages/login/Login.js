import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import "./Login.css";
import login from '../../assets/img/login.jpg';
import registro from '../../assets/img/registro.jpg';
import ocean from '../../assets/img/ocean.jpg';
import logo from '../../assets/img/camaleao.jpg';


//Ativa a animaçao do login/registro
function toggleForm() {
    var container = document.querySelector('.container');
    container.classList.toggle('active')
}
const initialState = {
    email: "",
    senha: "",
    erroEmail: "",
    ErroSenha: ""
};

function inputError() {
    var status = document.querySelector('.formContainer');

    status.classList.toggle('formContainerError');
}


//    I  M  P  O  R  T  A  N  T  E
// Melhorar a experiencia de usuario usando algumas praticas
// https://medium.com/@allanroubertie/12-dicas-de-ux-para-criar-formul%C3%A1rios-eficientes-6fc621a3ea05


export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            senha: "",
            erroEmail: "",
            ErroSenha: ""
        };
    }

    //PopIn's de cadastro de usuario
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

    emailInvalido() {
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

    efetuaLogin = (event) => {
        event.preventDefault();

        axios.post('http://localhost:3333/login', {
            email: this.state.email,
            senha: this.state.senha
        })
            .then(data => {
                localStorage.setItem("academia", data.data.token);
                console.log(data);
                this.props.history.push('/');
                // this.setState(this.initalState);

            })
            .catch(erro => {
                this.emailJaExiste();
                console.log(erro);
            })
    }

    //verifica a se os campos do cadastro sao validos
    validate() {
        let erroEmail = "";

        if (!this.state.email) {
            erroEmail = "Email obrigatório";
        }

        if (!this.state.email.includes("@")) {
            erroEmail = "Email invalido"
        }

        if (erroEmail) {
            this.setState({ erroEmail });
            return false;
        }

        return true;
    };


    cadastraUsuario = (event) => {
        event.preventDefault();

        const campoValido = this.validate();
        if (campoValido) {
            axios.post('http://localhost:3333/registro', {
                email: this.state.email,
                senha: this.state.senha
            })
                .then(data => {
                    this.cadastroFeito();
                    localStorage.setItem("academia", data.data.token);
                    console.log(data);
                    this.props.history.push('/');
                    // this.setState(this.initalState);

                })
                .catch(erro => {
                    this.emailJaExiste();
                    console.log(erro);
                })

        } else {
            console.log("email invalido");
            this.emailInvalido();
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
                                    placeholder="Email"
                                    type="text"
                                    value={this.state.email}
                                    onChange={this.atualizaEstadoEmail.bind(this)}
                                />

                                <input
                                    placeholder="Senha"
                                    type="password"
                                    value={this.state.senha}
                                    onChange={this.atualizaEstadoSenha.bind(this)}

                                />

                                <input type="submit" value="Entrar" onSubmit={this.efetuaLogin} />
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
                                    id="senha"
                                    placeholder="Senha"
                                    type="password"
                                    required={true}
                                    value={this.state.senha}
                                    minLength={7}
                                    onChange={this.atualizaEstadoSenha.bind(this)}
                                />

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