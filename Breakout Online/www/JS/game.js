function loadGame() {
  // Main variables
  let lives;
  let score;
  let paused;
  let started = false;
  let numOfWins = 1;
  let newBallSpeed = 0;
  let brickWorth;
  let scoreAtEnd;
  const bricks = [];
  const keysPressed = {};
  const initialPaddleSpeed = 500;
  const initialBallSpeed = 300;
  const paddle = {};
  const ball = {};
  let gameBorders = loadGameBorders();

  // Setup key listeners before starting the first game
  setupKeyListeners();

  startNewGame();
  // Reset starting variables etc
  function startNewGame() {
    lives = 3;
    score = 0;

    if (started === false) {
      paused = true;
    }
    else {
      paused = false;
    }

    resetBall();
    resetPaddle();
    spawnBricks();

    updateInterface();
    startInterval();//frames per seconds
  }

  function updateGame(deltaTime) {//delta is the amount of time that has passed between rendering frames,
    if (paused) { return; }

    movePaddle(deltaTime);
    moveBall(deltaTime);
  }

  function movePaddle(deltaTime) {
    const direction = calculatePaddleDirection();
    const velocity = direction * paddle.speed * deltaTime;//velocity becomes time sensitive
    paddle.left += velocity;
    if (paddle.left < gameBorders.left) { paddle.left = 0; }// Switch directions if we go too far
    if (paddle.left + paddle.width > gameBorders.width) { paddle.left = gameBorders.width - paddle.width; }
    paddle.$.css('left', paddle.left);
  }

  function moveBall(deltaTime) {
    ball.left += ball.direction.x * ball.speed * deltaTime;
    ball.top += ball.direction.y * ball.speed * deltaTime;

    if (!collisionDetectBallAndGame()) { return; }
    collisionDetectBallAndBricks();
    collisionDetectBallAndPaddle();

    ball.$.css('left', ball.left);
    ball.$.css('top', ball.top);
  }

  function calculatePaddleDirection() {
    let movementVelocity = 0;
    if (keysPressed.left) { --movementVelocity; }//steer contorol of the paddle-left
    else if (keysPressed.right) { ++movementVelocity; }//steer contorol of the paddle-right
    return movementVelocity;
  }

  function loseLife() {
    --lives;
    paused = true;
    updateInterface();
    resetBall();
    resetPaddle();
  }

  function collisionDetectBallAndGame() {
    if (ball.left < gameBorders.left) {
      ball.left = 0;//to prevent the ball to go outside
      ball.direction.x *= -1;
    } else if (ball.left + ball.width > gameBorders.width) {
      ball.left = gameBorders.width - ball.width;
      ball.direction.x *= -1;
    }

    if (ball.top < gameBorders.top) {
      ball.top = 0;
      ball.direction.y *= -1;
    } else if (ball.top + ball.height > gameBorders.height) {//if you lose the ball you lose your life man:-)
      loseLife();
      return false;
    }
    return true;
  }

  function collisionDetectBallAndPaddle() {
    if (!isRectAOutsideRectB(ball, paddle)) {
      ball.direction.y *= -1;
      ball.top = paddle.top - ball.height;
      score += 5;
      updateInterface();
    }
  }

  function collisionDetectBallAndBricks() {
    for (let i = bricks.length - 1; i >= 0; --i) {//bricks dissapear?
      const brick = bricks[i];
      if (!isRectAOutsideRectB(ball, brick)) {
        if (getHorizontalOrVerticalDirection(brick, ball) == 'horizontal') {
          // If it bounced on the side of the brick
          ball.direction.x *= -1;
        } else {
          // If it bounced above/below a brick
          ball.direction.y *= -1;
        }
        score += brick.worth;
        brick.$.remove();
        bricks.splice(i, 1);
        //score += 20;
        updateInterface();
      }
    }
    if (bricks.length == 0) {
      paused = true;
      updateInterface();
    }
  }

  // Assumes the properties: left, top, width, height
  function isRectAOutsideRectB(a, b) {
    if (a.left > b.left + b.width) return true; // to the right
    if (a.left + a.width < b.left) return true; // to the left
    if (a.top > b.top + b.height) return true; // below
    if (a.top + a.height < b.top) return true; // above
    return false;
  }

  // Does not work for rectangles, only squares
  function getHorizontalOrVerticalDirection(objA, objB) {
    return 'vertical'; // Always return 'vertical' for non-square bricks
    // Todo: fix code for rectangle bricks
    const aY = objA.top + objA.height / 2;
    const aX = objA.left + objA.width / 2;
    const bY = objB.top + objB.height / 2;
    const bX = objB.left + objB.width / 2;
    const direction = Math.abs(Math.atan2(aY - bY, aX - bX));//returns the angle from x axis to a point
    return (Math.abs(direction) < Math.PI / 4 || Math.abs(direction) > Math.PI / 4 * 3) ? 'horizontal' : 'vertical';
  }//with atan2 the y coordinate is passed as first argument and x as the second argument- atan2(y,x)

  function updateInterface() {
    $('.score span').text((score + '').padStart(5, '0'));
    $('.lives span').text(lives);
    $('.main-text').hide();
    if (lives < 1) {
      scoreAtEnd = score;
      $('#exampleModal').modal('toggle');
      $('.main-text').text('GAME OVER - PRESS ENTER TO PLAY AGAIN');
      
      numOfWins = 1;
      changeBallSpeed(numOfWins);
      initialPaddleSize();
    } else if (!bricks.length) {
      $('.main-text').text('CONGRATULATIONS - YOU WON');
      if (keysPressed.enter) {
        numOfWins++;
        smallPaddleSize();
        startNewGame();
        changeBallSpeed(numOfWins);
        console.log(numOfWins);
      }
    } else if (paused && !started) {
      $('.main-text').text('Press ENTER to start game...');
      started = true;
    } else if (paused) {
      $('.main-text').text('PAUSED - press ENTER to continue...');
      changeBallSpeed(numOfWins);
    } else {
      $('.main-text').text('');
      changeBallSpeed(numOfWins);
    }
    $('.main-text').fadeIn(500);
  }

  function onEnterPress() {
    if (keysPressed.enter) { return; }
    keysPressed.enter = true;

    if (lives > 0) {
      paused = !paused;
    } else {
      startNewGame();
    }
    updateInterface();
  }

  function setupKeyListeners() {
    $(window).keydown(function (e) {
      if (e.which === 37) { keysPressed.left = true; }
      if (e.which === 39) { keysPressed.right = true; }
      if (e.which === 13) { onEnterPress(); }
    });

    $(window).keyup(function (e) {
      if (e.which === 37) { keysPressed.left = false; }
      if (e.which === 39) { keysPressed.right = false; }
      if (e.which === 13) { keysPressed.enter = false; }
    });
  }

  function loadGameBorders() {//borders of the game for paddle and....
    return {
      left: 0,
      top: 0,
      width: $('.game').width() - 3,
      height: $('.game').height()
    };
  }

  function resetPaddle() {
    paddle.$ = $('.paddle');
    paddle.speed = initialPaddleSpeed;

    paddle.top = paddle.$.position().top;
    paddle.left = paddle.$.position().left;
    paddle.width = paddle.$.width();
    paddle.height = paddle.$.height();

    paddle.$.css('left', (paddle.left = gameBorders.width / 2 - paddle.width / 2));
  }

  function resetBall() {
    ball.$ = $('.ball');
    ball.speed = initialBallSpeed;
    ball.$.css('left', (ball.left = gameBorders.width / 2 - 40));
    ball.$.css('top', (ball.top = gameBorders.height / 1.2));
    ball.direction = { x: 1, y: 1 };

    ball.width = ball.$.width();
    ball.height = ball.$.height();
  }

  function changeBallSpeed(numOfWins) {
    newBallSpeed = initialBallSpeed * numOfWins;
    ball.speed = newBallSpeed;
  }

  function smallPaddleSize() {
    $(".paddle").css("width", "100px");
    paddle.width = 100;
  }

  function initialPaddleSize() {
    $(".paddle").css("width", "200px");
    paddle.width = 200;
  }

  function spawnBricks() {
    const brickCSS = getBrickCSS('left', 'top', 'width', 'height');

    const colors = [
      'rgb(255,0,0)',
      'rgb(0,255,0)',
      'rgb(0,0,255)',
      'rgb(238,241,17)',
      'rgb(255, 0, 0)',
      'rgb(0, 255, 0)',
      'rgb(0, 0, 255)',
      'rgb(255, 0, 0)',
      'rgb(255, 0, 0)',
      'rgb(0, 255, 0)',
      'rgb(0, 0, 255)',
      'rgb(255, 0, 0)',


    ];

    let prevLeft = brickCSS.left;

    for (let color of colors) {
      const brick = createBrick(prevLeft, brickCSS.top - brickCSS.height - 20, brickCSS.width, brickCSS.height, colors[0], 80);

      bricks.push(brick);
      $('.game').append(brick.$);

      prevLeft += brickCSS.width * 1.4;
    }

    prevLeft = brickCSS.left;

    for (let color of colors) {
      const brick = createBrick(prevLeft, brickCSS.top, brickCSS.width, brickCSS.height, colors[1], 60);

      bricks.push(brick);
      $('.game').append(brick.$);

      prevLeft += brickCSS.width * 1.4;
    }
    prevLeft = brickCSS.left;
    for (let color of colors) {

      const brick = createBrick(prevLeft, brickCSS.top + brickCSS.height + 20, brickCSS.width, brickCSS.height, colors[2], 40); bricks.push(brick);

      $('.game').append(brick.$); prevLeft += brickCSS.width * 1.4;

    }
    prevLeft = brickCSS.left;
    for (let color of colors) {

      const brick = createBrick(prevLeft, brickCSS.top + (brickCSS.height + 20) * 2, brickCSS.width, brickCSS.height, colors[3], 20); bricks.push(brick);

      $('.game').append(brick.$); prevLeft += brickCSS.width * 1.4;

    }
  }

  function createBrick(left, top, width, height, backgroundColor, worth) {
    const brick = $('<div class="brick">' + '<div class="bricks65">').css({ backgroundColor, left, top });
    return {
      $: brick,
      left,
      top,
      width,
      height,
      backgroundColor,
      worth
    };
  }

  function getBrickCSS(...properties) {
    const tempBrick = $('<div class="brick">').appendTo('.game');
    const css = {}
    for (let prop of properties) {
      css[prop] = parseInt(tempBrick.css(prop));
    }
    tempBrick.remove();
    return css;
  }

  function startInterval() {//game loop that runs evry 10 seconds
    const updateSpeed = 10; // lower = faster
    clearInterval(window.gameInterval);
    // Wait a short delay before starting to let the player prepare
    setTimeout(() => {
      let previousTime = performance.now() - updateSpeed;
      window.gameInterval = setInterval(() => {
        const now = performance.now();
        updateGame((now - previousTime) / 1000);
        previousTime = now;
      }, updateSpeed);
    }, 1000);
  }

  $('#send-to-highscore').on('click', postNewHighscore);

  function postNewHighscore() {
    let name = $('#name').val(); // fetch the name from your <input>/or otherwhere
    console.log(name);
    let score = scoreAtEnd; // fetch the score from the game's "score"-variable
    console.log(score);
    $.post( "/add-score", { name, score }, function(responseData) {
      console.log('the new highscore-list is:', responseData);
      let highscorelist = responseData;
      console.log(highscorelist);

      //let tbody = $('tbody').empty();

      let i = 0;
      for (let highscore of highscorelist) {
        $(`tr.${i} td.score`).empty().append(highscore.score);
        $(`tr.${i} td.name`).empty().append(highscore.name);
        console.log(highscore);
        i++;
      }


      console.error('append/use the new highscore-list then remove this console.error');
    });
  }
}