pipeline {
  agent any
  environment {
    registry = "nexus.haeger-consulting.de:8080/"
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
		    echo '----------Building Docker Image --------------'
				sh 'docker build -t bibliothek88/angular:latest .'
				echo '----------List of Docker Image ---------------'
				sh 'docker images ls'
			  }
	  }
	  stage('Docker push to DockerHub') {
	    steps {
	      echo '-----------Pushing Docker Image to Docker Hub----------------'
	      withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
        				sh 'docker push bibliothek88/angular:latest'
        }
	    }
	  }
    stage('Docker push to Nexus') {
		  steps {
		      echo 'login into nexus'
		      sh 'docker login https://nexus.haeger-consulting.de -u lphan -p 2rU7EN9AE8mJqpQ'
		      echo 'pushing into nexus'
		      sh 'docker push bibliothek88/angular:latest'
        }
     }

  }
  post {
    failure {
      emailext body: 'Summary', subject: 'Pipeline Status', to: 'lphan@haeger-consulting.de'
    }
  }
}
