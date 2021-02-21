const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGHT_SCORE = 10;

finalScore.innerText = mostRecentScore;
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;//kullanici isim yazmamissa save butonunu pasif yap
});//input giris yapilmasi icin

saveHighScore = (e) => {
    console.log(e.target)
    e.preventDefault();
    const score = {
        score: mostRecentScore,
        name: username.value
    }//score ve kullanici ismini aliyoruz
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score)//burada en yuksek 10 kisinin bilgisini ekrana yazdirmak istedigimiz icin kiyaslama yapmasi icin bunu kullandim
    highScores.splice(10)
    localStorage.setItem("highScores", JSON.stringify(highScores))//localstorage kaydetmek icin string bir ifadeye ihtiyac duyuk
    window.location.assign("./index.html")
};//butona tiklandi

