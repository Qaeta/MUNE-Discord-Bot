var Discord = require('discord.io');
var auth = require('./auth.json');
//var mune = require('./mune');

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
		answer += " with '" + main("intervention", 0) + "' intervention.";
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

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    console.log('Connected');
    console.log('Logged in as: ');
    console.log(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(', ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
				break;
			// !mune
            case 'mune':				
				if(args[2] === undefined){
					args[2] = 0;
				}
				
				switch(args[0]){
					case 'consult oracle':
						args[0] = 'oracle';
						break;
					case 'determine attitude':
						args[0] = 'attitude';
						break;
				}
				
				var result = main(args[0], args[1], args[2]);
                bot.sendMessage({
                    to: channelID,
                    message: result
                });
				break;
            // Just add any case commands if you want to..
         }
     }
});