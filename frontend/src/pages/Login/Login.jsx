import { useRef, useState, useEffect} from 'react';

import './Login.css'

import axios from '../../api/axios';

const LOGIN_URL = '/api/auth/login';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post(LOGIN_URL, { email : email , password : pwd})
        .then(reponse => {
            setEmail('');
            setPwd('');
            //Enregistre dans le local storage
            localStorage.setItem('token' , reponse.data.token)
            localStorage.setItem('user' , reponse.data.userId)
            window.location = "/";
            console.log(reponse.data);
        })
        .catch( error => {
            console.log(error.response.data)
                 if (!error?.response) {
                //console.log(JSON.stringify(!err?.response));
                setErrMsg('Pas de reponse serveur');
            } 
            else if (error.response?.status === 401) {
                setErrMsg('Email ou mot de passe incorrect');
            } else {
                setErrMsg('Connection échoué');
            }
            errRef.current.focus();    
        })
    }

    return (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Connectez vous</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />

                        <label htmlFor="password">Mot de passe:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                         <button >Connexion</button>
                    </form>
                    <p>
                        Vous n'avez pas de compte ? Créer en un ici<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="/signup">Créer un compte</a>
                        </span>
                    </p>
                </section>
            )}


export default Login
