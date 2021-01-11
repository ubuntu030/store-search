import { Navbar, Form, FormControl, Button } from "react-bootstrap";
// FIXME: storeListSort 需要有初始化，當前只有handleChange 能觸發
function NaviBar({ storeList, resultList, setResultList, searchTxt, setSearchTxt, sgstnList, setSgstnList }) {
	const handleChange = (e) => {
		const value = e.target.value;
		setSearchTxt(value);
		const sortedData = storeListSort({ keyword: value, storeList });
		setResultList(sortedData);
		// console.log('d', sortedData);
		// console.log('a', Object.keys(sortedData).length);
	}

	return (
		<Navbar bg="dark" variant="dark">
			<Navbar.Brand href="#home" className="mr-auto">Store</Navbar.Brand>
			<Navbar.Text>
				共有{Object.keys(resultList).length}間商店
			</Navbar.Text>
			<Form inline>
				<FormControl type="text" placeholder="Search" className="mr-sm-2" value={searchTxt} onChange={handleChange} />
			</Form>
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
				sortedObj[key] = storeList[key];
			}
		});
		return sortedObj;
	}
	// 若有資料 無關鍵字 返回整張資料
	if (!keyword && storeListArr.length > 0) {
		return storeList;
	}
	return storeList;
}

export default NaviBar;