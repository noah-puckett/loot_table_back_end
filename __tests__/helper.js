/* eslint-disable no-console */
function flatten(obj1, obj2) {
	const valid = obj1;
	console.log(valid);
	const k2 = Object.keys(obj2);
	console.log(k2);
    
	k2.forEach(key => {
		console.log(key, valid[key], obj2[key]);
		valid[key] = obj2[key];
	});
    
	return valid;
}

const originalObj = {
	name:'branch', 
	desc:'a brown stick with a particular bend', 
	value:'0 gp', 
	rarity: 1 
};

const newObj = {
	desc:'a bendy boi', 
	value:'1 gp',
	rarity: 3
};

// eslint-disable-next-line no-console
console.log(flatten(originalObj, newObj));

// const { 
//     originalName, 
// 	originalDescription, 
// 	originalValue, 
// 	originalRarity 
// } = originalArray;

// `UPDATE loot SET name = $1, description = $2, value = $3, rarity = $4 WHERE id =${req.params.id};`, 
// name || originalName, 
// description || originalDescription, 
// value || originalValue, 
// rarity || originalRarity;


// for(let i = 0; i < arr1.length; i++) {
// 	if(arr2[i]) {
// 		valid.push(arr2[i]);
// 	} 
// 	else {
// 		valid.push(arr1[i]);
// 	}
// }
