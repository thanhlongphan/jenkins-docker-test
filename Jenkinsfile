pipeline {
  agent any
  environment {
    registry = "https://nexus.haeger-consulting.de/v1/"
    registryCredentials = "long-nexus"
  }
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
				sh 'docker build -t bibliothek88/angular:latest .'
			  }
	  }
    stage('Docker push') {
		  steps {
		    withDockerRegistry(credentialsId: 'long-nexus', url: 'https://nexus.haeger-consulting.de:8080') {
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
