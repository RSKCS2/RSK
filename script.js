document.addEventListener('DOMContentLoaded', () => {
    const username = 'YOUR_GITHUB_USERNAME'; // Replace with your GitHub username
    const projectsContainer = document.getElementById('projects-container');
    
    // Create grid container
    const grid = document.createElement('div');
    grid.className = 'projects-grid';
    projectsContainer.appendChild(grid);

    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(repos => {
            repos.forEach(repo => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                
                const html = `
                    <h2 class="project-title">${repo.name}</h2>
                    <p class="project-description">${repo.description || 'No description available'}</p>
                    <div class="project-meta">
                        <div class="project-stats">
                            <span><i class="fas fa-code"></i> ${repo.language || 'N/A'}</span>
                            <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                            <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                        </div>
                        <small>${new Date(repo.created_at).toLocaleDateString()}</small>
                    </div>
                    <a href="${repo.html_url}" class="project-link" target="_blank" rel="noopener">View Project</a>
                    ${repo.homepage ? `<a href="${repo.homepage}" class="project-link" target="_blank" rel="noopener">Demo</a>` : ''}
                `;

                projectCard.innerHTML = html;
                grid.appendChild(projectCard);
            });
        })
        .catch(error => {
            console.error('Error fetching GitHub projects:', error);
            grid.innerHTML = '<p>Unable to load projects. Please try again later.</p>';
        });
});