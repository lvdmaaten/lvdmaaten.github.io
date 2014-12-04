---
layout: page
title: t-SNE
excerpt: "t-SNE"
image:
  feature: sample-image-6.jpg
---

<section id="table-of-contents" class="toc">
  <header>
    <h3>Overview</h3>
  </header>
<div id="drawer" markdown="1">
*  Auto generated table of contents
{:toc}
</div>
</section><!-- /#table-of-contents -->

t-Distributed Stochastic Neighbor Embedding (t-SNE) is a ([prize-winning](http://blog.kaggle.com/2012/11/02/t-distributed-stochastic-neighbor-embedding-wins-merck-viz-challenge/)) technique for dimensionality reduction that is particularly well suited for the visualization of high-dimensional datasets. The technique can be implemented via Barnes-Hut approximations, allowing it to be applied on large real-world datasets. We applied it on data sets with up to 30 million examples. The technique and its variants are introduced in the following papers:

* L.J.P. van der Maaten. **Accelerating t-SNE using Tree-Based Algorithms**. _Journal of Machine Learning Research_ 15(Oct):3221-3245, 2014. <i class="fa fa-file-pdf-o"></i> [PDF](../publications/papers/JMLR_2014.pdf) <small>[[Supplemental material](../publications/misc/Supplement_JMLR_2014.pdf)]</small>
* L.J.P. van der Maaten and G.E. Hinton. **Visualizing Non-Metric Similarities in Multiple Maps**. _Machine Learning_ 87(1):33-55, 2012. <i class="fa fa-file-pdf-o"></i> [PDF](../publications/papers/MachLearn_2012.pdf)
* L.J.P. van der Maaten. **Learning a Parametric Embedding by Preserving Local Structure**. In _Proceedings of the Twelfth International Conference on Artificial Intelligence & Statistics (AI-STATS), JMLR W&CP_ 5:384-391, 2009. <i class="fa fa-file-pdf-o"></i> [PDF](../publications/papers/AISTATS_2009.pdf)
* L.J.P. van der Maaten and G.E. Hinton. **Visualizing High-Dimensional Data Using t-SNE**. _Journal of Machine Learning Research_ 9(Nov):2579-2605, 2008. <i class="fa fa-file-pdf-o"></i> [PDF](../publications/papers/JMLR_2008.pdf) <small>[[Supplemental material](../publications/misc/Supplement_JMLR_2008.pdf)] [[Talk](https://www.youtube.com/watch?v=RJVL80Gg3lA&list=UUtXKDgv1AVoG88PLl8nGXmw)]</small>
An accessible introduction to t-SNE and its variants is given in this [Google Techtalk](https://www.youtube.com/watch?v=RJVL80Gg3lA&list=UUtXKDgv1AVoG88PLl8nGXmw).

---

## Implementations

Below, implementations of t-SNE in various languages are available for download. Some of these implementations were developed by me, and some by other contributors. For the standard t-SNE method, implementations in Matlab, C++, CUDA, Python, Torch, R, Julia, and JavaScript are available. In addition, we provide a Matlab implementation of parametric t-SNE (described [here](../publications/papers/AISTATS_2009.pdf)). Finally, we provide a Barnes-Hut implementation of t-SNE (described [here](../publications/papers/JMLR_2014.pdf)), which is the fastest t-SNE implementation to date, and which scales much better to big data sets.

You are free to use, modify, or redistribute this software in any way you want, but only for non-commercial purposes. The use of the software is at your own risk; the authors are not responsible for any damage as a result from errors in the software.

**Matlab implementation** <small>([user guide](User_guide.pdf))</small> | [All platforms](code/tSNE_matlab.zip)
**CUDA implementation** <small>(using code by [Alex](http://www.cs.toronto.edu/~kriz/))</small> | [All platforms](code/tSNE_CUDA.zip)
**Binary implementation** <small>(wrappers for [Matlab](code/tsne_binary_wrapper_matlab.zip) and [Python](code/tsne_binary_wrapper_python.zip))</small> | [Linux](code/tSNE_linux.tar.gz); [OS X](code/tSNE_maci.tar.gz); Windows
**Python implementation** | [All platforms](code/tsne_python.zip)
**Torch implementation** | [All platforms](https://github.com/clementfarabet/manifold)
**Julia implementation** <small>(by Leif Jonsson)</small> | [All platforms](https://github.com/lejon/TSne.jl)
**R implementation** <small>(by [Justin](http://scwn.net))</small> | [All platforms](http://cran.r-project.org/web/packages/tsne/)
**JavaScript implementation** <small>(by [Andrej](http://cs.stanford.edu/people/karpathy/); [online demonstration](http://homepage.tudelft.nl/19j49/tsnejs/))</small> | [All platforms](http://cs.stanford.edu/people/karpathy/tsnejs/)
**Parametric t-SNE** <small>(Matlab; [see here](../publications/papers/AISTATS_2009.pdf))</small> | [All platforms](code/ptsne.tar.gz)
**Barnes-Hut t-SNE** <small>(C++, Matlab, Python, [Torch](https://github.com/clementfarabet/manifold), and [R](https://github.com/jkrijthe/Rtsne) wrappers; see [here](../publications/papers/JMLR_2014.pdf))</small> | [All platforms](code/bh_tsne.tar.gz)
**MNIST Dataset** | [Matlab file](code/mnist.zip)

---

## Examples

Some results of our experiments with t-SNE are available for download below. In the plots of the Netflix dataset and the words dataset, the third dimension is encoded by means of a color encoding (similar words/movies are close together and have the same color). Most of the ‘errors’ in the embeddings (such as in the 20 newsgroups) are actually due to ‘errors’ in the features t-SNE was applied on. In many of these examples, the embeddings have a 1-NN error that is comparable to that of the original high-dimensional features.

**MNIST dataset** (in 2D) | [JPG](examples/mnist_tsne.jpg)
**MNIST dataset** (in 3D) | [MOV](examples/mnist_tsne.mov)
**Olivetti faces dataset** (in 2D) | [JPG](examples/olivetti_tsne.jpg)
**COIL-20 dataset** (in 2D) | [JPG](examples/coil_tsne.jpg)
**Netflix dataset** (in 3D) <small>on [Russ](http://www.cs.toronto.edu/~rsalakhu/)’s [RBM features](http://www.cs.toronto.edu/~rsalakhu/papers/rbmcf.pdf)</small> | [JPG](examples/netflix_tsne.jpg)
**Words dataset** (in 3D) <small>on [Andriy](http://www.cs.toronto.edu/~amnih/)’s [semantic features](http://www.cs.toronto.edu/~hinton/absps/threenew.pdf)</small> | [JPG](examples/semantic_tsne.jpg)
**20 Newsgroups dataset** (in 2D) <small>on [Simon](http://www.di.ens.fr/~slacoste/)’s [discLDA features](http://snowbird.djvuzone.org/2008/abstracts/191.pdf)</small> | [JPG](examples/20news_tsne.jpg)
**Reuters dataset** (in 2D) <small>landmark t-SNE using [semantic hashing](http://www.cs.utoronto.ca/~rsalakhu/papers/semantic_final.pdf)</small> | [JPG](examples/reuters_tsne.jpg)
**NIPS dataset** (in 2D) <small>on [co-authorship data (1988-2003)](http://robotics.stanford.edu/~gal/data.html)</small> | [JPG](examples/nips_tsne.jpg)
**NORB dataset** (in 2D) <small>by [Vinod](http://www.cs.toronto.edu/~vnair/)</small> | [JPG](examples/norb_tsne.jpg)
**Words** (in 2D) <small>by [Joseph](http://joseph.turian.com) on [features](http://ronan.collobert.com/pub/matos/2008_nlp_icml.pdf) learned by [Ronan](http://ronan.collobert.com) and [Jason](http://www.thespermwhale.com/jaseweston/)</small> | [PNG](http://www.cs.toronto.edu/~hinton/turian.png)
**CalTech-101** <small>on SIFT bag-of-words features</small> | [JPG](examples/caltech101_tsne.jpg)
**S&P 500** <small>by [Steve](https://www.linkedin.com/in/stevewickert) on information about daily returns on company stock</small> | [PNG](examples/SP500_tsne.png)
**Interactive map of scientific journals** <small>on data by [Nees-Jan](http://www.neesjanvaneck.nl) and [Ludo](http://www.ludowaltman.nl), using [VOSviewer](http://www.vosviewer.com)</small> | [Java 1.6](http://www.vosviewer.com/vosviewer.php?title=Journals%20t-SNE%20map&map=http://homepage.tudelft.nl/19j49/journal_tsne_map.txt&label_size_effect=0.33)
**Relation between World Economic Forum councils** | [Link](http://files.visualizing.org.s3.amazonaws.com/challeneges/wef/visualization/index.html)
**ImageNet** <small>by [Andrej](http://cs.stanford.edu/people/karpathy/) on [Caffe](http://caffe.berkeleyvision.org) convolutional net features</small> | [Link](http://cs.stanford.edu/people/karpathy/cnnembed/)
**Multiple maps visualizations** | [Link](http://homepage.tudelft.nl/19j49/multiplemaps/Multiple_maps_t-SNE/Multiple_maps_t-SNE.html)
**Allen Brain data** | [Link](http://www.sciencedirect.com/science/article/pii/S1046202314003211)

You may right-click on the images and select "Show image in new tab" to see a larger version of each of the images.

You may also be interested in these blog posts describing applications of t-SNE by [Andrej Karpathy](http://karpathy.ca/myblog/?p=707), [Paul Mineiro](http://www.machinedlearnings.com/2011/06/even-better-hashtag-similarity.html), [Alexander Fabisch](http://nbviewer.ipython.org/urls/gist.githubusercontent.com/AlexanderFabisch/1a0c648de22eff4a2a3e/raw/59d5bc5ed8f8bfd9ff1f7faa749d1b095aa97d5a/t-SNE.ipynb), [Justin Donaldson](http://scwn.net), and [Henry Tan](http://www.codeproject.com/Tips/788739/Visualization-of-High-Dimensional-Data-using-t-SNE).

---

## FAQ

**The binary implementation of t-SNE seems to have messed up the ordering of my data?**

It sure did! The fast implementation of t-SNE is a landmark version that randomly picks it landmarks, even if you set the ratio of landmarks to 1.0. You can get the indices of the selected landmarks from the result-file (or from the Matlab script that runs it, for that matter). The format of the result file is described in the User’s guide.

<br />
**I can’t figure out the file format for the binary versions of t-SNE?**

The format is described in the User’s guide. You also might want to have a look at the Matlab or Python wrapper code: it has code that writes the data-file and reads the results-file that can be ported fairly easily to other languages. Please note that the file format is binary (so don’t try to write or read text!), and that it does not contain any spaces, separators, newlines or whatsoever.

<br />
**How should I specify the landmarks to the binary version of t-SNE?**

You can either specify a ratio of points to use as landmark points (between 0 and 1), or you can specify a vector with the indices of the points to use as landmark points. In both cases, the fast version of t-SNE will return a vector with the indices of the used landmark points, so you can check what happened.

<br />
**How can I asses the quality of the visualizations that t-SNE constructed?**

Preferably, just look at them! Notice that t-SNE does not retain distances but probabilities, so measuring some error between the Euclidean distances in high-D and low-D is useless. However, if you use the same data and perplexity, you can compare the Kullback-Leibler divergences that t-SNE reports. It is perfectly fine to run t-SNE ten times, and select the solution with the lowest KL divergence.

<br />
**How should I set the perplexity in t-SNE?**

The performance of t-SNE is fairly robust under different settings of the perplexity. The most appropriate value depends on the density of your data. Loosely speaking, one could say that a larger / denser dataset requires a larger perplexity. Typical values for the perplexity range between 5 and 50. 

<br />
**What is perplexity anyway?**

Perplexity is a measure for information that is defined as 2 to the power of the Shannon entropy. The perplexity of a fair die with k sides is equal to k. In t-SNE, the perplexity may be viewed as a knob that sets the number of effective nearest neighbors. It is comparable with the number of nearest neighbors k that is employed in many manifold learners.

<br />
**Every time I run t-SNE, I get a (slightly) different result?**

In contrast to, e.g., PCA, t-SNE has a non-convex objective function. The objective function is minimized using a gradient descent optimization that is initiated randomly. As a result, it is possible that different runs give you different solutions. Notice that it is perfectly fine to run t-SNE a number of times (with the same data and parameters), and to select the visualization with the lowest value of the objective function as your final visualization.

<br />
**When I run t-SNE, I get a strange ‘ball’ with uniformly distributed points?**

This usually indicates you set your perplexity way too high. All points now want to be equidistant. The result you got is the closest you can get to equidistant points as is possible in two dimensions. If lowering the perplexity doesn’t help, you might have run into the problem described in the next question. Similar effects may also occur when you use highly non-metric similarities as input.

<br />
**When I run t-SNE, it reports a very low error but the results look crappy?**

Presumably, your data contains some very large numbers, causing the binary search for the correct perplexity to fail. In the beginning of the optimization, t-SNE then reports a minimum, mean, and maximum value for sigma of 1. This is a sign that something went wrong! Just divide your data or distances by a big number, and try again.

<br />
**I tried everything you said, but t-SNE still doesn’t seem to work very well?**

Maybe there is something weird in your data. As a sanity check, try running PCA on your data to reduce it to two dimensions. If this also gives bad results, then maybe there is not very much nice structure in your data in the first place. If PCA works well but t-SNE doesn’t, I am fairly sure you did something wrong. Just check your code again until you found the bug! If nothing works, feel free to drop me a line.

<br />
**Can I use a pairwise Euclidean distance matrix as input into t-SNE?**

Yes you can! Download the Matlab implementation, and use your pairwise Euclidean distance matrix as input into the <code>tsne_d.m</code> function.

<br />
**Can I use a pairwise similarity matrix as input into t-SNE?**

Yes you can! For instance, we successfully applied t-SNE on a dataset of word association data. Download the Matlab implementation, make sure the diagonal of the pairwise similarity matrix contains only zeros, symmetrize the pairwise similarity matrix, and normalize it to sum up to one. You can now use the result as input into the <code>tsne_p.m</code> function.

<br />
**Can I use t-SNE to embed data in more than two dimensions?**

Well, yes you can, but there is a catch. The key characteristic of t-SNE is that it solves a problem known as the crowding problem. The extent to which this problem occurs depends on the ratio between the intrinsic data dimensionality and the embedding dimensionality. So, if you embed in, say, thirty dimensions, the crowding problem is less severe than when you embed in two dimensions. As a result, it often works better if you increase the degrees of freedom of the t-distribution when embedding into thirty dimensions (or if you try to embed intrinsically very low-dimensional data such as the Swiss roll). More details about this are described in the AI-STATS paper.

<br />
**Why doesn’t t-SNE work as well as LLE or Isomap on the Swiss roll data?**

When embedding the Swiss roll data, the crowding problem does not apply. So you may have to use a lighter-tailed t-distribution to embed the Swiss toll successfully (see above). But frankly... who cares about Swiss rolls when you can embed complex real-world data nicely?
