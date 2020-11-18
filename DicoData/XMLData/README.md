
XMLittré
========

Avertissement
-------------

Le XML du Littré est imparfaitement balisé. Certains éléments ne sont
pas balisés quand ils devraient l'être. Plus grave, certaines balises
sont fautives. Tout ceci est le résultat de scripts mais aussi de très
nombreuses corrections manuelles sur près de deux décennies.


Données
-------

Un fichier XML en UTF-8 pour chaque lettre de l'alphabet.
Une DTD est fournie pour décrire cette structure XML.


Fidélité du texte
------------------

L'objectif est de rester fidèle au texte d'origine du dictionnaire Littré,
sans le moderniser ni le tronquer.
Toutefois, les erreurs mineures sur la forme peuvent être corrigées — par exemple,
une ponctuation oubliée, ou l'intervertion de *lœmographie* et *lœmologie*.

* Les caractères non latins, en particulier les mots grecs à l'étymologie,
  ne sont généralement pas présents.

* Il est possible que le balisage ait entraîné des dégâts involontaires,
  notamment pour les vedettes à orthographes variées.

* La ponctuation originale est conservée autant que possible,
  mais ce n'est pas une priorité.

* Dans quelques rares cas, le texte a été corrigé.

    - Par exemple la vedette JUVENILE est manifestement une erreur,
      puisque sa définition est illustrée par « Ardeur, grâce juvénile »
      avec un accent.

    - Autre exemple, dans ATOURNER, où ce dépôt contient :

      ```
      Moult m'a amors atornée Douce peine et biau labor, *Couci*, I.
      En perilleuse aventure M'avez, amours, atorné, ib. IV.
      ```

      Le texte de mon édition imprimée du Littré contient pourtant :

      ```
      Moult m'a amors atornée Douce peine et biau labor, *Couci*, I.
      En perilleuse aventure M'avez, amours, atorné, ID. ib. IV.
      ```

      En fait, *Couci* est un nom d'œuvre. D'ailleurs dans le texte original,
      il n'est pas écrit en majuscules. Mais comme ce sont des mémoires,
      supposément écrites par le sire de Couci, Littré le prend parfois
      comme un nom d'auteur, d'où cet *ID* abusif.

      La confusion entre ID et ib est assez fréquente,
      pas seulement avec Couci.
      L'attribut `fix="ID"` a été ajouté dans ce cas.


Conditions d'utilisation
------------------------

Les données balisées sont toutes placées sous licence *Creative Commons
Paternité - Partage des conditions initiales à l'identique 3.0*,
alias **CC-BY-SA 3.0**.
Vous ne pouvez donc les utiliser qu'en indiquent leur source
« littre.org » ou en faisant référence à l'auteur du XML
« François Gannaz, francois.gannaz@littre.org ».


Formes fléchies et lexémisation
--------------------------------

C'est une demande récurrente. Si vous cherchez une liste de
mots déclinés sous toutes leurs formes (par exemple pour pouvoir
remonter de "fîmes" à "faire"), je vous recommande
[Lefff](http://atoll.inria.fr/~sagot/lefff.html).

Une autre solution d'excellente qualité est
[Morphalou](http://www.cnrtl.fr/lexiques/morphalou/), avec une licence
plus restrictive, mais avec la caution du [TlF](http://www.cnrtl.fr/definition/).



Contact
-------

Des informations éventuellement complémentaires sont dans la
[FAQ du site](http://littre.org/faq).

François Gannaz <francois.gannaz@littre.org>
