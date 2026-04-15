# Sudoku

Sudoku is a puzzle game where a player must fill the gaps of a 9x9 grid of numbers. A number cannot be repeated in its row, column or the 3x3 subgrid it is in. 
<br>
This was a fun project where I created a web application featuring this game that I had taken an interest in. I also saw this as an opportunity to try out an interesting and novel concept of an interactive background. 
<br>
[Live demo](https://michyhems.github.io/Sudoku/) | [GitHub repository] (https://github.com/michyhems/Sudoku)
## Requirements
* A randomised, partially filled game must be generated at each refresh.
* Each new game must be solvable
* The game must denote when a number is entered into the grid that breaks the rules
* The game must end when the board is legally filled. 
## Implementation
### Features
*A randomised, partially filled board is generated upon load
* When a cell is selected all the other relevant cells are highlighted
* Interactive background (switching between dark/light mode)
* Responsive UI, functional on all screen types
### Technologies Used
React was used as the main framework for the web app to seamlessly integrate both JavaScript and the UI. The following languages and technologies were used. 
* HTML
* CSS (styling and animations)
* JavaScript
* React hooks
* DOM manipulation 
* Github (version control and deployment)
* Visual Studio Code (development)

### How it Works
For the board game:
1. A randomised, completely filled board is generated
2. The three by three segments that are upon the leading diagonal of the board are filled such that they follow the rules of the game.
3. Then the rest of the segments are filled using a depth first search model. A list of possible numbers is generated for each cell and if a number breaks the rule, the algorithm backtracks and chooses the next appropriate number. 
4. Random cells are selected and their values are replaced with zero. 
5. The board is rendered on the web page, the cells with the value of zero appearing as empty
5. A keypad is displayed and only when an empty cell is selected can the keys be pressed. 
6. The relevant cells of a selected cell (on the same row, column and three by three segment) are highlighted upon selection. 
7. If a number is selected that breaks the rules of the game, it appears as red. 
8. All user filled numbers can be edited.
9. Once all the cells are filled, a congratulations banner appears with the option of trying again. 
For the background:
1. The background image consists of three components: the sea, the sky and the sun. 
2. The colours of each are selected using a colour gradient. 
O3. nce the dark mode button is selected, CSS animation moves the sun down so that it is obscured by the sea and the colour gradient of the sky is animated so that it appears as a setting sun. 
### Future Improvements
They say that no work of art is ever complete and I plan to add the following improvements to my project:
* More efficient animations that play better on phone screens. 
* Improve colour gradient transition for the background. 

## Running a project locally
1. Run the following code in your terminal:
```bash
git clone https://github.com/michyhems/Sudoku.git
```
2. Navigate to Sudoku and install the necessary React dependencies by running:
```bash
npm install
```
3. Run the project by running:
```bash
npm start
```
