import { ListGroup } from "react-bootstrap";

const style = {
	"position": "absolute",
	"top": "46px",
	"zIndex": 999,
	"overflowY": "auto",
	"height": "500px"
}
/**
 * 建立建議項目
 * @param {Object} list 
 * @param {String} searchTxt 
 * @return {React Element}
 */
function SuggestionInput({ searchTxt, list }) {

	return (
		<div style={style} >
			<ListGroup>
				{
					(searchTxt) ? createItem(list) : null
				}
			</ListGroup>
		</div>
	)
}
/**
 * 建立項目
 * @param {Object} list 
 * @return {Array}
 */
function createItem(list) {
	let template = null;
	const keys = Object.keys(list);

	if (keys.length > 0) {
		template = keys.map(key => {
			return <ListGroup.Item key={key}>{list[key].item.name}</ListGroup.Item>
		})
	}
	return template;
}


export default SuggestionInput;