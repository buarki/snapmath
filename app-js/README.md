# snapmath React app

## How to load and use a trained TensorFlow model using Javascript?

TensorFlow has a [Javascript](https://github.com/tensorflow/tfjs) lib able to load trained models and run inferences. In order to use a model trained in Jupyter notebook we must convert it to a format supported by TensorFlow.js. To so, we can use the [tfjs-converter tool](https://huningxin.github.io/tfjs-converter/). A simple command, and also the one used to convert the [model 1703825980](../models/1703825980/) into one compatible with TensorFlow.js is the following:

```sh
tensorflowjs_converter --input_format=tf_saved_model --output_format=tfjs_graph_model --saved_model_tags=serve 1703825980 tfjs_model
```

Once it is finished, the coverted model will be available at directory `tfjs_model`. In order to make it available to be loaded on a React app, it just needs to be served from some server. As we are using [NextJS Framework](https://nextjs.org/), we are serving this converted model as a public asset from `public` directory.


