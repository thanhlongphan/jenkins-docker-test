pipeline {
  agent any
  stages {
    stage('Clone the repo') {
		steps {
			echo 'Clone the repo'
			sh 'rm -rf jenkins-docker-test'
			sh 'git clone https://github.com/thanhlongphan/jenkins-docker-test.git'
		}
    }
	stage('Docker build') {
		steps {
			withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
				sh 'docker build -t bibliothek88/angular:latest .'

			}
		}
	}
    stage('Docker push') {
		steps {
			withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
				sh 'docker push bibliothek88/angular:latest'
			}
		}
	}
  }
  post {
    failure {
      emailext body: 'Summary', subject: 'Pipeline Status', to: 'lphan@haeger-consulting.de'
    }
  }
}
