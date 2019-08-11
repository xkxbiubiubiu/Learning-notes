// 这个棋盘是有宽度和高度的，所以我们规定一下，X，Y长度都是30
var X_LEN = 30;
var Y_LEN = 30;
// 格子宽度
var SQUARE_WIDTH = 20;
// 棋盘位置
var BASE_X = 100;
var BASE_Y = 10;
// 蛇的速度，500ms移动一下,移动一个格子
var SPEED = 500;
// 最基本的对象，就是方格
// square方格的意思
function Square (x1, y1) {
    this.x = x1;
    this.y = y1;
    this.view = null;
    this.width = SQUARE_WIDTH;//宽度我们刚才定义过了
    this.height = SQUARE_WIDTH;//高度也定义好了
}
// 然后这个方格是有一个接口的，是可以触及的对吧，
Square.prototype.touch = function () {}
// 通过继承方法来继承
var Floor = JsUtil.extends(Square);
// 障碍物也继承Square
var Stone = JsUtil.extends(Square);
// 墙也继承，墙是继承障碍物
var Wall = JsUtil.extends(Stone);
// 蛇身体也继承Square
var SnackBody = JsUtil.extends(Square);
// 蛇头也继承
var SnackHead = JsUtil.extends(Square);
// 我们需要三个对象，一个是蛇，一个是棋盘，整个这个游戏也是一个对象
var Snack = JsUtil.single();
var Ground = JsUtil.single();
var Game = JsUtil.single();
var Food = JsUtil.single();

// 我们触及之后会有什么事情发生？触及地板会移动，触及食物会吃东西，触及障碍物就会挂掉，
// 触及方法的枚举
var TouchEventEnum = {Move : "Move", EAT : "Eat", DEAD : "Dead"}

// 初始化游戏，
var game = new Game();
// 分数
game.score = 0;
// 计时器
game.timer = null;
// 有一个ground地板，也是空
game.ground = null;
// 有一个蛇，也是空
game.snack = null;

game.food = null
// 游戏进行初始化
game.init = function () {
    
    //初始化广场
    var gameGround = new Ground();
    // 然后初始化一下
    gameGround.init();
    
    this.ground = gameGround;



    //初始化蛇
    var gameSnack = new Snack();
    gameSnack.init(gameGround);
    this.snack = gameSnack;

	//初始化蛇 
    var food = new Food();
    food.init(gameGround, this);

}
// 执行功能，run
game.run = function () {
    
    this.timer = setInterval(function () {
        var result = game.snack.move(game);
    }, SPEED);
    // 要监听蛇运行时的操作。
    document.onkeydown = function(e) {
        var keyNum = window.event ? e.keyCode : e.which;
        // 上
        if (keyNum == 38 && game.snack.direction != DirectionEnum.DOWN) {
            game.snack.direction = DirectionEnum.UP;
            // 下
        } else if (keyNum == 40 && game.snack.direction != DirectionEnum.UP) {
            game.snack.direction = DirectionEnum.DOWN;
            // 左
        } else if (keyNum == 37 && game.snack.direction != DirectionEnum.RIGHT) {
            game.snack.direction = DirectionEnum.LEFT;
            // 右
        } else if (keyNum == 39 && game.snack.direction != DirectionEnum.LEFT) {
            game.snack.direction = DirectionEnum.RIGHT;
        }
    }
    var result = game.snack.move(game);
}
// 结束功能 game.over
game.over = function () {
    alert("你的得分：" + game.score);
    clearInterval(game.timer);
}

