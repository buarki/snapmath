# snapmath

## Project TOC
1. [Just want to run the project](#running-from-docker);
2. [The app in action](#app-in-action);
3. [Design Document](./design-doc.md);
4. [Jupyter Notebook of model](./machine-learning/snapmath.ipynb);
5. [Saving a built and trained model](#saving-a-built-and-trained-mode);
6. [Contribution](#contribution);

## Running from docker

```sh
docker run -p 5000:5000 -e MODEL_VERSION="1703825980" buarki/snapmath-app
```

Once running go to http://localhost:5000. You can find some images to use at the ML directory.

## App in action

<img src="./imgs/app-in-action-1.png" width="350" alt="App in action">
<img src="./imgs/app-in-action-2.png" width="350" alt="App in action">
<img src="./imgs/app-in-action-3.png" width="350" alt="App in action">
<img src="./imgs/app-in-action-4.png" width="350" alt="App in action">
<img src="./imgs/app-in-action-5.png" width="350" alt="App in action">
<img src="./imgs/app-in-action-6.png" width="350" alt="App in action">
<img src="./imgs/app-in-action-7.png" width="350" alt="App in action">


## Running from source code

You can execute the app using the already define [Makefile](./Makefile) commands. To build the docker image run:

```sh
make build-app
```

Then, to run the app you can do:

```sh
make run-app
```

Once running go to http://localhost:5000. You can find some images to use at the [ML directory](/machine-learning/numbers/).

## Saving a built and trained mode

You can collect and save your built model by using this script. Just follow bellow steps:
1. Collect the path of the model inside jupyter notebook. You can do so by running:

```sh
docker-compose exec jupyter-notebook sh -c "ls -td snapmath-model/* | head -n 1"
```

2. Get the base path of the jupyter container:

```sh
docker-compose exec jupyter-notebook pwd
```

3. Get the container id of jupyter notebook:

```sh
docker ps | grep "jupyter-notebook" 
```

If you are using docker-compose you can also use the container name;

4. Now call the script [collect-model.sh](./collect-model.sh) proving these arguments:

```sh
./collect-model.sh jupyter-notebook CONTAINER_BASE_PATH/MODEL_PATH
```

A concrete example is bellow one:

```sh
./collect-model.sh 2c40e8ce7197 /home/jovyan/snapmath-model/1703825980
```

where:
- 2c40e8ce7197 is the container jupyter notebook container id
- /home/jovyan/snapmath-model/1703825980 is the new model to be saved


## Contribution

Contributions are wellcome!
If you find something interesting to improve just open a PR :)
