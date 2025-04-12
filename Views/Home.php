<h2> welcom to backend </h2>

<?php foreach ($products as $product): ?>
    <h2><?= $product['name'] ?></h2>
    <p><?= $product['inStock'] ?></p>
    <br>
    <p><?= $product['gallery'] ?></p>
    <br>
    <p><?= $product['description'] ?></p>
    <br>
    <p><?= $product['category'] ?></p>
    <br>
    <p><?= $product['brand'] ?></p>
    <hr>

<?php endforeach; ?>