import React, { Component, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import "./CadastraAcademia.css";
import Header from '../../components/header/Header';

const initialState = {
    nome_resp: '',
    nome_acad: '',
    tel_resp: '',
    tel_acad: '',
    rua: '',
    numero: '',
    complemento: '',
    cep: '',
    cidade: '',
    estado: ''
};




export default class CadastraAcademia extends Component {
    constructor() {
        super();

        this.state = initialState;

    }

    atualizaEstadoNomeResp(event) {
        this.setState({ nome_resp: event.target.value });
    }

    atualizaEstadoNomeAcad(event) {
        this.setState({ nome_acad: event.target.value });
    }

    atualizaEstadoTelResp(event) {
        this.setState({ tel_resp: event.target.value });
    }

    atualizaEstadoTelAcad(event) {
        this.setState({ tel_acad: event.target.value });
    }

    atualizaEstadoRua(event) {
        this.setState({ rua: event.target.value });
    }

    atualizaEstadoNumero(event) {
        this.setState({ numero: event.target.value });
    }

    atualizaEstadoComplemento(event) {
        this.setState({ complemento: event.target.value });
    }

    atualizaEstadoCep(event) {
        this.setState({ cep: event.target.value });
    }

    atualizaEstadoCidade(event) {
        this.setState({ cidade: event.target.value });
    }

    atualizaEstadoEstado(event) {
        this.setState({ estado: event.target.value });
    }

    cadastraAcademia = (event) => {
        event.preventDefault();
        console.log("amm oi?")

        const academia = this.state;
    
        axios.post('http://localhost:3333/academias', academia, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("academia"),
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                console.log(data);
                this.props.history.push('/');
                // this.setState(this.initalState);

            })
            .catch(erro => {
                console.log(erro);
            })
    }


    render() {
        return (
            <section className="CAContainer">
                <Header />
                <div className="CAFormContainer">
                        <h2>Cadastre sua academia</h2>

                    <form id="CAFrom" >
                        <div className="linha"></div>
                        <p>Nome do responsável</p>
                        <input
                            type="text"
                            value={this.state.nome_resp}
                            onChange={this.atualizaEstadoNomeResp.bind(this)}
                        />
                        <p>Nome da academia</p>
                        <input
                            type="text"
                            value={this.state.nome_acad}
                            onChange={this.atualizaEstadoNomeAcad.bind(this)}
                        />
                        <p>Telefone do responsável</p>
                        <input
                            type="text"
                            value={this.state.tel_resp}
                            onChange={this.atualizaEstadoTelResp.bind(this)}
                        />
                        <p>Telefone da academia</p>
                        <input
                            type="text"
                            value={this.state.tel_acad}
                            onChange={this.atualizaEstadoTelAcad.bind(this)}
                        />
                        <p>Rua</p>
                        <input
                            type="text"
                            value={this.state.rua}
                            onChange={this.atualizaEstadoRua.bind(this)}
                        />
                        <p>Número</p>
                        <input
                            type="tel"
                            value={this.state.numero}
                            onChange={this.atualizaEstadoNumero.bind(this)}
                        />
                        <p>Complemento</p>
                        <input
                            type="text"
                            value={this.state.complemento}
                            onChange={this.atualizaEstadoComplemento.bind(this)}
                        />
                        <p>CEP</p>
                        <input
                            type="text"
                            value={this.state.cep}
                            onChange={this.atualizaEstadoCep.bind(this)}
                        />
                        <p>Cidade</p>
                        <input
                            type="text"
                            value={this.state.cidade}
                            onChange={this.atualizaEstadoCidade.bind(this)}
                        />
                        <p>Estado</p>
                        <input
                            type="text"
                            value={this.state.estado}
                            onChange={this.atualizaEstadoEstado.bind(this)}
                        />

                        <input type="submit" value="Cadastrar" onClick={this.cadastraAcademia} />
                    </form>
                </div>

            </section>
        );
    }
}