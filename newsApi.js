document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const NEWS_CONTAINER = document.getElementById('news-grid');
    const RSS_FEED_URL = 'https://www.motortrend.com/feed/'; // Exemplo: Use o URL do feed que você escolheu
    
    // URL da sua própria API Serverless no Vercel
    const PROXY_URL = `/api/get-news?url=${encodeURIComponent(RSS_FEED_URL)}`; 

    if (NEWS_CONTAINER) {
        fetchNewsArticles();
    }

    async function fetchNewsArticles() {
        try {
            const response = await fetch(PROXY_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch news articles.');
            }
            
            const xmlText = await response.text();
            
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "application/xml");
            
            const articles = Array.from(xmlDoc.querySelectorAll('item')).map(item => ({
                title: item.querySelector('title').textContent,
                description: item.querySelector('description').textContent,
                url: item.querySelector('link').textContent,
                imageUrl: item.querySelector('enclosure')?.getAttribute('url') || '',
                source: { name: item.querySelector('source')?.textContent || 'N/A' },
                pubDate: item.querySelector('pubDate')?.textContent,
            }));
            
            displayNews(articles);
        } catch (error) {
            console.error(error);
            NEWS_CONTAINER.innerHTML = '<p>Não foi possível carregar as notícias no momento. Tente novamente mais tarde.</p>';
        }
    }

    function displayNews(articles) {
        if (!articles || articles.length === 0) {
            NEWS_CONTAINER.innerHTML = '<p>Nenhuma notícia encontrada. Tente com outro feed!</p>';
            return;
        }

        articles.forEach(article => {
            const title = article.title;
            const description = article.description;
            const imageUrl = article.imageUrl;
            const articleUrl = article.url;
            const sourceName = article.source.name;

            const newsCard = document.createElement('article');
            newsCard.className = 'news-card';
            newsCard.setAttribute('data-category', 'api');

            newsCard.innerHTML = `
                <img src="${imageUrl || 'imagens/placeholder.png'}" class="news-image" alt="Image for: ${title}" loading="lazy" decoding="async">
                <div class="news-content">
                    <span class="news-category">API News</span>
                    <h3><a href="${articleUrl}" target="_blank" rel="noopener noreferrer">${title}</a></h3>
                    <p>${description.substring(0, 100)}...</p>
                    <div class="news-meta">
                        <span class="news-date">Source: ${sourceName}</span>
                        <a href="${articleUrl}" class="news-read-more" target="_blank" rel="noopener noreferrer">Read More</a>
                    </div>
                </div>
            `;
            NEWS_CONTAINER.appendChild(newsCard);
        });
    }
});