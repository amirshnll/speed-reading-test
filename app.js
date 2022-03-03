var myWords = [];
var counter = 0;

function start_reading() {
	var passageread = document.getElementById("passageread");
	var textreading = document.getElementById("textreading");
	var mainbodysection = document.getElementById("mainbodysection");
	var mainreadingsection = document.getElementById("mainreadingsection");
	var backbtn = document.getElementById("backbtn");
	var starttime = document.getElementById("starttime");

	if(passageread.value == "") {
		alert("Please check inputs.");
		this.return_navigation();
		return;
	}

	textreading.innerHTML = passageread.value;
	mainreadingsection.style.display = "block";
	mainbodysection.style.display = "none";
	backbtn.style.display = "inline";

	starttime.value = (new Date()).getTime();
}

function start_recognizing() {
	var passagerecognize = document.getElementById("passagerecognize");
	var wordrecognizing = document.getElementById("wordrecognizing");
	var mainbodysection = document.getElementById("mainbodysection");
	var mainrecognizingsection = document.getElementById("mainrecognizingsection");
	var backbtn = document.getElementById("backbtn");
	var wordtime = document.getElementById("wordtime");
	var starttime = document.getElementById("starttime");

	var wordtimevalue = parseInt(wordtime.value);
	if(isNaN(wordtimevalue) || wordtimevalue < 1) {
		wordtimevalue = 1000; // 1 second
	}

	if(passagerecognize.value == "") {
		alert("Please check inputs.");
		this.return_navigation();
		return;
	}

	mainrecognizingsection.style.display = "block";
	mainbodysection.style.display = "none";
	backbtn.style.display = "inline";

	passagerecognizevalue = passagerecognize.value;
	var passagerecognizevalue = passagerecognizevalue.replace(/[^\w\s]|_/g, "")
        .replace(/\s+/g, " ");

    passagerecognizevalue = this.remove_stopwords(passagerecognizevalue.toLowerCase());
    this.myWords = passagerecognizevalue.split(" ");

	wordrecognizing.innerHTML = this.myWords[counter];
	counter = counter + 1;

	starttime.value = (new Date()).getTime();

    const intervals = setInterval(function() {
		var wordrecognizing = document.getElementById("wordrecognizing");
		wordrecognizing.innerHTML = this.myWords[counter];
		counter = counter + 1;
		if(this.myWords.length == counter - 1 || this.myWords[counter] == 'undefined') {
			clearInterval(intervals);
			this.endreading();
			return;
		}
	}, wordtimevalue);
}

function return_navigation() {
	var mainreadingsection = document.getElementById("mainreadingsection");
	var mainrecognizingsection = document.getElementById("mainrecognizingsection");
	var mainbodysection = document.getElementById("mainbodysection");
	var oversection = document.getElementById("oversection");
	var backbtn = document.getElementById("backbtn");
	var starttime = document.getElementById("starttime");

	oversection.style.display = "none";
	mainreadingsection.style.display = "none";
	mainrecognizingsection.style.display = "none";
	backbtn.style.display = "none";
	mainbodysection.style.display = "block";

	starttime.value = 0;
	this.myWords = [];
	this.counter = 0;
}

function endreading() {
	var starttime = document.getElementById("starttime");
	var oversection = document.getElementById("oversection");
	var mainreadingsection = document.getElementById("mainreadingsection");
	var overtimevalue = document.getElementById("overtimevalue");
	var mainrecognizingsection = document.getElementById("mainrecognizingsection");

	oversection.style.display = "block";
	mainreadingsection.style.display = "none";
	mainrecognizingsection.style.display = "none";

	var starttimevalue = parseInt(starttime.value);
	if(isNaN(starttimevalue)) {
		starttime.value = 0;
		alert("Please check inputs.");
		this.return_navigation();
		return;
	}
	starttime.value = 0;

	if(starttimevalue > 0) {
		var nowtime = (new Date()).getTime();
		overtimevalue.innerHTML = ( (nowtime - starttimevalue) / 1000 ).toString();
	}

	starttime.value = 0;
	this.myWords = [];
	this.counter = 0;
}

function remove_stopwords(str) {
    var stopwords = ['a', 'an', 'i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now'];
    var res = [];
    var words = str.split(' ');
    for(var i=0;i<words.length;i++) {
       var word_clean = words[i].split(".").join("");
       if(!stopwords.includes(word_clean)) {
           res.push(word_clean);
       }
    }
    return(res.join(' '));
}  