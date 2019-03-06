module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // First application
    {
      name: "manifest",
      script: "./bin/www",
      cwd: "./",
      watch: ["bin", "routers", "server", "util", "app.js"],
      ignore_watch: ["node_modules", "logs", "public"],
      watch_options: {
        followSymlinks: false
      },
      error_file: "./logs/app-err.log",
      out_file: "./logs/app-out.log",
      env: {
        PORT: 1235,
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    },

    // Second application
    {
      name: "WEB",
      script: "xxx.js"
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: "node",
      host: "212.83.163.1",
      ref: "origin/master",
      repo: "git@github.com:repo.git",
      path: "/var/www/production",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production"
    },
    dev: {
      user: "node",
      host: "212.83.163.1",
      ref: "origin/master",
      repo: "git@github.com:repo.git",
      path: "/var/www/development",
      "post-deploy": "npm install && pm2 reload ecosystem.config.js --env dev",
      env: {
        NODE_ENV: "dev"
      }
    }
  }
};

// # Start all applications
// pm2 start ecosystem.config.js

// # Start only the app named worker-app
// pm2 start ecosystem.config.js --only worker-app

// # Stop all
// pm2 stop ecosystem.config.js

// # Restart all
// pm2 start   ecosystem.config.js
// ## Or
// pm2 restart ecosystem.config.js

// # Reload all
// pm2 reload ecosystem.config.js

// # Delete all
// pm2 delete ecosystem.config.js

// # To start this app in a particular environment, use the --env flag:
// pm2 start ecosystem.config.js # uses variables from `env`
// pm2 start ecosystem.config.js --env production # uses variables from `env_production`

// # refresh the environment
// pm2 restart ecosystem.config.js --update-env

// # switch the environment
// pm2 restart ecosystem.config.js --env production --update-env
