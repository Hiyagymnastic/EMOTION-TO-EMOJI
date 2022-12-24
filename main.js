prediction1 = "";
prediction2 = "";
Webcam.set({
    width: 350,
    height: 300,
    image_farmat: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach(camera);

function takesnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id = "image" src="' + data_uri + '">'
    });
}
console.log(ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/aybPXa1ms/model.json', modelLoaded);
function modelLoaded() {
    console.log("Model is Loaded");
}
function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is : " + prediction1;
    speak_data_2 = "And the second prediction is  : " + prediction2;
    utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}
function check() {
    pic = document.getElementById("image");
    classifier.classify(pic, gotResults);
}
function gotResults(e, r) {
    if (e) {
        console.error(e);
    }
    else {
        console.log(r);
        prediction1 = r[0].label;
        prediction2 = r[1].label;
        document.getElementById("result_emotion_name").innerHTML = prediction1;
        document.getElementById("result_emotion_name_2").innerHTML = prediction2;
        speak();
        if (prediction1 == "Smile") {
            document.getElementById("update_emoji").innerHTML="&#128522";
        }
        else if (prediction1=="crazy") {
            document.getElementById("update_emoji").innerHTML="&#129322;";
        } else if (prediction1=="angry") {
            document.getElementById("update_emoji").innerHTML="&#128545;";
        } else {
            document.getElementById("update_emoji").innerHTML="&#128566;";
        }
        if (prediction2 == "Smile") {
            document.getElementById("update_emoji_2").innerHTML="&#128522";
        }
        else if (prediction2=="crazy") {
            document.getElementById("update_emoji_2").innerHTML="&#129322;";
        } else if (prediction2=="angry") {
            document.getElementById("update_emoji_2").innerHTML="&#128545;";
        } else {
            document.getElementById("update_emoji_2").innerHTML="&#128566;";
        }
    }
}