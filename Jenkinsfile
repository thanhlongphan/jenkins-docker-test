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
				sh 'docker build -t bibliothek88/angular .'
			  }
	  }
    stage('Docker push') {
		  steps {
			  withDockerRegistry(credentialsId: 'long-nexus-login', url: 'https://nexus.haeger-consulting.de/') {
            sh 'docker push bibliothek88/angular'
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
