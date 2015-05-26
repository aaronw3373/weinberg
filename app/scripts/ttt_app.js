$(document).ready(function(){
//show chat
  $('#ttt_header').on('click',function(){
    $('#ttt_page').show()
    $('#login').show()
    $('#playbox').hide()
    $('#foot').hide()
  });


  //start local v computer
  $('#compute').on('click', function(event){
    $('#login').toggle(500, 'swing');
    $('#playbox').toggle(500,'swing');
    $('#foot').show(500, 'swing');

    var board = ["","","","","","","","",""];
    var playSingle = [];
    var playPairs = [];
    var compSingle = [];
    var compPairs = [];
    var victor;
    var person = "X";
    var play = "X";
    var computer = "O";
    var comp = "O"
    var count = 0;
    var xscore = 0;
    var oscore = 0;

    resetall();

    //magic square win function
    function winner(test,who,turn){
      var single;
      var pair;
      if (who===play){
        single = playSingle;
        pair = playPairs;
      }else if (who===comp){
        single = compSingle;
        pair = compPairs;
      }else{
        console.log("bad who input");
      }

      var tester = function(){
        for (var i = 0; i < pair.length; i++) {
          if (Number(pair[i]) + Number(test) === 15){
            return true;
          }
        }
      }

      if (turn === person){
        if(tester()){
          return true;
        }else{
          for (var i = 0; i < single.length ;i++) {
            pair.push(Number(single[i])+Number(test));
          }
          single.push(Number(test));
        }
      }

      else if(turn === computer){
        console.log(single);
        console.log(pair);
        if (tester()){
          console.log("comp testing true");
          return true;
        }else {
          return false;
        }
      }else{
        console.log("bad turn input");
      }

    }

    //tie functin
    function tie(){
      if (count === 8){
        victor = "tie";
        return true;
      }
      count++;
    }

    //computer play functions
    function canWin(){
      console.log('canWin? ');
      for (var i = 1; i < 10; i++) {
        if (board[i-1]===""){
          if (winner((i),comp,computer)){
            console.log("compWin " + (i));
            board[i-1]="O"
            var local = '#' + (i);
            $(local).html(computer);
            return true;
          }
        }
      }
    }
    function canBlock(){
      console.log('canBlock ');
      for (var i = 1; i < 10; i++) {
        if (board[i-1]===""){
          if (winner(i,play,computer)){
            board[i-1]="O"
            var local = '#' + i;
            $(local).html(computer);
            for (var j = 0; j < compSingle.length ;j++) {
              compPairs.push(Number(compSingle[j]) + i);
            }
            compSingle.push(i);
            return true;
          }
        }
      }
    }

    function canMiddle(){
      console.log('canMiddle ');
      if(board[4]===""){
        board[4]="O"
        var local = '#5';
        $(local).html(computer);
        for (var i = 0; i < compSingle.length ;i++) {
          compPairs.push(Number(compSingle[i])+5);
        }
        compSingle.push(5);
        return true;
      }
    }

    function randomIntFromInterval(min,max){
      return Math.floor(Math.random()*(max));
    }

    function canSmart(){
      console.log("canSmart")
      var length = playSingle.length;
      if (playSingle[length-1]+playSingle[length-2]===10){
        for (key in board){
          if ((key%2 === 0) && (board[key]==="")){
            board[key] = "O";
            var local = '#' + (Number(key)+1);
            $(local).html(computer);
            for (var i = 0; i < compSingle.length ;i++) {
              compPairs.push(Number(compSingle[i])+(Number(key)+1));
            }
            compSingle.push(Number(key)+1);
            return true;
          }
        }
      }
    }

    function canSmart2(){
      console.log("canSmart2")
      var length = playSingle.length;
      var array = [];
      for (key in board){
        if ((key%2 === 1) && (board[key]==="")){
          array.push(key)
        }
      }
      if (array !== []){
        var spot = randomIntFromInterval(0,(array.length))
        board[array[spot]] = "O";
        var local = '#' + (Number(array[spot])+1);
        $(local).html(computer);
        for (var i = 0; i < compSingle.length ;i++) {
          compPairs.push(Number(compSingle[i])+(Number(array[spot])+1));
        }
        compSingle.push(Number(array[spot])+1);
        return true;
      }
    }

    function mustRandom(){
      console.log('mustRandom ');
      var emptySpace = [];
      for (key in Cboard){
        if (board[key]===""){
          emptySpace.push(key);
        }
      }
      var rando = randomIntFromInterval(0,(emptySpace.length))
      board[emptySpace[rando]]="O";
      var local = '#' + (Number(emptySpace[rando])+1);
      $(local).html(computer);
      for (var i = 0; i < compSingle.length ;i++) {
        compPairs.push( Number(compSingle[i]) + (Number(emptySpace[rando])+1) );
      }
      compSingle.push( (Number(emptySpace[rando])+1) );
    }

    //reset functions
    function newboard(){
      console.log("New Game");
      for (var i = 1; i < 10; i++) {
        var reset = '#' + (i);
        $(reset).html('');
      };
      $('#ttt_header').html("Tic Tac Toe");

      board = ["","","","","","","","",""];
      playSingle = [];
      playPairs = [];
      compSingle = [];
      compPairs = [];
      victor = undefined;
      person = "X";
      play = "X";
      computer = "O";
      comp = "O"
      count = 0;
    }

    function resetall(){
      console.log("Reset");
      for (var i = 1; i < 10; i++) {
        var reset = '#' + (i);
        $(reset).html('');
      };
      $('#ttt_header').html("Tic Tac Toe");
      $('#xscore').html('X Score: 0');
      $('#oscore').html('O Score: 0');

      board = ["","","","","","","","",""];
      playSingle = [];
      playPairs = [];
      compSingle = [];
      compPairs = [];
      victor = undefined;
      person = "X";
      play = "X";
      computer = "O";
      comp = "O"
      count = 0;
      xscore = 0;
      oscore = 0;
    }

    //click handler
    $('.box').on('click', function(event){
      if (!victor){
        var local = '#' + (event.target.id);
        if(!$(local).html()){
          $(local).html(person);
          board[event.target.id-1] = person;
          if (winner(event.target.id,play,person)){
            victor = person;
            $('#ttt_header').html(person + " WINS");
            xscore++;
            $('#cxscore').html("X Score: "+ xscore);

          }else if(tie()){
            $('#ttt_header').html("Tie");
          }else{
            //computer turns
            setTimeout(function(){
              if(canWin()){
                victor = computer;
                $('#ttt_header').html(victor + " WINS");
                oscore++;
                $('#oscore').html("O Score: "+ oscore);

              }
              else if(canBlock()){
              }
              else if(canMiddle()){
              }
              else if(canSmart()){
              }
              else if (canSmart2()){
              }
              else {
                mustRandom();
              }
              count++;
            },500);
          }
        }
      }
    });


    $('#new').on('click', function(event){
      newboard();
    });


    $('#reset').on('click', function(event){
      resetall();
    });

  //end versus computer play
  });



//doc ready end
});