// 初始化广场
var ground = new Ground();
// 表格是一个二维方程组，new一个数组
ground.squareTable = new Array(Y_LEN);
// 宽度
ground.xLen = X_LEN;
// 高度
ground.yLen = Y_LEN;
//起点是XY的坐标
ground.basePointX = BASE_X;
ground.basePointY = BASE_Y;
// 广场的视图，
ground.view = null;
// 初始化
ground.init = function () {
    //初始化广场
    // 这一段其实就是动态的去创建这个表格，先创建一个div标签
    var viewGround = document.createElement("div");
    // 相对定位
    viewGround.style.position = "relative";
    // 一共有多少块，然后乘每块的高度或者宽度
    viewGround.style.width = this.xLen * SQUARE_WIDTH + "px";
    viewGround.style.height = this.yLen * SQUARE_WIDTH + "px";
    viewGround.style.display = "inline-block";
    // 这是设置初始化坐标
    viewGround.style.left = this.basePointX + "px";
    viewGround.style.top = this.basePointY + "px";
    // 设置个背景色
    viewGround.style.background = "green";
    // 要记得初始化一下蛇的方法
    document.body.appendChild(viewGround);
    
    // 初始化围墙，和地板
    for (var i = 0 ; i < this.yLen ; i ++ ){
        for (var j = 0 ; j < this.xLen ; j ++) {
            var square;
            if (i == 0 || j == 0 || i == this.yLen - 1 || j == this.xLen - 1){
                // 为什么倒着传？横坐标是内层，纵坐标是外层
                square = SquareFactory.create("Wall", j, i);
            } else {
                square = SquareFactory.create("Floor", j, i);
            }
            // 当j为0的时候，再造一个数组
            if (j == 0){
                this.squareTable[i] = new Array(this.X_LEN);
            }
            // 然后把这些东西添加到这个squareTable中
            this.squareTable[i][j] = square;
            viewGround.appendChild(square.view);
        }
    }
    
    this.view = viewGround;
}
// 拆地板的方法
// 指定一个要删掉的位置
ground.remove = function (x, y) {
    // 界面上删除
    this.view.removeChild(this.squareTable[y][x].view);
    // 数据上删除
    this.squareTable[y][x] = null;
}
// 添加地板的方法
// 指定一个添加的方法，传入坐标
ground.append = function (x, y, square) {
    // 数据上添加
    this.squareTable[y][x] = square;
    // 界面上添加
    this.view.appendChild(this.squareTable[y][x].view);
}

// 网格工厂
function SquareFactory () {}

SquareFactory.create = function (type, x, y) {
    // 判断方法
    if (typeof SquareFactory[type] !== "function"){
        throw "Error";
    }
    
    var result = SquareFactory[type](x, y);
    return result;
}
// 地板
SquareFactory.Floor = function (x1, y1) {
    var floor = new Floor();
    // 初始化一下小方块，有地板，x值，y值，颜色为黄色，然后有一个触碰事件
    this.commonInit(floor, x1, y1, "orange", TouchEventEnum.Move);
    return floor;
}
// 初始小方格
SquareFactory.commonInit = function (obj, x1, y1, color, touchEvent){
    obj.x = x1;
    obj.y = y1;
    obj.view = document.createElement("div");
    obj.view.style.position = "absolute";
    obj.view.style.display = "inline-block";
    obj.view.style.width = SQUARE_WIDTH + "px";
    obj.view.style.height = SQUARE_WIDTH + "px";
    obj.view.style.background = color;
    obj.view.style.left = obj.x * SQUARE_WIDTH + "px";
    obj.view.style.top = obj.y * SQUARE_WIDTH + "px";
    obj.touch = function () {
        return touchEvent;
    }
}
// food 
SquareFactory.Food = function (x1, y1) {
    var food = new Food();
    this.commonInit(food, x1, y1, "green", TouchEventEnum.EAT);
    return food;
}
// 石头
SquareFactory.Stone = function (x1, y1) {
    var stone = new Stone();
    this.commonInit(stone, x1, y1, "gray", TouchEventEnum.DEAD);
    return stone;
}
// 墙黑色
SquareFactory.Wall = function (x1, y1) {
    var wall = new Wall();
    this.commonInit(wall, x1, y1, "black", TouchEventEnum.DEAD);
    return wall;
}
// 蛇头
SquareFactory.SnackHead = function (x1, y1) {
    var snackHead = new SnackHead();
    this.commonInit(snackHead, x1, y1, "red", TouchEventEnum.DEAD);
    return snackHead;
}
// 蛇身子
SquareFactory.SnackBody = function (x1, y1) {
    var snackBody = new SnackBody();
    this.commonInit(snackBody, x1, y1, "blue", TouchEventEnum.DEAD);
    return snackBody;
}



//造蛇 
var snack = new Snack();
snack.head = null;
snack.tail = null;
// 然后还有蛇行走的方向
snack.direction = 0;
// 方向枚举
var DirectionEnum = {
    UP : {x : 0, y : -1},
    DOWN : {x : 0, y : 1},
    LEFT : {x : -1, y : 0},
    RIGHT : {x : 1, y : 0}
}

