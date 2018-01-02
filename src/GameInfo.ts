class GameInfo extends ui.GameInfoUI {
    constructor() {
        super();
        // 注册点击事件，点击之后暂停游戏
        this.pauseBtn.on(Laya.Event.CLICK, this, this.onPauseBtnClick);

        //init
        this.reset();
    }
    public reset(): void {
        this.infoLabel.text = "";
        this.hp(5);
        this.level(0);
        this.score(0);
    }
    onPauseBtnClick(e: Laya.Event): void {
        e.stopPropagation();//阻止事件冒泡
        //暂停游戏
        this.infoLabel.text = "游戏已暂停，点击任意地方恢复游戏";
        //暂停游戏
        gameInstance.pause();
        Laya.stage.once(Laya.Event.CLICK, this, this.onStageClick);
    }
    onStageClick(e: Laya.Event): void {
        this.infoLabel.text = "";
        gameInstance.resume();
    }
    public hp(v: number): void {
        this.hpLabel.text = "HP:" + v;
    }
    public level(v: number): void {
        this.levelLabel.text = "Level:" + v;
    }
    public score(v: number): void {
        this.scoreLabel.text = "Level" + v;
    }
}