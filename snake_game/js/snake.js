
var SNAKE = SNAKE || {};

SNAKE.addEventListener = (function() {
    if (window.addEventListener) {
        return function(obj, event, funct, evtCapturing) {
            obj.addEventListener(event, funct, evtCapturing);
        };
    } else if (window.attachEvent) {
        return function(obj, event, funct) {
            obj.attachEvent("on" + event, funct);
        };
    }
})();

SNAKE.removeEventListener = (function() {
    if (window.removeEventListener) {
        return function(obj, event, funct, evtCapturing) {
            obj.removeEventListener(event, funct, evtCapturing);
        };
    } else if (window.detachEvent) {
        return function(obj, event, funct) {
            obj.detachEvent("on" + event, funct);
        };
    }
})();


SNAKE.Snake = SNAKE.Snake || (function() {
    
    var instanceNumber = 0;
    var blockPool = [];
    
    var SnakeBlock = function() {
        this.elm = null;
        this.elmStyle = null;
        this.row = -1;
        this.col = -1;
        this.xPos = -1000;
        this.yPos = -1000;
        this.next = null;
        this.prev = null;
    };
    
    function getNextHighestZIndex(myObj) {
        var highestIndex = 0,
            currentIndex = 0,
            ii;
        for (ii in myObj) {
            if (myObj[ii].elm.currentStyle){  
                currentIndex = parseFloat(myObj[ii].elm.style["z-index"],10);
            }else if(window.getComputedStyle) {
                currentIndex = parseFloat(document.defaultView.getComputedStyle(myObj[ii].elm,null).getPropertyValue("z-index"),10);  
            }
            if(!isNaN(currentIndex) && currentIndex > highestIndex){
                highestIndex = currentIndex;
            }
        }
        return(highestIndex+1);  
    }
    
    return function(config) {
    
        if (!config||!config.playingBoard) {return;}
        var me = this,
            playingBoard = config.playingBoard,
            myId = instanceNumber++,
            growthIncr = 5,
            moveQueue = [], // a queue that holds the next moves of the snake
            currentDirection = 1, // 0: up, 1: left, 2: down, 3: right
            columnShift = [0, 1, 0, -1],
            rowShift = [-1, 0, 1, 0],
            xPosShift = [],
            yPosShift = [],
            snakeSpeed = 75,
            isDead = false;
        

        me.snakeBody = {};
        me.snakeBody["b0"] = new SnakeBlock(); // create snake head
        me.snakeBody["b0"].row = config.startRow || 1;
        me.snakeBody["b0"].col = config.startCol || 1;
        me.snakeBody["b0"].xPos = me.snakeBody["b0"].row * playingBoard.getBlockWidth();
        me.snakeBody["b0"].yPos = me.snakeBody["b0"].col * playingBoard.getBlockHeight();
        me.snakeBody["b0"].elm = createSnakeElement();
        me.snakeBody["b0"].elmStyle = me.snakeBody["b0"].elm.style;
        playingBoard.getBoardContainer().appendChild( me.snakeBody["b0"].elm );
        me.snakeBody["b0"].elm.style.left = me.snakeBody["b0"].xPos + "px";
        me.snakeBody["b0"].elm.style.top = me.snakeBody["b0"].yPos + "px";
        me.snakeBody["b0"].next = me.snakeBody["b0"];
        me.snakeBody["b0"].prev = me.snakeBody["b0"];
        
        me.snakeLength = 1;
        me.snakeHead = me.snakeBody["b0"];
        me.snakeTail = me.snakeBody["b0"];
        me.snakeHead.elm.className = me.snakeHead.elm.className.replace(/\bsnake-snakebody-dead\b/,'');
        me.snakeHead.elm.className += " snake-snakebody-alive";
        
        // ----- private methods -----
        
        function createSnakeElement() {
            var tempNode = document.createElement("div");
            tempNode.className = "snake-snakebody-block";
            tempNode.style.left = "-1000px";
            tempNode.style.top = "-1000px";
            tempNode.style.width = playingBoard.getBlockWidth() + "px";
            tempNode.style.height = playingBoard.getBlockHeight() + "px";
            return tempNode;
        }
        
        function createBlocks(num) {
            var tempBlock;
            var tempNode = createSnakeElement();

            for (var ii = 1; ii < num; ii++){
                tempBlock = new SnakeBlock();
                tempBlock.elm = tempNode.cloneNode(true);
                tempBlock.elmStyle = tempBlock.elm.style;
                playingBoard.getBoardContainer().appendChild( tempBlock.elm );
                blockPool[blockPool.length] = tempBlock;
            }
            
            tempBlock = new SnakeBlock();
            tempBlock.elm = tempNode;
            playingBoard.getBoardContainer().appendChild( tempBlock.elm );
            blockPool[blockPool.length] = tempBlock;
        }
        
        
        me.handleArrowKeys = function(keyNum) {
            if (isDead) {return;}
            
            var snakeLength = me.snakeLength;
            var lastMove = moveQueue[0] || currentDirection;

            switch (keyNum) {
                case 37:
                    if ( lastMove !== 1 || snakeLength === 1 ) {
                        moveQueue.unshift(3); //SnakeDirection = 3;
                    }
                    break;    
                case 38:
                    if ( lastMove !== 2 || snakeLength === 1 ) {
                        moveQueue.unshift(0);//SnakeDirection = 0;
                    }
                    break;    
                case 39:
                    if ( lastMove !== 3 || snakeLength === 1 ) {
                        moveQueue.unshift(1); //SnakeDirection = 1;
                    }
                    break;    
                case 40:
                    if ( lastMove !== 0 || snakeLength === 1 ) {
                        moveQueue.unshift(2);//SnakeDirection = 2;
                    }
                    break;  
            }
        };
        
        
        me.go = function() {
        
            var oldHead = me.snakeHead,
                newHead = me.snakeTail,
                myDirection = currentDirection,
                grid = playingBoard.grid; // cache grid for quicker lookup
        
            me.snakeTail = newHead.prev;
            me.snakeHead = newHead;
        
            if ( grid[newHead.row] && grid[newHead.row][newHead.col] ) {
                grid[newHead.row][newHead.col] = 0;
            }
        
            if (moveQueue.length){
                myDirection = currentDirection = moveQueue.pop();
            }
        
            newHead.col = oldHead.col + columnShift[myDirection];
            newHead.row = oldHead.row + rowShift[myDirection];
            newHead.xPos = oldHead.xPos + xPosShift[myDirection];
            newHead.yPos = oldHead.yPos + yPosShift[myDirection];
            
            if ( !newHead.elmStyle ) {
                newHead.elmStyle = newHead.elm.style;
            }
            
            newHead.elmStyle.left = newHead.xPos + "px";
            newHead.elmStyle.top = newHead.yPos + "px";

            if (grid[newHead.row][newHead.col] === 0) {
                grid[newHead.row][newHead.col] = 1;
                setTimeout(function(){me.go();}, snakeSpeed); 
            } else if (grid[newHead.row][newHead.col] > 0) {
                me.handleDeath();
            } else if (grid[newHead.row][newHead.col] === playingBoard.getGridFoodValue()) {
                grid[newHead.row][newHead.col] = 1;
                me.eatFood();
                setTimeout(function(){me.go();}, snakeSpeed);
            }
        };
        
        me.eatFood = function() {
            if (blockPool.length <= growthIncr) {
                createBlocks(growthIncr*2);
            }
            var blocks = blockPool.splice(0, growthIncr);
            
            var ii = blocks.length,
                index,
                prevNode = me.snakeTail;
            while (ii--) {
                index = "b" + me.snakeLength++;
                me.snakeBody[index] = blocks[ii];
                me.snakeBody[index].prev = prevNode;
                me.snakeBody[index].elm.className = me.snakeHead.elm.className.replace(/\bsnake-snakebody-dead\b/,'')
                me.snakeBody[index].elm.className += " snake-snakebody-alive";
                prevNode.next = me.snakeBody[index];
                prevNode = me.snakeBody[index];
            }
            me.snakeTail = me.snakeBody[index];
            me.snakeTail.next = me.snakeHead;
            me.snakeHead.prev = me.snakeTail;

            playingBoard.foodEaten();
        };
        
        me.handleDeath = function() {
            me.snakeHead.elm.style.zIndex = getNextHighestZIndex(me.snakeBody);
            me.snakeHead.elm.className = me.snakeHead.elm.className.replace(/\bsnake-snakebody-alive\b/,'')
            me.snakeHead.elm.className += " snake-snakebody-dead";

            isDead = true;
            playingBoard.handleDeath();
            moveQueue.length = 0;
        };
   
        me.rebirth = function() {
            isDead = false;
        };
        
        me.reset = function() {
            if (isDead === false) {return;}
            
            var blocks = [],
                curNode = me.snakeHead.next,
                nextNode;
            while (curNode !== me.snakeHead) {
                nextNode = curNode.next;
                curNode.prev = null;
                curNode.next = null;
                blocks.push(curNode);
                curNode = nextNode;
            }
            me.snakeHead.next = me.snakeHead;
            me.snakeHead.prev = me.snakeHead;
            me.snakeTail = me.snakeHead;
            me.snakeLength = 1;
            
            for (var ii = 0; ii < blocks.length; ii++) {
                blocks[ii].elm.style.left = "-1000px";
                blocks[ii].elm.style.top = "-1000px";
                blocks[ii].elm.className = me.snakeHead.elm.className.replace(/\bsnake-snakebody-dead\b/,'')
                blocks[ii].elm.className += " snake-snakebody-alive";
            }
            
            blockPool.concat(blocks);
            me.snakeHead.elm.className = me.snakeHead.elm.className.replace(/\bsnake-snakebody-dead\b/,'')
            me.snakeHead.elm.className += " snake-snakebody-alive";
            me.snakeHead.row = config.startRow || 1;
            me.snakeHead.col = config.startCol || 1;
            me.snakeHead.xPos = me.snakeHead.row * playingBoard.getBlockWidth();
            me.snakeHead.yPos = me.snakeHead.col * playingBoard.getBlockHeight();
            me.snakeHead.elm.style.left = me.snakeHead.xPos + "px";
            me.snakeHead.elm.style.top = me.snakeHead.yPos + "px";
        };
        
        
        createBlocks(growthIncr*2);
        xPosShift[0] = 0;
        xPosShift[1] = playingBoard.getBlockWidth();
        xPosShift[2] = 0;
        xPosShift[3] = -1 * playingBoard.getBlockWidth();
        
        yPosShift[0] = -1 * playingBoard.getBlockHeight();
        yPosShift[1] = 0;
        yPosShift[2] = playingBoard.getBlockHeight();
        yPosShift[3] = 0;
    };
})();


