const question = document.getElementById("question");
// Array.from() secenekleri bir diziye donusturmek icin kullandim // burada 4 ayri sik elde etmis oluyoruz
const choices = Array.from(document.getElementsByClassName("choice-text"));
//const questionCounterText = document.getElementById("questionCounter");//soru gostergesi//2-2 silinen
const progressText = document.getElementById("progressText");//progres ust yazi//2-3
const progressBarFull = document.getElementById("progressBarFull");//soru gostergesi//3-3
const scoreText = document.getElementById("score");//soru score gostergesi 2-1
const timeText = document.getElementById('timeText');//bu score gostergesi olacak
const timeBarFull = document.getElementById('timeBarFull');

let timeCounter = 0;//// time bitis
let currentQuestion = {};//ekrana yazilan soru her sorudan sonra gelen yeni soruyu temsil eder obje kullandik soru ve 4 sikki var
let acceptingAnswers = false;
let score = 0;//
let questionCounter = 0;
let availableQuesions = [];//bunu kullanmamim nedeni sorulan sorulari asil datadan siliyoruz ve hic sorulmamis soru gelmesini sagliyoruz

timerPrint = () => {
  setInterval(() => {
    timeCounter++;
    timeText.innerText = `Time ${timeCounter}/${maxtime}`;
    timeBarFull.style.width = `${(timeCounter / maxtime) * 100}%`;
    if (timeCounter == 10) {
      getNewQuestion()
      timeCounter = 0
    }
  }, 1000)
}
timerPrint();
//CONSTANTS sabit degiskenler
const CORRECT_BONUS = 10;//dogru sorunun puan degeri
const MAX_QUESTIONS = 3;//kac soru sorulacak
const maxtime = 10;//soru sorulma adeti
// oyunu baslatiyoruz
startgame = () => {
  score = 0;
  questionCounter = 0;//kacinci soruda oldugu
  availableQuesions = [...questions];//Spread Operator (...)  bir dizi içerisindeki elemanları tek seferde elde etmek ya da bir başka deyişle yazdırmak için Spread operatörü kullanılmaktadır
  console.log(availableQuesions)
  getNewQuestion();
}
// yeni soru olusturma kismi
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score)
    //soru bittiginde yani data kalmadiginda soru sormayi birakip end.html yonlendirme yapiyoruz
    return window.location.assign("./end.html");
  }
  questionCounter++;
  //questionCounterText.innerText=questionCounter +"/"+MAX_QUESTIONS;//soru sayisini ve hangi soruda oldugunu gosteren gosterge yazisi
  //questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;////2-2silinen
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;////2-3
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;//3-3
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);//kalan sorulardan birini almak icin
  currentQuestion = availableQuesions[questionIndex]
  question.innerText = currentQuestion.question;
  //sorunun seceneklerini alip yazdirma kismi
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  availableQuesions.splice(questionIndex, 1);//var olan datadan sorulan sorulari cikartiyoruz
  acceptingAnswers = true;//sorunun doğru yanlıs sorgulaması yapılması
}
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;
    timeCounter = 0;
    acceptingAnswers = false;
    const selectedChoice = e.target;//tıklanan seceneğ, aktarıyoruz
    const selectedAnswer = selectedChoice.dataset["number"];//burada dataset ile choise un numarası alınıyor
    //bu kisim secilen sik dogru ise yesil yanlissa kirmizi renk veriyor correct ve incorrecte css yazdim
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    //2-1 score arttirma
    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);//settimeout koymamin sebebi hemen ekrandan kayboluyor 1 saniye ekranda durum gozukmesi icin
  })
});
//2-1 score ekrana yazdirmak icin
incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};//score ekrana yazdirmak icin
startgame();