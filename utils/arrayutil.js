export function sum(){
	var sumResault = 0;
	return this.reduce(function(preVal,curVal){
		return sumResault = preVal + curVal
	});
	return sumResault;
}
