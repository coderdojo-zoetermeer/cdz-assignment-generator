<!-- #region general -->

::: read

*Uitleg programmastructuur*

De programmastructuur bepaald in welke volgorde de opdrachten in je programma
worden uitgevoerd.

Er zijn verschillende soorten structuren.

::regular hand-point-right:: *Sequentie*

In een sequentie worden de opdrachten opeenvolgend uitgevoerd. In Python ziet
dat er als volgt uit:

```py
    print("Dit wordt als eerste uitgevoerd")
    print("Dit wordt als tweede uitgevoerd")
    print("Dit wordt als laatste uitgevoerd")
```

::regular hand-point-right:: *Conditie*

In een conditie worden opdrachten uitgevoerd als aan een voorwaarde is voldaan.
Denk aan Als...Dan....

Voorbeeld:

```py
    if key_press == "space":
        print("Dit wordt uitgevoerd als de spatiebalk is ingedrukt")
    else if key_press == "q":
        print("Dit wordt uitgevoerd als de q-toets is ingedrukt")
    else
        print("Dit wordt uitgevoerd in alle andere gevallen")
        print("Dit wordt ook uitgevoerd in alle andere gevallen")

    print("dit hoort niet bij de if en wordt altijd uitgevoerd")
```

Het is belangrijk dat de computer weet welke opdrachten bij de condities horen
en welke niet. Om aan te geven dat een opdracht bij een conditie hoort, moet je
hem inspringen. Hiermee wordt bedoeld dat je met 4 spaties de regel naar rechts
verplaatst.

De laatste opdracht !!print("dit wordt altijd uitgevoerd")!! hoort niet bij de
!!else!!. Dit kan de computer zien omdat deze regel niet is ingesprongen.

::regular hand-point-right:: *Iteratie*

Een iteratie is een lus waarmee opdrachten meerdere keren na elkaar kunnen
worden uitgevoerd.

Voorbeeld:

```py
    while key_press == "space":
        print("Dit commando wordt herhaald zolang de spatiebalk is ingedrukt")

    print("Dit wordt uitgevoerd nadat de lus is afgelopen").
```

:::

<!-- #endregion general -->

<!-- #region indent -->

::: read

*Uitleg inspringen*

Door opdrachten in te springen weet de computer waar een opdracht bij hoort.
Inspringen doe je door aan het begin van een regel spaties in te voeren.

Bijvoorbeeld:

```py
    if key_press == "spatie":
        print("Ik ben ingesprongen hoor dus bij de if")

    print("Ik hoor niet bij de if")
```

>[!belangrijk]
>Het is belangrijk dat je bij het programmeren goed oplet op het inspringen. Als
>je dit niet goed doet, werkt je programma niet.

:::

<!-- #endregion indent -->