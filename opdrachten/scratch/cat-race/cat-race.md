---
title: Kat Race
acknowledgements:
level: 2
template: default
progLang: scratch3
theme: scratch
description: |
    Kat Race
infoBlocks:
  - title: Voorkennis
    content: | 
        Deze opdracht is gemaakt voor beginners
      
  - title: Leerdoelen
    content: |
      - x-as
      - y-as
      - gebeurtenissen
      - variabelen
      
---

********************************************************************************

::: read

*Introductie*

In deze opdracht ga je een spel maken die als doel heeft de kat zo snel mogelijk
naar de overkant te laten lopen.

:::
________________________________________________________________________________
::: program

![cat =50x ](./assets/cat.svg){.float-right}
*begin van de opdracht*

Ga naar de Kat-sprite en maak de kat kleiner. Zet de grootte op 50.

![size-to-50 =400x ](./assets/size-to-50.svg)

:::

________________________________________________________________________________

::: program

![cat =50x ](./assets/cat.svg){.float-right}
*Zet kat links*

Als het spelletje start (Groene vlag) moet de kat links van het scherm staan.
Gebruik de onderstaande code blokken om dit mogelijk te maken.

```scratch
Wanneer groene vlag wordt aangeklikt
maak x (-200)
```


:::

________________________________________________________________________________

<!-- @include: global-lib/explain-axis.md#x-as-scratch -->

________________________________________________________________________________

::: program

![cat =50x ](./assets/cat.svg){.float-right}
*De kat laten bewegen*

We willen de kat iedere keer een stukje naar voren laten bewegen als we op de
spatiebalk drukken, dit kunnen we met de volgende extra code blokken.

Voeg de code die in het rode rechthoek staat toe aan de code
van ![cat =12x](./assets/cat.svg).

![take-10-steps =400x ](./assets/take-10-steps.svg)

![start-flag =400x](./assets/start-flag.svg){.float-right}
Probeer het uit:

- Start het programma door op de groene vlag te klikken.
- Druk een paar keer op de spatiebalk.
- Start het programma opnieuw door op de groene vlag te klikken.
- Houd de spatiebalk ingedrukt.

Snap je hoe het werkt?

:::

________________________________________________________________________________

<!-- @include: global-lib/explain-events.md#scratch -->

________________________________________________________________________________

::: program

![cat =50x ](./assets/cat.svg){.float-right}
*Niet vals spelen!*

![wait-for-release-space-key =300x](./assets/wait-for-release-spacekey.svg){.float-right}
Om te voorkomen dat je makkelijk aan de overkant komt, willen we wachten nadat
de spatiebalk is ingedrukt, dat hij eerst weer is los gelaten.

Pas de code van ![cat =12x](./assets/cat.svg) aan zoals hiernaast is in de
rode rechthoek is weergegeven.

*clear-float*

Kijk goed naar de kleuren!

Je moet de blokken in elkaar schuiven!

- Het blok `wacht tot <>`{.scratch} vind je in de `Besturen` lijst
- Het blok `niet <>`{.scratch} vind je in de `Functies` lijst
- Het blok `toets [spatiebalk v] ingedrukt?`{.scratch} vind je in de `Waarnemen` lijst



:::

________________________________________________________________________________

::: program

![cat =50x ](./assets/cat.svg){.float-right}
*Een finishlijn toevoegen*

Maak een nieuwe Sprite (plaatje) aan en teken hier een finishlijn in.

![draw-sprite =200x](./assets/draw-sprite.svg)
![finish-line =200x](./assets/finishline.png)

:::

________________________________________________________________________________

::: program

![cat =50x ](./assets/cat.svg){.float-right}
*Spel laten stoppen als kat bij de finish is*

![stop-at-finish =300x](./assets/stop-at-finish.svg){.float-right}
Als de kat nu bij de finish lijn komt moet ons spel stoppen. Dit kan je met de
volgende code blokken doen.

Voeg deze codeblokken toe aan ![cat =12x](./assets/cat.svg)

Dit zorgt ervoor dat ![cat =12x](./assets/cat.svg) "Ik ben er!!!"" zegt als hij
`Sprite 2` raakt. `Sprite 2` is de sprite voor de
finishlijn.

:::

________________________________________________________________________________

<!-- @include: global-lib/explain-variabele.md#scratch -->

________________________________________________________________________________

::: program

![cat =50x ](./assets/cat.svg){.float-right}
*Maken variabele voor het bijhouden van de tijd*

Dit is een Race! dus moeten we de tijd bij gaan houden hoelang de kat erover
doet.

We hebben hiervoor een variabele nodig met de naam `tijd`. In de
uitleg over variabelen staat hoe dit moet.

