// Event listener for displaying the story
document.getElementById('display-story-btn').addEventListener('click', function() {
    const storyText = document.getElementById('story-input').value;
    displayStory(storyText);
});

// Function to display the story with each word wrapped in a span
function displayStory(story) {
    const storyContainer = document.getElementById('story-container');
    
    // Split the story into words, and wrap each word in a span
    const words = story.split(' ');

    const wrappedWords = words.map(word => {
        return `<span class="word" onmouseover="showDefinition(event)" onmouseout="hideDefinition(event)" onclick="getWordDefinition(event)">${word}</span>`;
    }).join(' ');

    storyContainer.innerHTML = wrappedWords;
}

// Function to show the word definition (popup)
function showDefinition(event) {
    const word = event.target.textContent;
    const popup = document.getElementById('definition-popup');
    popup.style.display = 'block';
    popup.innerHTML = `Loading definition for "${word}"...`;

    // You can replace this mock function with a real API call
    fetchDefinition(word)
        .then(definition => {
            popup.innerHTML = definition || `No definition found for "${word}".`;
        })
        .catch(() => {
            popup.innerHTML = `Error fetching definition for "${word}".`;
        });

    // Position the popup near the word
    const rect = event.target.getBoundingClientRect();
    popup.style.left = `${rect.left}px`;
    popup.style.top = `${rect.bottom + window.scrollY}px`;
}

// Function to hide the word definition (popup)
function hideDefinition() {
    const popup = document.getElementById('definition-popup');
    popup.style.display = 'none';
}

// Function to fetch a word definition (mock function)
function fetchDefinition(word) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Here, you can use an API to fetch real definitions.
            resolve(`Definition of "${word}" goes here.`);
        }, 500);
    });
}
