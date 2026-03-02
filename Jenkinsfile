pipeline {
  agent any

  environment {
    APP_DIR = "/host_home/ubuntu/nodeapi"
    APP_NAME = "nodeapi-app"
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
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

    stage('Install deps') {
      steps {
        sh '''
          docker run --rm \
            -v "${APP_DIR}:/app" \
            -w /app \
            node:20-bullseye \
            npm install
        '''
      }
    }

    stage('Run API') {
      steps {
        sh '''
          docker rm -f ${APP_NAME} || true

          docker run -d --name ${APP_NAME} \
            -p 3000:3000 \
            -v "${APP_DIR}:/app" \
            -w /app \
            node:20-bullseye \
            node index.js

          docker ps | grep ${APP_NAME}
        '''
      }
    }
  }
}
