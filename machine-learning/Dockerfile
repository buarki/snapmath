FROM buarki/augmented-jupyter-notebook:sha-3b393b1082cd9af40a7f0832b8a033f0c087e97a

COPY mnist-dataset mnist-dataset/

USER root

RUN gzip -d mnist-dataset/train.csv.gz

USER $NB_UID

COPY numbers numbers/

COPY snapmath.ipynb snapmath.ipynb

COPY tensorflow-serving-client.ipynb tensorflow-serving-client.ipynb

EXPOSE 8888
