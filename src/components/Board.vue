<template>
    <div>
        <v-row>
        <div class="grid">
            <v-row class="pb-5">
                <v-btn  color="primary" @click="newboard('easy')">easy</v-btn>
                <v-btn color="primary" @click="newboard('medium')">medium</v-btn>
                <v-btn color="primary" @click="newboard('hard')">hard</v-btn>
                <v-btn color="primary" @click="newboard('insane')">insane</v-btn>
                <v-btn color="error" @click="ResetPuzzle()">reset</v-btn>
            </v-row>
            
            <div class="row" :class="{'bottomBorder':rowIndex===2 || rowIndex===5}" 
             v-for="(row, rowIndex) in puzzle" :key="rowIndex">
                <v-text-field v-model.number="cell.value" class="cell ma-0 pa-0 " hide-details :class="{'rightBorder':colIndex===2 || colIndex===5, 'orginal': cell.orginal==true}" 
                 v-for="(cell, colIndex) in row" :key="colIndex"  @click="test(rowIndex,colIndex,puzzle)"> 
                 <!-- i need to look up v-text-field to see how i can make some changes//// look into binding the char limit, look to chagne style, look at CSS -->
                 <!-- change v-text-field to div to see OG            class="centered-input text--darken-3 mt-3"              -->
                </v-text-field>
            </div>
        </div>
        </v-row>
    <v-row>
    <!-- <v-btn primary color="success" class="btn" @click="validateSudoku(puzzle,isVaild)"> validate</v-btn> -->
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
            //puzzleReset:[],
            isVaild: "",
            resetPoint: ""
        }
        /* notes
            next, change vaildate logic to use sets,( with this check to make sure the length is 9 so no dops)
            next, add 3 buttons to change the difficutly
            next, add a reset button
            next, bind each cell to only hold 1 char
            next,
            next, fix all veriable names and comments, dont add // to the end of the line, also explain why you are doing things and not how

            brian
                -make a homepage to select difficutly, then route to the main page
                -move difficutly over to the left
                -will need vux X to bring difficutly over to the main page
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
            this.resetPoint=boardString;
        },
        test(x, y,test){
            console.log("Hello world!");
            console.log("x=" + (x+1));
            console.log("y=" + (y+1));
            console.log(test[x][y].value);
        },
        newboard(difficutly){
            const boardString = sudoku.generate(difficutly);
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
        },
        ResetPuzzle(){
            this.puzzle = sudoku.board_string_to_grid(this.resetPoint)
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
.btn{
    padding-top: 50px;
    padding-right: 30px;
    padding-bottom: 50px;
    padding-left: 80px;
}


</style>