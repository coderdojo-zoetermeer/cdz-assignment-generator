---
title: Inspringen
acknowledgements:
  author(s): Ben Mens
level: 3
template: default
progLang: python
theme: python
description: |
    Python inspringen
infoBlocks:
  - title: Voorkennis
    content: | 
      Werken met Thonny
      
  - title: Leerdoelen
    content: |
        - wat is inspringen
        - puzzelen met inspringen
      
---

********************************************************************************

::: read

*beschrijving van deze opdracht*

In deze oefening gaan we oefenen met inspringen in Python.

:::

________________________________________________________________________________

<!-- @include: global-lib/explain-structure.md#indent -->

________________________________________________________________________________

:::: program

Hieronder staat een programma die niet goed is ingesprongen en dus niet goed
werkt.

::: codeblock

```python
antwoord = 42

print ("Het programma begint")
print ("De waarde van antwoord is " + str(antwoord))

if antwoord == 41:
print ("Het antwoord gelijk is aan 41")
else:
print ("Het antwoord NIET gelijk is aan 41")

if antwoord == 42:
print ("Het antwoord gelijk is aan 42")

print ("Het antwoord gelijk is nog steeds 42")

print ("Het programma is klaar")
```

:::

Kopieer dit programma naar Thonny en probeer het uit. Je zal merken dat Python
niets van het programma snapt en een foutmelding geeft.

Probeer nu zelf om het programma te verbeteren zodat het resultaat als volgt is:

::: codeblock

```txt
Het programma begint
De waarde van antwoord is 42
Het antwoord NIET gelijk is aan 41
Het antwoord gelijk is aan 42
Het antwoord gelijk is nog steeds 42
Het programma is klaar
```

:::

::::

________________________________________________________________________________

:::: program

Maak nu de volgende aanpassing aan je code.

::: codeblock

```python
antwoord = 42 # [!code --]
antwoord = 41 # [!code ++]
```

:::

Als je je programma nu test moet het resultaat als volgt zijn:

::: codeblock

```txt
Het programma begint
De waarde van antwoord is 41
Het antwoord gelijk is aan 41
Het programma is klaar
```

:::

Klopt je programma nog steeds? Zo niet, verbeter je programma dan.

::::

________________________________________________________________________________

:::: program

*meerdere niveaus*

Vaak is het nodig om meerdere keren in te springen. Hieronder een voorbeeld in
scratch.

```scratch

maak [x v] (150)

wanneer groene vlag wordt aangeklikt
als <(x) > (100)> dan
  als <(x) < (200)> dan
    zeg [x is groter dan 100 en kleiner dan 200]
  anders
    zeg [x is groter dan 100 en NIET kleiner dan 200]
  end
anders
  zeg [x is iets anders]
end
```

Kopieer de onderstaande code naar Thonny en verbeter het inspringen.

::: codeblock

```python
x = 150

if x > 100:
if x < 200:
print("x is groter dan 100 en kleiner dan 200")
else:
print("x is groter dan 100 en NIET kleiner dan 200")
else:
print("x is iets anders")
```

:::

Als het goed is geeft je programma nu het volgende resultaat:

::: codeblock

```txt
x is groter dan 100 en kleiner dan 200
```

:::

::::