Maak nu zelf een variabele met de naam tijd.

![variabele tijd =x150](./assets/variabele-tijd.svg)

:::

________________________________________________________________________________

::: program

![cat =50x ](./assets/cat.svg){.float-right}
*De tijd bijhouden*

Nu moeten we er eerst voor zorgen dat de tijd op nul wordt gezet als je het
programma start.

![reset time =x150](./assets/reset-time.svg)

Zorg er nu voor dat de variable `tijd` elke seconde met 1 wordt
verhoogt.

![count seconds =x200](./assets/count-seconds.svg)

:::

________________________________________________________________________________

::: program

![cat =50x ](./assets/cat.svg){.float-right}
*Score en tijd laten zien*

![say score =300x](./assets/say-score.svg){.float-right}
We gaan er nu voor zorgen dat je de score ziet als ![cat =12x](./assets/cat.svg)
bij de finish komt.

De tijd meten in hele seconden is misschien niet zo leuk. Laten we de tijd
in 1/10 van een seconde gaan meten.

We willen dus de variabele tijd niet 1x per seconde verhogen, maar 10x
per seconden

Pas de code aan zoals hiernaast is weergegeven.

:::

________________________________________________________________________________

::: program

![cat =50x ](./assets/cat.svg){.float-right}
*Hindernissen 1*

Laten we het wat moeilijker maken en een hindernis op de weg van de kat zetten.

Dit kan je doen door Kies een sprite. Kies een leuk plaatje uit en
maak het plaatje ook weer wat kleiner, bijvoorbeeld weer grootte 50

![banaan =400x](./assets/banaan.svg)

Nu moeten we ervoor zorgen dat als ![cat =12x](./assets/cat.svg) de hindernis
aanraakt (de bananen) dat de kat weer terug word gezet aan het begin van het
spel. Dat kan je met de volgende commando blokken doen

![banaan =300x](./assets/hit-banannas.svg)

:::

________________________________________________________________________________

<!-- @include: global-lib/explain-axis.md#y-as-scratch -->

________________________________________________________________________________

::: program

![cat =50x ](./assets/cat.svg){.float-right}
*Omhoog bewegen*

Nu moeten we het wel mogelijk maken voor de kat om de hindernis te ontwijken.
Dit kunnen we doen door de kat omhoog en omlaag te laten gaan. Gebruik pijltje
omhoog om de kat om hoog te laten gaan. De Y Positie van de kat bepaald hoe
hoog de kat staat.

```scratch
wanneer [pijltje omhoog v] is ingedrukt
verander y met (10)
```

:::

________________________________________________________________________________

::: program

![cat =50x ](./assets/cat.svg){.float-right}
*Omlaag bewegen*

Maak zelf een blok om de kat omlaag te laten bewegen als op pijltje omlaag
wordt gedrukt.

:::

________________________________________________________________________________

::: program

![cat =50x ](./assets/cat.svg){.float-right}
*Y positie op 0 zetten bij het begin*

Als het spel begint moet ![cat =12x](./assets/cat.svg) op y-positie 0 staan.

Voeg het onderstaande blok toe aan je programma. Je moet zelf bepalen waar hij
moet komen.

```scratch
maak y (0)
```

Speel het spel en kijk of alles werkt.

:::

________________________________________________________________________________

::: challenge 1

*Extra hindernissen*

![meer hindernissen =200x](./assets/meer-hindernissen.png){.float-right}
Maak meerdere hindernissen door rotsen toe te voegen.

Zorg er voor dat als de kat tegen
de hindernissen aanloopt hij altijd
weer terug links word geplaatst!

:::

________________________________________________________________________________

::: challenge 1

*Langzamer lopen*

Laat de kat langzamer lopen, dus dat je nog veel vaker op de spatiebalk moet
drukken om bij de finish te komen.

- Met hoeveel stappen per keer loopt de kat nu?
- Moet je het aantal stappen hoger of lager maken om de kat langzamer
  te laten lopen?

:::

________________________________________________________________________________

::: challenge 1

*Twee spelers*

Kan je dit een 2-speler spel maken?

- Maak naast de kat een andere speler in je spel
- Kopieer de code van de kat naar de andere speler

Verander de toetsen voor de spelers

- Kat (Speler 1)

  - Vooruit : Z
  - Omhoog: S
  - Omlaag: X

- Speler 2
  - Vooruit: N
  - Omhoog: K
  - Omlaag: M

- Als de 2 spelers elkaar aanraken, zet dan beide spelers terug aan het begin!

:::

________________________________________________________________________________

::: read

*Voorbeeld spel programma*

[Download](./assets/cat-race.sb3)

![result =700x ](./assets/example-result.png)

:::
