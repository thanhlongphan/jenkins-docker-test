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
	  stage('Deploy to DockerHub') {
	    steps {
			echo 'listing images'
			sh 'docker images'
			echo 'tagging images'
			sh 'docker tag ht-angular bibliothek88/angular:22'
			echo 'login to dockerhub'
			sh 'docker login -u bibliothek88 -p ft7xhmbxhq'
			echo 'pushing image'
			sh 'docker push bibliothek88/angular:22'
	    }
	  }
	  stage('Deploy to Nexus') {
	    steps {
			echo 'listing images'
			sh 'docker images'
			echo 'tagging images'
			sh 'docker tag ht-angular docker.haeger-consulting.de/ht-angular:22'
			echo 'login to dockerhub'
			sh 'docker login docker.haeger-consulting.de -u lphan -p 2rU7EN9AE8mJqpQ'
			echo 'pushing image'
			sh 'docker push docker.haeger-consulting.de/ht-angular:22'
	    }
	  }
  }
}
