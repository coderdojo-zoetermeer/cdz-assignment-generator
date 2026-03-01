<!-- #region uitleg -->
:::: read

Een functie is en groep van instructies die samen een taak uitvoeren. Je kan
functies gebruiken om je programma in kleinere stukjes op te hakken zodat het
makkelijker is om te lezen. Ook zijn functies handig als je dezelfde groep
instructies op meerdere plaatsen in je programma nodig hebt.

*Voorbeeld*

Stel dat je een programma maakt om je huiswerk te maken. Je zou dan de volgende
functies kunnen maken:

- <code>zoek_huiswerk_in_agenda</code>
- <code>maak_rekenen_huiswerk</code>
- <code>maak_taal_huiswerk</code>

Je programma wordt dan als volgt:

Programmeer wat er moet worden gedaan voor de functie
<code>maak_rekenen_huiswerk</code>. Het stukje <code>(hoofdstuk)</code> geeft
aan dat de functie extra informatie nodig heeft over wat gedaan moet worden.

::: codeblock

```text
functie maak_rekenen_huiswerk(hoofdstuk):
    pak boek
    zoek hoofdstuk op
    pak papier
    maak sommen
    ...
```

:::

Programmeer wat er moet worden gedaan om taalhuiswerk te maken.

::: codeblock

```text
functie maak_taal_huiswerk(hoofdstuk):
    pak boek
    zoek hoofdstuk op
    leer woordjes
    ...
```

:::

Programmeer wat er moet worden gedaan om in je agenda te zoeken. Het resultaat
van de functie is een lijst van alle opdrachten die op de opgegeven datum
moeten worden gemaakt.

::: codeblock

```text
functie zoek_huiswerk_in_agenda(datum):
    pak agenda
    zoek datum op

    resultaat -> lijst_met_opdrachten
```

:::

Voer alle functies in de juiste volgorde uit.

::: codeblock

```text
zoek_huiswerk_in_agenda(vandaag):
    voor elke opdracht:
        als soort is "rekenen":
            maak_rekenen_huiswerk(hoofdstuk)
        als soort is "taal":
            maak_taal_huiswerk(hoofdstuk)

```

:::

::::
<!-- #endregion uitleg -->

________________________________________________________________________________

<!-- #region voorbeeld-scratch -->
:::: read

*Voorbeeld [Mijn blokken]*

==TODO==

::::
<!-- #endregion voorbeeld-scratch -->

________________________________________________________________________________

<!-- #region voorbeeld-arduino -->
:::: read

*Voorbeeld functies*

Voorbeeld:

```c
void doeIets() {

}
```

::::
<!-- #endregion voorbeeld-arduino -->

________________________________________________________________________________

<!-- #region voorbeeld-python -->
:::: read

*Voorbeeld functies*

Voorbeeld:

```py
def doeIets:
    print('hallo!')
```

::::
<!-- #endregion voorbeeld-python -->

________________________________________________________________________________
