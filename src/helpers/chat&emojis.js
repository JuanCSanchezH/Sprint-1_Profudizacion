import axios from 'axios';
const API_EMOJIS = 'https://emoji-api.com/emojis?access_key=9541d7989b4bd4c1b6deb5880eaca00d930cb738';

const emojiSelectorIcon = document.getElementById('emojiSelectorIcon');
const emojiSelector = document.getElementById('emojiSelector');
const emojiList = document.getElementById('emojiList');
const emojiSearch = document.getElementById('emojiSearch')

emojiSelectorIcon.addEventListener('click', async () => {

    emojiSelector.classList.toggle('active');

    const data = await getEmojis();

    data.forEach(emoji => {
        let li = document.createElement('li');
        li.textContent = emoji.character;
        li.setAttribute('emoji-name', emoji.slug)
        emojiList.appendChild(li);
    });
});


async function getEmojis(){
    try {
        const response = await axios.get(API_EMOJIS);
        const emojiData = []
        response.data.forEach(emoji => {
            if(response.data.indexOf(emoji) <= response.data.length/4) emojiData.push(emoji);
        })
        return emojiData;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

emojiSearch.addEventListener('keyup', e => {
     let value = e.target.value;
     let emojis = document.querySelectorAll('#emojiList li')
     emojis.forEach(emoji => {
        if(emoji.getAttribute('emoji-name').toLocaleLowerCase().includes(value)){
            emoji.style.display = 'flex';
        } else {
            emoji.style.display = 'none';
        }
     })
})