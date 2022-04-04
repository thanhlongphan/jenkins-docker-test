pipeline {
  agent any
  environment {
    LONG_DOCKERHUB_CREDS = credentials('long-dockerhub-login')
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
				sh 'docker build -t jk:latest .'
				echo '----------List of Docker Image ---------------'
				sh 'docker images ls'
			  }
	  }
	  stage('Push to DockerHub') {
	    steps {
			echo 'listing images'
			sh 'docker images'
			echo 'tagging images'
			sh 'docker tag jk:latest bibliothek88/jk:latest'
			echo 'login to dockerhub'
			sh 'echo $LONG_DOCKERHUB_CREDS_PSW | docker login -u $LONG_DOCKERHUB_CREDS_USR --password-stdin'
			echo 'pushing image'
			sh 'docker push bibliothek88/jk:latest'
	    }
	  }
	  stage('Deploying App to Kubernetes') {
	  steps{
	    withCredentials([kubeconfigContent(credentialsId: 'kubernetes', variable: 'KUBECONFIG_CONTENT')]) {
			try {
					sh 'kubectl apply -f htfe.yaml'
			} catch(error) {
					sh 'kubectl create -f htfe.yaml'
			}	
		}
		}
	  }
	  
  }
}
