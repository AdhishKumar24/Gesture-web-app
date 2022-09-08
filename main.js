https://teachablemachine.withgoogle.com/models/Z7MuNCJvN/model.json


prediction_1 = ""
prediction_2 = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});
Webcam.attach("#camera")

function selfie() {
    Webcam.snap(function (img) {
        console.log(img)
        document.getElementById("result").innerHTML = "<img  id='imagecheck' src='" + img + "'>"
    });

}

console.log(ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Z7MuNCJvN/model.json", model);

function model() {
    console.log("model loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is" + prediction_1;
    speak_data_2 = "The second prediction is" + prediction_2;
    var speechsynth = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(speechsynth);
}

function check() {
    img = document.getElementById("imagecheck")
    classifier.classify(img, getOutput)
}

function getOutput(error, ans) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(ans)
        document.getElementById("result_emotion_name").innerHTML = ans[0].label
        document.getElementById("result_emotion_name2").innerHTML = ans[1].label
        prediction_1 = ans[0].label
        prediction_2 = ans[1].label
        speak()
        if (prediction_1 == "Happy") {
            document.getElementById("update_emoji_1").innerHTML = "&#128516;"
        }
        if (prediction_1 == "Sad") {
            document.getElementById("update_emoji_1").innerHTML = "&#128532;"
        }
        if (prediction_1 == "Angry") {
            document.getElementById("update_emoji_1").innerHTML = "&#128548;"
        }
        if (prediction_2 == "Happy") {
            document.getElementById("update_emoji_2").innerHTML = "&#128516;"
        }
        if (prediction_2 == "Sad") {
            document.getElementById("update_emoji_2").innerHTML = "&#128532;"
        }
        if (prediction_2 == "Angry") {
            document.getElementById("update_emoji_2").innerHTML = "&#128548;"
        }
    }
}