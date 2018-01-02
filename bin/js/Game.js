/**
 * 程序入口类
 * 不建议在此处做太多操作
 */
var Game = /** @class */ (function () {
    function Game() {
        //子弹发射的偏移位置
        this.bulletPos = [[0], [-15, 15], [-30, 0, 30], [-45, -15, 15, 45]];
        //关卡的等级
        this.level = 0;
        // 积分成绩
        this.score = 0;
        // 子弹级别
        this.bulletLevel = 0;
        // 升级等级所需子弹数量
        this.levelUpScore = 10;
        //敌机血量
        this.hps = [1, 2, 3];
        // 敌机速度
        this.speeds = [3, 2, 1];
        // 敌机被击半径
        this.radius = [15, 30, 70];
        //初始化引擎
        Laya.init(480, 852, Laya.WebGL);
        Laya.stage.scaleMode = "showall";
        Laya.stage.alignH = "center";
        Laya.stage.screenMode = "vertical";
        Laya.loader.load("res/atlas/war.atlas", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);
    }
    Game.prototype.onLoaded = function () {
        //创建背景
        var bg = new Background();
        //将背景添加到舞台
        Laya.stage.addChild(bg);
        this.roleBox = new Laya.Sprite();
        Laya.stage.addChild(this.roleBox);
        // 创建游戏界面
        this.gameInfo = new GameInfo();
        Laya.stage.addChild(this.gameInfo);
        // 创建角色
        this.hero = new Role();
        // 将角色添加到舞台
        this.roleBox.addChild(this.hero);
        // Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        //创建一个主循环,创建敌人
        // Laya.timer.frameLoop(1, this, this.onLoop);
        this.restart();
    };
    Game.prototype.onLoop = function () {
        // 遍历舞台上所有的飞机,更改其状态
        for (var i = this.roleBox.numChildren - 1; i > -1; i--) {
            //此处用var，该如何？需要去了解ts
            var role = this.roleBox.getChildAt(i);
            if (role && role.speed) {
                // 根据飞机的速度改变位置
                role.y += role.speed;
                // 敌机移动到显示区域外,就移除掉
                if (role.y > 1000 || !role.visible || role.isBullet && role.y < -20) {
                    role.removeSelf();
                    //回收之前重置属性
                    role.isBullet = false;
                    role.visible = true;
                    Laya.Pool.recover('role', role);
                }
            }
            //处理发射子弹的逻辑
            if (role.shootType > 0) {
                var time = Laya.Browser.now();
                if (time > role.shootTime) {
                    //更新下次射击时间
                    role.shootTime = time + role.shootInterval;
                    //根据不同的子弹类型，设置不同的数量及位置
                    var pos = this.bulletPos[role.shootType - 1];
                    for (var index = 0; index < pos.length; index++) {
                        // 从对象池中创建子弹
                        var bullet = Laya.Pool.getItemByClass('role', Role);
                        // 初始化子弹信息
                        bullet.init('bullet1', role.camp, 1, -4 - role.shootType - Math.floor(this.level / 15), 1, 1);
                        // 设置角色类型为子弹
                        // bullet.isBullet = true;
                        // 设置子弹位置
                        bullet.pos(role.x + pos[index], role.y - role.hitRadius - 10);
                        // 添加到主舞台
                        this.roleBox.addChild(bullet);
                    }
                    //添加子弹播放音效
                    Laya.SoundManager.playSound('res/sound/bullet.mp3');
                }
            }
        }
        // 检测碰撞
        for (var i = this.roleBox.numChildren - 1; i > -1; i--) {
            //获取对象1
            var role1 = this.roleBox.getChildAt(i);
            if (role1.hp < 1)
                continue;
            for (var j = i - 1; j > 0; j--) {
                var role2 = this.roleBox.getChildAt(j);
                if (!role2.visible)
                    continue;
                //如果角色未死亡，并且阵营不同才进行碰撞
                if (role2.hp > 0 && role1.camp != role2.camp) {
                    //计算碰撞区域
                    var hitRadius = role1.hitRadius + role2.hitRadius;
                    //根据距离判断是否怕碰撞
                    if (Math.abs(role1.x - role2.x) < hitRadius && Math.abs(role1.y - role2.y) < hitRadius) {
                        this.lostHp(role1, 1);
                        this.lostHp(role2, 1);
                        // 每掉一滴血，积分加一
                        this.score++;
                        this.gameInfo.score(this.score);
                        // 积分大于升级积分，则升级
                        if (this.score > this.levelUpScore) {
                            // 升级关卡
                            this.level++;
                            // 在界面显示等级
                            this.gameInfo.level(this.level);
                            // 提高下一等级的升级难度
                            this.levelUpScore += this.level * 5;
                        }
                    }
                }
            }
        }
        //如果是主角死亡，则停止游戏循环
        if (this.hero.hp < 1) {
            Laya.SoundManager.playSound('res/sound/game_over.mp3');
            Laya.timer.clear(this, this.onLoop);
            this.gameInfo.infoLabel.text = "游戏结束,分数：" + this.score + "\n点击重新开始游戏";
            this.gameInfo.infoLabel.once(Laya.Event.CLICK, this, this.restart);
        }
        // 每隔三十帧创建新的敌机
        // if (Laya.timer.currFrame % 60 === 0) {
        //     this.createEnmy(2);
        // }
        // 关卡越高，创建敌机的间隔越短
        var cutTime = this.level < 30 ? this.level * 2 : 60;
        //关卡越高，敌机的速度越快
        var speedUp = Math.floor(this.level / 6);
        // 关卡越高，敌机的血量越高
        var hpUp = Math.floor(this.level / 8);
        // 关卡越高，敌机的数量越多
        var numUp = Math.floor(this.level / 10);
        // 生产小飞机
        if (Laya.timer.currFrame % (80 - cutTime) === 0) {
            this.createEnmy(0, 2 + numUp, 3 + speedUp, 1);
        }
        // 生产middle飞机
        if (Laya.timer.currFrame % (150 - cutTime * 4) === 0) {
            this.createEnmy(1, 1 + numUp, 2 + speedUp, 2 + hpUp * 2);
        }
        // 生产boss飞机
        if (Laya.timer.currFrame % (150 - cutTime * 4) === 0) {
            this.createEnmy(2, 1, 1 + speedUp, 10 + hpUp * 6);
            Laya.SoundManager.playSound('res/sound/enemy3_out.mp3');
        }
    };
    Game.prototype.lostHp = function (role, lostHp) {
        role.hp -= lostHp;
        if (role.heroType === 2) {
            //每次吃一个子弹道具，子弹升级加1
            this.bulletLevel++;
            //子弹每升两级，子弹数量加1，做大4
            this.hero.shootType = Math.min(Math.floor(this.bulletLevel / 2) + 1, 4);
            //子弹级别越高，发射频率越快
            this.hero.shootInterval = 500 - 20 * (this.bulletLevel > 20 ? 20 : this.bulletLevel);
            //隐藏道具
            role.visible = false;
            Laya.SoundManager.playSound('res/sound/achievement.mp3');
        }
        else if (role.heroType === 3) {
            //每次吃一个血瓶，血量加一
            this.hero.hp++;
            this.gameInfo.hp(this.hero.hp);
            if (this.hero.hp > 10) {
                this.hero.hp = 10;
            }
            //隐藏道具
            role.visible = false;
            Laya.SoundManager.playSound('res/sound/achievement.mp3');
        }
        else if (role.hp > 0) {
            role.playAction('hit');
        }
        else {
            if (role.isBullet) {
                role.visible = false;
            }
            else {
                role.playAction('down');
            }
        }
        if (role.hp > 0) {
            //为死亡，播放爆炸动画
            role.playAction('hit');
        }
        else {
            if (role.heroType > 0) {
                role.visible = false;
            }
            else {
                if (role.type != "hero") {
                    Laya.SoundManager.playSound('res/sound/' + role.type + "down.mp3");
                }
                role.playAction('down');
                // 集中boss，掉落血瓶和道具
                if (role.type === "enemy3") {
                    //随机子弹？或者血瓶
                    var type = Math.random() < 0.6 ? 2 : 3;
                    var item = Laya.Pool.getItemByClass('role', Role);
                    item.init('ufo' + (type - 1), role.camp, 1, 1, 15, type);
                    item.pos(role.x, role.y);
                    this.roleBox.addChild(item);
                }
            }
        }
        //设置主角的血量值
        if (role === this.hero) {
            this.gameInfo.hp(role.hp);
        }
    };
    Game.prototype.onMouseMove = function () {
        this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY);
    };
    Game.prototype.createEnmy = function (type, num, speed, hp) {
        for (var i = 0; i < num; i++) {
            // 随机出现敌人
            // let r: number = Math.random();
            // 根据随机数,随机敌人
            // let type: number = r < 0.7 ? 0 : r < 0.95 ? 1 : 2;
            // 创建敌人
            var enemy = Laya.Pool.getItemByClass("role", Role);
            // 初始化敌人数据
            enemy.init("enemy" + (type + 1), 1, hp, speed, this.radius[type]);
            // 随机位置
            enemy.pos(Math.random() * 400 + 40, Math.random() * 200 - 100);
            //添加到舞台上
            this.roleBox.addChild(enemy);
        }
    };
    Game.prototype.pause = function () {
        //停止主循环
        Laya.timer.clear(this, this.onLoop);
        // 停止鼠标事件
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
    };
    Game.prototype.resume = function () {
        Laya.timer.frameLoop(1, this, this.onLoop);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
    };
    Game.prototype.restart = function () {
        // 重置属性
        this.score = 0;
        this.level = 0;
        this.levelUpScore = 10;
        this.bulletLevel = 0;
        //重置ui显示
        this.gameInfo.reset();
        //初始化主角
        this.hero.init('hero', 0, 3, 0, 30);
        //射击类型
        this.hero.shootType = 1;
        // 设置角色位置
        this.hero.pos(200, 500);
        // 重置角色射击间隔
        this.hero.shootInterval = 500;
        this.hero.visible = true;
        for (var i = this.roleBox.numChildren - 1; i > -1; i--) {
            var role = this.roleBox.getChildAt(i);
            if (role != this.hero) {
                role.removeSelf();
                //回收之前重置显示信息
                role.visible = true;
                Laya.Pool.recover('role', Role);
            }
        }
        this.resume();
    };
    return Game;
}());
// 启动游戏
var gameInstance = new Game();
//# sourceMappingURL=Game.js.map