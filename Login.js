import React, { useState } from 'react'
import "./Login.css";

import logoHoepers from "../../img/iconeaba.png";
import logoHoepersNegativo from "../../img/icone-hoepers-negativo.png";

import sahtecweb from '../../img/novoLogoSahtecweb.png'


import api from '../../services/api';
import { encode as base64_encode } from 'base-64';

import { useNavigate } from 'react-router-dom'

const Login = () => {
    /* ===#===#=== variavel para navageção entre as páginas ===#===#===  */
    const navigate = useNavigate();

    /* ===#===#=== Usuário e Senha ===#===#===  */
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')

    const handelGoToLogin = (endpoint) => {
        navigate(`/${endpoint}`)
    }

    const armazenarLocalStorage = (chave, valor) => {
        localStorage.setItem(chave, valor)
    }

    /* ===#===#=== Botão login ===#===#===  */
    function handleClick(event) {
        event.preventDefault();
        const response = api.post('/api/login', { 'usuario': usuario, 'senha': base64_encode(senha) },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }

            }
        ).then(function (response) {

            if (response.status === 200) {
                console.log(response)

                armazenarLocalStorage('token', response.data.token)
                armazenarLocalStorage('permissoes', response.data.permissoes)
                armazenarLocalStorage('produtos', JSON.stringify(response.data.produtos))
                armazenarLocalStorage('unidades', JSON.stringify(response.data.unidades))
                armazenarLocalStorage('produtosFidc', JSON.stringify(response.data.produtos_fidc))

                handelGoToLogin('menu')
            }
        })
    }

    return (

        <div className='page'>
            <section className="login-wrapper">
                <div className='div-img-hoepers'>
                    <img src={logoHoepers} className='hoepersImg'></img>
                </div>
                <div>
                    <form>

                        <div className='input-wrapper'>

                            <label htmlFor='usuario' id='label-login'>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder='Usuário'
                                    className='input-login'
                                    id='usuario'
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value.toLocaleUpperCase())}
                                    required
                                />
                            </label>
                            <label htmlFor='senha' id='label-login'>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder='Senha'
                                    className='input-login material-symbols-outlined'
                                    id='senha'
                                    value={senha}
                                    autoComplete="on"
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                />
                            </label>
                        </div>

                        <div className="button-wrapper">
                            <button type="submit" className="button-29" onClick={handleClick}>Entrar</button>
                            
                        </div>
                    </form>
                </div>
            </section>

            <section className='logo-wrapper background'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <div className='alinhamento-horizontal'>
                    <div className='container-titulo-login'>
                        <h1 className='titulo-login'>Sahtec</h1>
                        <h1 className='title-web'>
                            <p className='web-w'>w</p>
                            <p className='web-e'>e</p>
                            <p className='web-b'>b</p>
                        </h1>
                        {/* <p className='a'>S</p><p>a</p><p>h</p><p>t</p><p>e</p><p>c</p> */}
                    </div>
                    <img src={sahtecweb} className="sahtecwebImg" alt="sahtecweb" />

                    
                </div>

                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </section>
        </div>
    )
}

export default Login