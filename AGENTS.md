# Portfolio – règles du projet

## Architecture (à ne pas casser)
- Site statique : index.html, admin.html, config.js. Pas de framework, pas de build, pas de nouvelle dépendance npm.
- Le contenu vient de l'objet INITIAL_DATA dans index.html. Ne pas changer sa structure ni les IDs / attributs data-i18n : admin.html et la future intégration Firebase en dépendent.
- Site bilingue FR/EN (toggleLanguage), thème sombre/clair. Tout changement doit fonctionner dans les 2 langues et les 2 thèmes.
- Ne pas toucher à admin.html et config.js dans cette phase (UI publique uniquement).

## Qualité attendue
- Style sobre et professionnel (profil ingénieur logiciel), pas de gadgets.
- Animations : uniquement transform/opacity, 150–600 ms, et respecter prefers-reduced-motion.
- Responsive : 390 px, 768 px, 1280 px, 1440 px. Aucun scroll horizontal.
- Contraste WCAG AA, focus clavier visible, HTML sémantique.
- Pas de bibliothèque externe lourde ; polices Google Fonts déjà utilisées uniquement.

## Vérification
- Servir le site avec `python -m http.server`, tester avec Playwright (captures aux 4 largeurs, FR et EN, sombre et clair, zéro erreur console).