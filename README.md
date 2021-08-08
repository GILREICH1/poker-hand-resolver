<h1>Poker Hand Comparison</h1>

<p>
  Poker Hand Comparison is a little program that will compare two hands of poker
  according to the rules of
  <a href="https://en.wikipedia.org/wiki/Texas_hold_%27em#Hand_values"
    >Texas Hold'em poker</a
  >
</p>

<h2>Requirements</h2>
<p>
  The characteristics of the string of cards are:
</p>

<ul>
  <li>A space is used as card seperator</li>
  <li>Each card consists of two characters (not case sensitive)</li>
  <li>
    The first character is the value of the card, valid characters are: `2`,
    `3`, `4`, `5`, `6`, `7`, `8`, `9`, `T`(en), `J`(ack), `Q`(ueen), `K`(ing),
    `A`(ce)
  </li>
  <li>
    The second character represents the suit, valid characters are: `S`(pades),
    `H`(earts), `D`(iamonds), `C`(lubs)
  </li>
  <li>
    The result of your poker hand comparison can be one of these 3 options:
    <ul>
      <li>WIN should return the integer `1`</li>
      <li>
        LOSS should return the integer `2`
      </li>
      <li>TIE should return the integer `3`</li>
    </ul>
  </li>
</ul>

## To run 
Two scripts are available to run from root.

- To run pokerhand.js: `npm run pokerhand`
- To run tests: `npm test`

## Roadmap:
- [x] Resolve two different hands (e.g. flush vs straight)
- [x] Resolve a first stage tie (e.g. a pair of 2s vs a pair of 3s)
- [x] Resolve second stage ties (e.g. "AC AH 4S 4S 6C" vs "AC AH 4S 4S 8C")
- [x] Accept low ace as part of a straight (e.g. "AS 2D 3H 4H 5S") 
- [x] A low ace straight loses to higher value straight

