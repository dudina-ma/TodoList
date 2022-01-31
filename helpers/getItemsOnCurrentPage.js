function getItemsOnCurrentPage(array, onePageItemsNumber, currentPage) {
	return array.slice(onePageItemsNumber * (currentPage - 1), onePageItemsNumber * currentPage);
}

module.exports = {
	getItemsOnCurrentPage
};