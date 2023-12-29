# snapmath

## TOC
1. [Design Document](./design-doc.md);
2. [Jupyter Notebook of model](./model/snapmath.ipynb);
3. [Saving a built and trained model](#saving-a-built-and-trained-mode);

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


