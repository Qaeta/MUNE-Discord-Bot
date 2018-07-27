//Global Variables
var intervention_points = 0;

//Dice Rollers
function rollD6(likeliness, oracle) {
	var final_roll = 0;
	
	if (likeliness == 2) {
		var roll_1 = rollD6(1);
		var roll_2 = rollD6(1);
		
		if (roll_1 > roll_2) {
			final_roll = roll_1;
		} else {
			final_roll = roll_2;
		}
	} else if (likeliness == 0) {
		var roll_1 = rollD6(1);
		var roll_2 = rollD6(1);
		
		if (roll_1 < roll_2) {
			final_roll = roll_1;
		} else {
			final_roll = roll_2;
		}
	} else {
		final_roll = Math.floor(Math.random() * 6) + 1;
	}
	
	if (likeliness == 0 && final_roll == 6 && oracle == true) {
		intervention_points++;
	}
	
	return final_roll;
}

//Meaty Functions
function consultOracle(question, likeliness) {
	var roll = rollD6(likeliness, true);
	var answer = "";
	
	switch (roll) {
		case 1:
			answer = "No, and...";
			break;
		case 2:
			answer = "No, but...";
			break;
		case 3:
			answer = "No";
			break;
		case 4:
			answer = "Yes";
			break;
		case 5:
			answer = "Yes, but...";
			break;
		case 6:
			answer = "Yes, and...";
			break;
	}
	
	if (intervention_points >= 3) {
		answer += " with '" + main("intervention", 0, 0) + "' intervention.";
	}
	
	return "Question: " + question + " Answer: " +answer;
}


function causeIntervention() {
	var roll = rollD6(0, false);
	var answer = "";
	
	switch (roll) {
		case 1:
			answer = "New Entity";
			break;
		case 2:
			answer = "Entity Positive";
			break;
		case 3:
			answer = "Entity Negative";
			break;
		case 4:
			answer = "Advance Plot";
			break;
		case 5:
			answer = "Regress Plot";
			break;
		case 6:
			answer = "Wild";
			break;
	}
	
	intervention_points = 0;
	
	return answer;
}

function determineAttitude(entity) {
	var roll = rollD6(0, false);
	var answer = "";
	
	switch (roll) {
		case 1:
			answer = "Hostile";
			break;
		case 2:
			answer = "Hostile";
			break;
		case 3:
			answer = "Neutral";
			break;
		case 4:
			answer = "Neutral";
			break;
		case 5:
			answer = "Friendly";
			break;
		case 6:
			answer = "Friendly";
			break;
	}
	
	return entity + " is " + answer;
}

//Main
function main(action, question, likeliness) {
	var result = "";
	
	switch (action) {
		case "oracle":
			result = consultOracle(question, likeliness);
			break;
		case "intervention":
			result = causeIntervention();
			break;
		case "attitude":
			result = determineAttitude(question);
			break;
		case "details":
			result = question;
			break;
	}
	
	return result;
}

