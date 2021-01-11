import { CardColumns, Card } from "react-bootstrap";


function StoreList({ resultList }) {

	return (
		<CardColumns>
			{
				Object.keys(resultList).map(key => {
					return cardTemplate({ key, resultList });
				})
			}
		</CardColumns>
	)
}

function cardTemplate({ key, resultList }) {
	const info = resultList[key];
	const { detail } = info;
	let template = (
		<Card>
			<Card.Img variant="top" src={detail.image} />
			<Card.Body>
				<Card.Title>{detail.name}</Card.Title>
				<Card.Text>
					{detail.desc}
				</Card.Text>
			</Card.Body>
		</Card>
	);
	return template;
}

export default StoreList;