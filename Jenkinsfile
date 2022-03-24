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
				sh 'docker build -t ht-angular .'
				echo '----------List of Docker Image ---------------'
				sh 'docker images ls'
			  }
	  }
	  stage('Docker push to DockerHub') {
	    steps {
			echo 'listing images'
			sh 'docker images ls -a'
			echo 'tagging images'
			sh 'docker tag ht-angular bibliothek88/angular:22'
			echo 'login to dockerhub'
			sh 'docker login - bibliothek88 -p ft7xhmbxhq'
			echo 'pushing image'
			sh 'docker push bibliothek88/angular:22'
	    }
	  }
  }
}
