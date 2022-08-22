import { useRef, useState, useEffect} from 'react';

import '../Login/Login.css'

import axios from '../../api/axios';

const LOGIN_URL = '/api/auth/signup';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd,username,name])

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(user,pwd);

        axios.post(LOGIN_URL, { email : email , password : pwd, name : name, username : username})
        .then(reponse => {
            setEmail('');
            setName('');
            setUsername('');
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
                setErrMsg('Données invalide');
            } else {
                setErrMsg('Email déjà utilisé');
            }
            errRef.current.focus();    
        })
    }

    return (
        <>
            {success ? (
                <section className='login'>
                    <h1>Votre compte à été crée !</h1>
                    <br />
                    <p>
                        <a href="/">Connexion</a>
                    </p>
                </section>
            ) : (
                <section className='login'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Création du compte</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Nom:</label>
                        <input
                            type="name"
                            id="name"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                        <label htmlFor="username">Pseudo:</label>
                        <input
                            type="name"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                        />
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
                        <button>Créer</button>
                    </form>
                    <p>
                        Vous avez déjà un compte ?<br />
                        <span className="line">
                            <a href="/login">Connexion</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}


export default Login