// 初始化
snack.init = function (gameGround) {
    // 先创建一个头，在3，1的位置，两个身子
    var tempHead = SquareFactory.create("SnackHead", 3, 1);
    var tempBody1 = SquareFactory.create("SnackBody", 2, 1);
    var tempBody2 = SquareFactory.create("SnackBody", 1, 1);
    // 这是放蛇头
    gameGround.remove(3, 1);
    gameGround.append(3, 1, tempHead);
    // 这是放蛇身子
    gameGround.remove(2, 1);
    gameGround.append(2, 1, tempBody1);
    gameGround.remove(1, 1);
    gameGround.append(1, 1, tempBody2);
    // 下面部分是链表
    tempHead.next = tempBody1;
    // 头的last是空
    tempHead.last = null;
    // 身子1的last是头
    tempBody1.last = tempHead;
    // 身子1的next是身子2
    tempBody1.next = tempBody2;
    // 身子2
    tempBody2.next = null;
    // 身子2的last就是身子1
    tempBody2.last = tempBody1;
    // 然后指向一下游戏中的头和尾巴
    this.head = tempHead;
    this.tail = tempBody2;
    // 再指明一个方向，初始化over
    this.direction = DirectionEnum.RIGHT;
}


// 蛇move
snack.move = function (game) {
    
    var square = game.ground.squareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    // 蛇需要有个策略方法
    if (typeof this.strategy[square.touch()] === "function") {
        this.strategy[square.touch()](game, this, square, false);
    }
}
// 蛇策略
snack.strategy = {
    Move : function (game, snack, square, fromEat) {
        // 头变身子
        var tempHead = snack.head.next;
        var newBody = SquareFactory.create("SnackBody", snack.head.x, snack.head.y);
        newBody.next = tempHead;
        tempHead.last = newBody;
        tempHead = newBody;
        game.ground.remove(snack.head.x, snack.head.y);
        game.ground.append(tempHead.x, tempHead.y, tempHead);
        // 头变身子了，是不是要长一个新的头
        //创建新的头
        var newHead = SquareFactory.create("SnackHead", square.x, square.y);
        // 双向的链表，成对出现更牢靠
        newHead.next = tempHead;
        tempHead.last = newHead;
        game.ground.remove(square.x, square.y);
        game.ground.append(square.x, square.y, newHead);
        snack.head = newHead;
        snack.head.last = null;
        // 删除尾巴
        if (!fromEat) {
            var floor = SquareFactory.create("Floor", snack.tail.x, snack.tail.y);
            game.ground.remove(floor.x, floor.y);
            game.ground.append(floor.x, floor.y, floor);
            snack.tail = snack.tail.last;
            snack.tail.next = null;
        }
    },
    Eat : function (game, snack, square) {
        game.score ++;
        this.Move(game, snack, square, true);
        food.init(game.ground, game);
    },
    Dead : function (game) {
        game.over();
    }
}

// 食物初始化
var food = new Food()
food.init = function (gameGround, game){
    var me = this, //保证this指向food实例
        positionObj = me.setPosition(me.getPosition(), game),
        food = SquareFactory.create("Food", positionObj.x, positionObj.y);
    gameGround.remove(positionObj.x, positionObj.y);
    gameGround.append(positionObj.x, positionObj.y, food);
}

// 食物坐标
food.setPosition = function (positionObj, game) {
    var obj = positionObj;
    while (!this.checkPosition(obj, game)) {
        obj = this.getPosition();
    }
    return obj;
}

// 随机生成坐标
food.getPosition = function () {
    return {
        x: this.getMathRandom(),
        y: this.getMathRandom()
    };
}

food.getMathRandom = function () {
    return parseInt(Math.random() * 28 + 1) ;
}

//保证食物出现的位置不再蛇身和蛇头上
food.checkPosition = function (positionObj, game) {
    // 查询链表
    var snackHead = game.snack.head;
    while(snackHead.next) {
        if (positionObj.x === snackHead.x && positionObj.y === snackHead.y) {
            return false;
        }
        snackHead = snackHead.next;
    }
    return true;
}