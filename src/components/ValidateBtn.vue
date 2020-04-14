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
//import cake from 'vue';
//cake.forceUpdate();
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
        //This method calls helper fuctions inorder to vaildate the board board    
        //for(let box=0;box<9;box++){
                  /*
          if(!this.validateSudokuBox(board,0)){//0 should be box
            this.isValid="The sudoku board is not correct. Please try again!";
            this.dialog = true;
            return false;
          }
                */
        //} 
        let c = board;
        console.log(c);
          this.testValidate();
    //      if(this.validateSudokuRows(board)===false){
    //        this.isValid="The sudoku board is not correct. Please try again!";
    //        this.dialog = true;
    //        return false;
    //      }
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
      testValidate(){
/*
  brians idea,
        -use of a map,
            -set up a map with the key being the value of the box and then the value pair being teh coridetnes
            -then iderate over the list and check for number of value pairs
                -if there is more than 1 there are dops
*/
        let cell1= {'x':-1,'y':-1,'value':-1};
        let cell2= {'x':-1,'y':-1,'value':-1};
        let cell3= {'x':-1,'y':-1,'value':-1};
        let cell4= {'x':-1,'y':-1,'value':-1};
        let cell5= {'x':-1,'y':-1,'value':-1};
        let cell6= {'x':-1,'y':-1,'value':-1};
        let cell7= {'x':-1,'y':-1,'value':-1};
        let cell8= {'x':-1,'y':-1,'value':-1};
        let cell9= {'x':-1,'y':-1,'value':-1};
        let testOBJ=[cell1,cell2,cell3,cell4,cell5,cell6,cell7,cell8,cell9];
        let counter=0;
        for(let r =0; r<3; r++){
          for(let c=0; c<3; c++){
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
              }
            }
          }
          if(testOBJ[outer].value==""){
            this.vaildBoard[testOBJ[outer].y][testOBJ[outer].x].wrongValue=true;
          }
        }
      }
    }
  }
</script>