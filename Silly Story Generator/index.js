// document query selectors
const generateButton = document.getElementById("generate");
const storyParagraph = document.getElementById("story");
const customName = document.getElementById("customName");
const usRadio = document.getElementById("radioUS");
const ukRadio = document.getElementById("radioUK");

function randomValueFromArray(array){
    const random = Math.floor(Math.random()*array.length);
    return array[random];
  }

// stories and events
const storyTemplate = `It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty: they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.`;
const persons = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
const places = ["the soup kitchen", "Disneyland", "the White House"];
const events = ['spontaneously combusted', 'melted into a puddle on the sidewalk', 'turned into a slug and crawled away'];

// event listeners
generateButton.addEventListener("click", generate);

function generate() {
    const randomPerson = randomValueFromArray(persons);

    const randomEvent = randomValueFromArray(events);
    const randomPlace = randomValueFromArray(places);
    const story = storyTemplate.replace(':insertx:', randomPerson)
                                .replace(':inserty:', randomPlace)
                                .replace(':insertz:',randomEvent)
                                .replace(':insertx:', randomPerson)
    if (ukRadio.checked) {
        const weight = Math.round(300);
        const temperature =  Math.round(94);
        story.replace("300 pounds", weight + " stone");
        story.replace("94 fahrenheit", temperature + " centigrade");
    }
                                
    if (customName.textContent !== "") {
        const name = customName.textContent;
        story.replace("Bob", name);
    }
    storyParagraph.style.visibility = 'visible';
    storyParagraph.textContent = story;
}