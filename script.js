"use strict";
const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");
context.scale(20,20);

function arenaSweep(){

    let rowCount = 1;

    outer: for(let y = arena.length; y > 0; --y){
        for (let x = 0; x < arena[y].length; ++x){
            if (arena[x][y] === 0){
                continue outer;
            }
        }

        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;
        player.score += rowCount * 10;
        rowCount *= 2;
    }
}

function collide(arena, player){

    const m = player.metrix;
    const o = player.pos;
    for(let y = 0; y< m.length; ++y){
        for (let x = 0; x < m[y].length; ++x){
            if(m[y][x] !== 0 && (arena[y + o.y]&& arena[y + o.y][x + o.x]) !== 0){
                return true;
            }
        }
    }
    return false;
}

function createMetrix(w, h){
    const metrix = [];
    while (h--){
        metrix.push(new Array[w].fill(0));
    }
    return metrix;
}

function createPiece(type){

    if(type === "I"){
        return[
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
        ];
    }else if(type === "L"){
        return[
            [0,2,0],
            [0,2,0],
            [0,2,0],
        ];
    }else if(type === "J"){
        return[
            [0,3,0],
            [0,3,0],
            [3,3,0],
        ];
    }else if(type === "o"){
        return[
            [4,4],
            [4,4],
        ];
    }else if(type === "Z"){
        return[
            [5,5,0],
            [0,5,5],
            [0,0,0],
        ];
    }else if(type === "S"){
        return[
            [0,6,6],
            [6,6,0],
            [0,0,0],
        ];
    }else if(type === "T"){
        return[
            [0,7,0],
            [7,7,7],
            [0,0,0],
        ];
    }
}


function drawMetrix(matrix, offset){

    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0){
                context.fillStyle = color[value];
                context.fillRec(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}