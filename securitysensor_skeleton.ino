//Define your variables. The pins are numbered. Is this what you did?
#define trig 2
#define echo 3
#define LEDRed 6
#define LEDYellow 5
#define LEDGreen 4 
#define buzzer 7

void setup() {
  //Set up code here that runs one time.

  //Begin writing to console.
  Serial.begin(9600);

  //Determines whether it reads or writes to the pins.
  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);
  pinMode(LEDRed, OUTPUT);
  pinMode(LEDYellow, OUTPUT);
  pinMode(LEDGreen, OUTPUT);
  pinMode(buzzer, OUTPUT);
}

void loop() {
  //Main code here that runs forever.

  //Send out a pulse of ultrasonic noise.
  long duration, distance;
  digitalWrite(trig, LOW); 
  delayMicroseconds(2);
  digitalWrite(trig, HIGH);
  delayMicroseconds(10);
  digitalWrite(trig, LOW);

  //Read how long it takes to recieve the pulse back. Convert to a distance.
  duration = pulseIn(echo, HIGH);
  distance = 0 //YOUR VALUE HERE

  Serial.println(duration);
  Serial.println(distance);
 
  //Determine when to turn on the LEDs and buzzer
  //Use tone(sensor, volume) and noTone(sensor)
  //Use digitalWrite(pin, value)

  //YOUR CODE HERE
 
  if (distance > 50 || distance <= 0){
    Serial.println("Outside acceptable range of distances");
  }
  delay(300);
}