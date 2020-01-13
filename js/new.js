;(function () {
	'use strict';

	// get DOM-elements

	const markdownSourceElement = document.querySelector('#markdown-source');
	const markdownResultElement = document.querySelector('#markdown-result');
	const saveArticleButton = document.querySelector('#save-article-button');
	const articleTitleElement = document.querySelector('#article-title');

	const id = parseInt(location.search.substr(4));
	const json = localStorage.getItem('articles');
	const articles = JSON.parse(json);
	if (id) {
		let article = null;
		for (let i = 0; i < articles.length; i++) {
			if (articles[i].id === id) {
				article = articles[i];
			}
		}

		markdownSourceElement.value = article.content;
		articleTitleElement.value = article.title;

		const result = marked(markdownSourceElement.value);
		markdownResultElement.innerHTML = result;
	};

	// Event when key push

	markdownSourceElement.addEventListener('keyup', function () {
		// Convert text to HTML
		const result = marked(markdownSourceElement.value);
		markdownResultElement.innerHTML = result;
		//console.log(result)
	});

	// Save article

	saveArticleButton.addEventListener('click', function () {
		if (id) {
			for (let i = 0; i < articles.length; i++) {
				if (articles[i].id === id) {
					articles[i].title = articleTitleElement.value
					articles[i].content = markdownSourceElement.value
				}
			}
		} else {
			const newArticle = {
				id: 0,
				title: articleTitleElement.value,
				content: markdownSourceElement.value
			}

			newArticle.id = articles.length + 1;
			// add in array
			articles.push(newArticle);
		}

		localStorage.setItem('articles', JSON.stringify(articles));

		if (id) {
			location.replace('article.html?id=' + id);
		} else {
			location.replace('article.html?id=' + articles[articles.length - 1].id);
		};
	});
})();