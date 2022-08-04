import { useRef, useState, useEffect} from 'react';

import './login.css'

import axios from '../../api/axios';

const LOGIN_URL = '/api/auth/login';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(user,pwd);

        axios.post(LOGIN_URL, { email : email , password : pwd})
        .then(reponse => {
            setEmail('');
            setPwd('');
            setSuccess(true);
            console.log(reponse.data)
        })
        .catch( error => {
            console.log(error.response.data)
                 if (!error?.response) {
                //console.log(JSON.stringify(!err?.response));
                setErrMsg('Pas de reponse serveur');
            } else if (error.response?.status === 401) {
                setErrMsg('Email ou mot de passe incorrect');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();    
        })
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Vous êtes connectez!</h1>
                    <br />
                    <p>
                        <a href="#">Page d'accueil</a>
                    </p>
                </section>
            ) : (
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
                        <button>Connection</button>
                    </form>
                    <p>
                        Vous n'avez pas de compte ? Créer en un<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}


export default Login
