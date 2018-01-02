/**
 * 背景容器精灵
 */
class Background extends Laya.Sprite {

    //背景1精灵
    private bg1: Laya.Sprite;

    //背景2精灵
    private bg2: Laya.Sprite;

    constructor() {
        super();
        this.init();
    }

    init(): void {
        //创建背景1精灵
        this.bg1 = new Laya.Sprite();
        //背景1精灵加载图片资源，图片资源路径是相对于index.html文件的位置
        this.bg1.loadImage("war/background.png");
        //背景容器精灵添加图片精灵
        this.addChild(this.bg1);

        //创建背景2精灵
        this.bg2 = new Laya.Sprite();
        //背景2精灵加载图片资源，图片资源路径是相对于index.html文件的位置
        this.bg2.loadImage("war/background.png");
        //背景2的初始位置
        this.bg2.pos(0,-852);
        //背景容器精灵添加图片精灵
        this.addChild(this.bg2);

        //创建一个帧循环
        Laya.timer.frameLoop(1, this, this.onLoop)
    }

    onLoop(): void {
        //背景容器每帧向下移动一个像素
        this.y += 1;
        if (this.bg1.y + this.y >= 852) {
            this.bg1.y -= 852 * 2;
        }
        if (this.bg2.y + this.y >= 852) {
            this.bg2.y -= 852 * 2;
        }
    }
}