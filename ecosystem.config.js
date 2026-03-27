module.exports = {
  apps: [{
    name: 'reaepita-blog',
    script: 'node_modules/.bin/next',
    args: 'start',
    cwd: '/var/www/reaepita-blog',
    instances: 1,
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
