import { useRef, useState, useEffect} from 'react';
import './Login.css'
import axios from '../../api/axios';

const Login = () => {
    
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    // focus de l'element
    useEffect(() => {
        userRef.current.focus();
    }, [])

    // Application du message d'erreur 
    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    // redirection vers la page d'accueil si token 
    const token = localStorage.getItem('token');
    if(token){
        window.location = "/"  
    }

    const loginSubmit = async (e) => {
        e.preventDefault();

        // methode post pour se connecter
        axios.post('/api/auth/login', { email : email , password : pwd})
        .then(reponse => {
            setEmail('');
            setPwd('');
            //Enregistre dans le local storage
            localStorage.setItem('token' , reponse.data.token)
            localStorage.setItem('user' , reponse.data.userId)
            localStorage.setItem("name", reponse.data.name)
            localStorage.setItem("firstname", reponse.data.firstname)
            window.location = "/";
        })
        .catch( error => {
            console.log(error.response.data)
            if (!error?.response) {
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
        <section className='login'>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Connectez vous</h1>
            <form onSubmit={loginSubmit}>
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
                    <a href="/signup">Créer un compte</a>
                </span>
            </p>
        </section>
    )
};


export default Login
