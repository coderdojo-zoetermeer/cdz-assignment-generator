<!-- #region uitleg -->
De modulo functie geeft de restwaarde van een *gedeeld door* som met gehele
getallen.

Bijvoorbeeld: Stel dat je 13 snoepjes wil verdelen over 4 vrienden. Iedereen
krijgt dan 3 snoepjes, en er blijft er dan 1 over.

Dus $13/4 = 3\enspace rest\enspace 1$
<!-- #endregion uitleg -->

________________________________________________________________________________

<!-- #region scratch -->
::: read

*Uitleg modulo functie*

<!-- @include: ./explain-mod.md#uitleg -->

Voorbeeld:

```scratch

wanneer groene vlag wordt aangeklikt
maak [rest v] ((13) modulo (4))

```

De variabele met de naam *rest* heeft nu de waarde 1.

:::
<!-- #endregion scratch -->

________________________________________________________________________________

<!-- #region arduino -->
::: read

*Uitleg modulo functie*

<!-- @include: ./explain-mod.md#uitleg -->

Bij arduino schrijf je de modulo functie als een $\%$-teken.

Voorbeeld:

```c
    integer rest = 13 % 4; // De waarde van rest wordt 1
```

:::
<!-- #endregion arduino -->

________________________________________________________________________________

<!-- #region python -->
::: read

*Uitleg modulo functie*

<!-- @include: ./explain-mod.md#uitleg -->

In python schrijf je de modulo functie als een $\%$-teken.

Voorbeeld:

```py
    rest = 13 % 4 # De waarde van rest wordt 1
```

:::
<!-- #endregion python -->

________________________________________________________________________________
