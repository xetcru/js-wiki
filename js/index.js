;(function () {
	'use strict'

	const markdownResultElement = document.querySelector('#markdown-result');
	const markdownIntroResultElement = document.querySelector('#markdown-intro-result');
	const lastArticlesListElement = document.querySelector('#last-articles');
	const allArticlesListElement = document.querySelector('#all-articles');
	const readArticleButtom = document.querySelector('#read-article');

	const json = localStorage.getItem('articles');
	const articles = JSON.parse(json);
	const article = articles[articles.length - 1];
	const introArticle = articles[articles.id = 0];

	// Show 200 simbols of the last article

	markdownResultElement.innerHTML = marked(article.content.substr(0, 200) + '...');

	// Show 200 simbols of the INTRO article

	markdownIntroResultElement.innerHTML = marked(introArticle.content.substr(0, 910) + '...');

	// Show list with all articles

	let str = '';
	for (let i = 0; i < articles.length; i++) {
		const currentArticle = articles[i];
		str = str + '<li class="other-list__item"><a class="other-list__link" href="article.html?id=' + currentArticle.id + '">' + currentArticle.title + '</a></li>';
	};

	allArticlesListElement.innerHTML = str;

	// Show 3 last article

	str = '';
	for (let i = articles.length - 3; i < articles.length; i++) {
		const currentArticle = articles[i];
		str = str + '<li class="articles-list-item"><a href="article.html?id=' + currentArticle.id + '" class="articles-list-link">' + currentArticle.title + '</a></li>';
	};

	lastArticlesListElement.innerHTML = str;

	// Event for button

	readArticleButtom.addEventListener('click', function () {
		location.replace('article.html?id=' + article.id);
	})
})();