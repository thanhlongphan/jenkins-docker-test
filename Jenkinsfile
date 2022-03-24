pipeline {
  agent any
  stages {
    stage('Clone the repo') {
		steps {
			echo 'Clone the repo'
			sh 'rm -rf jenkins'
			sh 'https://github.com/thanhlongphan/jenkins-docker-test.git'
		}
    }
	stage('Docker build') {
		steps {
			withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
				sh 'docker build -t bibliothek88/angular:0.0.1 .'
				sh 'docker push bibliothek88/angular:0.0.1'
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