SNAKE.Food = SNAKE.Food || (function() {
    
    var instanceNumber = 0;
    
    function getRandomPosition(x, y){
        return Math.floor(Math.random()*(y+1-x)) + x; 
    }
    
    return function(config) {
        
        if (!config||!config.playingBoard) {return;}

        var me = this;
        var playingBoard = config.playingBoard;
        var fRow, fColumn;
        var myId = instanceNumber++;

        var elmFood = document.createElement("div");
        elmFood.setAttribute("id", "snake-food-"+myId);
        elmFood.className = "snake-food-block";
        elmFood.style.width = playingBoard.getBlockWidth() + "px";
        elmFood.style.height = playingBoard.getBlockHeight() + "px";
        elmFood.style.left = "-1000px";
        elmFood.style.top = "-1000px";
        playingBoard.getBoardContainer().appendChild(elmFood);

        me.getFoodElement = function() {
            return elmFood;  
        };
        
        me.randomlyPlaceFood = function() {
            // if there exist some food, clear its presence from the board
            if (playingBoard.grid[fRow] && playingBoard.grid[fRow][fColumn] === playingBoard.getGridFoodValue()){
                playingBoard.grid[fRow][fColumn] = 0; 
            }

            var row = 0, col = 0, numTries = 0;

            var maxRows = playingBoard.grid.length-1;
            var maxCols = playingBoard.grid[0].length-1;
            
            while (playingBoard.grid[row][col] !== 0){
                row = getRandomPosition(1, maxRows);
                col = getRandomPosition(1, maxCols);

                numTries++;
                if (numTries > 20000){
                    row = -1;
                    col = -1;
                    break; 
                } 
            }

            playingBoard.grid[row][col] = playingBoard.getGridFoodValue();
            fRow = row;
            fColumn = col;
            elmFood.style.top = row * playingBoard.getBlockHeight() + "px";
            elmFood.style.left = col * playingBoard.getBlockWidth() + "px";
        };
    };
})();


