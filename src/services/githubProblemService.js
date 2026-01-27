import { sanitizeProblemTitle } from '../utils/storage/problemStorage';
import { CONFIG_FILES } from '../constants/code-screen/fileDefaults';

export class GitHubProblemService {
  constructor(token) {
    this.token = token;
    this.baseUrl = 'https://api.github.com';
    this.headers = {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    };
  }

  async makeRequest(url, options = {}) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      headers: this.headers,
      ...options
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`GitHub API Error: ${error.message || response.statusText}`);
    }

    return response.json();
  }

  // Get configuration files
  async getConfigurationFiles(owner, repo) {
    try {
      
      const configFiles = [];
      
      for (const configFile of CONFIG_FILES) {
        const endpoint = `/repos/${owner}/${repo}/contents/${configFile.name}`;
        
        try {
          const fileData = await this.makeRequest(endpoint);
          
          if (fileData && fileData.content) {
            const content = atob(fileData.content);
            configFiles.push({
              name: configFile.name,
              content,
              language: configFile.language,
              active: configFile.active,
              config: true
            });
          } else {
          }
        } catch (fileError) {
          throw fileError;
        }
      }
      
      return configFiles;
    } catch (error) {
      
      if (error.message.includes('404')) {
        return CONFIG_FILES;
      }
      throw error;
    }
  }

  // Save configuration files
  async saveConfigurationFiles(owner, repo, configFiles) {
    const results = [];
    
    for (const file of configFiles) {
      if (file.name && file.content !== undefined) {
        try {
          const result = await this.saveFile(owner, repo, file.name, file.content, `Update configuration file: ${file.name}`);
          results.push({ type: 'config', name: file.name, success: true, result });
        } catch (error) {
          results.push({ type: 'config', name: file.name, success: false, error: error.message });
        }
      }
    }
    
    return { success: true, results };
  }

  // Helper method to save any file
  async saveFile(owner, repo, fileName, content, message = '') {
    let sha = null;
    try {
      const existingFile = await this.makeRequest(`/repos/${owner}/${repo}/contents/${fileName}`);
      sha = existingFile?.sha;
    } catch (error) {
      // File doesn't exist, that's okay
    }

    const payload = {
      message: message || `Update ${fileName}`,
      content: btoa(unescape(encodeURIComponent(content))),
      ...(sha && { sha })
    };

    return this.makeRequest(`/repos/${owner}/${repo}/contents/${fileName}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  }

  // Get repository info
  async getRepository(owner, repo) {
    return this.makeRequest(`/repos/${owner}/${repo}`);
  }

  // Get problem folder contents
  async getProblemFolder(owner, repo, problemTitle) {
    try {
      const sanitizedTitle = sanitizeProblemTitle(problemTitle);
      const path = `solvedProblems/${sanitizedTitle}`;
      return this.makeRequest(`/repos/${owner}/${repo}/contents/${path}`);
    } catch (error) {
      if (error.message.includes('404')) {
        return null; // Folder doesn't exist
      }
      throw error;
    }
  }

  // Get specific problem file
  async getProblemFile(owner, repo, problemTitle, fileName) {
    try {
      const sanitizedTitle = sanitizeProblemTitle(problemTitle);
      const path = `solvedProblems/${sanitizedTitle}/${fileName}`;
      return this.makeRequest(`/repos/${owner}/${repo}/contents/${path}`);
    } catch (error) {
      if (error.message.includes('404')) {
        return null; // File doesn't exist
      }
      throw error;
    }
  }

  // Get problem metadata
  async getProblemMetadata(owner, repo, problemTitle) {
    try {
      const sanitizedTitle = sanitizeProblemTitle(problemTitle);
      const path = `solvedProblems/${sanitizedTitle}/metadata.json`;
      const fileData = await this.makeRequest(`/repos/${owner}/${repo}/contents/${path}`);
      
      if (fileData && fileData.content) {
        const content = atob(fileData.content);
        return JSON.parse(content);
      }
      return null;
    } catch (error) {
      if (error.message.includes('404')) {
        return null; // Metadata doesn't exist
      }
      throw error;
    }
  }

  // Save problem file to GitHub
  async saveProblemFile(owner, repo, problemTitle, fileName, content, message = '') {
    const sanitizedTitle = sanitizeProblemTitle(problemTitle);
    const path = `solvedProblems/${sanitizedTitle}/${fileName}`;
    
    // Check if file exists to get SHA
    let sha = null;
    try {
      const existingFile = await this.getProblemFile(owner, repo, problemTitle, fileName);
      sha = existingFile?.sha;
    } catch (error) {
      // File doesn't exist, that's okay
    }

    const payload = {
      message: message || `Update ${fileName} in ${sanitizedTitle}`,
      content: btoa(unescape(encodeURIComponent(content))),
      ...(sha && { sha })
    };

    return this.makeRequest(`/repos/${owner}/${repo}/contents/${path}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  }

  // Save problem metadata
  async saveProblemMetadata(owner, repo, problemTitle, metadata) {
    const sanitizedTitle = sanitizeProblemTitle(problemTitle);
    const path = `solvedProblems/${sanitizedTitle}/metadata.json`;
    
    const content = JSON.stringify(metadata, null, 2);
    
    // Check if metadata exists to get SHA
    let sha = null;
    try {
      const existingMetadata = await this.getProblemMetadata(owner, repo, problemTitle);
      const existingFile = await this.makeRequest(`/repos/${owner}/${repo}/contents/${path}`);
      sha = existingFile?.sha;
    } catch (error) {
      // Metadata doesn't exist, that's okay
    }

    const payload = {
      message: `Update metadata for ${sanitizedTitle}`,
      content: btoa(unescape(encodeURIComponent(content))),
      ...(sha && { sha })
    };

    return this.makeRequest(`/repos/${owner}/${repo}/contents/${path}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  }

  // Push entire problem to GitHub
  async pushProblem(owner, repo, problemTitle, files, metadata = {}) {
    const results = [];
    const sanitizedTitle = sanitizeProblemTitle(problemTitle);

    try {
      // Save all files
      for (const file of files) {
        if (file.name && file.content !== undefined) {
          const result = await this.saveProblemFile(
            owner, 
            repo, 
            problemTitle, 
            file.name, 
            file.content,
            `${metadata.action || 'Update'} ${file.name} in ${sanitizedTitle}`
          );
          results.push({ type: 'file', name: file.name, success: true, result });
        }
      }

      // Save metadata
      const problemMetadata = {
        ...metadata,
        problemTitle,
        lastModified: new Date().toISOString(),
        fileCount: files.length,
        files: files.map(f => ({ name: f.name, language: f.language }))
      };

      const metadataResult = await this.saveProblemMetadata(owner, repo, problemTitle, problemMetadata);
      results.push({ type: 'metadata', success: true, result: metadataResult });

      return { success: true, results };
    } catch (error) {
      return { success: false, error: error.message, results };
    }
  }

  // Pull problem from GitHub
  async pullProblem(owner, repo, problemTitle) {
    try {
      const folderContents = await this.getProblemFolder(owner, repo, problemTitle);
      
      if (!folderContents) {
        // Folder doesn't exist, return empty result
        return { 
          success: true, 
          files: [], 
          metadata: {
            problemTitle,
            lastModified: null,
            fileCount: 0
          }
        };
      }

      const files = [];
      const metadata = await this.getProblemMetadata(owner, repo, problemTitle);

      // Get all files in the folder
      for (const item of folderContents) {
        if (item.type === 'file' && item.name !== 'metadata.json') {
          const fileData = await this.getProblemFile(owner, repo, problemTitle, item.name);
          if (fileData && fileData.content) {
            const content = atob(fileData.content);
            files.push({
              name: item.name,
              content,
              language: this.detectLanguage(item.name)
            });
          }
        }
      }

      return { 
        success: true, 
        files, 
        metadata: metadata || {
          problemTitle,
          lastModified: new Date().toISOString(),
          fileCount: files.length
        }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get all solved problems from repository
  async getAllSolvedProblems(owner, repo) {
    try {
      const folderContents = await this.makeRequest(`/repos/${owner}/${repo}/contents/solvedProblems`);
      
      if (!folderContents || folderContents.message === 'This repository is empty.') {
        return [];
      }

      const problems = [];
      
      for (const item of folderContents) {
        if (item.type === 'dir') {
          const metadata = await this.getProblemMetadata(owner, repo, item.name);
          problems.push({
            title: item.name,
            lastModified: metadata?.lastModified || null,
            fileCount: metadata?.fileCount || 0,
            metadata
          });
        }
      }

      return problems.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
    } catch (error) {
      if (error.message.includes('404')) {
        return []; // solvedProblems folder doesn't exist
      }
      throw error;
    }
  }

  // Detect language from file extension
  detectLanguage(fileName) {
    const extension = fileName.split('.').pop();
    switch (extension) {
      case 'html': return 'html';
      case 'css': return 'css';
      case 'json': return 'json';
      case 'md': return 'markdown';
      case 'js': return 'javascript';
      case 'jsx': return 'javascript';
      case 'ts': return 'typescript';
      case 'tsx': return 'typescript';
      default: return 'javascript';
    }
  }

  // Generate diff preview
  generateDiffPreview(localFiles, remoteFiles) {
    const diff = {
      newFiles: [],
      modifiedFiles: [],
      deletedFiles: [],
      unchangedFiles: []
    };

    const localFilesMap = new Map(localFiles.map(f => [f.name, f]));
    const remoteFilesMap = new Map(remoteFiles.map(f => [f.name, f]));

    // Check for new and modified files
    for (const [name, localFile] of localFilesMap) {
      const remoteFile = remoteFilesMap.get(name);
      
      if (!remoteFile) {
        diff.newFiles.push(localFile);
      } else if (localFile.content !== remoteFile.content) {
        diff.modifiedFiles.push({
          name,
          localContent: localFile.content,
          remoteContent: remoteFile.content
        });
      } else {
        diff.unchangedFiles.push(localFile);
      }
    }

    // Check for deleted files
    for (const [name] of remoteFilesMap) {
      if (!localFilesMap.has(name)) {
        diff.deletedFiles.push({ name });
      }
    }

    return diff;
  }
}
