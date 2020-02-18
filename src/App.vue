<template>
  <v-app>

      <div>
       <v-app-bar dense>

         <v-toolbar-title>Sudoku</v-toolbar-title>
       </v-app-bar>
      </div>

       
      <v-container >
        <v-row justify="center">
          <v-card-title>
            <h1 class="display-1" >Let's play some sudoku!</h1>
          </v-card-title>
        </v-row>
        
      <!--<v-btn color="success" > Register </v-btn>
        //<v-btn color="info"> Login </v-btn>  
        <v-row justify="center">
        <v-btn primary color="success" class="mb-2">Start</v-btn>
        </v-row>    
      -->
      <v-row justify="center">
      <!--    <board class="mt-1"/>   -->
        <router-view></router-view>
      </v-row>
      </v-container>
   
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
//import board from './components/Board';
//import popUp from './components/popUp';

export default {
  name: 'App',

  components: {
   // HelloWorld,
   // board
  },
  data: () => ({
    //
  })
};
</script>
