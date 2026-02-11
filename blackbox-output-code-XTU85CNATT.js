// Function to search music tracks
function searchMusic() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const tracks = document.querySelectorAll('.track');
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results
    let found = false;
    tracks.forEach(track => {
        const title = track.querySelector('h3').textContent.toLowerCase();
        if (title.includes(query)) {
            resultsDiv.innerHTML += `<p>${track.querySelector('h3').textContent}</p>`;
            found = true;
        }
    });
    if (!found) {
        resultsDiv.innerHTML = '<p>No tracks found.</p>';
    }
}

// Function to filter tracks by genre
function filterGenre(genre) {
    const tracks = document.querySelectorAll('.track');
    tracks.forEach(track => {
        if (genre === 'all' || track.dataset.genre === genre) {
            track.style.display = 'block';
        } else {
            track.style.display = 'none';
        }
    });
}

// Function to create a new playlist
function createPlaylist() {
    const name = prompt('Enter playlist name:');
    if (name && name.trim() !== '') {
        const playlistsDiv = document.getElementById('playlists');
        playlistsDiv.innerHTML += `
            <div class="playlist">
                <h4>${name}</h4>
                <ul>
                    <!-- Add songs to this playlist manually or via code -->
                </ul>
            </div>
        `;
    } else {
        alert('Playlist name cannot be empty.');
    }
}

// New: Function to get lyrics using lyrics.ovh API
async function getLyrics(artist, title) {
    try {
        const response = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
        const data = await response.json();
        if (data.lyrics) {
            alert(data.lyrics); // Displays lyrics in a popup (you can change to a div if preferred)
        } else {
            alert('Lyrics not found for this song.');
        }
    } catch (error) {
        alert('Error fetching lyrics. Try again later.');
    }
}

// Optional: Auto-play next track (uncomment if wanted)
// document.querySelectorAll('audio').forEach(audio => {
//     audio.addEventListener('ended', () => {
//         const next = audio.parentElement.nextElementSibling;
//         if (next && next.querySelector('audio')) {
//             next.querySelector('audio').play();
//         }
//     });
// });