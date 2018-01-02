/**
 * 角色类
 */
class Role extends Laya.Sprite {

    private body: Laya.Animation;

    // 判断是否缓存了动画
    private static cached: boolean = false;

    // 飞机的类型
    public type: string;
    // 阵营
    public camp: number;
    // 血量
    public hp: number;
    // 敌机的速度
    public speed: number;
    //自身可以被击中的半径
    public hitRadius: number;

    // 射击的类型
    public shootType: number = 0;
    // 射击的间隔
    public shootInterval: number = 500;//毫秒
    // 下次射击的时间
    public shootTime: number = Laya.Browser.now() + 2000;//毫秒
    // 当前动作
    public action: string = '';
    // 是否是子弹
    public isBullet: boolean = false;

    //0 普通 1子弹 2炸药 3补给品
    public heroType: number = 0;

    constructor() {
        super();
    }

    public init(_type: string, _camp: number, _hp: number, _speed: number, _hitRadius: number, _heroType: number = 0): void {
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
    }
    playAction(action: string): void {
        //记录当前播放动画类型
        this.action = action;
        //根据action播放不同的动画
        this.body.play(0, true, this.type + "_" + action);
        let bound: Laya.Rectangle = this.body.getBounds();
        this.body.pos(-bound.width / 2, -bound.height / 2);
    }
    onPlayComplate(): void {
        //如果是机毁动画
        if (this.action === 'down') {
            this.body.stop();
            this.visible = false;
        } else if (this.action === 'hit') {
            //被击中动画，继续播放飞行动画
            this.playAction('fly');
        }
    }
}