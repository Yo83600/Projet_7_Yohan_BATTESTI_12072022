
import './App.css';

function App() {
  return (
    <div className='App'>
    <form>
     
    <h1>Se connecter</h1>
    
    <div className="inputs">
      <input type="name" placeholder="Name" />
      <input type="username" placeholder="Username" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Mot de passe"/>
    </div>
    
    <p className="inscription">Je n'ai pas de <span>compte</span>. Je m'en <span>crée</span> un.</p>
    <div align="center">
      <button type="submit">Se connecter</button>
    </div>
  </form>
  </div>
  );
}

export default App;
