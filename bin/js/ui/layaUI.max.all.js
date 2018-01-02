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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var GameInfoUI = /** @class */ (function (_super) {
        __extends(GameInfoUI, _super);
        function GameInfoUI() {
            return _super.call(this) || this;
        }
        GameInfoUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameInfoUI.uiView);
        };
        GameInfoUI.uiView = { "type": "View", "props": {}, "child": [{ "type": "Button", "props": { "y": 15, "x": 323, "var": "pauseBtn", "stateNum": 1, "skin": "war/btn_pause.png" } }, { "type": "Label", "props": { "y": 21, "x": 16, "width": 67, "var": "hpLabel", "text": "HP:0", "height": 27, "fontSize": 24, "color": "#29ef29", "align": "center" } }, { "type": "Label", "props": { "y": 20, "x": 109, "width": 71, "var": "levelLabel", "text": "level:50", "height": 25, "fontSize": 24, "color": "#f8ebea", "align": "center" } }, { "type": "Label", "props": { "y": 21, "x": 221, "width": 70, "var": "scoreLabel", "text": "score:20", "height": 25, "fontSize": 24, "color": "#cee74e", "align": "center" } }, { "type": "Label", "props": { "y": 375, "x": 43, "wordWrap": true, "width": 317, "var": "infoLabel", "text": "战斗结束", "height": 139, "fontSize": 24, "color": "#f1e4e4", "align": "center" } }] };
        return GameInfoUI;
    }(View));
    ui.GameInfoUI = GameInfoUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map