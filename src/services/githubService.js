import { Octokit } from '@octokit/rest';

export class GitHubService {
  constructor(token) {
    this.octokit = new Octokit({ auth: token });
  }

  async createPublicRepository(username) {
    const repoName = `js-learning-platform-${username}`;
    
    try {
      const existingRepo = await this.octokit.repos.get({
        owner: username,
        repo: repoName
      });
      return existingRepo.data;
    } catch (error) {
      if (error.status === 404) {
        try {
          const repo = await this.octokit.repos.createForAuthenticatedUser({
            name: repoName,
            description: 'JS Learning Platform - My coding workspace and progress',
            public: true,
            auto_init: true
          });
          
          await this.initializeRepository(repo.data.full_name);
          return repo.data;
        } catch (createError) {
          throw new Error(`Failed to create repository: ${createError.message}`);
        }
      }
      throw error;
    }
  }

  async initializeRepository(repoFullName) {
    // Create initial settings.json
    const settingsContent = {
      theme: 'dark',
      fontSize: 14,
      tabSize: 2,
      wordWrap: true,
      lastAccessed: new Date().toISOString(),
      progress: {},
      platform: 'js-learning-platform'
    };

    // Create README
    const readmeContent = `# JS Learning Platform Repository

This is your personal coding workspace for the JS Learning Platform.

## Structure
- \`code/\` - Your coding files and projects
- \`settings.json\` - Your platform settings and preferences
- \`progress/\` - Your learning progress and achievements

## About
This repository is automatically created and managed by the JS Learning Platform to store your coding journey.

Happy coding! 🚀
`;

    await this.octokit.repos.createOrUpdateFileContents({
      owner: repoFullName.split('/')[0],
      repo: repoFullName.split('/')[1],
      path: 'settings.json',
      message: 'Initialize platform settings',
      content: btoa(JSON.stringify(settingsContent, null, 2))
    });

    await this.octokit.repos.createOrUpdateFileContents({
      owner: repoFullName.split('/')[0],
      repo: repoFullName.split('/')[1],
      path: 'README.md',
      message: 'Add README',
      content: btoa(readmeContent)
    });
  }

  async saveFile(repoFullName, filePath, content) {
    const [owner, repo] = repoFullName.split('/');
    
    try {
      // Get current file to get SHA
      const { data: currentFile } = await this.octokit.repos.getContent({
        owner,
        repo,
        path: filePath
      });

      // Update existing file
      await this.octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: filePath,
        message: `Update ${filePath}`,
        content: btoa(content),
        sha: currentFile.sha
      });
    } catch (error) {
      if (error.status === 404) {
        // Create new file
        await this.octokit.repos.createOrUpdateFileContents({
          owner,
          repo,
          path: filePath,
          message: `Create ${filePath}`,
          content: btoa(content)
        });
      } else {
        throw error;
      }
    }
  }

  async loadFile(repoFullName, filePath) {
    const [owner, repo] = repoFullName.split('/');
    
    try {
      const { data } = await this.octokit.repos.getContent({
        owner,
        repo,
        path: filePath
      });
      
      return atob(data.content);
    } catch (error) {
      if (error.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async updateSettings(repoFullName, settings) {
    await this.saveFile(repoFullName, 'settings.json', JSON.stringify(settings, null, 2));
  }

  async loadSettings(repoFullName) {
    const content = await this.loadFile(repoFullName, 'settings.json');
    return content ? JSON.parse(content) : null;
  }
}