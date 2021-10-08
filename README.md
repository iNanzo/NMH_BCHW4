# 04 Web APIs: Code Quiz

https://github.com/iNanzo/NMH_BCHW4

https://inanzo.github.io/NMH_BCHW4/

## Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
```

## My Task

I wanted to challenge myself and randomize the questions/choices, so I made a function that would pick a question from an array of objects, and fill the rest of the values with the questions array and answer. After doing this buttons are appended with the choices. I knew I could use the text in the button and compare it to the answer variable to do right/wrong answers. At first I struggled, but after some Googling I found a way to use the id of the button to compare it to the answer.

After that I added the timer, and started working on the highscore board. The end screen takes the text field input and score of the user and stores them in an array of objects as separate values that is pushed onto a variable that pulls previous ones from the localStorage variable. It then saves to the localStorage, when the highscore board is rendered it sorts the previously mentioned array of objects highest to lowest depending on score. From there it appends each one in a for loop in a similar concept to how the answer choice buttons are added.