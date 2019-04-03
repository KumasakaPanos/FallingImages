'usestrict'
var picturesrc="img/";
pictures = new Array();
let picIndex = 0;
let allFound = false;
let pdList = new Array();
let npdList = new Array();


//Use 2 sets of arrays to avoid having to add values to the start of the array and then readjusting the entire array's indices.
let pdList1 = new Array();
let npdList1 = new Array();

while(allFound==false){
	let tempIMG = document.createElement("IMG");
	tempIMG.src = picturesrc + picIndex + ".png";
	tempIMG.id="img"+picIndex;
	tempIMG.class="image";
	tempIMG.style.position = "absolute";
	tempIMG.style.left=Math.random(100)*100+"%"
	tempIMG.style.top="-100%";
	tempIMG.display="block";
	if(picIndex>=11){allFound=true};
	pictures[picIndex] = tempIMG;
	picIndex++;
	}
	
	for(let i = 0; i<picIndex/2; i++){
		//need to verify number uniqueness here
		let currVal = Math.floor(Math.random()*12);
		currVal = uniquenessVerification(currVal,pdList);
		pdList[i] = currVal;
	}
	
	//generate an arraylist npdList containing each number pdList does not
	let npdIndex = 0;
	for(i = 0; i<picIndex;i++){
		console.log(i);
		if(!pdList.includes(i)){
			npdList.push(i);
			npdIndex++;
			console.log(npdIndex);
		}
	}
	console.log(pdList);
	console.log(npdList);
	
	for(i=0; i<=pdList.length; i++){
		
		let pdTemp = pdList.pop();
		let npdTemp = npdList.pop();
		let refreshTime = Math.floor((Math.random()*20)+5)*1000;
		pdList1.push(npdTemp);
		npdList1.push(pdTemp);
		$("imgParent").append(pictures[pdTemp]);
		timeout(pictures[pdTemp],refreshTime);
	
		console.log("pl",pdList,"npl",npdList,"p1",pdList1,"n1",npdList1);
	}
	

function uniquenessVerification(val, arr){
	pdList.forEach(function(num){
		if(val==num){
			val = Math.floor(Math.random()*12);
			val = uniquenessVerification(val,arr);
		}
	})
	return val;
}
	
function timeout(el,time){
	$("#img"+el.id).stop();
	console.log(el);
	$("#img"+el.id).remove();
	console.log(el);
	let refreshTime = Math.floor((Math.random()*20)+5)*1000;
	
	el = pictures[pdList.pop()];
	
	//pop value from pd list, use it instead of the random generation below.
	pdList1.push(npdList.pop());
	npdList1.push(Number(el.id.slice(el.id.length-1)));
	
	if(pdList.length==0||npdList.length==0){
		console.log(pdList1,npdList1)
		pdList=pdList1;
		npdList=npdList1;
		pdList1=new Array();
		npdList1=new Array();
	}
	
	//place that value into npd list and place what was there into pd list.
	setTimeout(function(){timeout(el,refreshTime);
	$("#img"+el.id).remove();
	$("#imgParent").append(el);
	$("#"+el.id).animate({top:'0%'},1);
	$("#"+el.id).animate({top:'100%'},time);
	el.style.left=Math.random(100)*100+"%";
	},time)

}