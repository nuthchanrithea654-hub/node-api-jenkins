pipeline {
  agent any

  environment {
    APP_DIR = "/var/www/nodeapi"
    APP_NAME = "nodeapi"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Deploy files') {
      steps {
        sh '''
          set -eux
          mkdir -p "$APP_DIR"
          rm -rf "$APP_DIR"/*
          cp -r ./* "$APP_DIR"/
        '''
      }
    }

    stage('Install deps') {
      steps {
        sh '''
          set -eux
          cd "$APP_DIR"
          npm install
        '''
      }
    }

    stage('Restart App') {
      steps {
        sh '''
          set -eux
          export PM2_HOME=/var/lib/jenkins/.pm2
          cd "$APP_DIR"
          pm2 delete "$APP_NAME" || true
          pm2 start index.js --name "$APP_NAME"
          pm2 save
          pm2 status
        '''
      }
    }
  }
}
