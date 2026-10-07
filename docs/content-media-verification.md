# Verification content-media

Verification locale avec Python http.server et Playwright, sans dependance ajoutee au depot.

| Point | Fichiers | Resultat |
| --- | --- | --- |
| Textes hero et presentation | assets/js/data.js | Quatre valeurs mises a jour selon la demande |
| LinkedIn et telephone | index.html, data.js, i18n.js, rendering.js, components.css | Deux cartes distinctes ; tel:+212644847468 ; libelles et drapeau FR/EN |
| Hero progressif | index.html, rendering.js, i18n.js, animations.css | Texte visible en fin de sequence ; pas de rejeu lors de renderAll ; sequence courte au changement de langue |
| Mouvement reduit | animations.css | Tous les mots visibles et sans transform |
| Images projets | data.js, rendering.js, components.css, assets/images/projects/ | Quatre images avec dimensions, lazy, async et alt traduit ; deux cartes generiques conservees ; modale avec contain |
| Responsive | Captures locales hors depot | 320, 390, 768, 1024, 1280, 1440, 1920 ; FR/EN ; sombre/clair ; aucun debordement horizontal dans les 28 combinaisons |
| Console et ressources | Playwright | Aucun message console error ni requete en echec pendant les tests ; synchronisation cloud simulee avec une reponse vide |
| CV et certificats | Playwright | Menu CV ouvert ; cinq PDF accessibles avec HTTP 200 |
| Focus | Playwright | Lien focalise avec outline 3 px et ombre visible |

| Source | Avant (octets) | WebP (octets) | Dimensions |
| --- | ---: | ---: | --- |
| Plateforme_E-Commerce_Intelligente.png | 901290 | 44384 | 1200 x 582 |
| Pathfinding_Visualizer_Engine.png | 572056 | 46608 | 1200 x 580 |
| StoreShop _E-Commerce_Spring_Boot.png | 1434339 | 25278 | 1200 x 578 |
| Systeme Expert (source avec accents) | 79026 | 20896 | 1200 x 607 |

Limites : pas de test avec un lecteur d'ecran reel ; pas de validation du service cloud distant ; les PDF ont ete verifies par requete HTTP, sans controle manuel de leur contenu. Les captures debut/milieu/fin de l'animation, le survol et la modale ont ete prises a 1280 px ; les captures hero/contact/projets couvrent les 28 combinaisons. Le test Tab est cible et ne constitue pas un audit exhaustif de tous les controles.

Les captures avant utilisent le commit 0aedeab (groupe textes termine). Les captures sont conservees dans le dossier temporaire local, avec le prefixe content-media-.
