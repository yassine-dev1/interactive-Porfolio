# Portfolio de Yassine El Jarjini

Portfolio personnel d'un étudiant ingénieur Full-Stack à la recherche d'un stage PFE.
Le site présente ses projets, compétences, expériences et certifications.
Il fonctionne comme un site statique bilingue avec thème clair et sombre.

## Stack

- HTML statique
- CSS statique
- JavaScript statique

## Structure

- `index.html` : portfolio public
- `admin.html` : interface d'administration existante
- `assets/css/` : feuilles de style organisées par rôle
- `assets/js/` : données, traductions, rendu et interactions
- `resumes/` : CV en français et en anglais
- `certifications/` : certificats PDF

## Lancement en local

Depuis la racine du projet :

```bash
python -m http.server
```

Ouvrir ensuite l'adresse locale indiquée par le serveur.

## Modifier le contenu

Modifier l'objet `INITIAL_DATA` dans `assets/js/data.js` sans changer sa structure ni ses identifiants.

## Crédits

Le projet reprend le template d'origine `el-shrabasy/interactive-portfolio`, distribué sous licence MIT.

## Démo

Démo : à ajouter après le déploiement.

## English

This is a static bilingual portfolio for a Full-Stack engineering student looking for a PFE internship.
It uses plain HTML, CSS and JavaScript, with light and dark themes.
Update the portfolio content in `assets/js/data.js`.
