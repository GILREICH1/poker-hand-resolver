# poker-hand-resolver
A script, with tests, designed to calculate the result of comparing two poker hands.

See index.html for input and output format.

## To run 
Two scripts are available to run from root.

- To run pokerhand.js: `npm run pokerhand`
- To run tests: `npm test`

## Roadmap:
- [x] Resolve two different hands (e.g. flush vs straight)
- [x] Resolve a first stage tie (e.g. a pair of 2s vs a pair of 3s)
- [x] Resolve second stage ties (e.g. "AC AH 4S 4S 6C" vs "AC AH 4S 4S 8C")
- [ ] Accept low ace as part of a straight (e.g. "AS 2D 3H 4H 5S") 

