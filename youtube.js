document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Substitua 'SUA_CHAVE_DE_API_AQUI' pela chave que você gerou no Google Cloud Console
    const API_KEY = 'AIzaSyBhjE5P7hwult1bZZb_Bl-rTc0UmxCOSJ0'; 

    const VIDEO_CONTAINER = document.getElementById('video-grid');

    if (VIDEO_CONTAINER) {
        fetchYouTubeVideos();
    }

    async function fetchYouTubeVideos() {
        // Altere o termo de pesquisa aqui para o que você quiser
        const searchTerm = 'U.S. car reviews OR best cars to buy USA OR automotive maintenance tips OR how to buy a car in USA OR electric vehicle trends OR classic car restoration';
        const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&q=${encodeURIComponent(searchTerm)}&key=${API_KEY}`;
        
        try {
            const response = await fetch(URL);
            if (!response.ok) {
                // Log the status and status text for more detailed debugging
                console.error(`HTTP Error: ${response.status} - ${response.statusText}`);
                throw new Error('Erro ao buscar vídeos da API do YouTube.');
            }
            const data = await response.json();
            displayVideos(data.items);
        } catch (error) {
            console.error(error);
            // Exibe uma mensagem amigável para o usuário caso a API falhe
            VIDEO_CONTAINER.innerHTML = '<p>Não foi possível carregar os vídeos no momento. Tente novamente mais tarde.</p>';
        }
    }

    function displayVideos(videos) {
        if (!videos || videos.length === 0) {
            VIDEO_CONTAINER.innerHTML = '<p>Nenhum vídeo encontrado. Tente com outro termo de busca!</p>';
            return;
        }

        videos.forEach(video => {
            const videoId = video.id.videoId;
            const title = video.snippet.title;
            const description = video.snippet.description;
            const thumbnailUrl = video.snippet.thumbnails.high.url;
            const channelTitle = video.snippet.channelTitle;

            const videoCard = document.createElement('article');
            videoCard.className = 'news-card';
            videoCard.innerHTML = `
                <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener noreferrer" aria-label="Assistir o vídeo: ${title}">
                    <img src="${thumbnailUrl}" class="news-image" alt="Thumbnail of the video: ${title}" loading="lazy" decoding="async">
                </a>
                <div class="news-content">
                    <span class="news-category">YouTube</span>
                    <h3>
                       <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener noreferrer">${title}</a>
                    </h3>
                    <p class="video-description">${description.substring(0, 100)}...</p>
                    <div class="news-meta">
                        <span class="news-date">Channel: ${channelTitle}</span>
                        <a href="https://www.youtube.com/watch?v=${videoId}" class="news-read-more" target="_blank" rel="noopener noreferrer">Watch Now</a>
                    </div>
                </div>
            `;
            VIDEO_CONTAINER.appendChild(videoCard);
        });
    }
});