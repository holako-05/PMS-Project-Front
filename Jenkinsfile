pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Pull code from repository') {
            steps {
                checkout scm
            }
        }

        stage('Build project') {
            steps {
                dir('frontend') {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }

        stage('SonarQube analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarQube'; 
                    dir('frontend') {
                        withSonarQubeEnv('SonarServer') {
                            sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=pms_front -Dsonar.projectName='pms_front'"
                        }
                    }
                }
            }
        }

        stage('Wait for SonarQube analysis to complete') {
            steps {
                waitForQualityGate abortPipeline: true
            }
        }

        stage('Build Docker image') {
            steps {
                script {
                    dir('frontend') {
                        withCredentials([usernamePassword(credentialsId: 'DOCKER_CREDS', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                            sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                            sh 'docker build -t mouradtals/pms-frontend:latest .'
                            sh 'docker push mouradtals/pms-frontend:latest'
                        }
                    }
                }
            }
        }

        stage('Deploy using Docker Compose') {
            steps {
                sh "docker-compose -f ${env.WORKSPACE}/docker-compose-frontend.yml up -d"
            }
        }
    }
}
