<template>
<div>
    <h1>Validate your own board</h1>
    <v-row justify="center">
        <v-btn color="primary" to="/game/blank" >Empty</v-btn>
    </v-row>
    <h1>Please pick a difficutly:</h1>
    <v-btn color="primary" to="/game/easy" >easy</v-btn>
    <v-btn color="primary" to="/game/medium">medium</v-btn>
    <v-btn color="primary" to="/game/hard">hard</v-btn>
    <v-btn color="primary" to="/game/insane">insane</v-btn>
</div>
</template>