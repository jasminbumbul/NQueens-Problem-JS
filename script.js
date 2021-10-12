var sizeInput = document.getElementById("sizeInput");
var size = 0;
var chessboardExists = false;
let chessTable;

function chessBoard(size) {
    let html = `<div id="chessboard">\n`;
    for (let row = 0; row < size; row++) {
        html += `  <div>\n`;
        let color = (row % 2 == 0) ? "black" : "white";
        for (let col = 0; col < size; col++) {
            html += `    <span class="${color}" id="${"r" + row + "c" + col}"></span>\n`;
            color = (color == "white") ? "black" : "white";
        }
        html += `  </div>\n`;
    }
    return html + `</div>`;
}

function resetBoard() {
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            var name = "r" + row + "c" + col;
            document.getElementById(name).innerHTML = "";
        }
    }
}

function generateBoard() {
    if (sizeInput.value <= 0) {
        alert("Size cannot be null!");
        return false;
    }
    size = sizeInput.value;
    document.getElementById("sizeLabel").innerHTML = "Size is " + size + "x" + size;
    chessTable = new Array(size);
    for (var i = 0; i < size; i++) {
        chessTable[i] = new Array(size);
    }

    if (chessboardExists == false) {
        if (size <= 0) {
            alert("Size cannot be null!");
            return false;
        }
    }
    if (chessboardExists) {
        document.getElementById("chessboard").remove();
    }

    document.getElementById("main").innerHTML += chessBoard(size);
    chessboardExists = true;
    generateTable();
    addQueens(0);

    function generateTable() {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                chessTable[i][j] = 'X';
            }
        }
    }

    function addQueens(row) {
        if (row == size)
            return true;

        for (let j = 0; j < size; j++) {
            if (queenIsSafe(row, j)) {
                chessTable[row][j] = 'Q';
                var name = "r" + row + "c" + j;

                document.getElementById(name).innerHTML = "<i class='fas fa-chess-queen'></i>";

                if (addQueens(row + 1)) {
                    return true;
                }
                chessTable[row][j] = 'X';

                document.getElementById(name).innerHTML = "";
            }
        }
        return false;
    }

    function queenIsSafe(tableRow, tableColumn) {
        let i, j;
        for (i = 0; i < size; i++)
            if (chessTable[i][tableColumn] == 'Q')
                return false;

        for (i = tableRow, j = tableColumn; i >= 0 && j >= 0; i--, j--)
            if (chessTable[i][j] == 'Q')
                return false;

        for (i = tableRow, j = tableColumn; i >= 0 && j < size; i--, j++)
            if (chessTable[i][j] == 'Q')
                return false;

        return true;
    }
}