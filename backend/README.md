Parfait 👍 je vois que ton README est déjà bien structuré, mais il y a quelques soucis de mise en forme Markdown (blocs ouverts/non fermés, indentation).
Voici une version corrigée et propre que tu peux utiliser directement comme `README.md`.

---

````markdown
# Booking Project

## Description
Ce projet est une application de réservation simple.  
Un utilisateur peut s’inscrire, se connecter, puis réserver un créneau horaire dans la semaine en cours.  
Un créneau déjà pris ne peut pas être réservé de nouveau.  

Le but est d’illustrer une architecture complète avec un serveur **Express**, une base **PostgreSQL**, et un déploiement avec **Docker**.

---

## Fonctionnalités
- Inscription et connexion des utilisateurs  
- Sessions sécurisées pour gérer l’authentification  
- Réservation sur des créneaux horaires de la semaine actuelle  
- Visualisation des réservations futures  
- Empêche la double réservation  
- Déploiement avec Docker et Docker Compose  

---

## Stack technique
- **Node.js / Express** : serveur et API  
- **Sequelize** : ORM pour PostgreSQL  
- **PostgreSQL** : base de données  
- **express-session** : gestion des sessions  
- **Docker & Docker Compose** : orchestration  
- **HTML / CSS / JavaScript** : interface utilisateur simple  

---

## Installation

### Prérequis
- Node.js et npm  
- Docker et Docker Compose  

### Étapes
1. Cloner le dépôt :
   ```bash
   git clone <url-du-repo>
   cd Booking-Project/backend
````

2. Créer un fichier `.env` (non versionné) contenant la configuration de la base et le secret des sessions.
   Exemple :

   ```env
   DB_NAME=...
   DB_USER=...
   DB_PASSWORD=...
   DB_HOST=...
   DB_PORT=...
   TOKENSECRET=...
   ```

3. Lancer l’application avec :

   ```bash
   docker compose up -d --build
   ```

4. Accéder à [http://localhost:4000](http://localhost:4000)

---

## Utilisation

* Accéder à `/index.html` pour se connecter
* S’inscrire si nécessaire
* Se connecter
* Accéder au menu pour créer une réservation
* Consulter ses réservations futures

---

## Architecture

### Vue d’ensemble

```
[Frontend HTML/CSS/JS]  <--->  [Express / Node.js]  <--->  [PostgreSQL]
         ↑                           ↑
      public/                     controllers/
      views/                      routes/
```

### Organisation des dossiers

```
backend/
│
├── controllers/           # Logique métier (login, signup, réservations…)
│   └── user.js
│
├── models/                # Base de données et ORM Sequelize
│   ├── database.js        # Connexion Sequelize
│   └── users.js           # Modèles User et Booking
│
├── public/                # Pages publiques accessibles directement
│   ├── index.html         # Page de connexion
│   ├── signup.html        # Page d'inscription
│   ├── style.css          # Styles globaux
│   └── script.js          # Script frontend associé
│
├── routes/                # Routes Express (API)
│   ├── login.js
│   ├── signup.js
│   ├── reservations.js
│   └── users.js
│
├── util/                  # Utilitaires et middlewares
│   ├── CodeError.js
│   └── retour.js
│
├── views/                 # Pages protégées (nécessitent login)
│   ├── menu.html          # Page menu utilisateur
│   └── reservation.html   # Page de réservation
│
├── pgdata/                # Volume de données PostgreSQL (exclu de l'image Docker)
│
├── .dockerignore          # Fichiers/dossiers ignorés lors du build Docker
├── .env                   # Variables d'environnement (non versionné)
├── docker-compose.yml     # Orchestration des services (web + db)
├── Dockerfile             # Image Docker du backend
├── main.js                # Point d'entrée du serveur Express
├── package.json           # Dépendances Node.js
├── package-lock.json
└── README.md              # Documentation du projet
```

---

## Notes

* En développement, les sessions utilisent `MemoryStore`.
* En production, il est recommandé d’utiliser Redis ou un autre store externe.
* Ce projet illustre un workflow complet : backend, base de données, frontend minimal et conteneurisation.

```

---

Veux-tu que je t’ajoute aussi une section **"Exemple de workflow utilisateur"** (inscription → login → réservation → menu) pour rendre ton README encore plus concret et parlant ?
```
