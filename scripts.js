/* THIS IS NEW INFO!  Entered on github */

/* BEGIN GAME-WIDE FUNCTIONS */

/* USEFUL CODE FOR USING TARGET OF HANDLER
	var targ = event.target || event.srcElement;
    if (targ.nodeType == 3) targ = targ.parentNode; 
*/

/* BEGIN CLICK MANAGEMENT */

// Stop dragging highlight over images
window.ondragstart = function() { return false; } ;

// Make all forms set onclicks to their buttons for submitting answer
var answerButtons = document.getElementsByName("button");
function addSubmit(buttonIndex) {
	answerButtons[buttonIndex].setAttribute("onclick", "checkAnswer(this.form, this.form.name)");
for (each in answerButtons) {
	addSubmit(each);
}

// Make specific characters clickable for giveChallenge
function addClick(charId) { 
		document.getElementById(charId).firstChild.setAttribute("onclick", "giveChallenge('"+charId+"');");
} 
function removeClick(charId) {
	if (document.getElementById(charId).firstChild.hasAttribute("onclick")) document.getElementById(charId).firstChild.removeAttribute("onclick");
}
// TEST addClick() and removeClick() by clicking id heart1
addClick("record-keeper");
document.getElementById("heart1").onclick = function() { 
	if (document.getElementById("record-keeper").firstChild.hasAttribute("onclick")) removeClick("record-keeper");
	else addClick("record-keeper");
}

/* END CLICK MANAGEMENT */
/* BEGIN VISIBILTY AND FOCUS MANAGEMENT */

// Use toggleVisible for another function to assign something to be hidden or unhidden.  Normally an event like passing a challenge would change visibility of something.  Pass "1" to show and "0" to hide for an elemId. 
function toggleVisible(bool, elemId) {
	var elem = document.getElementById(elemId);
	if (bool) {
		if ( elem.className.match(/(?:^|\s)hidden(?!\S)/) ) {
			elem.className = elem.className.replace ( /(?:^|\s)hidden(?!\S)/g , '' );
		}
	}
	else {
		elem.className += " hidden";
	}
}
// TEST!! toggleVisible() using item4 to toggle item5.
document.getElementById("item4").onclick = function() {
	if (document.getElementById("item5").className.indexOf("hidden") > -1) { 
		toggleVisible(1, "item5") 
	}
	else toggleVisible(0, "item5");
}

// Switch which character has focus-image class, which makes it glowing and enabled for clicking for the next challenge.
function switchFocus(oldFocusId, newFocusId) {
	var oldFocusElem = document.getElementById(oldFocusId);
	if ( oldFocusElem.firstChild.firstChild.className.match(/(?:^|\s)focus-image(?!\S)/) ) {
		oldFocusElem.firstChild.firstChild.className = oldFocusElem.firstChild.firstChild.className.replace ( /(?:^|\s)focus-image(?!\S)/g , '' );
		removeClick(oldFocusId);
	}
	document.getElementById(newFocusId).firstChild.firstChild.className += " focus-image";
	addClick(newFocusId);
}
// TEST!! switch focus-image by clicking id hero to change focus to next character.
 // Normally passing a challenge would switch focus-image.
document.getElementById("hero").onclick = function() {
	if (document.getElementById("record-keeper").firstChild.firstChild.className.match(/(?:^|\s)focus-image(?!\S)/)) {
		switchFocus("record-keeper", "weaponsmith");
	}
	else if (document.getElementById("weaponsmith").firstChild.firstChild.className.match(/(?:^|\s)focus-image(?!\S)/)) {
		switchFocus("weaponsmith", "torch-bearer");
	}
	else if (document.getElementById("torch-bearer").firstChild.firstChild.className.match(/(?:^|\s)focus-image(?!\S)/)) {
		document.getElementById("illegal-monster").className = document.getElementById("illegal-monster").className.replace ( /(?:^|\s)hidden(?!\S)/g , '' );
		switchFocus("torch-bearer", "illegal-monster");
	}
	else if (document.getElementById("illegal-monster").firstChild.firstChild.className.match(/(?:^|\s)focus-image(?!\S)/)) {
		switchFocus("illegal-monster", "record-keeper");
	}
}

/* END VISIBILTY AND FOCUS MANAGEMENT */
/* BEGIN CHAMBER MANAGEMENT */ 
var chamberArray = [
	["intro", "Intro"],
	["mouth", "Mouth of the Dungeon"],
	["uncertainty", "Chamber of Uncertainty"],
	["emptiness", "Echo-Filled Emptiness"],
	["corridor", "Clockwork Corridor"],
	["labyrinth", "Labyrinth of Treasures"],
	["asylum", "Asylum of Endless Evil"],
	["lake", "Dark Lake of the Lost"],
	["field", "Field of Pure Potential"],
	["vortex", "Vortex of The Power"],
	["end", "Endgame"] 
	]
	
var currentChamberIndex = 1;
var currentChamberId;
var currentChamber;
var currentChamberInfo;
function setChamber(index) {
	currentChamberId = chamberArray[index][0];
	currentChamber = chamberArray[index][1];
	currentChamberInfo = document.getElementById("current-chamber-info");
	currentChamberInfo.innerHTML = currentChamber;
	document.getElementById(currentChamberId).className = "";
}
setChamber(currentChamberIndex);

function nextChamber() {
	var oldChamber = document.getElementById(currentChamberId);
	oldChamber.className = "hidden";
	currentChamberIndex++;
	setChamber(currentChamberIndex);
}

// TEST!! Click item1 to move to next Chamber
document.getElementById("item1").onclick = function() {
	nextChamber() 
}

/* END CHAMBER MANAGEMENT */
/* END GAME-WIDE FUNCTIONS */

/* BEGIN STATUS BAR */

// Toggle info boxes for status bar icons
function toggleStatusInfo(bool) {
    var targ = event.target || event.srcElement;
    if (targ.nodeType == 3) targ = targ.parentNode; // defeat Safari bug
	var infoBox = targ.nextSibling;
	if (bool) {
		infoBox.className = "info-box";
	}
	else {
		infoBox.className = "hidden";
	}
}
// Toggle status info for status bar's hero icon
document.getElementById("hero-icon").onclick = function() {
	if (document.getElementById("hero-icon").nextSibling.className === "hidden") {
		toggleStatusInfo(1);
	}
	else {
		toggleStatusInfo(0);
	}
}

function updatePoints(addPoints) {
	var totalPoints = parseInt(document.getElementById("points-total").innerHTML) + addPoints;
	document.getElementById("points-total").innerHTML = totalPoints;
}

function loseHeart() {
	for (var i = 4; i >= 0; i--) {
		var heartNumber = "heart" + i;
		if (i === 0) {
			alert("Your body was destroyed! The Power has regenerated your body at the beginning of the current chamber, " + currentChamber +". \n\nThe Power does not wish you to leave.  You feel in your core you are destined to It. \n\nContinue...")
			// \n\nCopy your Password to resume from this point: " + savePointPassword );
			break;
		}
		var heartClass = document.getElementById(heartNumber).getAttribute("class");
		if (heartClass === "hidden") {
			continue;
		}
		else if (heartClass === null) {
			document.getElementById(heartNumber).setAttribute("class", "hidden");
			document.getElementById("heart-alert").className = ""; 		    setTimeout(function hideHeartAlert() { 
				document.getElementById("heart-alert").className = "hidden"
				}, 2000);
			break; 		 
		}
	}
}
// TEST!! of loseHeart() by clicking heart2
document.getElementById("heart2").onclick = function() { loseHeart() };

/* END STATUS BAR  */

/* BEGIN UNIVERSAL DUNGEON FUNCTIONS */

function moveHeroTo(top, left) {
	var heroStyle = document.getElementById("hero").style;
	heroStyle.top = top;
	heroStyle.left = left;
}

/* // This checks answer and feeds to pass or fail functions. Parameter is for this.form delivered by answer button.
// FIX TO MAKE SPECIFIC TO EACH INPUTBOX

function checkAnswer(form, name) {
// SPLICE OUT the charId from the name (get indexOf "-form" and splice before it);
// THEN use feed answer to separate function below for each form.  
// SWITCH (name) CASE: "record-keeper-form-1"
// THEN checkRecordKeeper1(form);
// BREAK;

*/

function giveChallenge(charId) {
	toggleVisible(1, charId+"-challenge");
}
function closeChallenge(charId) {
	toggleVisible(0, charId+"-challenge");
}


function showHint(charId) {
	toggleVisible(1, charId+"-hint");
}

function showInstructions(charId) {
	toggleVisible(1, charId+"-instructions");
}

function showAnswer(charId) {
	toggleVisible(1, charId+"-answer");
}

/* END UNIVERSAL DUNGEON FUNCTIONS */
/* BEGIN INTRO */

document.getElementById("intro").onclick = function() {
	var targ = document.getElementById("intro");
	for (var i = 0; i < targ.childNodes.length; i++) {
		if (i === (targ.childNodes.length - 2)) {
			nextChamber();
			break;
		}
		else if (targ.childNodes[i].className === "") {
			targ.childNodes[i].className = "hidden";
			targ.childNodes[i+1].className = "";
			break;
		}
	}
}

/* END INTRO */
/* BEGIN Mouth of the Dungeon */
/* END Mouth of the Dungeon */

/* BEGIN Chamber of Uncertainty */
/* END Chamber of Uncertainty */

/* BEGIN Echo-Filled Emptiness */
/* END Echo-Filled Emptiness */

/* BEGIN Clockwork Corridor */
/* END Clockwork Corridor  */

/* BEGIN Labyrinth of Treasures */
/* END Labyrinth of Treasures */

/* BEGIN Asylum of Endless Evil */
/* END Asylum of Endless Evil */

/* BEGIN Dark Lake of the Lost */
/* END Dark Lake of the Lost */

/* BEGIN Field of Pure Potential */
/* END Field of Pure Potential */

/* BEGIN Vortex of The Power */
/* END Vortex of The Power */
