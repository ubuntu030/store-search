import { useState, useEffect } from "react";
import NaviBar from "./NaviBar";
import StoreList from "./StoreList";

import { Button } from "react-bootstrap";
function Store() {
	// 搜尋欄位，接受名稱 & id
	const [searchTxt, setSearchTxt] = useState('');
	// 用以輸入時顯示建議值
	const [sgstnList, setSgstnList] = useState([]);
	// 輸入時顯示篩選結果
	const [resultList, setResultList] = useState([]);
	// data from json
	const [storeList, setStoreList] = useState(null);

	useEffect(() => {
		getStoreData().then((data) => {
			console.log(data);
			setStoreList({ ...data });
		}).catch((error) => {
			console.error(error);
		});
	}, []);





	return (
		<div>
			<NaviBar
				storeList={storeList}
				resultList={resultList} setResultList={setResultList}
				searchTxt={searchTxt} setSearchTxt={setSearchTxt}
				sgstnList={sgstnList} setSgstnList={setSgstnList}
			/>
			<StoreList resultList={resultList} />
			<Button onClick={() => { console.log(storeList); }}>get</Button>
		</div>
	)
}


// 取得商店資料
async function getStoreData() {
	try {
		let resp1 = await fetch('/biggo_sitetype.json');
		let resp2 = await resp1.json();
		return resp2;
	} catch {
		throw new Error('Oops!')
	}
}

export default Store;