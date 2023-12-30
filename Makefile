jupyter-notebook:
	docker-compose up -d --build

build-tf-serving:
	docker build -f tensor-flow-serving/Dockerfile -t snapmath-tf-service . 

run-tf-service:
	docker run -p 8501:8501 -e MODEL_NAME=snapmath -t snapmath-tf-service

build-app:
	docker build -f app/Dockerfile -t snapmath-app .
