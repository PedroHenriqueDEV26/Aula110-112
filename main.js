var prediction1 = ""
var prediction2 = ""

Webcam.set({
    width: 310,
    height: 290,
    imageFormat: "png",
    pngQuality: 90
})


camera = document.getElementById("camera");
Webcam.attach("#camera")

function takeSnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id = "imgCap"  src= "' + data_uri + '"/>'
    })
}

console.log("ml5 versão", ml5.version)

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/J2Ip11PDF/model.json", modelLoaded);

function modelLoaded() {
    console.log("modelo carregado")
}

function speak(){
    var synth = window.speechSynthesis;
    var prev1 = " A primeira previsão é: "+prediction1;
    var prev2 = "A segunda previsão é: "+prediction2;

    var utterThis = new SpeechSynthesisUtterance(prev1+prev2);
    synth.speak(utterThis) 

}


function Check(){
    var takeImg = document.getElementById("imgCap");
    classifier.classify(takeImg, gotResult)
}

function gotResult(error,results){
    if(error){
        console.error(error)

    }

    else{
        console.log(results)
        document.getElementById("emotionTag").innerHTML = results[0].label;
        document.getElementById("emotionTag2").innerHTML = results[1].label;

        prediction1 = results[0].label;
        prediction2 = results[1].label;

        speak();
        if(prediction1 == "feliz"){
            document.getElementById("emj").innerHTML = "😁"
        }
        
        if(prediction2 == "feliz"){
            document.getElementById("emj2").innerHTML = "😁"
        }

        if(prediction1 == "triste"){
            document.getElementById("emj").innerHTML = "😢"
        }

        if(prediction2 == "triste"){
            document.getElementById("emj2").innerHTML = "😢"
        }

        if(prediction1 == "irritado"){
            document.getElementById("emj").innerHTML = "😡"
        }

        if(prediction2 == "irritado"){
            document.getElementById("emj2").innerHTML = "😡"
        }
        
    }
    
}