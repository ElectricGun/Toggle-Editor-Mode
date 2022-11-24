

Events.on(ClientLoadEvent, () => {  

    let bool = false;

    let tablew = 50;
    let tableh = 50;

    var table = new Table().top().left();
    let button = TextButton("Off")
    table.add(button).size(tablew, tableh).padLeft(6).padTop(-6);
    table.y = (tablew, tableh)

    button.clicked(() => {
        
        bool = !bool;
        
        if (Vars.state.rules.sector || Vars.net.client()) {
    
            Log.info("Cannot");
            bool = false;
            
        } 
    
        Vars.state.rules.editor = bool;
            
        button.setText(bool ? "On" : "Off");

        Log.info("Editor is" + bool);
    });

    Vars.ui.hudGroup.addChild(table);

});
