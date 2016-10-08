var fs = require('fs');
var options = process.argv.slice(2);

if (options.length === 0) {
  helpFile();
}  else {
	switch(options[0]) {
		case 'help':
		helpFile();
		break;
		case 'list' :
		todoFile();
		break;
		case 'add' :
		addItem();
		break;
		case 'remove' :
		deleteItem(options[1]);
		break;
		case 'reset' :
		deleteAllItems();
		break;
	}
}
function helpFile() {
  fs.readFile(__dirname + '/help.txt',{encoding:'utf-8'},(error, data)=>{
  	(error) ?  console.log(error) : console.log(data) 
  });
}
function todoFile() {
	console.log('Your ToDo List:');
	fs.readFile(__dirname + '/todolist.txt','utf-8', (error,data)=>{
		if (error) {
			if (error.code === 'ENOENT') {
				console.log(' ToDo list is empty.....');
			} else {
				console.log(error)
			}
		}
		if (error===null) {
			data = data.split(/\n/);
			data = data.splice(0,data.length - 1);
			
			for (var i = 0; i <data.length; i++){
				var oneItem=data[i];
				console.log((i +1 )+' '+ oneItem)
			}
			if (data == 0){
				console.log(' ToDo list is empty.....')
			}
		}		
	});
}
function addItem() {

	var task = options.slice(1).join(' ') + '\n';
	
	fs.appendFile(__dirname + '/todolist.txt',task);
}
function deleteAllItems() {
		var deleteAllTasks = options.slice(1);
	fs.writeFile(__dirname + '/todolist.txt',deleteAllTasks, ()=>{console.log('All tasks deleted')})
}