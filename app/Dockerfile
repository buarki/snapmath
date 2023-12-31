FROM tensorflow/tensorflow@sha256:2609730891a3c10cde42ead38d2c6ee7080309811957ad96eab239a49722349d

WORKDIR /snapmath

COPY app/templates templates/
COPY app/*.py .
COPY app/requirements.txt requirements.txt
COPY models/ models/

USER root

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        python3-opencv \
        libgl1 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip \
    && pip install --no-cache-dir --ignore-installed -r requirements.txt \
    && rm -rf /root/.cache/pip


EXPOSE 5000

USER $NB_UID

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0" ]