SNAKE.Board = SNAKE.Board || (function() {

    var instanceNumber = 0;

    function getNextHighestZIndex(myObj) {
        var highestIndex = 0,
            currentIndex = 0,
            ii;
        for (ii in myObj) {
            if (myObj[ii].elm.currentStyle){  
                currentIndex = parseFloat(myObj[ii].elm.style["z-index"],10);
            }else if(window.getComputedStyle) {
                currentIndex = parseFloat(document.defaultView.getComputedStyle(myObj[ii].elm,null).getPropertyValue("z-index"),10);  
            }
            if(!isNaN(currentIndex) && currentIndex > highestIndex){
                highestIndex = currentIndex;
            }
        }
        return(highestIndex+1);  
    }

    function getClientWidth(){
        var myWidth = 0;
        if( typeof window.innerWidth === "number" ) {
            myWidth = window.innerWidth;//Non-IE
        } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
            myWidth = document.documentElement.clientWidth;//IE 6+ in 'standards compliant mode'
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myWidth = document.body.clientWidth;//IE 4 compatible
        } 
        return myWidth;
    }
    function getClientHeight(){
        var myHeight = 0;
        if( typeof window.innerHeight === "number" ) {
            myHeight = window.innerHeight;//Non-IE
        } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
            myHeight = document.documentElement.clientHeight;//IE 6+ in 'standards compliant mode'
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myHeight = document.body.clientHeight;//IE 4 compatible
        } 
        return myHeight;
    }
    
    return function(inputConfig) {
    
        var me = this,
            myId = instanceNumber++,
            config = inputConfig || {},
            MAX_BOARD_COLS = 250,
            MAX_BOARD_ROWS = 250,
            blockWidth = 20,
            blockHeight = 20,
            GRID_FOOD_VALUE = -1, // the value of a spot on the board that represents snake food, MUST BE NEGATIVE
            myFood,
            mySnake,
            boardState = 1, // 0: in active; 1: awaiting game start; 2: playing game
            myKeyListener,
            // Board components
            elmContainer, elmPlayingField, elmAboutPanel, elmLengthPanel, elmWelcome, elmTryAgain;
        
        // --- public variables ---
        me.grid = [];
        
        function createBoardElements() {
            elmPlayingField = document.createElement("div");
            elmPlayingField.setAttribute("id", "playingField");
            elmPlayingField.className = "snake-playing-field";
            
            SNAKE.addEventListener(elmPlayingField, "click", function() {
                elmContainer.focus();
            }, false);
            
            elmAboutPanel = document.createElement("div");
            elmAboutPanel.className = "snake-panel-component";
           
            elmLengthPanel = document.createElement("div");
            elmLengthPanel.className = "snake-panel-component";
            elmLengthPanel.innerHTML = "Длина: 1";
            
            elmWelcome = createWelcomeElement();
            elmTryAgain = createTryAgainElement();
            
            SNAKE.addEventListener( elmContainer, "keyup", function(evt) {
                if (!evt) var evt = window.event;
                evt.cancelBubble = true;
                if (evt.stopPropagation) {evt.stopPropagation();}
                if (evt.preventDefault) {evt.preventDefault();}
                return false;
            }, false);
            
            elmContainer.className = "snake-game-container";
            
            elmContainer.appendChild(elmPlayingField);
            elmContainer.appendChild(elmAboutPanel);
            elmContainer.appendChild(elmLengthPanel);
            elmContainer.appendChild(elmWelcome);
            elmContainer.appendChild(elmTryAgain);
            
            mySnake = new SNAKE.Snake({playingBoard:me,startRow:2,startCol:2});
            myFood = new SNAKE.Food({playingBoard: me});
            
            elmWelcome.style.zIndex = 1000;
        }
        function maxBoardWidth() {
            return MAX_BOARD_COLS * me.getBlockWidth();   
        }
        function maxBoardHeight() {
            return MAX_BOARD_ROWS * me.getBlockHeight();
        }
        
        function createWelcomeElement() {
            var tmpElm = document.createElement("div");
            tmpElm.id = "sbWelcome" + myId;
            tmpElm.className = "snake-welcome-dialog";
            
            var welcomeTxt = document.createElement("div");
            var fullScreenText = "";
            if (config.fullScreen) {
                fullScreenText = "На Windows нажмите F11, чтобы играть на весь экран.";   
            }
            welcomeTxt.innerHTML = "Змейка | Coder Helper <p></p>Используй <strong>стрелки</strong> на клавиатуре, чтобы играть в игру! " + fullScreenText + "<p></p>";
            var welcomeStart = document.createElement("button");
            welcomeStart.appendChild( document.createTextNode("Начать игру!"));
            
            var loadGame = function() {
                SNAKE.removeEventListener(window, "keyup", kbShortcut, false);
                tmpElm.style.display = "none";
                me.setBoardState(1);
                me.getBoardContainer().focus();
            };
            
            var kbShortcut = function(evt) {
                if (!evt) var evt = window.event;
                var keyNum = (evt.which) ? evt.which : evt.keyCode;
                if (keyNum === 32 || keyNum === 13) {
                    loadGame();
                }
            };
            SNAKE.addEventListener(window, "keyup", kbShortcut, false);
            SNAKE.addEventListener(welcomeStart, "click", loadGame, false);
            
            tmpElm.appendChild(welcomeTxt);
            tmpElm.appendChild(welcomeStart);
            return tmpElm;
        }
        
        function createTryAgainElement() {
            var tmpElm = document.createElement("div");
            tmpElm.id = "sbTryAgain" + myId;
            tmpElm.className = "snake-try-again-dialog";
            
            var tryAgainTxt = document.createElement("div");
            tryAgainTxt.innerHTML = "Змейка | Coder Helper<p></p>Ты умер :(.<p></p>";
            var tryAgainStart = document.createElement("button");
            tryAgainStart.appendChild( document.createTextNode("Ещё раз!"));
            
            var reloadGame = function() {
                tmpElm.style.display = "none";
                me.resetBoard();
                me.setBoardState(1);
                me.getBoardContainer().focus();
            };
            
            var kbTryAgainShortcut = function(evt) {
                if (boardState !== 0 || tmpElm.style.display !== "block") {return;}
                if (!evt) var evt = window.event;
                var keyNum = (evt.which) ? evt.which : evt.keyCode;
                if (keyNum === 32 || keyNum === 13) {
                    reloadGame();
                }
            };
            SNAKE.addEventListener(window, "keyup", kbTryAgainShortcut, true);
            
            SNAKE.addEventListener(tryAgainStart, "click", reloadGame, false);
            tmpElm.appendChild(tryAgainTxt);
            tmpElm.appendChild(tryAgainStart);
            return tmpElm;
        }

        me.resetBoard = function() {
            SNAKE.removeEventListener(elmContainer, "keydown", myKeyListener, false);
            mySnake.reset();
            elmLengthPanel.innerHTML = "Длина: 1";
            me.setupPlayingField();
        };

        me.getBoardState = function() {
            return boardState;
        };
            me.setBoardState = function(state) {
            boardState = state;
        };  
        me.getGridFoodValue = function() {
            return GRID_FOOD_VALUE;
        };
         
        me.getPlayingFieldElement = function() {
            return elmPlayingField;
        };
        
            me.setBoardContainer = function(myContainer) {
            if (typeof myContainer === "string") {
                myContainer = document.getElementById(myContainer);   
            }
            if (myContainer === elmContainer) {return;}
            elmContainer = myContainer;
            elmPlayingField = null;
            
            me.setupPlayingField();
        };
         
        me.getBoardContainer = function() {
            return elmContainer;
        };

        me.getBlockWidth = function() {
            return blockWidth;  
        };
         
        me.getBlockHeight = function() {
            return blockHeight;  
        };
        
            me.setupPlayingField = function () {
            
            if (!elmPlayingField) {createBoardElements();} // create playing field
            
            // calculate width of our game container
            var cWidth, cHeight;
            if (config.fullScreen === true) {
                cTop = 0;
                cLeft = 0;
                cWidth = getClientWidth()-5;
                cHeight = getClientHeight()-5;
                document.body.style.backgroundColor = "#FC5454";
            } else {
                cTop = config.top;
                cLeft = config.left;
                cWidth = config.width;
                cHeight = config.height;
            }
            
            // define the dimensions of the board and playing field
            var wEdgeSpace = me.getBlockWidth()*2 + (cWidth % me.getBlockWidth());
            var fWidth = Math.min(maxBoardWidth()-wEdgeSpace,cWidth-wEdgeSpace);
            var hEdgeSpace = me.getBlockHeight()*3 + (cHeight % me.getBlockHeight());
            var fHeight = Math.min(maxBoardHeight()-hEdgeSpace,cHeight-hEdgeSpace);
            
            elmContainer.style.left = cLeft + "px";
            elmContainer.style.top = cTop + "px";
            elmContainer.style.width = cWidth + "px";
            elmContainer.style.height = cHeight + "px";
            elmPlayingField.style.left = me.getBlockWidth() + "px";
            elmPlayingField.style.top  = me.getBlockHeight() + "px";
            elmPlayingField.style.width = fWidth + "px";
            elmPlayingField.style.height = fHeight + "px";
            
            // the math for this will need to change depending on font size, padding, etc
            // assuming height of 14 (font size) + 8 (padding)
            var bottomPanelHeight = hEdgeSpace - me.getBlockHeight();
            var pLabelTop = me.getBlockHeight() + fHeight + Math.round((bottomPanelHeight - 30)/2) + "px";
            
            elmAboutPanel.style.top = pLabelTop;
            elmAboutPanel.style.width = "450px";
            elmAboutPanel.style.left = Math.round(cWidth/2) - Math.round(450/2) + "px";
            
            elmLengthPanel.style.top = pLabelTop;
            elmLengthPanel.style.left = cWidth - 120 + "px";
            
            // if width is too narrow, hide the about panel
            if (cWidth < 700) {
                elmAboutPanel.style.display = "none";
            } else {
                elmAboutPanel.style.display = "block";
            }
            
            me.grid = [];
            var numBoardCols = fWidth / me.getBlockWidth() + 2;
            var numBoardRows = fHeight / me.getBlockHeight() + 2;
            
            for (var row = 0; row < numBoardRows; row++) {
                me.grid[row] = [];
                for (var col = 0; col < numBoardCols; col++) {
                    if (col === 0 || row === 0 || col === (numBoardCols-1) || row === (numBoardRows-1)) {
                        me.grid[row][col] = 1; // an edge
                    } else {
                        me.grid[row][col] = 0; // empty space
                    }
                }
            }
            
            myFood.randomlyPlaceFood();
            
            // setup event listeners
            
            myKeyListener = function(evt) {
                if (!evt) var evt = window.event;
                var keyNum = (evt.which) ? evt.which : evt.keyCode;

                if (me.getBoardState() === 1) {
                    if ( !(keyNum >= 37 && keyNum <= 40) ) {return;} // if not an arrow key, leave
                    
                    // This removes the listener added at the #listenerX line
                    SNAKE.removeEventListener(elmContainer, "keydown", myKeyListener, false);
                    
                    myKeyListener = function(evt) {
                        if (!evt) var evt = window.event;
                        var keyNum = (evt.which) ? evt.which : evt.keyCode;
                        
                        mySnake.handleArrowKeys(keyNum);
                        
                        evt.cancelBubble = true;
                        if (evt.stopPropagation) {evt.stopPropagation();}
                        if (evt.preventDefault) {evt.preventDefault();}
                        return false;
                    };
                    SNAKE.addEventListener( elmContainer, "keydown", myKeyListener, false);
                    
                    mySnake.rebirth();
                    mySnake.handleArrowKeys(keyNum);
                    me.setBoardState(2); // start the game!
                    mySnake.go();
                }
                
                evt.cancelBubble = true;
                if (evt.stopPropagation) {evt.stopPropagation();}
                if (evt.preventDefault) {evt.preventDefault();}
                return false;
            };
            
            // Search for #listenerX to see where this is removed
            SNAKE.addEventListener( elmContainer, "keydown", myKeyListener, false);
        };
        
        me.foodEaten = function() {
            elmLengthPanel.innerHTML = "Длина: " + mySnake.snakeLength;
            myFood.randomlyPlaceFood();
        };
        
        me.handleDeath = function() {
            var index = Math.max(getNextHighestZIndex( mySnake.snakeBody), getNextHighestZIndex( {tmp:{elm:myFood.getFoodElement()}} ));
            elmContainer.removeChild(elmTryAgain);
            elmContainer.appendChild(elmTryAgain);
            elmTryAgain.style.zIndex = index;
            elmTryAgain.style.display = "block";
            me.setBoardState(0);
        };
        
        config.fullScreen = (typeof config.fullScreen === "undefined") ? false : config.fullScreen;        
        config.top = (typeof config.top === "undefined") ? 0 : config.top;
        config.left = (typeof config.left === "undefined") ? 0 : config.left;
        config.width = (typeof config.width === "undefined") ? 400 : config.width;        
        config.height = (typeof config.height === "undefined") ? 400 : config.height;
        
        if (config.fullScreen) {
            SNAKE.addEventListener(window,"resize", function() {
                me.setupPlayingField();
            }, false);
        }
        
        me.setBoardState(0);
        
        if (config.boardContainer) {
            me.setBoardContainer(config.boardContainer);
        }
        
    }; // end return function
})();