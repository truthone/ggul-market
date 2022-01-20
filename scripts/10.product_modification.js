

// 상품 정보 가져오기
async function getProductData() {
  const url = API_URL + `/product/detail/${this.productId}`;
  const response = await fetch(url, {
    headers: {
      "Authorization": "Bearer " + TOKEN
    }
  });
  this.productData = await response.json();
}