Feature('UnLiking Restaurant');

Before(({I}) => {
  I.amOnPage('/');

  I.seeElement('.post_deskripsi a');
  I.click(locate('.post_deskripsi a').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
});

Scenario('Unliking Restaurant', ({I}) => {
  I.dontSee('Tidak ada restaurant untuk ditampilkan');
  I.seeElement('.post_deskripsi a');
  I.click(locate('.post_deskripsi a').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.see('Tidak ada restaurant untuk ditampilkan', '.favorite-item__not__found');
});
