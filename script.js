document.addEventListener('DOMContentLoaded', () => {
    const username = 'RSKCS2';
    const projectsContainer = document.getElementById('projects-container');
    const grid = document.createElement('div');
    grid.className = 'projects-grid';
    projectsContainer.appendChild(grid);

    async function fetchAndDisplayRepos() {
        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`);
            const repos = await response.json();

            repos.forEach(repo => {
                const card = document.createElement('article');
                card.className = 'project-card';
                
                // GitHub's Open Graph image URL
                const thumbnailUrl = `https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`;
                
                // Last updated date
                const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                card.innerHTML = `
                    <img src="${thumbnailUrl}" 
                         class="project-thumbnail" 
                         alt="${repo.name} preview"
                         onerror="this.style.display='none'">
                    <div class="project-content">
                        <h2 class="project-title">${repo.name}</h2>
                        <p class="project-description">${repo.description || 'No description available'}</p>
                        
                        <div class="project-meta">
                            <div class="project-stats">
                                <span><i class="fas fa-code"></i> ${repo.language || 'N/A'}</span>
                                <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                                <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                            </div>
                            <small>Updated: ${updatedDate}</small>
                        </div>
                        
                        <div class="project-links">
                            <a href="${repo.html_url}" class="project-link" target="_blank" rel="noopener">
                                <i class="fab fa-github"></i> Repository
                            </a>
                            ${repo.homepage ? `
                            <a href="${repo.homepage}" class="project-link" target="_blank" rel="noopener">
                                <i class="fas fa-external-link-alt"></i> Live Demo
                            </a>` : ''}
                        </div>
                    </div>
                `;

                grid.appendChild(card);
            });
        } catch (error) {
            console.error('Error loading repositories:', error);
            grid.innerHTML = `<p class="error">Failed to load projects. Please try refreshing the page.</p>`;
        }
    }

    fetchAndDisplayRepos();
});
