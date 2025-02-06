const content = document.querySelector("h1");
const wrapper = document.createElement("div");
const letters = []
const words = []
const cursor = {x: 0, y: 0}

function createLetter(letter) {
  const span = document.createElement('span')
  span.innerHTML = letter
  if (letter === '"&nbsp;"') {
    span.classList.add('space')
  } else {
    span.classList.add('letter')
  }
  return span
}

function createWord(text) {
  const words = text.split(/\s+/)
  const filteredWords = words.filter(item => item && item.trim() !== "");
  const nodes = []

  console.log(filteredWords.length)
  
  for (let i = 0; i < filteredWords.length; i++) {
    if (words[i].length > 0) {
      const chars = filteredWords[i].split("").map(char => (char === " " ? createLetter("&nbsp;") : createLetter(char)))
      const word = document.createElement('span')
      word.classList.add('word')

      for (let j = 0; j < chars.length; j++) {
        word.appendChild(chars[j])
        letters.push(chars[j])
      }

      nodes.push(word)
  
      if (i + 1< filteredWords.length) {
        const whiteSpace = document.createElement('span')
        whiteSpace.classList.add('space')
        whiteSpace.innerHTML = "&nbsp;"
        nodes.push(whiteSpace)
      }
    }
  }

  return nodes
}

function animate() {
    for (let i = 0; i < content.children.length; i++) {

      letters.forEach((letter) => {
        const rect = letter.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
  
        // Calculate distance from the mouse pointer
        const distance = Math.hypot(
          cursor.x - centerX,
          cursor.y - centerY
        );
  
        // Map the distance to a scale factor
        const maxScale = 1.9;
        const minScale = 1;
        const maxDistance = 120; // Adjust this for effect range
        const scale = Math.max(minScale, maxScale - distance / maxDistance);
  
        // Calculate the amount to move the letter down based on scale
        const scaleDiff = scale - 1;
        const SCALING_TRANSLATE_CONVERSION_FACTOR = 12;
        const translateY = scaleDiff * SCALING_TRANSLATE_CONVERSION_FACTOR;
  
        // Apply both scaling and translation to maintain the bottom position
        letter.style.transform = `scaleY(${scale}) translateY(${translateY}px)`;
  
        // If any letter's scale is above 1, set the flag to true
        if (scale > 1) {
          anyLetterScaled = true;
        }
      });
    }
    requestAnimationFrame(animate);
}

function DomContent() {
  window.requestAnimationFrame(animate);
  if (window.location.pathname === '/' || window.location.pathname === '') {
    if (window.innerWidth > 800) {
      
      wrapper.classList.add('wrapper')
      content.classList.add('hero-header')

      const newContent = content.cloneNode(true)
      const textWrapper = document.createElement('div')

      textWrapper.classList.add('text-wrapper')

      textWrapper.appendChild(newContent)

      const parent = content.parentNode
  
      for (let i = 0; i < newContent.children.length; i++) {
        if (newContent.children[i].tagName === 'STRONG') {
          const newChild = document.createElement('strong')
  
          words.push(newChild)
          newChild.classList.add('line')
  
          const wordArray = createWord(newContent.children[i].innerHTML)

          console.log(wordArray)
  
          for (let j = 0; j < wordArray.length; j++) {
            newChild.appendChild(wordArray[j])
          }
  
          newContent.replaceChild(newChild, newContent.children[i])
        }
      }

      wrapper.appendChild(content)
      wrapper.appendChild(textWrapper)
  
      parent.appendChild(wrapper)
      
      content.style.opacity = 0
     
      document.addEventListener("mousemove", (event) => {
        cursor.x = event.clientX
        cursor.y = event.clientY   
        }
      );
    }
  }
}

document.addEventListener('DOMContentLoaded', DomContent)