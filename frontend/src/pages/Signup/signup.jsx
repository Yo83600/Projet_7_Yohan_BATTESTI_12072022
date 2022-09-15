import { useRef, useState, useEffect} from 'react';
// CSS de login car html pareil
import '../Login/Login.css'
import axios from '../../api/axios';

const Signup = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // focus de l'element
    useEffect(() => {
        userRef.current.focus();
    }, [])

    // Application du message d'erreur 
    useEffect(() => {
        setErrMsg('');
    }, [email, pwd,firstname,name])

    // redirection vers la page d'accueil si token 
    const token = localStorage.getItem('token');
    if(token){
        window.location = "/"  
    }

    const signupSubmit = async (e) => {
        e.preventDefault();
        //console.log(user,pwd);

        // methode post pour se creer un compte
        axios.post('/api/auth/signup', { email : email , password : pwd, name : name, firstname : firstname})
        .then(reponse => {
            setEmail('');
            setName('');
            setFirstname('');
            setPwd('');
            setSuccess(true);
            console.log(reponse.data)
        })
        .catch( error => {
            console.log(error.response.data)
            if (!error?.response) {
                setErrMsg('Pas de reponse serveur');
            } else if (error.response?.status === 400) {
                setErrMsg('Email déjà utilisé');
            } else if (error.response?.status === 401) {
                setErrMsg('Le Mot de passe doit faire 10 caractère au moins, avec une maj, une min et un chiffre au moins');
            } else {
                setErrMsg('Données invalide');
            }
            errRef.current.focus();    
        })
    }

    return (
        <>
            {success ? (
                <section className='login'>
                    <div className='login-signup'>
                        <h1>Votre compte à été crée !</h1>
                        <br />
                        <p>
                            <a href="/">Connexion</a>
                        </p>
                    </div>
                </section>
            ) : (
                <section className='login'>
                    <div className='login-signup'>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1>Création du compte</h1>
                        <form onSubmit={signupSubmit}>
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
                            <label htmlFor="firstname">Prénom:</label>
                            <input
                                type="name"
                                id="firstname"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setFirstname(e.target.value)}
                                value={firstname}
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
                            <div className="password-infos">
                                <p>Le Mot de passe doit faire 10 caractère au moins, avec une maj, une min et un chiffre au moins</p>
                            </div>
                            <button className='button-signup'>Créer</button>
                        </form>
                        <p>
                            Vous avez déjà un compte ?<br />
                            <span className="line">
                                <a href="/login">Connexion</a>
                            </span>
                        </p>
                    </div>
                </section>
            )}
        </>
    )
}

export default Signup
