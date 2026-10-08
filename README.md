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
- `assets/js/icons.js` : icônes SVG Lucide utilisées par le portfolio
- `assets/images/projects/` : captures optimisées des projets
- `assets/images/og-cover.jpg` : aperçu Open Graph
- `robots.txt` et `sitemap.xml` : règles d'exploration et plan du site
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
`ENABLE_REMOTE_DATA` y est désactivé (`false`) par défaut : `data.js` reste alors la source de vérité, sans lecture du cache de contenu ni requête Firestore. Le cache distant est versionné avec `DATA_VERSION`.

## Au déploiement

Remplacer `__SITE_URL__` dans les fichiers SEO par le domaine public, sans slash final.

```bash
read -r -p 'Domaine public avec schéma HTTPS, sans slash final : ' SITE_URL
sed -i "s|__SITE_URL__|$SITE_URL|g" index.html robots.txt sitemap.xml
```

```powershell
$siteUrl = Read-Host 'Domaine public avec schéma HTTPS, sans slash final'
foreach ($path in 'index.html', 'robots.txt', 'sitemap.xml') {
  (Get-Content -Raw $path).Replace('__SITE_URL__', $siteUrl) | Set-Content -NoNewline $path
}
```

Vérifier que `assets/images/og-cover.jpg` est accessible publiquement. Activer `ENABLE_REMOTE_DATA` uniquement après configuration et validation de Firebase ; incrémenter `DATA_VERSION` à chaque publication de contenu distant.

## Crédits

Le projet reprend le template d'origine `el-shrabasy/interactive-portfolio`, distribué sous licence MIT.

## Démo

Démo : à ajouter après le déploiement.

## English

This is a static bilingual portfolio for a Full-Stack engineering student looking for a PFE internship.
It uses plain HTML, CSS and JavaScript, with light and dark themes.
Update the portfolio content in `assets/js/data.js`.
`ENABLE_REMOTE_DATA` is `false` by default. Before deployment, replace `__SITE_URL__` in the SEO files, verify the public Open Graph image, and enable remote data only after Firebase is configured.
