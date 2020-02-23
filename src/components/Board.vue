<template>
    <div>
        <v-row>
        <div class="grid">
            <v-layout row justify-end> 
                <v-flex md6>
                    <div class="row" :class="{'bottomBorder':rowIndex===2 || rowIndex===5}" 
                    v-for="(row, rowIndex) in puzzle" :key="rowIndex">
                        <v-text-field v-model.number="cell.value" class="cell ma-0 pa-0 " hide-details :class="{'rightBorder':colIndex===2 || colIndex===5, 'orginal': cell.orginal===true}" 
                        v-for="(cell, colIndex) in row" :key="colIndex" maxlength="1" :disabled="cell.orginal === true"  autocomplete="new-password" @keypress="formatInput($event)"> 
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
    <vaildate class="mt-4" :vaildBoard="puzzle"/>
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
            emptytBoard: ".................................................................................",
            isVaild: "",
            resetPoint: "",
            boardString: "",
            disabled: false
        }
    },
    components: {
        vaildate
    },
    mounted (){
        this.generatePuzzle()
    },
    methods: { 
        generatePuzzle (){
            //takeing difficulty from the URL on first load
            let userInput= this.$route.params.difficulty;
            if(userInput!="easy" && userInput!="medium" && userInput!="hard" && userInput!="insane"){
                userInput= "";
            }
            this.newboard(userInput);
        },
        newboard(difficutly){
            //input is taken from URL
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
                    //checking for empty cell
                    if(this.puzzle[row][col].value==='.')
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
                    if(this.puzzle[row][col].value==='.')
                    this.puzzle[row][col].value='';
                }
            }
        },
        formatInput(evt){
            //masking the input to only allow 0-9
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
                if (charCode < 49 || charCode > 57) {
                    evt.preventDefault();
                } else {
                    return true;
                }
        }
    }
}

</script>
<style scoped>
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
    text-align: center;
    font-weight: bold;
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
.v-btn:not(.v-btn--round).v-size--default {
    height: 36px;
    min-width: 100px;
    padding: 0 16px;
}
</style>