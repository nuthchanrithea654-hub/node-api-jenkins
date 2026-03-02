pipeline {
  agent any

  environment {
    APP_DIR = "/host_home/ubuntu/nodeapi"
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
          mkdir -p "${APP_DIR}"
          rm -rf "${APP_DIR:?}/"*
          cp -r ./* "${APP_DIR}/"
        '''
      }
    }

    stage('Install deps & restart') {
      steps {
        sh '''
          set -eux
          cd "${APP_DIR}"
          npm install
          pm2 start index.js --name nodeapi || true
          pm2 restart nodeapi
          pm2 save
        '''
      }
    }
  }
}