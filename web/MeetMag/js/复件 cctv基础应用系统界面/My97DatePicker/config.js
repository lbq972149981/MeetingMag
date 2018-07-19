var $lang = {};

var langList = 
[
	{name:'en',		charset:'UTF-8'},
	{name:'zh-cn',	charset:'gb2312'},
	{name:'zh-tw',	charset:'GBK'}
];

var skinList = 
[
	{name:'default',	charset:'gb2312'},
	{name:'whyGreen',	charset:'gb2312'}
];

function $getCurr(arr,name){
	var isFound = false;
	var item = arr[0];
	for(var i=0;i<arr.length;i++){
		if(arr[i].name == name){
			item = arr[i];
			break;
		}
	}
	return item;
}