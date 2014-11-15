var fs = require('fs');
var async = require('async');
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var accountTypes = ["Investment", "401K", "Savings", "Checking"];
var currencyTypes = ["USD", "YEN", "EURO", "POUNDS STERLING", "YUAN", "PESO"];
var maxBalance = 9999999;

createSampleDatabase('./firstnames.txt', './lastnames.txt', './outputDatabase.json', function(err){
	if(err){
		return console.error(err);
	}

	return console.log('Completed!');

});

function createSampleDatabase(firstNamesTxt, lastNamesTxt, outputJson, callback){

	async.map([firstNamesTxt, lastNamesTxt],
		function(file, callback){
			getNameData(file, callback);
		},
		function(err, results){
			if(err){
				console.error('failed!!');
				return callback(err);
			}
			var firstNames = results[0];
			var lastNames = results[1];
			var persons = [];
			var totalAccounts = lastNames.length * firstNames.length;
			console.log('Computing ' + totalAccounts + ' accounts');

			rl.question("Press enter to continue", function(answer){

				var count = 0;
				//go through every combination of names and create a person 
				//object out of it with bank accounts with each
				for(var i in lastNames){
					for(var z in firstNames){
						var accounts = [];
						var numAccounts = getRandomInt(1, 10);
						//generate random person
						var person = {
							first_name : firstNames[i],
							last_name : lastNames[z]
						};
						//generate numAccounts random bank accounts
						for(var j = 0; j < numAccounts; j++){
							accounts.push({
								account_type: accountTypes[getRandomInt(0, accountTypes.length)],
								account_balance : getRandomArbitrary(0, maxBalance),
								currency : currencyTypes[getRandomInt(0, currencyTypes.length)]
							});
						}
						//insert the accounts into the person object
						person.accounts = accounts;
						persons.push(person);

						console.log('Progress: ' + Math.round((persons.length / totalAccounts) * 100 ) + '%');
					}
				}
				fs.writeFile(outputJson, JSON.stringify(persons), {encoding:'utf-8'}, function(err){
					if(err){
						return callback(err);
					}

					return callback(null);
				})
			});
			

		});
}

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//takes a tab delimted file and parses out the first column as the name
function getNameData(fileName, callback){
	fs.readFile(fileName, {encoding: 'utf-8'}, function(err, data){
		var names = [];
		if(err){
			return console.error(err);
		}

		var lines = data.trim().split('\n');

		for(var i in lines){
			var words = lines[i].split('\t');
			names.push(words[0]);
		}

		var output = JSON.stringify(names);

		callback(null, names);
	});
}
