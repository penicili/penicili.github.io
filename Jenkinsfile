pipeline {
    agent any

    environment {
        IMAGE = 'penicili/portoapp'
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

        stage('Push image to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-pat',
                        usernameVariable: 'DOCKERHUB_USERNAME',
                        passwordVariable: 'DOCKERHUB_TOKEN'
                    )
                ]) {
                    sh '''
                        echo "$DOCKERHUB_TOKEN" | docker login \
                          --username "$DOCKERHUB_USERNAME" \
                          --password-stdin

                        docker push "$IMAGE:$IMAGE_TAG"
                        docker push "$IMAGE:latest"

                        docker logout
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker image prune -f'
        }
    }
}