$(document).ready(function(){
//show chat
  $('#ttt_header').on('click',function(){
    $('#ttt_page').show()
    $('#login').show()
    $('#playbox').hide()
    $('#chatbox').hide()
    $('#foot').hide()
    $('#lfoot').hide()
    $('#cfoot').hide()
  });

  $('#togleChat').on('click', function(){
    $('#chatbox').toggle(500,'swing');
    $('#playbox').toggle(500,'swing');
    $('#login').toggle(500,'swing');
  });

  // //chat calls
  // var messageRef = new Firebase('https://tick-tack-toe.firebaseio.com/message');
  // function displayChatMessage(name, text) {
  //     $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
  //     $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
  // }
  // $('#messageInput').keypress(function (e) {
  //   if (e.keyCode == 13) {
  //     var name = $('#nameInput').val();
  //     var text = $('#messageInput').val();
  //     messageRef.push({name: name, text: text});
  //     $('#messageInput').val('');
  //   }
  // });
  // messageRef.on('child_added', function(snapshot) {
  //   var message = snapshot.val();
  //   displayChatMessage(message.name, message.text);
  // });
  // $('#clear').on('click',function(){
  //   messageRef.set(null);
  //   $('#messagesDiv').html('');
  // });
  // //end chat calls

  //choose play type
  $('#login').on('click', function(event){
    $('#login').toggle(500, 'swing');
    $('#playbox').toggle(500,'swing')



    //start play over network;
    if (event.target.id=== 'network'){

      var local;
      var gameRef = new Firebase('https://tick-tack-toe.firebaseio.com/game');
      var gameAuth;
      var player;
      var board = ["","","","","","","","",""];
      var winner;
      var singleX = [];
      var sumsX = [];
      var singleO = [];
      var sumsO = [];
      var xscore = 0;
      var oscore = 0;
      var count = 0;
      var disable = false;

      $('#foot').show(500, 'swing');

      function win(current){
        current = parseInt(current.charAt(1));
        if (player==="X"){
          for (var i = 0; i < sumsX.length; i++) {
            if (sumsX[i] + current === 15){
              return true;
            }
          }
          for (var j = 0; j < singleX.length; j++) {
            sumsX.push(singleX[j]+current);
          }
          singleX.push(current);
        } else if(player==="O"){
            for (var k = 0; k < sumsO.length; k++) {
              if (sumsO[k] + current === 15){
                return true;
              }
            }
            for (var l = 0; l < singleO.length; l++) {
              sumsO.push(singleO[l]+current);
            }
            singleO.push(current);
          }
      }

      function tie(){
        if (count === 8){
          winner = "tie";
          return true;
        }
        count += 1;
      }

      function newGame(){
        $('#ttt_header').html("Tic Tac Toe");
        board = ["","","","","","","","",""];
        winner = undefined;
        disable = false;
        singleX = [];
        sumsX = [];
        singleO = [];
        sumsO = [];
        count = 0;
        gameRef.set({board:board, player:"X", xscore:xscore, oscore:oscore});
      }

      function reset(){
        xscore = 0;
        yscore = 0;
        $('#xscore').html('X Score: 0');
        $('#oscore').html('O Score: 0');
        newGame();
      }

      function displayBoard(setter){
        for (var i = 0; i < setter.length; i++) {
          board[i] = setter[i];
          var spot = '#' + (i+1);
          $(spot).html(board[i]);
        }
      }

        gameRef.set({board:board, player:"X", reset:true});

        var otherPlayer = function(player) {
          return player === 'X' ? 'O' : 'X';
        };

        //Get a "unique" id for the user
        if (!(gameAuth = gameRef.getAuth())) {
          gameRef.authAnonymously(function(error, authData) {
            if (error) {
              console.log("Login Failed!", error);
            } else {
              gameAuth = authData;
            }
          });
        }


        //click function
        $('.box').on('click', function(event){
          if( disable===false && !winner){
            local = '#' + (event.target.id);
            if(!$(local).html()){

              board[(event.target.id)-1]=(player);

              var firebaseData = {
                board: board,
                player: otherPlayer(player),
                waitingPlayer: gameAuth.uid,
                local: local,

              };

              if (win(local)){
                winner = player;
                if (player === "X"){
                  xscore++;
                }else{
                  oscore++;
                }
                firebaseData.winner = winner;
                firebaseData.xscore = xscore;
                firebaseData.oscore = oscore;
              }else if (tie()){
                  firebaseData.winner = winner;
                }

              gameRef.set(firebaseData);

              disable = true;

            }

          }
        });

         //On load, set up event handling on the object at "gameRef"
        gameRef.on('value', function(snapshot) {
          var snap = snapshot.val();
          displayBoard(snap.board);

          if (snap.newGame){
            newGame();
          }
          if (snap.reset){
            reset();
          }

          disable = false;

          if (gameAuth.uid === snap.waitingPlayer) {
            player = otherPlayer(snap.player);
            disable = true;
          } else {
            player = snap.player;
          }

          if (snap.winner){
            disable = true;
            if (snap.winner === "tie"){
              console.log("twas a tie");
                $('#ttt_header').html("Tie");
              }else{
                xscore = snap.xscore;
                oscore = snap.oscore;

                $('#oscore').html('O Score: ' + oscore);
                $('#xscore').html('X Score: ' + xscore);
                console.log("the winner is: " + snap.winner);
                $('#ttt_header').html(snap.winner + " WINS");
                }
          }

        });


        //reset board keep scores
        $('#new').on('click', function(){
          board = ["","","","","","","","",""];
          gameRef.set({board:board, player:"X", newGame:true, xscore:xscore, oscore:oscore});
        });

        //reset scores and board
        $('#reset').on('click', function(){
          board = ["","","","","","","","",""];
          gameRef.set({board:board, player:"X", reset:true});
        });





  //end play over Network
    }

  //start play locally
    else if(event.target.id=== 'local'){
      lreset();

      $('#lfoot').show(500, 'swing');
        var luser = 0;
        var lusers = ["O","X"];
        var lcount = 0;
        var lwinner = undefined;
        var lsingleX = [];
        var lsumsX = [];
        var lsingleO = [];
        var lsumsO = [];
        var lxscore = 0;
        var loscore = 0;

      function turn(){
        luser = 1-luser;
        return luser;
      }

      function wine(local){
        local = parseInt(local.charAt(1));
        if (luser){
          for (var i = 0; i < lsumsX.length; i++) {
            if (lsumsX[i] + local === 15){
              lxscore++;
              $('#lxscore').html('X Score: ' + lxscore);
              return true;
            }
          }
          for (var j = 0; j < lsingleX.length; j++) {
            lsumsX.push(lsingleX[j]+local);
          }
          lsingleX.push(local);
        } else {
            for (var k = 0; k < lsumsO.length; k++) {
              if (lsumsO[k] + local === 15){
                loscore++;
                $('#loscore').html('O Score: ' + loscore);
                return true;
              }
            }
            for (var l = 0; l < lsingleO.length; l++) {
              lsumsO.push(lsingleO[l]+local);
            }
            lsingleO.push(local);
          }
      }

      function ties(){
        if (count === 8){
          lwinner = "tie";
          return true;
        }
        console.log(lcount);
        lcount++;
      }

        $('.box').on('click', function(event){
          if(!lwinner){
            var local = '#' + (event.target.id);
            if(!$(local).html()){
              turn();
              $(local).html(luser?"X":"O");
              if (wine(local)){
                lwinner = lusers[luser];
                console.log("the winner is: " + lwinner);
                $('#ttt_header').html(lwinner + " WINS");
              }else if (ties()){
                console.log("twas a tie");
                $('#ttt_header').html("Tie");
              }
            }
          }
        });


        $('#lnew').on('click', function(event){
          console.log("New Game");
          for (var i = 1; i < 10; i++) {
            var reset = '#' + (i);
            $(reset).html('');
          };
          $('#ttt_header').html("Tic Tac Toe");
          luser = 0;
          lwinner = undefined;
          lsingleX = [];
          lsumsX = [];
          lsingleO = [];
          lsumsO = [];
          lcount = 0;
        });

        function lreset(){
          for (var i = 1; i < 10; i++) {
            var reset = '#' + (i);
            $(reset).html('');
          };
          $('#ttt_header').html("Tic Tac Toe");
          $('#lxscore').html('X Score: 0');
          $('#loscore').html('O Score: 0');
          luser = 0;
          lwinner = undefined;
          lsingleX = [];
          lsumsX = [];
          lsingleO = [];
          lsumsO = [];
          lcount = 0;
          lxscore = 0;
          loscore = 0
        }
        $('#lreset').on('click', function(event){
          console.log("Reset");
          lreset();
        });


      //end play locally
    }

  //end play locally

    //
    //
    //
    //
    //
    //start local v computer
    else if(event.target.id=== 'compute'){
      $('#cfoot').show(500, 'swing');
      resetall();





      var Cboard = ["","","","","","","","",""];
      var playSingle = [];
      var playPairs = [];
      var compSingle = [];
      var compPairs = [];
      var victor;
      var person = "X";
      var play = "X";
      var computer = "O";
      var comp = "O"
      var Ccount = 0;
      var cxscore = 0;
      var coscore = 0;

      //magic square win function
      function winer(test,who,turn){
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
      function tier(){
        if (Ccount === 8){
          victor = "tie";
          return true;
        }
        Ccount++;
      }

      //computer play functions
      function canWin(){
        console.log('canWin? ');
        for (var i = 1; i < 10; i++) {
          if (Cboard[i-1]===""){
            if (winer((i),comp,computer)){
              console.log("compWin " + (i));
              Cboard[i-1]="O"
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
          if (Cboard[i-1]===""){
            if (winer(i,play,computer)){
              Cboard[i-1]="O"
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
        if(Cboard[4]===""){
          Cboard[4]="O"
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
          for (key in Cboard){
            if ((key%2 === 0) && (Cboard[key]==="")){
              Cboard[key] = "O";
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
        for (key in Cboard){
          if ((key%2 === 1) && (Cboard[key]==="")){
            array.push(key)
          }
        }
        if (array !== []){
          var spot = randomIntFromInterval(0,(array.length))
          Cboard[array[spot]] = "O";
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
          if (Cboard[key]===""){
            emptySpace.push(key);
          }
        }
        var rando = randomIntFromInterval(0,(emptySpace.length))
        Cboard[emptySpace[rando]]="O";
        var local = '#' + (Number(emptySpace[rando])+1);
        $(local).html(computer);
        for (var i = 0; i < compSingle.length ;i++) {
          compPairs.push( Number(compSingle[i]) + (Number(emptySpace[rando])+1) );
        }
        compSingle.push( (Number(emptySpace[rando])+1) );
      }

      function newboard(){
        console.log("New Game");
        for (var i = 1; i < 10; i++) {
          var reset = '#' + (i);
          $(reset).html('');
        };
        $('#ttt_header').html("Tic Tac Toe");

        Cboard = ["","","","","","","","",""];
        playSingle = [];
        playPairs = [];
        compSingle = [];
        compPairs = [];
        victor = undefined;
        person = "X";
        play = "X";
        computer = "O";
        comp = "O"
        Ccount = 0;
      }

      function resetall(){
        console.log("Reset");
        for (var i = 1; i < 10; i++) {
          var reset = '#' + (i);
          $(reset).html('');
        };
        $('#ttt_header').html("Tic Tac Toe");
        $('#cxscore').html('X Score: 0');
        $('#coscore').html('O Score: 0');

        Cboard = ["","","","","","","","",""];
        playSingle = [];
        playPairs = [];
        compSingle = [];
        compPairs = [];
        victor = undefined;
        person = "X";
        play = "X";
        computer = "O";
        comp = "O"
        Ccount = 0;
        cxscore = 0;
        coscore = 0;
      }

        //click handler
      $(document).ready(function(){

        $('.box').on('click', function(event){
          if (!victor){
            var local = '#' + (event.target.id);
            if(!$(local).html()){
              $(local).html(person);
              Cboard[event.target.id-1] = person;
              if (winer(event.target.id,play,person)){
                victor = person;
                $('#ttt_header').html(person + " WINS");
                cxscore++;
                $('#cxscore').html("X Score: "+ cxscore);

              }else if(tier()){
                $('#ttt_header').html("Tie");
              }else{
                //computer turns
                setTimeout(function(){
                  if(canWin()){
                    victor = computer;
                    $('#ttt_header').html(victor + " WINS");
                    coscore++;
                    $('#coscore').html("O Score: "+ coscore);

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
                  Ccount++;
                },500);
              }
            }
          }
        });

        $('#cnew').on('click', function(event){
          newboard();
        });


        $('#creset').on('click', function(event){
          resetall();
        });

      });

    //end local v computer
    }
    $('#ttt_button').on('click',function(){
        return
      });
    //click jquery to choose online or local or compute
  })
//doc ready over all
});

