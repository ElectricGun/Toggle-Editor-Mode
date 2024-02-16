const config = JSON.parse(Jval.read(Vars.tree.get("data/config.hjson").readString()))

var active = false;
var table;

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
        if(!Vars.ui.hudfrag.shown || Vars.ui.consolefrag.shown() || Vars.ui.minimapfrag.shown() || Vars.net.client() || (Vars.state.rules.sector != null && config.cheatMode != true)) {
            return false;
        } else {
            return true;
        }
    };

    t.clicked(() => {
        if (Vars.net.client()) {
            Log.infoTag("Toggle-Editor", "Failure. Are you online?");
            return;
        }

        if (Vars.state.rules.sector != null && config.cheatMode != true) {
            Log.infoTag("Toggle-Editor", "Failure. Are you cheating? (Enable <cheatMode> in config to bypass this error)");
            return;
        }

        if (active != Vars.state.rules.editor) {
            Log.infoTag("Toggle-Editor", "Failure. Are you in actual edit mode?"); 
            return;
        }

        active = !active;
        Vars.state.rules.editor = active;
    });
    return t;
};

Events.on(ClientLoadEvent, () => {
    table = newTable();
})

Events.on(ResetEvent, () => {
    active = false;
    Vars.state.rules.editor = active;
})

Events.on(WorldLoadEvent, () => {

    active = false;

    let testUtils = Vars.mods.getMod("test-utils");
    let timeControl = Vars.mods.getMod("time-control");
    let upOffset = 0;

    try{
        Vars.ui.hudGroup.removeChild(table);
    } catch(exception) {
        // do something if error
        print(exception)
    };

    
    // set offset if timec and testutils //
    
    if (testUtils != null && testUtils.isSupported() && testUtils.enabled()) {
        if (Vars.mobile == true && Core.settings.getBool("console")) {
            upOffset += 60;
        }

        print(Vars.state.rules.sector != null)

        if (Vars.state.rules.sector != null) {
            upOffset += 60;

        } else {
            upOffset += 120;
        }
    };
    if (timeControl != null && timeControl.isSupported() && timeControl.enabled()) {
        upOffset += 68;
    };
    if (Vars.mobile == true) {
        upOffset += 46;
    };



    if (!Vars.state.rules.editor) {
        Vars.ui.hudGroup.addChild(table);
    };

    try {
        table.setPosition(0, Scl.scl(upOffset))
    } catch(e) {
        print(e)
    };
    try {
        if (active != Vars.state.rules.editor) {
            Vars.ui.hudGroup.removeChild(table)
        }
    } catch(exception) {
        // do something if error
        print(exception)
    };
});


Events.run(Trigger.update, () => {
    let isMenu = (Core.scene.getDialog() != null) && Vars.state.paused;
    
    if(active && isMenu) {
        Vars.state.rules.editor = false;
        active = false   ;
    };
});
