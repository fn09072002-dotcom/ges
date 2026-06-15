export function InscriptionPage() {
    const params = JSON.parse(localStorage.getItem("parametres")) || {};
    const logo = params.logo || "logo.png";
    const nomCourt = params.nomCourt || "Dalal Ak Diam";
    const nomGroupement = params.nomGroupement || "Groupement féminin de Dakar";
    const membres = JSON.parse(localStorage.getItem("membres")) || [];

    return `
    <div class="auth-layout">

        <div class="auth-hero">
            <div class="auth-hero-content">
                <div class="auth-hero-logo">
                      <img src="./public/FEM.png" alt="${nomCourt}" style="width:70px;height:70px;object-fit:cover;border-radius:50%"
                        onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
                    <span style="display:none;font-size:2.5rem"><img src="./public/FEM.png"></span>
                </div>
                <h2>Rejoignez-nous</h2>
                <p>Créez votre compte et rejoignez la communauté ${nomCourt}. Ensemble, nous construisons un avenir meilleur.</p>
                <div class="auth-stats">
                    <div class="auth-stat"><strong>${membres.length}</strong><span>Membres</span></div>
                    <div class="auth-stat"><strong>2019</strong><span>Fondé en</span></div>
                </div>
            </div>
        </div>

        <div class="auth-panel">
            <div class="auth-form-wrap">

                <div class="auth-brand">
                    <div class="auth-brand-logo">
                             <img src="./public/FEM.png" alt="${nomCourt}" style="width:70px;height:70px;object-fit:cover;border-radius:50%"
                        onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
                    <span style="display:none;font-size:2.5rem"><img src="./public/FEM.png"></span>
                </div>
                    <h1>${nomGroupement}</h1>
                    <p class="subtitle">${nomCourt}</p>
                </div>

                <h2 class="auth-title">Créer un compte</h2>
                <p class="auth-desc">Remplissez vos informations pour vous inscrire</p>

                <div id="inscriptionError" class="error-msg" style="display:none"></div>

                <div class="form-group">
                    <label>Nom complet</label>
                    <input id="nomInscription" type="text" placeholder="Fatou Ndiaye">
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input id="emailInscription" type="email" placeholder="votre@email.com">
                </div>

                <div class="form-group">
                    <label>Mot de passe</label>
                    <input id="passwordInscription" type="password" placeholder="••••••••">
                </div>

                <div class="form-group">
                    <label>Confirmer le mot de passe</label>
                    <input id="confirmPassword" type="password" placeholder="••••••••">
                </div>

                <div class="checkbox-row">
                    <input type="checkbox" id="termsCheck">
                    <span>J'ai lu et j'accepte <a href="#">les conditions d'utilisation</a></span>
                </div>

                <button class="btn-primary" onclick="inscription()">Créer mon compte</button>

                <p class="auth-link">
                    Déjà un compte ?
                    <a onclick="window.location.hash='connexion'">Se connecter</a>
                </p>

            </div>
        </div>

    </div>`;
}
