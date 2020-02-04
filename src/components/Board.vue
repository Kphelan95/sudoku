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
export default {
    name:'Sudoku',
    data (){
        return {
            puzzle:[],
            isVaild: ""
        }
        /* notes
            next, change vaildate logic to use sets,( with this check to make sure the length is 9 so no dops)
            next, put this on git
            next, look up API's to randomis the borde
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
        generatePuzzle (){//this method is pointless, but teaches me how to run methods, i could just put the array in data return
            //this.puzzle=[{0:[1,2,3,5], 1:[6,7,8,9]}]
            //this.puzzle=[1, [1, 2],2,3,5]
            this.puzzle=[[5,'',4,6,7,8,9,1,2],// the '' should be not vaild
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
                })
            //console.log(this.puzzle2[0].rowOne)
            //console.log(this.puzzle)
        },
        test(x, y,test){
            console.log("Hello world!");
            console.log("x=" + (x+1));
            console.log("y=" + (y+1));
            console.log(test[x][y].value);
        },
   /*     validateSudoku(borde){
            //console.log(borde[5][5].value);

            for(let box=0;box<9;box++){
                if(this.validateSudokuBox(borde,box)===false){//;
                    console.log("sudoku is not vaild")
                     this.isVaild="sudoku is not vaild";
                    //console.log(isVaild);
                    return false;
                }
            }
            if(this.validateSudokuRows(borde)===false){// look to change this to !
                console.log("sudoku is not vaild")
                this.isVaild="sudoku is not vaild";
                return false;
                }
            console.log("sudoku is vaild")
            this.isVaild="sudoku is vaild";
            return false;
        },
        validateSudokuBox(borde,boxNum){
            var rowTest,colTest,outerBound,lowerBound;
            let values = [];
            let count =0;
           if(boxNum==0){//this is the top left box
                rowTest=0;
                colTest=0;
                //setting the value of the upper bound for the outer for loop
                //setting bound for nest loop
            } else if(boxNum==1){//top middle box
                rowTest=0;
                colTest=3;
            }
             else if(boxNum==2){//top right box
                rowTest=0;
                colTest=6;
            }
            else if(boxNum==3){//middle left box
                rowTest=3;
                colTest=0;
            }
            else if(boxNum==4){//middle middle box
                rowTest=3;
                colTest=3;
            }
            else if(boxNum==5){//middle right box
                rowTest=3;
                colTest=6;
            }
             else if(boxNum==6){//bottem left box
                rowTest=6;
                colTest=0;
            }
             else if(boxNum==7){//bottem middle box
                rowTest=6;
                colTest=3;
            }
             else if(boxNum==8){//bottem right box
                rowTest=6;
                colTest=6;
            }
            outerBound=rowTest+3;
            lowerBound=colTest+3;
            let valueHolder = colTest;//This vlaue is used to reset the inner for loop
            for(;rowTest<outerBound;rowTest++){//put all 9 values into an array
                for(colTest=valueHolder;colTest<lowerBound;colTest++){
                   values[count]=borde[rowTest][colTest].value;
                   if(values[count]==''){//cell is empty
                    return false;
                   }
                   count++;
                }
            }
            count=0;
            values.sort();
            var test;
            //for(test=0;test<9;test++){// checking array for doplicuts
            //    console.log(values[test]); 
            //}
            for(test=0;test<8;test++){// checking array for doplicuts
                if(values[test]==values[test+1]){
                    return false;
                }
            }
        },
        validateSudokuRows(borde){
            //console.log(borde[0][0].value);
            let currentCell,counter, rows;
            let rowValues= [];
            for(rows=0;rows<9;rows++){
                for(currentCell=0;currentCell<9;currentCell++){
                    if(borde[rows][currentCell].value==null){
                        return false;
                    }
                    rowValues[currentCell]=borde[rows][currentCell].value;
                }
                rowValues.sort();
                for(counter=0;counter<8;counter++){// array stops at 8 because it will array index out of bounce with the +1 in the logic
                    if(rowValues[counter]==rowValues[counter+1]){
                        return false;
                    }
                }
            }
        }//,   */
        //new method
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