import LazyLoad from "react-lazyload";
import { CardColumns, Card } from "react-bootstrap";

/**
 * 建立項目列表
 * @param {String} searchTxt 搜尋文字
 * @param {Object} storeList 原始資料
 * @param {Object} resultList 以篩選資料
 * @param {React Element}
 */
function StoreList({ searchTxt, storeList, resultList }) {
	const storeListArr = Object.keys(storeList)
	const resultListArr = Object.keys(resultList)
	console.log("storeListArr", storeListArr.length);
	console.log("resultListArr", resultListArr.length);
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
/**
 * 建立項目
 * @param {String} key 資料中的key值
 * @param {Object} resultList 以篩選資料
 */
function cardTemplate({ key, resultList }) {
	const info = resultList[key];
	const { detail, item } = info;
	let template = (
		<Card key={key}>
			<LazyLoad>
				<Card.Img variant="top" src={detail.image} />
			</LazyLoad>
			<Card.Body>
				<Card.Title>{item.name}</Card.Title>
				<Card.Text>
					{
						(detail.desc) ? <div dangerouslySetInnerHTML={{ __html: detail.desc }} /> : null
					}
				</Card.Text>
			</Card.Body>
		</Card>
	);
	return template;
}

export default StoreList;