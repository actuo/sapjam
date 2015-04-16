
/** Stores data in the OpenSocial gadget */
function addInput(){
	// Getting the state
	var state = wave.getState();
	// Push textbox value into the array and set the textbox to blank
	var url = document.getElementById('textBox').value;
	document.getElementById('textBox').value = '';
	
	// Submit url to storage
	state.submitDelta({'snapshot':url});
}

// Renders the gadget
function renderInfo() {
    /** Get state */
    if (!wave.getState()) {
        return;
    }
    var state = wave.getState();
    var url = state.get('snapshot');

    if(url){
    	var frame_snap='<iframe width="100%" src="'+url+'" name="iframe_a" height="300"></iframe>';
	document.getElementById('body').innerHTML = frame_snap;
	document.getElementById('body').innerHTML = 'snapshot url:'+url;
	var html = '<input type="text" id="textBox" value=""/><button id="addInput" onclick="addInput()">update Snapshot URL</button>';
    	document.getElementById('footer').innerHTML = html;
    }
    else{
    	var html = '<input type="text" id="textBox" value=""/><button id="addInput" onclick="addInput()">Add Snapshot URL</button>';
    	document.getElementById('footer').innerHTML = html;
    }
    /** Adjust window size dynamically */
    gadgets.window.adjustHeight();
}

// Initializes gadget, sets callbacks
function init() {
    if (wave && wave.isInWaveContainer()) {
    	// Loads the gadget's initial state and the subsequent changes to it
        wave.setStateCallback(renderInfo);
        
        // Loads participants and any changes to them
        wave.setParticipantCallback(renderInfo);
    }
}

// Initializes gadget after receiving a notification that the page is loaded and the DOM is ready.
gadgets.util.registerOnLoadHandler(init);
