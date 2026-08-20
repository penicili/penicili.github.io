pipeline {
    agent any

    environment {
        REGISTRY = '192.168.1.150:5000'
        IMAGE = '192.168.1.150:5000/penicili/portoapp'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Build image') {
            steps {
                sh '''
                    docker build \
                      -t "$IMAGE:$IMAGE_TAG" \
                      -t "$IMAGE:latest" .
                '''
            }
        }

        stage('Push image') {
            steps {
                sh '''
                    docker push "$IMAGE:$IMAGE_TAG"
                    docker push "$IMAGE:latest"
                '''
            }
        }
    }

    post {
        always {
            sh 'docker image prune -f'
        }
    }
}