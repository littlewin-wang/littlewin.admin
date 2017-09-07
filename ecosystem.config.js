module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'littlewin.admin',
      script: 'prod.server.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'littlewin',
      host: '119.29.68.183',
      ref: 'origin/master',
      repo: 'git@github.com:littlewin-wang/littlewin.admin.git',
      path: '/home/littlewin/littlewin.admin/production',
      'post-deploy': 'git pull && npm install && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
}
