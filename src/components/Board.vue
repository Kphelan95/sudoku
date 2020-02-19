<template>
    <div>
        <v-row>
        <div class="grid">
            <v-layout row justify-end> 
                <v-flex md6>
                    <div class="row" :class="{'bottomBorder':rowIndex===2 || rowIndex===5}" 
                    v-for="(row, rowIndex) in puzzle" :key="rowIndex">
                        <v-text-field v-model.number="cell.value" class="cell ma-0 pa-0 " hide-details :class="{'rightBorder':colIndex===2 || colIndex===5, 'orginal': cell.orginal===true}" 
                        v-for="(cell, colIndex) in row" :key="colIndex" maxlength="1"  browser-autocomplete="new-password"   @click="test(rowIndex,colIndex,puzzle)"> 
                        </v-text-field>
                    </div>
                </v-flex>
                <v-flex md3> 
                    <v-container fill-height fluid >
                        <v-row justify="end"> 
                            <v-btn class="mb-1" color="primary" @click="newboard('easy')">easy</v-btn>
                            <v-btn class="mb-1" color="primary" @click="newboard('medium')">medium </v-btn>
                            <v-btn class="mb-1" color="primary" @click="newboard('hard')">hard</v-btn>
                            <v-btn class="mb-1" color="primary" @click="newboard('insane')">insane</v-btn>
                            <v-btn color="error" @click="ResetPuzzle()">reset</v-btn>
                        </v-row>
                    </v-container>   
                </v-flex> 
            </v-layout>
        </div>
        </v-row>
    <v-row>
    <!-- <v-btn primary color="success" class="btn" @click="validateSudoku(puzzle,isVaild)"> validate</v-btn> -->
    </v-row>
    <vaildate class="mt-4" :vaildBoard="puzzle"/>
    <router-link to='/'>return</router-link>
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
            emptytBoard: ".................................................................................",
            isVaild: "",
            resetPoint: "",
            boardString: ""
        }
        /* notes
            next, change vaildate logic to use sets,( with this check to make sure the length is 9 so no dops)
            next, make welcomepage look nice
            next, fix all veriable names and comments, dont add // to the end of the line, also explain why you are doing things and not how

            brian
                -make a homepage to select difficutly, then route to the main page
                -move difficutly over to the left
                -will need vux X to bring difficutly over to the main page
            DONE

            current changes from github, i made welcome Page look a bit nicer, and i made only one route load 
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
            let userInput= this.$route.params.difficulty;
            if(userInput!="easy" && userInput!="medium" && userInput!="hard" && userInput!="insane"){
                userInput= "";
            }
            this.newboard(userInput);
        },
        test(x, y,test){
            console.log("Hello world!");
            console.log("x=" + (x+1));
            console.log("y=" + (y+1));
            console.log(test[x][y].value);
        },
        newboard(difficutly){
            if(difficutly===""){
                this.boardString=this.emptytBoard;
            }
            else{
                this.boardString = sudoku.generate(difficutly);
            }
            this.puzzle = sudoku.board_string_to_grid(this.boardString)
            .map(row=>{
                    return row.map(cell =>{
                        return{
                            value: cell,
                            orginal: cell !='.'
                        }
                    })
                })
            for(let row=0;row<9;row++){
                for(let col=0;col<9;col++){
                    if(this.puzzle[row][col].value==='.')//cell is empty
                    this.puzzle[row][col].value='';
                }
            }
            this.resetPoint=this.boardString;
        },
        ResetPuzzle(){
            this.puzzle = sudoku.board_string_to_grid(this.resetPoint)
            .map(row=>{
                    return row.map(cell =>{
                        return{
                            value: cell,
                            orginal: cell !='.'
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
    background:#d3d3d3;
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
.v-btn:not(.v-btn--round).v-size--default {
    height: 36px;
    min-width: 100px;
    padding: 0 16px;
}



</style>