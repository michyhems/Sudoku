import "./sudoku1.css";
import { useState, useEffect } from "react";
import * as setBoard from "./boardSetUp/setBoard";

const Sudoku = () => {
    //initialise global variables
    const [array, setArray] = useState([]);
    const [focus, setFocus] = useState([]);
    const [completionStatus, setStatus] = useState(false);
    const [answer, setAnswer] = useState(0);

    const leftBorder = {
        borderLeftColor: "white",
    };
    const rightBorder = {
        borderRightColor: "white",
    };
    const topBorder = {
        borderTopColor: "white",
    };
    const bottomBorder = {
        borderBottomColor: "white",
    };

    useEffect(() => {
        //set up array
        setArray(setBoard.setBoard());
    }, []);

    //Highlights the relevant cells when a board tile is clicked.
    useEffect(() => {
        if (focus.length === 0) return;
        clear();
        activate();
    }, [focus]);

    // Checks to see if the cell is an empty space
    // fills the cell with the selected answer
    // checks if the answer is applicapble
    useEffect(() => {
        if (answer === 0) return;
        if (focus.length === 0) return;
        const cell = document.getElementById(focus);
        const classList = cell.className.split(" ");
        if (classList.length === 1) return setFocus([]);
        if (classList[1] !== "empty") return setFocus([]);
        if (checkAnswer(cell)) {
            cell.classList.remove("wrongAnswer");
            cell.classList.add("correctAnswer");
        } else {
            cell.classList.remove("correctAnswer");
            cell.classList.add("wrongAnswer");
        }
        cell.innerHTML = answer;
        if (isComplete()) setStatus(true);
    }, [answer]);

    // adds 'active' to the class list of an element.
    // This means that it will highlight the relavent cells when a particular cell is selected
    const activate = () => {
        for (let i = 0; i < 9; i++) {
            document.getElementById([focus[0], i]).classList.add("active");
            document.getElementById([i, focus[1]]).classList.add("active");
        }
        let origin = [0, 0];
        if (focus[0] >= 6) origin[0] = 6;
        else if (focus[0] >= 3) origin[0] = 3;
        if (focus[1] >= 6) origin[1] = 6;
        else if (focus[1] >= 3) origin[1] = 3;
        for (let i = 0; i < 3; i++) {
            if (
                !document
                    .getElementById([origin[0], origin[1] + i])
                    .classList.contains("active")
            ) {
                document
                    .getElementById([origin[0], origin[1] + i])
                    .classList.add("active");
            }
            if (
                !document
                    .getElementById([origin[0] + 1, origin[1] + i])
                    .classList.contains("active")
            ) {
                document
                    .getElementById([origin[0] + 1, origin[1] + i])
                    .classList.add("active");
            }
            if (
                !document
                    .getElementById([origin[0] + 2, origin[1] + i])
                    .classList.contains("active")
            ) {
                document
                    .getElementById([origin[0] + 2, origin[1] + i])
                    .classList.add("active");
            }
        }
    };

    //removes the active class from all highlighted cells. This means that it resets the colour of the board.
    const clear = () => {
        const activeCells = document.getElementsByClassName("active");
        while (activeCells.length) {
            activeCells[0].classList.remove("active");
        }
    };

    const checkAnswer = (cell) => {
        const index = cell.id;
        //the following checks the rows and columns of the selected cell to see if their are any copies
        for (let i = 0; i < 9; i++) {
            if (document.getElementById([index[0], i]).innerHTML !== "") {
                if (
                    document.getElementById([index[0], i]).innerHTML ===
                    `${answer}`
                ) {
                    return false;
                }
            }
            if (document.getElementById([i, [index[2]]]).innerHTML !== "") {
                if (
                    document.getElementById([i, index[2]]).innerHTML ===
                    `${answer}`
                ) {
                    return false;
                }
            }
        }

        //the following checks the 3x3 segment of the selected cell to see if there are any copies.
        let origin = [0, 0];
        if (index[0] >= 6) origin[0] = 6;
        else if (index[0] >= 3) origin[0] = 3;
        if (index[2] >= 6) origin[1] = 6;
        else if (index[2] >= 3) origin[1] = 3;
        for (let i = 0; i < 3; i++) {
            if (
                document.getElementById([origin[0], origin[1] + i])
                    .innerHTML !== ""
            ) {
                if (
                    document.getElementById([origin[0], origin[1] + i])
                        .innerHTML === `${answer}`
                ) {
                    return false;
                }
            }
            if (
                document.getElementById([origin[0] + 1, origin[1] + i])
                    .innerHTML !== ""
            ) {
                if (
                    document.getElementById([origin[0] + 1, origin[1] + i])
                        .innerHTML === `${answer}`
                ) {
                    return false;
                }
            }
            if (
                document.getElementById([origin[0] + 2, origin[1] + i])
                    .innerHTML !== ""
            ) {
                if (
                    document.getElementById([origin[0] + 2, origin[1] + i])
                        .innerHTML === `${answer}`
                ) {
                    return false;
                }
            }
        }
        return true;
    };

    const isComplete = () => {
        const emptyCells = document.getElementsByClassName("empty");
        for (let i = 0; i < emptyCells.length; i++) {
            if (emptyCells[i].innerHTML === "") return false;
            if (emptyCells[i].style.color === "red") return false;
        }
        return true;
    };

    //constructing keypad
    const keypad = () => {
        //values for keypad
        const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        return (
            <>
                <div class="keypad">
                    {keys.map((val) => (
                        <div class="key" onClick={() => setAnswer(val)}>
                            {val}
                        </div>
                    ))}
                </div>
            </>
        );
    };

    //constructing board
    const board = () => {
        return (
            <>
                {array.map((row, rowIndex) => (
                    <div class="row">
                        {row.map((val, colIndex) => (
                            <div
                                class={val === 0 ? "cell empty" : "cell"}
                                id={[rowIndex, colIndex]}
                                onClick={() => setFocus([rowIndex, colIndex])}
                                style={{
                                    ...(rowIndex === 2 ||
                                    rowIndex === 5 ||
                                    rowIndex === 8
                                        ? bottomBorder
                                        : null),
                                    ...(rowIndex === 0 ||
                                    rowIndex === 3 ||
                                    rowIndex === 6
                                        ? topBorder
                                        : null),
                                    ...(colIndex === 2 ||
                                    colIndex === 5 ||
                                    colIndex === 8
                                        ? rightBorder
                                        : null),
                                    ...(colIndex === 0 ||
                                    colIndex === 3 ||
                                    colIndex === 6
                                        ? leftBorder
                                        : null),
                                }}
                            >
                                {val === 0 ? "" : val}
                            </div>
                        ))}
                    </div>
                ))}
            </>
        );
    };
    const successBanner = () => {
        return (
            <>
                <h1>Well Done!</h1>
                <a onClick={() => window.location.reload()}>
                    Click here to try again
                </a>
            </>
        );
    };

    const backgroundScene = () => {
        const starNums = [...Array(40).keys()];
        return (
            <>
                <div class="sky">
                    {starNums.map((star) => (
                        <div
                            class="star"
                            style={{
                                top: `${
                                    Math.floor(Math.random() * (49 - 1 + 1)) + 1
                                }vh`,
                                left: `${
                                    Math.floor(Math.random() * (100 - 1 + 1)) +
                                    1
                                }vw`,
                                transform: `scale(${
                                    (Math.floor(Math.random() * (10 - 1 + 1)) +
                                        1) *
                                    0.1
                                })`,
                            }}
                        ></div>
                    ))}
                    <div class="sun"></div>
                </div>
                <div class="ocean"></div>
            </>
        );
    };

    const changeMode = () => {
        const body = document.getElementsByClassName("body");
        const star = document.getElementsByClassName("star");
        const sun = document.getElementsByClassName("sun");
        const sky = document.getElementsByClassName("sky");
        if (!sun[0].classList.contains("set")) {
            Array.from(star).forEach((element) => {
                element.classList.add("night");
            });
            body[0].classList.add("darkmode");
            sun[0].classList.remove("rise");
            sun[0].classList.add("set");
            sky[0].classList.remove("lightsky");
            sky[0].classList.add("darksky");
        } else {
            Array.from(star).forEach((element) => {
                element.classList.remove("night");
            });
            body[0].classList.remove("darkmode");
            sun[0].classList.remove("set");
            sun[0].classList.add("rise");
            sky[0].classList.remove("darksky");
            sky[0].classList.add("lightsky");
        }
    };
    return (
        <div class="body">
            <div class="scene">{backgroundScene()}</div>
            <div class="bodyContent">
                <h1>Sudoku</h1>
                <div class="content">
                    <div class="boardContainer">{board()}</div>
                    <div class="consoleContainer">
                        <div onClick={() => changeMode()} class="button">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="black"
                            >
                                <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="black"
                            >
                                <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z" />
                            </svg>
                        </div>
                        <div>{keypad()}</div>
                    </div>
                </div>
                <div class={completionStatus ? "success" : "inprogress"}>
                    {successBanner()}
                </div>
            </div>
        </div>
    );
};
export default Sudoku;
