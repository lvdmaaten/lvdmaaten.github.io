---
layout: page
title: Matlab Toolbox for Dimensionality Reduction
excerpt: "Matlab Toolbox for Dimensionality Reduction"
image:
  feature: sample-image-7.jpg
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

The Matlab Toolbox for Dimensionality Reduction contains Matlab implementations of 34 techniques for dimensionality reduction and metric learning. A large number of implementations was developed from scratch, whereas other implementations are improved versions of software that was already available on the Web. The implementations in the toolbox are conservative in their use of memory. The toolbox is available for download here.

Please note I am no longer actively maintaining this toolbox.

<br />
Currently, the Matlab Toolbox for Dimensionality Reduction contains the following techniques:

1. Principal Component Analysis (PCA)
1. Probabilistic PCA
1. Factor Analysis (FA)
1. Classical multidimensional scaling (MDS)
1. Sammon mapping
1. Linear Discriminant Analysis (LDA)
1. Isomap
1. Landmark Isomap
1. Local Linear Embedding (LLE)
1. Laplacian Eigenmaps
1. Hessian LLE
1. Local Tangent Space Alignment (LTSA)
1. Conformal Eigenmaps (extension of LLE)
1. Maximum Variance Unfolding (extension of LLE)
1. Landmark MVU (LandmarkMVU)
1. Fast Maximum Variance Unfolding (FastMVU)
1. Kernel PCA
1. Generalized Discriminant Analysis (GDA)
1. Diffusion maps
1. Neighborhood Preserving Embedding (NPE)
1. Locality Preserving Projection (LPP)
1. Linear Local Tangent Space Alignment (LLTSA)
1. Stochastic Proximity Embedding (SPE)
1. Deep autoencoders (using denoising autoencoder pretraining)
1. Local Linear Coordination (LLC)
1. Manifold charting
1. Coordinated Factor Analysis (CFA)
1. Gaussian Process Latent Variable Model (GPLVM)
1. Stochastic Neighbor Embedding (SNE)
1. Symmetric SNE
1. t-Distributed Stochastic Neighbor Embedding (t-SNE)
1. Neighborhood Components Analysis (NCA)
1. Maximally Collapsing Metric Learning (MCML)
1. Large-Margin Nearest Neighbor (LMNN)

In addition to the techniques for dimensionality reduction, the toolbox contains implementations of 6 techniques for intrinsic dimensionality estimation, as well as functions for out-of-sample extension, prewhitening of data, and the generation of toy datasets.

---

## Usage

The toolbox provides easy access to all these implementations. Basically, the only command you need to execute is:<br /><br />

<code>[mapped_data, mapping] = compute_mapping(data, method, # of dimensions, parameters)</code>

<br />
The function assumes the dimensions are the columns in the data, and the instances are the rows. The function also accepts PRTools datasets. Information on how parameters for certain techniques should be specified can be obtained by typing <code>help compute_mapping</code> in the Matlab prompt. For more instructions on how to install and use the toolbox, please read the <code>Readme.txt</code> file.


You are free to use, modify, or redistribute this software in any way you want, but only for non-commercial purposes. The use of the toolbox is at your own risk; the author is not responsible for any damage as a result from errors in the software. I would appreciate it if you refer to the toolbox or its author in your papers.

<br />
For more information on the techniques implemented in the toolbox, we refer to the following publications:

* L.J.P. van der Maaten, E.O. Postma, and H.J. van den Herik. **Dimensionality Reduction: A Comparative Review**. Tilburg University Technical Report, TiCC-TR 2009-005, 2009. <i class="fa fa-file-pdf-o"></i> [PDF](../publications/papers/TR_Dimensionality_Reduction_Review_2009.pdf)
* L.J.P. van der Maaten and G.E. Hinton. **Visualizing High-Dimensional Data Using t-SNE**. _Journal of Machine Learning Research_ 9(Nov):2579-2605, 2008. <i class="fa fa-file-pdf-o"></i> [PDF](../publications/papers/JMLR_2008.pdf) <small>[[Supplemental material](../publications/misc/Supplement_JMLR_2008.pdf)] [[Talk](https://www.youtube.com/watch?v=RJVL80Gg3lA&list=UUtXKDgv1AVoG88PLl8nGXmw)]

---

## Download

Please [click here](code/drtoolbox.tar.gz) to [download the toolbox](code/drtoolbox.tar.gz).

---

## FAQ

**When using the toolbox, the code quits saying that some function could not be found?**

Nine out of ten times, such errors is the result of you forgetting to add the the toolbox to the Matlab path. You can add the toolbox to the Matlab path by typing <code>addpath(genpath(‘installation_folder/drtoolbox’))</code>. Another probable cause is a naming conflict with another toolbox (e.g., another toolbox with a PCA function). You can investigate such errors using Matlab’s which function. If Matlab complains it cannot find the <code>bsxfun</code> function, your Matlab is likely to be very outdated. You may try using this code as a surrogate.

<br />
**Next to reducing the dimensionality of my data, Isomap/LLE/Laplacian Eigenmaps/LTSA also reduced the number of data points? Where did these points go?**
You may observe this behavior in most techniques that are based on neighborhood graphs. Isomap/LLE/Laplacian Eigenmaps/LTSA can only embed data that gives rise to a connected neighborhood graph. If the neighborhood graph is not connected, the implementations only embed the largest connected component of the neighborhood graph. You can obtain the indices of the embedded data points from mapping.conn_comp (which you can get from the compute_mapping function). If you really need to have al your data points embedded, don’t use a manifold learner.

<br />
**How do I provide label information to the supervised techniques/metric learners?**
You should specify label information to supervised techniques (LDA, NCA, MCML, and LMNN) by setting the elements of the first column of the data matrix to the label of the corresponding data point. To this end, the labels should be numeric. For embedding test data, use the <code>out_of_sample.m</code> function without specifying the test labels.

<br />
**How do I project low-dimensional data back into the data space?**
Back-projection can only be implemented for linear techniques, for autoencoders, and for the GPLVM. For some of these models, the toolbox implements back-projection via the <code>reconstruct_data.m</code> function.

<br />
**Which techniques support an exact out-of-sample extension?**
Only parametric dimensionality reduction techniques, i.e., techniques that learn an explicit function between the data space and the low-dimensional latent space, support exact out-of-sample extension. All linear techniques (PCA, LDA, NCA, MCML, LPP, and NPE) support exact out-of-sample extension, and autoencoders do too. Spectral techniques such as Isomap, LLE, and Laplacian Eigenmaps support out-of-sample extensions via the Nyström approximation. The out-of-sample extensions can be used via the <code>out_of_sample.m</code> function.

<br />
**Which technique should I use to visualize high-dimensional data in a scatter plot?**
t-SNE typically is very good at visualizing data. Manifold learners often perform disappointingly for data visualization due to a problem in their covariance constraint. Parametric techniques are typically not well suited for visualization, because they constrain the mapping between the data and the visualization.
