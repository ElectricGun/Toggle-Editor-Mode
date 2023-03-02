var isEditor = false;

function newTable () {
    let t = new Table();
    t.bottom().left();
    t.table(Tex.pane, t => {
        let b = new Button(Styles.grayt);
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
        isEditor = !isEditor;
        print(isEditor)
    })
    return t;
};

Events.on(ClientLoadEvent, () => {
    var table = newTable()
    Vars.ui.hudGroup.addChild(table);
    if (Vars.mobile == true) {
        table.moveBy(0, Scl.scl(45))
    }
});

Events.on(ResetEvent, () => {
    isEditor = false;
});

var variable;
var variable2;

Events.run(Trigger.update, () => {
    let isMenu = Core.scene.getDialog() == Vars.ui.paused
    if (variable != isMenu) {variable = isMenu; variable2 = true;};              
    if (isMenu == true) {variable2 = false}                                      //if player exits from pause menu, variable2 = true.

    if(variable2 != true) {Vars.state.rules.editor = isEditor;}
    else {Time.runTask (60, () => {Vars.state.rules.editor = isEditor; variable2 = false;})}    //delay prevents going back to edit mode immediately upon clicking Save and Quit
    if (isMenu) {Vars.state.rules.editor = false};
});
