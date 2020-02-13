<template>
  <v-app>
    <v-card width="1000" class="mx-auto mt-5">
      <v-container >
        <v-row justify="center">
          <v-card-title>
            <h1 class="display-1" >Lets play some sudoku</h1>
          </v-card-title>
        </v-row>
        <router-view></router-view>
      <!--<v-btn color="success" > Register </v-btn>
        //<v-btn color="info"> Login </v-btn>  
        <v-row justify="center">
        <v-btn primary color="success" class="mb-2">Start</v-btn>
        </v-row>    
      -->
        <v-row justify="center">
          <board class="mt-1"/>
        </v-row>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import board from './components/Board';
//import popUp from './components/popUp';

export default {
  name: 'App',

  components: {
   // HelloWorld,
   board
  },
  data: () => ({
    //
  })
};
</script>
