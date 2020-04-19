<template>
  <v-row justify="center">
    <v-btn primary color="success" @click="validateSudoku(vaildBoard)">Validate</v-btn>
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">{{ isValid }}</v-card-title>
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
      validateSudoku(board){
        //vaildates and marks each of the inner boxes  
          for(let i=0;i<=6;i+=3){
            for(let k=0;k<=6;k+=3){
              this.ValidateBox(i,k);
            }
          }
          //vaildates each row, then displays a message to the user that the board is incorrect
          if(this.validateSudokuRows(board)===false){
            this.isValid="The sudoku board is not correct. Please try again!";
            this.dialog = true;
            return false;
          } 
        this.isValid="The sudoku board is correct!";
        this.dialog = true;
        return true;
      },
      validateSudokuRows(board){
            let currentCell, rows, flag;
            let rowValues= [];
            flag= true;
            //looping though each "row" putting them into an array then checking for duplicates
            for(rows=0;rows<9;rows++){
                for(currentCell=0;currentCell<9;currentCell++){
                    rowValues[currentCell]=board[rows][currentCell].value;
                }
                //checking for wrong values
                for(let i=0;i<9;i++){
                  for(let k=0;k<9;k++){
                    if(rowValues[i]===rowValues[k]){
                      if(i!=k){
                        this.vaildBoard[rows][i].wrongValue=true
                        flag = false;
                      }
                    }
                  }
                }
            }
          return flag;
        },
      ValidateBox(rowNumber,colNumber){
/*
  brians idea,
        -use of a map,
            -set up a map with the key being the value of the box and then the value pair being teh coridetnes
            -then iderate over the list and check for number of value pairs
                -if there is more than 1 there are dops
*/
        let flag= true;
        let testOBJ=[];
        for (let i = 0; i < 9; i++) testOBJ.push({'x':-1,'y':-1,'value':-1});

        let counter=0;
        for(let r =rowNumber; r<rowNumber+3; r++){
          for(let c=colNumber; c<colNumber+3; c++){
            testOBJ[counter].value=this.vaildBoard[r][c].value;
            testOBJ[counter].x=c;
            testOBJ[counter].y=r;
            counter++;
          }
        }
        for(let outer=0;outer<9;outer++){
          for(let inner=outer;inner<9;inner++){
            if(outer!=inner){
              if(testOBJ[outer].value==testOBJ[inner].value){
                this.vaildBoard[testOBJ[outer].y][testOBJ[outer].x].wrongValue=true;
                this.vaildBoard[testOBJ[inner].y][testOBJ[inner].x].wrongValue=true;
                flag= false;
              }
            }
          }
          if(testOBJ[outer].value==""){
            this.vaildBoard[testOBJ[outer].y][testOBJ[outer].x].wrongValue=true;
            flag= false;
          }
        }
        if(flag===true){
          for(let i=0;i<9;i++){
            this.vaildBoard[testOBJ[i].y][testOBJ[i].x].wrongValue=false;
          }
        }
      }
    }
  }
</script>