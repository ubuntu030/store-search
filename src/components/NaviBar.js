import { useState } from "react";
import { Navbar, Form, FormControl, Image } from "react-bootstrap";
import SuggestionInput from "./SuggestionInput";

/**
 * 導航列
 * @param {Object} storeList 原始資料
 * @param {Object} resultList 以篩選資料
 * @param {Function} setResultList 設定篩選資料
 * @param {String} searchTxt 搜尋項目文字
 * @param {Function} setSearchTxt 設定文字
 */
function NaviBar({ storeList, resultList, setResultList, searchTxt, setSearchTxt }) {
	// 紀錄以名稱篩選的項目用以建立建議清單
	const [sortedByName, setSortedByName] = useState([]);
	// search 輸入框事件
	const handleChange = (e) => {
		const value = e.target.value;
		setSearchTxt(value);
		const sortedData = storeListSort({ keyword: value, storeList, setSortedByName });
		setResultList(sortedData);
	}

	return (
		<Navbar bg="dark" variant="dark">
			<Navbar.Brand href="#home" className="mr-auto">Store</Navbar.Brand>
			<Navbar.Text>
				共有{numbOfStore({ searchTxt, storeList, resultList })}間商店
			</Navbar.Text>
			<Form inline>
				<FormControl type="text" placeholder="Search" className="mr-sm-2" value={searchTxt} onChange={handleChange} />
				<CleanButton
					isDisplay={!!searchTxt}
					setSearchTxt={setSearchTxt} setResultList={setResultList}
					getSortData={() => storeListSort({ keyword: '', storeList, setSortedByName })} />
				<SuggestionInput searchTxt={searchTxt} list={sortedByName} />
			</Form>
		</Navbar>
	)
}
/**
 * 整理資料並返回
 * @param {String} keyword 關鍵字
 * @param {Object} storeList 原始資料
 * @param {Function} setSortedByName 寫入以名字為篩選的項目
 * @return {Object} 
 */
function storeListSort({ keyword, storeList, setSortedByName }) {
	const storeListArr = Object.keys(storeList);
	let nameSorting = {};

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
				// 建立用以產生建議列表的資料
				nameSorting[key] = storeList[key];
			}
		});
		setSortedByName(nameSorting);
		return sortedObj;
	}
	// 若有資料 無關鍵字 返回整張資料
	if (!keyword && storeListArr.length > 0) {
		return storeList;
	}
	return storeList;
}
/**
 * 返回商店數量
 * @param {String} searchTxt 
 * @param {Object} storeList 
 * @param {Object} resultList 
 * @return {Number}
 */
function numbOfStore({ searchTxt, storeList, resultList }) {
	let num = 0;
	const storeListArr = Object.keys(storeList);
	const resultListArr = Object.keys(resultList);
	if (searchTxt === '') {
		num = storeListArr.length;
	} else {
		num = resultListArr.length;
	}
	return num;
}
/**
 * 清除搜尋的按鈕
 * @param {Boolean} isDisplay 是否顯示
 * @param {Function} setSearchTxt 清除搜尋欄
 * @param {Function} getSortData 取得排列資料
 * @param {Function} setResultList 設定以排列排列資料
 */
function CleanButton({ isDisplay, setSearchTxt, setResultList, getSortData }) {
	const iconStyle = {
		"height": "30px",
		"width": "30px",
		"position": "absolute",
		"right": "24px",
		"cursor": "pointer"
	};
	const handleClick = () => {
		setSearchTxt('');
		setResultList(getSortData());
	}
	return (
		(isDisplay === true) ?
			< Image src="ic_close@2x.png" style={iconStyle} onClick={handleClick} roundedCircle />
			: null
	)
}

export default NaviBar;