var isEditor = false;

Events.on(ClientLoadEvent, () => {  

    let tablew = 50;
    let tableh = 50;

    var table = new Table().top().left();
    let button = TextButton("Off")
    table.add(button).size(tablew, tableh).padLeft(6).padTop(-6);
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
            

//        Log.info("Editor is" + isEditor);
    });
    

    Vars.ui.hudGroup.addChild(table);

});
