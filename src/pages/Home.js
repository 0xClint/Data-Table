import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { dimensionList } from "../assets/DimensionList";
import { fetchData } from "../redux/DataReducer";
import {
  clickFilter,
  dataSort,
  impressionFilter,
  requestFilter,
  responsetFilter,
  revenueFilter,
} from "../utils/dataSort";

const Home = () => {
  let tempData = [];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isColumnHidden, setIsColumnHidden] = useState();
  const [finalTitles, setFinalTitles] = useState(dimensionList);
  const [rangeMenu, setRangeMenu] = useState(false);
  const [filterTarget, setFilterTarget] = useState("");
  const [fData, setfData] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1100000);

  const [selectValidDate, setselectValidDate] = useState(false);
  const [settingMenu, setSettingMenu] = useState(true);

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);
  const { app } = useSelector((state) => state);
  useEffect(() => {
    // setfData(data.dataList);
    // console.log(fData);
  }, []);

  const handleChange = async () => {
    if (startDate && endDate && endDate >= startDate) {
      setselectValidDate(false);
      await dispatch(fetchData({ startDate, endDate }));
      await setfData(dataSort(data.dataList, app.appNames));
    } else {
      setselectValidDate(true);
      setTimeout(() => {
        setselectValidDate(false);
      }, 3000);
    }
  };

  const handleFilter = async () => {
    setRangeMenu(false);

    if (filterTarget == "requests") {
      await setfData(requestFilter(data.dataList, min, max));
    } else if (filterTarget == "responses") {
      await setfData(responsetFilter(data.dataList, min, max));
    } else if (filterTarget == "impressions") {
      await setfData(impressionFilter(data.dataList, min, max));
    } else if (filterTarget == "clicks") {
      await setfData(clickFilter(data.dataList, min, max));
    } else if (filterTarget == "revenue") {
      await setfData(revenueFilter(data.dataList, min, max));
    }
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(finalTitles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFinalTitles(items);
    console.log(finalTitles);
  }
  function fire(index) {
    document
      .querySelectorAll(`#table thead tr th:nth-child(${index + 1})`)
      .forEach((el) => {
        setIsColumnHidden(el.style.display == "none" ? true : false);
      });
    console.log(isColumnHidden);
    if (!isColumnHidden) {
      document
        .querySelectorAll(`#table thead tr th:nth-child(${index + 1})`)
        .forEach((el) => el.style.display == "none");
      document
        .querySelectorAll(`#table tbody tr td:nth-child(${index + 1})`)
        .forEach((el) => (el.style.display = "none"));
    }
  }

  return (
    <div className="">
      {rangeMenu && (
        <div className="h-[100vh] w-[98vw] z-3 fixed font-semibold flex justify-center items-center bg-[#ffffff5c]">
          <div className="container flex flex-col bg-white gap-3 w-[300px] p-10 h-[200px] justify-center z-3 items-center border border-gray-300 rounded-lg">
            <p>max value:{max}</p>
            <input
              type="range"
              className="w-64"
              value={max}
              min={0}
              max={2000000}
              onChange={(e) => setMax(e.target.value)}
            />
            <p className="w-36">min value: {min}</p>
            <input
              type="range"
              className="w-64"
              value={min}
              min={0}
              max={2000000}
              onChange={(e) => setMin(e.target.value)}
            />
            <button
              onClick={() => handleFilter()}
              className="inline-block px-6 w-[100px] py-2.5 bg-[#2846E8] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#1f39d0] hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Apply
            </button>
          </div>
        </div>
      )}
      <div className="z-1">
        <div className="flex  justify-between items-center">
          <h2 className="font-bold text-[1.5rem] text-left ml-5 mt-2">
            Data Analytics
          </h2>
          <h2 className="text-[0.8rem] font-medium mr-5 text-red-500">
            Set the date and click on Apply Changes !<br />
            For setting date click apply button twice
          </h2>
        </div>

        <div className="header flex justify-between m-5 mt-3">
          <div className="datePicker">
            <input
              type="date"
              className="py-2 px-3 text-gray-500 border border-gray-300 text-sm rounded-lg"
              placeholder="Select date start"
              min="2021-06-01"
              max="2021-06-30"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span className="mx-2">to</span>
            <input
              type="date"
              className="py-2 px-3 text-gray-500 border border-gray-300 text-sm rounded-lg"
              placeholder="Select date start"
              min="2021-06-01"
              max="2021-06-30"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button
            onClick={() => setSettingMenu(!settingMenu)}
            className="setting flex justify-center items-center gap-2 font-medium py-2 px-3 hover:bg-gray-100 border border-gray-300 rounded-lg cursor-pointer"
          >
            <img
              src={require("../assets/setting.png")}
              alt="Picture of the author"
              width={20}
              height={20}
            />
            <span>Setting</span>
          </button>
        </div>
        {settingMenu && (
          <div className="titleManager border border-gray-300 rounded-lg m-5 p-5 h-52">
            <h2 className="font-bold text-left">Dimensions and metrics</h2>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="ColumnTitles" direction="horizontal">
                {(provided) => (
                  <div
                    className="dimensionContainer flex justify-center gap-4 list-none my-3 w-[100%]"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {finalTitles.map(({ id, title, tindex }, index) => {
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided) => (
                            <li
                              className="listItem py-2 text-[15px] cursor-pointer px-3 w-[130px] border border-gray-300 rounded-md border-l-[5px] border-l-[#2846E8]"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => fire(tindex)}
                            >
                              {title}
                              {/* <FilterIcon /> */}
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <div className="flex justify-end gap-6 mr-2 mt-8">
              <button
                onClick={() => setSettingMenu(false)}
                className="inline-block px-6 py-2 border-2 border-[#2846E8] text-[#2846E8] font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                Close
              </button>
              <button
                onClick={() => handleChange()}
                className="inline-block px-6 py-2.5 bg-[#2846E8] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#1f39d0] hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Apply Changes
              </button>
            </div>
            {selectValidDate && (
              <p
                className="text-red-700 text-right text-[0.8rem] mr-4 mt-2"
                id="selectDate"
              >
                Please enter valid date
              </p>
            )}
          </div>
        )}
        <div className="overflow-x-auto  mx-5 rounded-lg mb-10">
          <table className="w-full text-sm text-left text-gray-500 " id="table">
            <thead className="text-xs text-gray-700 bg-gray-100">
              <tr>
                {dimensionList.map((item) => {
                  return (
                    <th
                      scope="col"
                      className="py-6 px-6 table-cell"
                      id={item.id}
                    >
                      <div className="flex gap-1">
                        {item.title}
                        {/* <button onClick={() => handleFilter(item.id)}> */}
                        <button
                          onClick={() => {
                            setRangeMenu(true);
                            setFilterTarget(item.id);
                          }}
                        >
                          {/* <FilterIcon width={20} height={20} /> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="ml-1 w-3 h-3"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 320 512"
                          >
                            <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                          </svg>
                        </button>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {
                fData
                  ? fData.map((item) => {
                      let date = new Date(item.date);

                      return (
                        <tr
                          className="row bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          id="1"
                        >
                          <td
                            scope="row"
                            className="py-3 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {date.toDateString()}
                          </td>
                          <td
                            scope="row"
                            className="row py-3 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {item.app_id}
                          </td>
                          <td className="row py-3 px-6">
                            {item && item.requests
                              ? item.requests.toLocaleString()
                              : 1}
                          </td>
                          <td className="row py-3 px-6">
                            {item && item.responses
                              ? item.responses.toLocaleString()
                              : 1}
                          </td>
                          <td className="row py-3 px-6">
                            {item && item.impressions
                              ? item.impressions.toLocaleString()
                              : 1}
                          </td>
                          <td className="row py-3 px-6">
                            {item && item.clicks
                              ? item.clicks.toLocaleString()
                              : 1}
                          </td>
                          <td className="row py-3 px-6">
                            $
                            {item && item.revenue
                              ? item.revenue.toFixed(2).toLocaleString()
                              : 0}
                          </td>
                          <td className="row py-3 px-6">
                            {item && item.requests && item.responses
                              ? (
                                  (item.requests / item.responses) *
                                  100
                                ).toFixed(2)
                              : 1}
                            %
                          </td>
                          <td className="row py-3 px-6" id="CTR">
                            {item
                              ? (
                                  (item.clicks / item.impressions) *
                                  100
                                ).toFixed(2)
                              : 2}
                            %
                          </td>
                        </tr>
                      );
                    })
                  : " "
                // <div className="text-black font-semibold text-[3rem] h-">
                //   <h2>Hey! Let start, Click apply changes in setting</h2>
                // </div>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
