var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 角色类
 */
var Role = /** @class */ (function (_super) {
    __extends(Role, _super);
    function Role() {
        var _this = _super.call(this) || this;
        // 射击的类型
        _this.shootType = 0;
        // 射击的间隔
        _this.shootInterval = 500; //毫秒
        // 下次射击的时间
        _this.shootTime = Laya.Browser.now() + 2000; //毫秒
        // 当前动作
        _this.action = '';
        // 是否是子弹
        _this.isBullet = false;
        //0 普通 1子弹 2炸药 3补给品
        _this.heroType = 0;
        return _this;
    }
    Role.prototype.init = function (_type, _camp, _hp, _speed, _hitRadius, _heroType) {
        if (_heroType === void 0) { _heroType = 0; }
        this.type = _type;
        this.camp = _camp;
        this.hp = _hp;
        this.speed = _speed;
        this.hitRadius = _hitRadius;
        this.heroType = _heroType;
        if (!Role.cached) {
            Role.cached = true;
            Laya.Animation.createFrames(["war/hero_fly1.png", "war/hero_fly2.png"], "hero_fly");
            Laya.Animation.createFrames(["war/hero_down1.png", "war/hero_down2.png", "war/hero_down3.png", "war/hero_down4.png"], 'hero_down');
            Laya.Animation.createFrames(["war/enemy1_fly1.png"], "enemy1_fly");
            Laya.Animation.createFrames(["war/enemy1_down1.png", "war/enemy1_down2.png", "war/enemy1_down3.png", "war/enemy1_down4.png"], "enemy1_down");
            Laya.Animation.createFrames(["war/enemy2_fly1.png"], "enemy2_fly");
            Laya.Animation.createFrames(["war/enemy2_hit.png"], "enemy2_hit");
            Laya.Animation.createFrames(["war/enemy2_down1.png", "war/enemy2_down2.png", "war/enemy2_down3.png", "war/enemy2_down4.png"], "enemy2_down");
            Laya.Animation.createFrames(["war/enemy3_fly1.png", "war/enemy3_fly2.png"], "enemy3_fly");
            Laya.Animation.createFrames(["war/enemy3_hit.png"], "enemy3_hit");
            Laya.Animation.createFrames(["war/enemy3_down1.png", "war/enemy3_down2.png", "war/enemy3_down3.png",
                "war/enemy3_down4.png", "war/enemy3_down5.png", "war/enemy3_down6.png"], "enemy3_down");
            Laya.Animation.createFrames(["war/bullet1.png"], "bullet1_fly");
            // 缓存强化包
            Laya.Animation.createFrames(['war/ufo1.png'], "uto1_fly");
            //缓存医疗包
            Laya.Animation.createFrames(['war/ufo2.png'], 'ufo2_fly');
        }
        if (!this.body) {
            // 创建一个动画作为飞机的身体
            this.body = new Laya.Animation();
            this.addChild(this.body);
            //添加动画播放完成事件
            this.body.on(Laya.Event.COMPLETE, this, this.onPlayComplate);
        }
        // 播放飞机动画
        this.playAction('fly');
    };
    Role.prototype.playAction = function (action) {
        //记录当前播放动画类型
        this.action = action;
        //根据action播放不同的动画
        this.body.play(0, true, this.type + "_" + action);
        var bound = this.body.getBounds();
        this.body.pos(-bound.width / 2, -bound.height / 2);
    };
    Role.prototype.onPlayComplate = function () {
        //如果是机毁动画
        if (this.action === 'down') {
            this.body.stop();
            this.visible = false;
        }
        else if (this.action === 'hit') {
            //被击中动画，继续播放飞行动画
            this.playAction('fly');
        }
    };
    // 判断是否缓存了动画
    Role.cached = false;
    return Role;
}(Laya.Sprite));
//# sourceMappingURL=Role.js.map