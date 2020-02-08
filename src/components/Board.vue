<template>
    <div>
        <div class="grid">
            <div class="row" :class="{'bottomBorder':rowIndex===2 || rowIndex===5}" 
             v-for="(row, rowIndex) in puzzle" :key="rowIndex">
                <v-text-field v-model.number="cell.value" class="cell ma-0 pa-0 " hide-details :class="{'rightBorder':colIndex===2 || colIndex===5, 'orginal': cell.orginal==true}" 
                 v-for="(cell, colIndex) in row" :key="colIndex"  @click="test(rowIndex,colIndex,puzzle)"> 
                 <!-- i need to look up v-text-field to see how i can make some changes//// look into binding the char limit, look to chagne style, look at CSS -->
                 <!-- change v-text-field to div to see OG            class="centered-input text--darken-3 mt-3"              -->
                </v-text-field>
            </div>
        </div>
    <v-row>
    <!-- <v-btn primary color="success" class="btn" @click="validateSudoku(puzzle,isVaild)"> validate</v-btn> -->
    </v-row>
    <v-row>
     {{isVaild}}
    </v-row>
    <vaildate :vaildBoard="puzzle"/>
    </div>
</template>

<script>
import vaildate from './ValidateBtn';
import { sudoku } from 'sudoku.js/sudoku.js'
export default {
    name:'Sudoku',
    data (){
        return {
            puzzle:[],
            puzzle2:[],
            isVaild: ""
        }
        /* notes
            next, change vaildate logic to use sets,( with this check to make sure the length is 9 so no dops)
            next, add 3 buttons to change the difficutly
            next, add a reset button
            next, bind each cell to only hold 1 char
            next,
            next, fix all veriable names and comments, dont add // to the end of the line, also explain why you are doing things and not how
            DONE
        */
    },
    components: {
        vaildate
    },
    mounted (){
        this.generatePuzzle()
    },
    methods: { 
        generatePuzzle (){
            const boardString = sudoku.generate('easy');
            this.puzzle = sudoku.board_string_to_grid(boardString)
            .map(row=>{
                    return row.map(cell =>{
                        return{
                            value: cell,
                            orginal: cell !==null
                        }
                    })
                })
            for(let row=0;row<9;row++){
                for(let col=0;col<9;col++){
                    if(this.puzzle[row][col].value==='.')//cell is empty
                    this.puzzle[row][col].value='';
                }
            }
            //console.log(boardString);
            //console.log(this.puzzle2);
        /*    this.puzzle2=[[5,'',4,6,7,8,9,1,2],// the '' should be not vaild
                        [6,7,2,1,9,5,3,4,8],
                        [1,9,8,3,4,2,5,6,7],
                        [8,5,9,7,6,1,4,2,3],
                        [4,2,6,8,5,3,7,9,1],
                        [7,1,3,9,2,4,8,5,6],
                        [9,6,1,5,3,7,2,8,4],
                        [2,8,7,4,1,9,6,3,5],
                        [3,4,5,2,8,6,1,7,9]]
                .map(row=>{
                    return row.map(cell =>{
                        return{
                            value: cell,
                            orginal: cell !==null
                        }
                    })
                }) */
        },
        test(x, y,test){
            console.log("Hello world!");
            console.log("x=" + (x+1));
            console.log("y=" + (y+1));
            console.log(test[x][y].value);
            }
    }
}

</script>
<style scoped>
.sudoku{
    width:360px;
}

.row{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.cell  >>> input {
    width: 40px;
    height: 40px;
    border: 2px solid #000;
    font-size: 20px;
    cursor: default;
    text-align: center
}

.rightBorder{
    border-right: 4px solid #000;
}
.bottomBorder{
    border-bottom: 4px solid #000 ;
}
.orginal{
    font-weight: bold;
}

.v-input__control, .v-input__slot, .v-select__slot {
	border: 0;
}


</style>