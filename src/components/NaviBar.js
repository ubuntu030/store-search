import { Navbar, Form, FormControl, Button } from "react-bootstrap";

function NaviBar({ storeList, setResultList, searchTxt, setSearchTxt, sgstnList, setSgstnList }) {
	const handleChange = (e) => {
		const value = e.target.value;
		setSearchTxt(value);
		const sortedData = storeListSort({ keyword: value, storeList });
		console.log('d', sortedData);
		console.log('a', Object.keys(sortedData).length);
	}

	return (
		<Navbar bg="dark" variant="dark">
			<Navbar.Brand href="#home" className="mr-auto">Store</Navbar.Brand>
			<Form inline>
				<FormControl type="text" placeholder="Search" className="mr-sm-2" value={searchTxt} onChange={handleChange} />
			</Form>
			<Button onClick={() => { console.log(storeList); }}>get</Button>
		</Navbar>
	)
}
/**
 * 整理資料並返回
 * @param {String} keyword 關鍵字
 * @param {Object} storeList 原始資料
 * @return {Object} 
 */
function storeListSort({ keyword, storeList }) {
	const storeListArr = Object.keys(storeList);

	if (keyword && storeListArr.length > 0) {
		// sorted by Name & ID
		let sortedObj = {};

		storeListArr.forEach(key => {
			// check ID
			if (key.includes(keyword)) {
				sortedObj[key] = storeList[key];
			}
			// check name
			if (storeList[key] && storeList[key].item.name.includes(keyword)) {
				sortedObj.key = storeList.key;
			}
		});
		return sortedObj;
	}
	// 若有資料 無關鍵字 返回整張資料
	if (!keyword && storeListArr.length > 0) {
		return storeList;
	}
	return {};
}

export default NaviBar;