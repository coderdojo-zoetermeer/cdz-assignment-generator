const int matrixSize = 8;
const byte colPins[matrixSize] = { 13, 12, 11, 10, 9, 8, 7, 6 };
const byte rowPins[matrixSize] = { A0, A1, A2, A3, 2, 3, 4, 5 };
byte pattern[][matrixSize] = {
  { 1, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 1, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 1, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 2, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 3, 0, 4, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0 },
};

// #region snippet

typedef struct Animation {
  unsigned long nextTime;
  int step = 0;
} Animation;

// #endregion snippet

typedef struct DisplayContext {
  unsigned long nextLineTime;
  byte column = 0;
  unsigned int flashCounter1 = 0;
  unsigned int flashCounter2 = 0;
  unsigned int flashCounter3 = 0;
} DisplayContext;

DisplayContext displayContext;
Animation animation;

void setup() {
  for (int pin = 0; pin < matrixSize; pin++) {
    pinMode(colPins[pin], OUTPUT);
    pinMode(rowPins[pin], OUTPUT);
  }
  displayContext.nextLineTime = millis();
  animation.nextTime = millis();
}

void setBit(byte x, byte y, boolean value) {
  pattern[y % matrixSize][x] = value;
}

void displayLoop(DisplayContext &dc) {
  unsigned long m = millis();
  if (dc.nextLineTime < m) {
    dc.nextLineTime = m + 2;

    digitalWrite(colPins[dc.column], LOW);

    dc.flashCounter1 = (dc.flashCounter1 + 2) % 1000;
    dc.flashCounter2 = (dc.flashCounter2 + 2) % 300;
    dc.flashCounter3 = (dc.flashCounter3 + 2) % 6;

    dc.column = (dc.column + 1) % matrixSize;
    for (int r = 0; r < 8; r++) {
      byte v = pattern[r][dc.column];

      switch (v) {
        case 0:
          digitalWrite(rowPins[r], HIGH);
          break;
        case 1:
          digitalWrite(rowPins[r], LOW);
          break;
        case 2:
          digitalWrite(rowPins[r], dc.flashCounter1 > 500);
          break;
        case 3:
          digitalWrite(rowPins[r], dc.flashCounter2 > 150);
          break;
        case 4:
          digitalWrite(rowPins[r], dc.flashCounter3 > 2);
          break;
      }
    }

    digitalWrite(colPins[dc.column], HIGH);
  }
}

void loop() {
  displayLoop(displayContext);

  if (animation.nextTime < millis()) {
    animation.nextTime += 100;

    setBit(animation.step % 8, animation.step / 8, false);
    animation.step++;
    setBit(animation.step % 8, animation.step / 8, true);
    animation.step %= 64;
  }
}
