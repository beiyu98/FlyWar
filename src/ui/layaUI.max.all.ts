
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class GameInfoUI extends View {
		public pauseBtn:Laya.Button;
		public hpLabel:Laya.Label;
		public levelLabel:Laya.Label;
		public scoreLabel:Laya.Label;
		public infoLabel:Laya.Label;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Button","props":{"y":15,"x":323,"var":"pauseBtn","stateNum":1,"skin":"war/btn_pause.png"}},{"type":"Label","props":{"y":21,"x":16,"width":67,"var":"hpLabel","text":"HP:0","height":27,"fontSize":24,"color":"#29ef29","align":"center"}},{"type":"Label","props":{"y":20,"x":109,"width":71,"var":"levelLabel","text":"level:50","height":25,"fontSize":24,"color":"#f8ebea","align":"center"}},{"type":"Label","props":{"y":21,"x":221,"width":70,"var":"scoreLabel","text":"score:20","height":25,"fontSize":24,"color":"#cee74e","align":"center"}},{"type":"Label","props":{"y":375,"x":43,"wordWrap":true,"width":317,"var":"infoLabel","text":"战斗结束","height":139,"fontSize":24,"color":"#f1e4e4","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameInfoUI.uiView);

        }

    }
}
