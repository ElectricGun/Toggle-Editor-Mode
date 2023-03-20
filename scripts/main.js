var isEditor = false;
var active = false;

function newTable() {
    let t = new Table();
    t.bottom().left();
    t.table(Tex.pane, t => {
        let b = new Button(Styles.none);
        let icon = new TextureRegionDrawable(Blocks.switchBlock.uiIcon);
        b.button(icon,() => {
    
        });
        t.add(b).size(50, 50);
        t.y = (50, 50);
        });
    t.visibility = () => {
        if(!Vars.ui.hudfrag.shown || Vars.ui.consolefrag.shown() || Vars.ui.minimapfrag.shown()) {
            return false;
        } else {
            return true;
        }
    };
    t.clicked(() => {
        if (Vars.state.rules.sector || Vars.net.client()) {
                    print("That would be cheating");
                    return;
                }
        else if(active != Vars.state.rules.editor) {print("Are you in actual edit mode? Please don't do that"); return;}
        isEditor = !isEditor;
        active = !active;
        Vars.state.rules.editor = active
        print(isEditor)
    })
    return t;
};

Events.on(WorldLoadEvent, () => {
    try{Vars.ui.hudGroup.removeChild(table)} catch(exception) {print("n")};
    isEditor = false;
    active = false;
    if (!Vars.state.rules.editor) {
        var table = newTable();
        Vars.ui.hudGroup.addChild(table);
        if (Vars.mobile == true) {
            table.moveBy(0, Scl.scl(45));
        };
        print("y")
    };
    try{if(active != Vars.state.rules.editor) {Vars.ui.hudGroup.removeChild(table)}} catch(exception) {print("n")};
});

Events.on(ResetEvent, () => {

});

var variable;
var variable2;
var task;
Events.run(Trigger.update, () => {                               //horribly written pls fix
    let isMenu = Core.scene.getDialog() == Vars.ui.paused;
    if(active) {
        if (variable != isMenu) {variable = isMenu; variable2 = true;
            Vars.state.rules.editor = false;
            task = (Timer.schedule (() => {Vars.state.rules.editor = isEditor;
            variable2 = false;}, 1))};              //delay prevents going back to edit mode immediately upon clicking Save and Quit

        if (isMenu == true) {variable2 = false; if (task != null) {task.cancel()}}
        if(variable2 == false) {Vars.state.rules.editor = isEditor;}
        //else{}    
        if (isMenu) {Vars.state.rules.editor = false};
    };
    //print(active)
});
