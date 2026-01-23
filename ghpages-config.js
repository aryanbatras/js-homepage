import { ghPages } from 'vite-plugin-gh-pages'

ghPages({
  branch: 'gh-pages', 
  message: 'Deploy to GitHub Pages',
  onBeforePublish: ({ outDir }) => {
    console.log('📦 Starting deployment...')
  },
  onPublish: ({ branch }) => {
    console.log(`🎉 Successfully deployed to ${branch}!`)
  },
  onError: (error) => {
    console.error('❌ Deployment failed:', error)
  }
})