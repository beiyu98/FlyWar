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
var GameInfo = /** @class */ (function (_super) {
    __extends(GameInfo, _super);
    function GameInfo() {
        var _this = _super.call(this) || this;
        // 注册点击事件，点击之后暂停游戏
        _this.pauseBtn.on(Laya.Event.CLICK, _this, _this.onPauseBtnClick);
        //init
        _this.reset();
        return _this;
    }
    GameInfo.prototype.reset = function () {
        this.infoLabel.text = "";
        this.hp(5);
        this.level(0);
        this.score(0);
    };
    GameInfo.prototype.onPauseBtnClick = function (e) {
        e.stopPropagation(); //阻止事件冒泡
        //暂停游戏
        this.infoLabel.text = "游戏已暂停，点击任意地方恢复游戏";
        //暂停游戏
        gameInstance.pause();
        Laya.stage.once(Laya.Event.CLICK, this, this.onStageClick);
    };
    GameInfo.prototype.onStageClick = function (e) {
        this.infoLabel.text = "";
        gameInstance.resume();
    };
    GameInfo.prototype.hp = function (v) {
        this.hpLabel.text = "HP:" + v;
    };
    GameInfo.prototype.level = function (v) {
        this.levelLabel.text = "Level:" + v;
    };
    GameInfo.prototype.score = function (v) {
        this.scoreLabel.text = "Level" + v;
    };
    return GameInfo;
}(ui.GameInfoUI));
//# sourceMappingURL=GameInfo.js.map