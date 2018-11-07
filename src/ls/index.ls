$('.carousel').carousel!

(font) <- xfl.load \https://plotdb.github.io/xl-fontset/alpha/王漢宗細圓/, _
<- font.sync document.body.innerText, _
console.log font
document.body.style.fontFamily = ['c0nsolas', 'Varela Round', 'Helvetica', 'Arial', font.name, 'sans-serif']
  .map(-> "\"#it\"").join(',')

