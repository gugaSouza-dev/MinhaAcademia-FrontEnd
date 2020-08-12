import React, { Component, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import "./CadastraAcademia.css";
import Header from '../../components/header/Header';

const initialState = {
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
    cadastraConsulta(event) {
        event.preventDefault();

        let consulta = this.state;

        axios.post('http://localhost:3333/academia', consulta, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("academia"),
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.status == 200)
                    this.buscarConsultas()
            })
            .catch(erro => {
                console.log(erro);
            })
    }

    render() {
        return (
            <section className="CAContent">
                <Header />
                {/* <div className="containt">
                    <div className="formContainer">
                        <div className="info">
                            <h2>Informaçôes</h2>
                        </div>
                        <div className="infoLocal">
                            <h2>Local</h2>
                            <input
                                placeholder="Rua"
                                type="text"
                                required={true}
                            // onChange={this.atualizaEstadoEmail.bind(this)}
                            />
                        </div>
                    </div>
                </div> */}
            </section>
        );
    }
}