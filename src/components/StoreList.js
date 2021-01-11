import { CardColumns, Card } from "react-bootstrap";


function StoreList({ searchTxt, storeList, resultList }) {
	const storeListArr = Object.keys(storeList)
	const resultListArr = Object.keys(resultList)
	// 判斷並使用預設資料
	const listArr = (searchTxt === '' && resultListArr.length === 0) ? storeListArr : resultListArr;
	const list = (resultListArr.length === 0) ? storeList : resultList

	return (
		<CardColumns>
			{
				listArr.map(key => {
					return cardTemplate({ key, resultList: list });
				})
			}
		</CardColumns>
	)
}

function cardTemplate({ key, resultList }) {
	const info = resultList[key];
	const { detail, item } = info;
	let template = (
		<Card key={key}>
			<Card.Img variant="top" src={detail.image} />
			<Card.Body>
				<Card.Title>{item.name}</Card.Title>
				<Card.Text>
					<div dangerouslySetInnerHTML={{ __html: detail.desc }}>
					</div>
				</Card.Text>
			</Card.Body>
		</Card>
	);
	return template;
}

export default StoreList;