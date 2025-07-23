const embedded_pl = [];

embedded_pl.push({
  $match: {
    $expr: {
      $and: [
        { $eq: ['$product_name', '$$prdname'] },
        { $eq: ['$product_variation', '$$prdvartn'] },
      ],
    },
  },
});
