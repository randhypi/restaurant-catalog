Feature('Liking Restaurant');

Before(({I}) => {
  I.amOnPage('/#/favorite');
});

Scenario('Liking Restaurant', ({I}) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.favorite-item__not__found');

  I.amOnPage('/');

  I.seeElement('.post_deskripsi a');
  I.click(locate('.post_deskripsi a').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');

  I.dontSee('Tidak ada restaurant untuk ditampilkan');
});
