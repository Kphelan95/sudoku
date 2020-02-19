<template>
  <v-row justify="center">

    <!-- <v-btn color="primary" dark @click="doSomething">Open Dialog</v-btn> -->
    <v-btn primary color="success" @click="validateSudoku(vaildBoard)">Validate</v-btn>
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">{{ isValid }}</v-card-title>
        <!--<v-card-text>{{ isValid }}</v-card-text> -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
  export default {
    props:{
      vaildBoard:{
        type: Array,
        required: true
      }
    },
    data () {
      return {
        dialog: false,
        isValid: ""
      }
    },
    methods: {
      doSomething() {
        this.dialog = true
      },
      validateSudoku(board){
        //This method calls helper fuctions inorder to vaildate the board board
        for(let box=0;box<9;box++){
          if(this.validateSudokuBox(board,box)===false){
            this.isValid="The sudoku board is not correct. Please try again!";
            this.dialog = true;
            return false;
          }
        }
          if(this.validateSudokuRows(board)===false){
            this.isVaild="The sudoku board is not correct. Please try again!";
            this.dialog = true;
            return false;
          }
        this.isValid="The sudoku board is correct!";
        this.dialog = true;
        return true;
      },
      validateSudokuBox(board,boxNum){
        var rowTest,colTest,rightBound,lowerBound;
        let values = [];
        let count =0;
        if(boxNum==0){//top left box
          rowTest=0;
          colTest=0;
        }else if(boxNum==1){//top middle box
          rowTest=0;
          colTest=3;
        }else if(boxNum==2){//top right box
          rowTest=0;
          colTest=6;
        }else if(boxNum==3){//middle left box
          rowTest=3;
          colTest=0;
        }else if(boxNum==4){//middle middle box
          rowTest=3;
          colTest=3;
        }else if(boxNum==5){//middle right box
          rowTest=3;
          colTest=6;
        }else if(boxNum==6){//bottem left box
          rowTest=6;
          colTest=0;
        }else if(boxNum==7){//bottem middle box
          rowTest=6;
          colTest=3;
          }
        else if(boxNum==8){//bottem right box
          rowTest=6;
          colTest=6;
          }
        rightBound=rowTest+3;//
        lowerBound=colTest+3;
        let valueHolder = colTest;//This vlaue is used to reset the inner for loop
        //looping though each "box" putting them into an array then checking for duplicates
        for(;rowTest<rightBound;rowTest++){
            for(colTest=valueHolder;colTest<lowerBound;colTest++){
                values[count]=board[rowTest][colTest].value;
                if(values[count]==''){//cell is empty
                  return false;
                }
                //TODO add check for letters here check for not 1-9
            count++;
            }
        }
        count=0;
        values.sort();
        var test;
        for(test=0;test<8;test++){// checking array for doplicuts
          if(values[test]==values[test+1]){
             return false;
          }
        }
      },
      validateSudokuRows(board){
            let currentCell,counter, rows;
            let rowValues= [];
            //looping though each "row" putting them into an array then checking for duplicates
            for(rows=0;rows<9;rows++){
                for(currentCell=0;currentCell<9;currentCell++){
                    if(board[rows][currentCell].value==null){
                        return false;
                    }
                    rowValues[currentCell]=board[rows][currentCell].value;
                }
                rowValues.sort();
                for(counter=0;counter<8;counter++){// array stops at 8 because it will array index out of bounce with the +1 in the logic
                    if(rowValues[counter]==rowValues[counter+1]){
                        return false;
                    }
                }
            }
        }
    }
  }
</script>