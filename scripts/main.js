var isEditor = false;

Events.on(ClientLoadEvent, () => {  

    let tablew = 50;
    let tableh = 50;
    let padTop = 6;
    let padLeft = 6;

    var table = 0;
    if (Vars.mobile == true) {
        table = new Table().bottom().left();
    } else  {
        table = new Table().top().left();
    };

    let button = TextButton("Off")
    table.add(button).size(tablew, tableh).padLeft(padLeft).padTop(padTop);
    table.y = (tablew, tableh)
    
    Events.run(Trigger.update, () => {
        isEditor = Vars.state.rules.editor;
        button.setText(isEditor ? "On" : "Off");
    });

    button.clicked(() => {
        
        isEditor = !isEditor;
        
        if (Vars.state.rules.sector || Vars.net.client()) {
    
            Log.info("That would be cheating");
            isEditor = false;
            
        } 
    
        Vars.state.rules.editor = isEditor;
            
    });
    

    Vars.ui.hudGroup.addChild(table);

});
