pipeline {
  agent any
  environment {
    LONG_DOCKERHUB_CREDS = credentials('long-dockerhub-login')
    LONG_NEXUS_CREDS = credentials('long-nexus-login')
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
				sh 'docker build -t ht-angular:$BUILD_NUMBER .'
				echo '----------List of Docker Image ---------------'
				sh 'docker images ls'
			  }
	  }
	  stage('Deploy to DockerHub') {
	    steps {
			echo 'listing images'
			sh 'docker images'
			echo 'tagging images'
			sh 'docker tag ht-angular:$BUILD_NUMBER bibliothek88/angular:$BUILD_NUMBER'
			echo 'login to dockerhub'
			sh 'echo $LONG_DOCKERHUB_CREDS_PSW | docker login -u $LONG_DOCKERHUB_CREDS_USR --password-stdin'
			echo 'pushing image'
			sh 'docker push bibliothek88/angular:$BUILD_NUMBER'
	    }
	  }
	  stage('Deploy to Nexus') {
	    steps {
			echo 'listing images'
			sh 'docker images'
			echo 'tagging images'
			sh 'docker tag ht-angular:$BUILD_NUMBER docker.haeger-consulting.de/ht-angular:$BUILD_NUMBER'
			echo 'login to nexus'
			sh 'echo $LONG_NEXUS_CREDS_PSW | docker login docker.haeger-consulting.de -u $LONG_NEXUS_CREDS_USR --password-stdin'
			echo 'pushing image'
			sh 'docker push docker.haeger-consulting.de/ht-angular:$BUILD_NUMBER'
	    }
	  }
  }
}
